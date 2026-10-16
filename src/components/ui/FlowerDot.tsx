import { cn } from "@/lib/utils";

interface FlowerDotProps {
  className?: string;
  size?: number;
  petalColor?: string;
  centerColor?: string;
}

/**
 * Doodle de flor de cinco pétalos hecho con radial-gradients apiladas —
 * viñeta decorativa para tarjetas y listas (sin depender de un ícono/SVG).
 */
export function FlowerDot({
  className,
  size = 30,
  petalColor = "var(--color-blush)",
  centerColor = "var(--color-espresso)",
}: FlowerDotProps) {
  const layers = [
    `radial-gradient(circle at 50% 20%,${petalColor} 20%,transparent 21%)`,
    `radial-gradient(circle at 79% 41%,${petalColor} 20%,transparent 21%)`,
    `radial-gradient(circle at 68% 82%,${petalColor} 20%,transparent 21%)`,
    `radial-gradient(circle at 32% 82%,${petalColor} 20%,transparent 21%)`,
    `radial-gradient(circle at 21% 41%,${petalColor} 20%,transparent 21%)`,
    `radial-gradient(circle at 50% 51%,${centerColor} 11%,transparent 12%)`,
  ];

  return (
    <div
      aria-hidden="true"
      className={cn("shrink-0", className)}
      style={{ width: size, height: size, backgroundImage: layers.join(",") }}
    />
  );
}
