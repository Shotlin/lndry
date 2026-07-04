"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/motion/gsap";
import { motionTokens } from "@/lib/motion/tokens";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

const THREAD_D =
  "M42 278 C220 120 390 355 566 205 C735 60 888 320 1058 186 C1188 86 1300 138 1396 82";

const STATIONS = [
  { cx: 42, cy: 278 },
  { cx: 566, cy: 205 },
  { cx: 1058, cy: 186 },
  { cx: 1396, cy: 82 },
];

/**
 * From the finishing kit's careline-thread-overlay — inlined (not an <img>) so the stroke
 * can genuinely draw itself in on load, per the kit's own guidance ("stroke-dashoffset from
 * 100% to 0"), rather than just cross-fading in a static raster copy.
 */
export function HeroThreadOverlay({ className = "" }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!pathRef.current) return;

      if (reducedMotion) {
        gsap.set(pathRef.current, { strokeDashoffset: 0 });
        gsap.set(".hero-thread-node", { opacity: 1, scale: 1 });
        return;
      }

      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(".hero-thread-node", { opacity: 0, scale: 0.5, transformOrigin: "center" });

      const tl = gsap.timeline({ delay: 0.5 });
      tl.to(pathRef.current, { strokeDashoffset: 0, duration: 2.2, ease: motionTokens.easeSignature }).to(
        ".hero-thread-node",
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.5, ease: "back.out(2)" },
        "-=2"
      );
    },
    { dependencies: [reducedMotion] }
  );

  return (
    <svg
      viewBox="0 0 1440 420"
      className={className}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        ref={pathRef}
        d={THREAD_D}
        stroke="var(--color-violet)"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.9"
      />
      {STATIONS.map((s, i) => (
        <g key={i} className="hero-thread-node">
          <circle cx={s.cx} cy={s.cy} r="18" fill="var(--color-teal-tint)" stroke="var(--color-teal)" strokeWidth="3" />
          <path
            d={`M ${s.cx - 7} ${s.cy} l 5 6 l 10 -13`}
            stroke="var(--color-teal)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}
    </svg>
  );
}
