"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const EASE_PREMIUM = [0.12, 0.23, 0.5, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Distancia inicial en px desde la que el elemento se desliza hacia su posición final. */
  y?: number;
  /** Escala inicial (1 = sin escala). */
  scale?: number;
  duration?: number;
  delay?: number;
}

export function Reveal({
  children,
  className,
  y = 32,
  scale = 1,
  duration = 1.1,
  delay = 0,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3, delay } },
      }
    : {
        hidden: { opacity: 0, y, scale },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration, delay, ease: EASE_PREMIUM },
        },
      };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
