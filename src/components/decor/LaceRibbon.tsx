interface LaceRibbonProps {
  className?: string;
  /** Color del listón. */
  background?: string;
  /** Color de las medias lunas recortadas (normalmente el fondo contiguo). */
  notch?: string;
  /** Color del punto de acento al centro de cada medio círculo. */
  dot?: string;
  /** "top"/"bottom": borde festoneado de un bloque de color. "strip": listón completo entre dos secciones. */
  variant?: "top" | "bottom" | "strip";
}

/**
 * Listón de encaje decorativo — el borde festoneado (puntos recortados)
 * que separa las secciones de color en el diseño de referencia. Es
 * puramente visual, sin texto ni foco, por eso se marca aria-hidden.
 */
export function LaceRibbon({
  className,
  background = "#f4c9d6",
  notch = "#faf3ec",
  dot = "#3e2723",
  variant = "top",
}: LaceRibbonProps) {
  if (variant === "strip") {
    return (
      <div
        aria-hidden="true"
        className={className}
        style={{
          height: 28,
          background,
          backgroundImage: [
            `radial-gradient(circle at 10px 0, ${notch} 8px, transparent 8.5px)`,
            `radial-gradient(circle at 10px 28px, ${notch} 8px, transparent 8.5px)`,
            `radial-gradient(circle at 10px 14px, ${dot} 2.5px, transparent 3px)`,
          ].join(", "),
          backgroundSize: "20px 28px",
          backgroundRepeat: "repeat-x",
        }}
      />
    );
  }

  const cutY = variant === "top" ? 0 : 22;

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        height: 22,
        background,
        backgroundImage: [
          `radial-gradient(circle at 11px ${cutY}px, ${notch} 9px, transparent 9.5px)`,
          `radial-gradient(circle at 11px 11px, ${dot} 2px, transparent 2.5px)`,
        ].join(", "),
        backgroundSize: "22px 22px",
        backgroundRepeat: "repeat-x",
      }}
    />
  );
}
