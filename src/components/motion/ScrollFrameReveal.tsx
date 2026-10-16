"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";

interface ScrollFrameRevealProps {
  /** Ej. "/hero-frames/frame-" — se completa con el número (001, 002...) y la extensión. */
  framePrefix: string;
  frameCount: number;
  frameExt?: string;
  /** Ancho/alto nativo de cada frame, para el "cover" del canvas y el fallback estático. */
  frameWidth: number;
  frameHeight: number;
  /** Cuánto scroll (en múltiplos de la altura de pantalla) dura la secuencia completa. */
  scrollLengthVh?: number;
  className?: string;
}

function frameSrc(prefix: string, ext: string, index: number) {
  return `${prefix}${String(index + 1).padStart(3, "0")}.${ext}`;
}

/**
 * Secuencia de imágenes pre-extraídas de un video, dibujada en un <canvas>
 * y controlada por scroll (estilo "scrubbing") en vez de reproducirse sola.
 * Se eligió canvas + imágenes estáticas sobre un <video> real porque el
 * scroll-scrub necesita saltar a un frame exacto en cada tick sin esperar
 * a que un elemento de video busque (seek) — con frames ya decodificados
 * en memoria, dibujar es instantáneo.
 */
export function ScrollFrameReveal({
  framePrefix,
  frameCount,
  frameExt = "webp",
  frameWidth,
  frameHeight,
  scrollLengthVh = 250,
  className,
}: ScrollFrameRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentIndexRef = useRef(-1);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isReady = (img: HTMLImageElement | undefined): img is HTMLImageElement =>
      Boolean(img && img.complete && img.naturalWidth > 0);

    /**
     * Si el frame exacto que le toca aún no cargó, se busca el más cercano
     * que sí esté listo (primero hacia atrás, luego hacia adelante) para
     * que el scroll SIEMPRE mueva algo en pantalla — nunca se queda
     * congelado esperando a que llegue justo ese frame.
     */
    const closestReadyIndex = (target: number): number | null => {
      const images = imagesRef.current;
      if (isReady(images[target])) return target;
      for (let d = 1; d < images.length; d++) {
        if (isReady(images[target - d])) return target - d;
        if (isReady(images[target + d])) return target + d;
      }
      return null;
    };

    const draw = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      currentIndexRef.current = index;

      const canvasW = canvas.width;
      const canvasH = canvas.height;
      // "cover": escala para llenar el canvas sin deformar, recortando el sobrante.
      const scale = Math.max(canvasW / frameWidth, canvasH / frameHeight);
      const drawW = frameWidth * scale;
      const drawH = frameHeight * scale;
      const offsetX = (canvasW - drawW) / 2;
      const offsetY = (canvasH - drawH) / 2;

      ctx.clearRect(0, 0, canvasW, canvasH);
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    };

    const currentTargetIndex = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0;
      return Math.min(frameCount - 1, Math.floor(progress * frameCount));
    };

    const renderCurrentFrame = () => {
      const target = currentTargetIndex();
      if (target === currentIndexRef.current) return;
      const fallback = closestReadyIndex(target);
      if (fallback !== null) draw(fallback);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        renderCurrentFrame();
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      currentIndexRef.current = -1;
      renderCurrentFrame();
    };

    const images: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      // Los primeros frames deben llegar YA — son los que se ven si alguien
      // hace scroll de inmediato. Bajarle prioridad al resto (en vez de
      // dejarlos en automático) los retrasaba detrás de fuentes/CSS y hacía
      // que los primeros scrolls no movieran nada visible.
      img.fetchPriority = i < 10 ? "high" : "auto";
      img.src = frameSrc(framePrefix, frameExt, i);
      img.onload = () => {
        // En cuanto llega el frame que le toca mostrar ahora mismo, se pinta.
        if (currentTargetIndex() === i) renderCurrentFrame();
      };
      images[i] = img;
    }
    imagesRef.current = images;

    resize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion, framePrefix, frameCount, frameExt, frameWidth, frameHeight]);

  if (reducedMotion) {
    return (
      <div className={className}>
        <Image
          src={frameSrc(framePrefix, frameExt, frameCount - 1)}
          alt=""
          aria-hidden="true"
          width={frameWidth}
          height={frameHeight}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const preloadCount = Math.min(10, frameCount);

  return (
    <>
      {/* Pista al navegador para que los primeros frames lleguen ya, antes
          incluso de que corra el JS — cubre el scroll casi inmediato. */}
      {Array.from({ length: preloadCount }, (_, i) => (
        <link
          key={i}
          rel="preload"
          as="image"
          href={frameSrc(framePrefix, frameExt, i)}
          fetchPriority={i === 0 ? "high" : "auto"}
        />
      ))}
      <div ref={wrapperRef} style={{ height: `${scrollLengthVh}vh` }} className={className}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
        </div>
      </div>
    </>
  );
}
