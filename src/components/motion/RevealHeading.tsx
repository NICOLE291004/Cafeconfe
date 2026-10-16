"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const EASE_PREMIUM = [0.12, 0.23, 0.5, 1] as const;

interface RevealHeadingProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2";
}

/**
 * Titular que se "escribe" de izquierda a derecha vía clip-path, para los
 * heroes principales — el equivalente en Motion for React del @keyframes
 * "escribir" del diseño original.
 */
export function RevealHeading({ children, className, delay = 0, as = "h1" }: RevealHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return as === "h1" ? (
      <h1 className={className}>{children}</h1>
    ) : (
      <h2 className={className}>{children}</h2>
    );
  }

  const variants: Variants = {
    hidden: { clipPath: "inset(0 100% -20% 0)", opacity: 0.2 },
    visible: {
      clipPath: "inset(0 -6% -20% 0)",
      opacity: 1,
      transition: { duration: 1.5, delay, ease: EASE_PREMIUM },
    },
  };

  const MotionTag = as === "h1" ? motion.h1 : motion.h2;

  return (
    <MotionTag className={className} initial="hidden" animate="visible" variants={variants}>
      {children}
    </MotionTag>
  );
}
