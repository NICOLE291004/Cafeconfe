"use client";

import { useEffect } from "react";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { cn } from "@/lib/utils";
import type { SiteImages } from "@/lib/site-images";

const COMMUNITY_KEYS = [
  "comunidad_1",
  "comunidad_2",
  "comunidad_3",
  "comunidad_4",
  "comunidad_5",
  "comunidad_6",
] as const satisfies readonly (keyof SiteImages)[];

const LOOP_DURATION_S = 38;

interface CommunityGalleryProps {
  images: SiteImages;
  className?: string;
}

function Tile({
  src,
  caption,
  decorative,
}: {
  src: string | null;
  caption: string;
  decorative: boolean;
}) {
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element -- ancho natural por foto, next/image exige dimensiones fijas
    <img
      src={src}
      alt={decorative ? "" : caption}
      aria-hidden={decorative || undefined}
      loading="lazy"
      className="h-64 w-auto shrink-0 sm:h-80 lg:h-[420px]"
    />
  ) : (
    <div
      aria-hidden={decorative || undefined}
      className="h-64 w-64 shrink-0 sm:h-80 sm:w-80 lg:h-[420px] lg:w-[420px]"
    >
      <PlaceholderImage caption={decorative ? "" : caption} className="h-full w-full" />
    </div>
  );
}

/**
 * Cinta de fotos de la comunidad que se desliza sola en bucle infinito —
 * mismo set en Home y en Nosotras. Cada foto real se ve a su tamaño
 * natural (alto fijo, ancho automático). Se pausa al pasar el mouse; con
 * "reducir movimiento" del sistema, cae a una tira estática deslizable a
 * mano (sin el loop automático).
 */
export function CommunityGallery({ images, className }: CommunityGalleryProps) {
  const reducedMotion = useReducedMotion();
  const controls = useAnimationControls();

  const tiles = COMMUNITY_KEYS.map((key, index) => ({
    key,
    src: images[key],
    caption: `Foto: momento de la comunidad ${index + 1}`,
  }));

  const startLoop = () => {
    void controls.start({
      x: "-50%",
      transition: { duration: LOOP_DURATION_S, ease: "linear", repeat: Infinity },
    });
  };

  useEffect(() => {
    if (reducedMotion) return;
    startLoop();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- startLoop se recrea cada render pero solo debe arrancar el loop al montar
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className={cn("flex gap-4 overflow-x-auto pb-2", className)}>
        {tiles.map((tile) => (
          <Tile key={tile.key} src={tile.src} caption={tile.caption} decorative={false} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn("overflow-hidden", className)}
      onMouseEnter={() => controls.stop()}
      onMouseLeave={startLoop}
    >
      <motion.div animate={controls} className="flex w-max gap-4">
        {tiles.map((tile) => (
          <Tile key={tile.key} src={tile.src} caption={tile.caption} decorative={false} />
        ))}
        {tiles.map((tile) => (
          <Tile key={`${tile.key}-repeat`} src={tile.src} caption={tile.caption} decorative />
        ))}
      </motion.div>
    </div>
  );
}
