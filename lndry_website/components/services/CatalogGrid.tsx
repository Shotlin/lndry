"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, Flip } from "@/lib/motion/gsap";
import { motionTokens } from "@/lib/motion/tokens";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { ServiceCard } from "../ui/ServiceCard";
import { SERVICES } from "@/lib/data/services";

type FilterKey = "all" | "popular" | "specialist";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All services" },
  { key: "popular", label: "Popular" },
  { key: "specialist", label: "Specialist" },
];

export function CatalogGrid() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const reducedMotion = useReducedMotion();

  const visible = SERVICES.filter((s) => {
    if (filter === "all") return true;
    return s.tag.label.toLowerCase() === filter;
  });

  function handleFilter(next: FilterKey) {
    if (next === filter) return;
    if (!reducedMotion && gridRef.current) {
      flipState.current = Flip.getState(gridRef.current.querySelectorAll(".service-card"));
    }
    setFilter(next);
  }

  useGSAP(
    () => {
      if (!flipState.current) return;
      Flip.from(flipState.current, {
        duration: motionTokens.durationBase,
        ease: motionTokens.easeSignature,
        stagger: 0.03,
        absolute: true,
        onEnter: (elements) =>
          gsap.fromTo(elements, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.4 }),
        onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0.92, duration: 0.25 }),
      });
      flipState.current = null;
    },
    [filter]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-3" role="group" aria-label="Filter services">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => handleFilter(f.key)}
            aria-pressed={filter === f.key}
            className={`h-11 rounded-full px-5 font-body text-sm font-semibold transition-colors duration-300 [transition-timing-function:var(--ease-signature)] ${
              filter === f.key
                ? "bg-violet text-white"
                : "border border-hairline bg-white text-ink-soft hover:border-violet hover:text-violet"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </div>
  );
}
