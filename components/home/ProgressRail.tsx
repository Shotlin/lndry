"use client";

import { useEffect, useState } from "react";

const ACTS = [
  { id: "act-discover", label: "Discover" },
  { id: "act-choose", label: "Choose" },
  { id: "act-recommend", label: "Recommend" },
  { id: "act-journey", label: "Journey" },
  { id: "act-trust", label: "Trust" },
  { id: "act-close", label: "Close" },
];

/** Purely decorative wayfinding — reinforces the homepage as a paced story rather than a section stack. */
export function ProgressRail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ACTS.forEach((act, i) => {
      const el = document.getElementById(act.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 xl:flex"
    >
      {ACTS.map((act, i) => (
        <div key={act.id} className="flex items-center gap-2.5">
          <span
            className={`font-body text-[11px] font-semibold uppercase tracking-wide transition-opacity duration-300 ${
              active === i ? "opacity-100 text-violet" : "opacity-0"
            }`}
          >
            {act.label}
          </span>
          <span
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === i ? "w-6 bg-violet" : "w-1.5 bg-hairline"
            }`}
          />
        </div>
      ))}
    </div>
  );
}
