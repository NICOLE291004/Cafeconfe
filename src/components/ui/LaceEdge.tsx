import { cn } from "@/lib/utils";

interface LaceEdgeProps {
  className?: string;
  /** Color que se "muerde" en el borde — normalmente el fondo de lo que sigue o precede a la franja. */
  cutout: string;
  /** Hacia dónde cuelgan las muescas: "top" abre una sección, "bottom" la cierra. */
  edge?: "top" | "bottom";
  /** Diámetro de cada muesca, en px. */
  size?: number;
}

/**
 * Borde de encaje festoneado: una fila de semicírculos "mordidos", como el
 * filo de una puntilla o un sello postal. Se coloca como primer/último hijo
 * de una sección de color sólido para que el color de esa sección se vea a
 * través de las muescas.
 */
export function LaceEdge({ className, cutout, edge = "bottom", size = 20 }: LaceEdgeProps) {
  const centerY = edge === "bottom" ? size : 0;
  return (
    <div
      aria-hidden="true"
      className={cn("w-full", className)}
      style={{
        height: size,
        backgroundImage: `radial-gradient(circle at ${size / 2}px ${centerY}px, transparent ${size / 2 - 1}px, ${cutout} ${size / 2 - 0.5}px)`,
        backgroundSize: `${size}px ${size}px`,
        backgroundRepeat: "repeat-x",
      }}
    />
  );
}
