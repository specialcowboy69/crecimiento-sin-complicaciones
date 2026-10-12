"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type LandingTileProps = {
  children: ReactNode;
  className: string;
};

export function LandingTile({ children, className }: LandingTileProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      className={className}
      whileHover={reducedMotion ? undefined : { y: -5 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      {children}
    </motion.article>
  );
}
