"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "./gsap";
import { motionTokens } from "./tokens";
import { useReducedMotion } from "./useReducedMotion";

interface ScrollRevealOptions {
  /** Elements within the scope to animate, e.g. ".reveal-card" */
  selector: string;
  y?: number;
  stagger?: number;
  start?: string;
}

/** Shared "fade up on enter, staggered" primitive — the one reveal pattern reused across every section instead of a bespoke timeline per component. */
export function useScrollReveal<T extends HTMLElement>({
  selector,
  y = 40,
  stagger = motionTokens.staggerStep,
  start = "top 85%",
}: ScrollRevealOptions) {
  const scope = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!scope.current) return;

      if (reducedMotion) {
        gsap.set(selector, { opacity: 1, y: 0 });
        return;
      }

      gsap.from(selector, {
        opacity: 0,
        y,
        duration: motionTokens.durationBase,
        ease: motionTokens.easeSignature,
        stagger,
        scrollTrigger: {
          trigger: scope.current,
          start,
        },
      });
    },
    { scope, dependencies: [reducedMotion] }
  );

  return scope;
}
