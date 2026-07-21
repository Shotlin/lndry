"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      // Keep the server-rendered page visible before JavaScript hydrates. The
      // small in-view keyframe sequence retains the entrance cue once motion
      // is available, without making no-JS or slow-loading content invisible.
      initial={false}
      whileInView={
        reducedMotion ? undefined : { opacity: [0.9, 1], y: [16, 0] }
      }
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
