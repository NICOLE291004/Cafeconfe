"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";

interface PetalFieldProps {
  count?: number;
  className?: string;
}

interface Petal {
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

function petalGradient(color: string) {
  return [
    `radial-gradient(circle at 50% 20%,${color} 20%,transparent 21%)`,
    `radial-gradient(circle at 79% 41%,${color} 20%,transparent 21%)`,
    `radial-gradient(circle at 68% 82%,${color} 20%,transparent 21%)`,
    `radial-gradient(circle at 32% 82%,${color} 20%,transparent 21%)`,
    `radial-gradient(circle at 21% 41%,${color} 20%,transparent 21%)`,
  ].join(",");
}

/**
 * Pétalos cayendo en bucle sobre el hero — decoración ambiental, no
 * interactiva. Las posiciones/tiempos son deterministas (no random real)
 * para que el marcado del servidor y el del cliente coincidan.
 */
export function PetalField({ count = 12, className }: PetalFieldProps) {
  const reducedMotion = useReducedMotion();

  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 37 + 11) % 97,
        size: 12 + ((i * 7) % 11),
        duration: 13 + ((i * 5) % 9),
        delay: (i * 1.35) % 12,
        color: i % 3 === 0 ? "rgba(250,243,236,.85)" : "rgba(244,201,214,.9)",
      })),
    [count],
  );

  if (reducedMotion || count <= 0) return null;

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
    >
      {petals.map((petal, i) => (
        <motion.div
          key={i}
          initial={{ y: "-10vh", opacity: 0, rotate: 0 }}
          animate={{ y: "108vh", opacity: [0, 0.9, 0.9, 0.7, 0], rotate: 400 }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: 0,
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size,
            backgroundImage: petalGradient(petal.color),
          }}
        />
      ))}
    </div>
  );
}
