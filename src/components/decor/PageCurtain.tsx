"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Cortina de transición entre páginas — un guiño al cambio de página del
 * diseño de referencia. Vive una sola vez en el layout raíz: cada cambio
 * de ruta remonta el overlay (via key) para volver a reproducir la
 * animación por encima del contenido ya renderizado.
 */
export function PageCurtain() {
  const pathname = usePathname();
  const [playCount, setPlayCount] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPlayCount((count) => count + 1);
  }, [pathname]);

  if (playCount === 0) return null;

  return (
    <div
      key={playCount}
      aria-hidden="true"
      className="animate-curtain motion-reduce:hidden pointer-events-none fixed inset-0 z-[300]"
    >
      <div
        className="absolute inset-0"
        style={{
          background: "#3e2723",
          backgroundImage: [
            "radial-gradient(circle at 50% 22%, rgba(244,201,214,.5) 5%, transparent 6%)",
            "radial-gradient(circle at 78% 42%, rgba(244,201,214,.5) 5%, transparent 6%)",
            "radial-gradient(circle at 67% 81%, rgba(244,201,214,.5) 5%, transparent 6%)",
            "radial-gradient(circle at 33% 81%, rgba(244,201,214,.5) 5%, transparent 6%)",
            "radial-gradient(circle at 22% 42%, rgba(244,201,214,.5) 5%, transparent 6%)",
          ].join(", "),
          backgroundSize: "96px 96px",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-5"
        style={{
          backgroundImage: "radial-gradient(circle at 10px 20px, transparent 9px, #faf3ec 9.5px)",
          backgroundSize: "20px 20px",
          backgroundRepeat: "repeat-x",
        }}
      />
    </div>
  );
}
