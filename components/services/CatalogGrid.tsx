"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { ServiceCard } from "../ui/ServiceCard";
import { SERVICES } from "@/lib/data/services";

type FilterKey = "all" | "popular" | "specialist";

const FILTERS: { key: FilterKey; label: string; description: string }[] = [
  { key: "all", label: "All services", description: "Every care route" },
  { key: "popular", label: "Popular", description: "Everyday favourites" },
  { key: "specialist", label: "Specialist", description: "Care beyond the everyday" },
];

function filterServices(filter: FilterKey) {
  if (filter === "all") return SERVICES;
  return SERVICES.filter((service) => service.tag.label.toLowerCase() === filter);
}

export function CatalogGrid() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const visible = filterServices(filter);

  useGSAP(
    () => {
      if (reducedMotion || !gridRef.current) return;
      gsap.fromTo(
        ".catalog-card",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.48, ease: "power3.out", stagger: 0.045, clearProps: "transform" },
      );
    },
    { scope: gridRef, dependencies: [filter, reducedMotion] },
  );

  return (
    <div>
      <div className="rounded-xl bg-white p-2 shadow-[0_4px_8px_rgba(66,55,145,0.1)] ring-1 ring-hairline">
        <div className="grid gap-2 sm:grid-cols-3" role="tablist" aria-label="Filter LNDRY services">
          {FILTERS.map((item) => {
            const count = filterServices(item.key).length;
            const active = filter === item.key;
            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="service-catalog"
                onClick={() => setFilter(item.key)}
                className={`flex min-h-16 items-center justify-between gap-3 rounded-lg px-4 text-left transition-colors duration-300 [transition-timing-function:var(--ease-signature)] sm:min-h-20 sm:px-5 ${
                  active ? "bg-ink text-white" : "bg-transparent text-ink-soft hover:bg-bg-app hover:text-ink"
                }`}
              >
                <span>
                  <span className="block font-display text-base font-semibold">{item.label}</span>
                  <span className={`mt-1 block font-body text-xs ${active ? "text-white/62" : "text-muted"}`}>{item.description}</span>
                </span>
                <span className={`flex size-7 items-center justify-center rounded-full font-body text-xs font-semibold ${active ? "bg-white/12 text-teal" : "bg-lavender-soft text-violet"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="font-body text-sm text-ink-soft" aria-live="polite">Showing <span className="font-semibold text-ink">{visible.length}</span> {filter === "all" ? "care routes" : `${filter} care routes`}</p>
        <p className="font-body text-xs text-muted">Final price and pickup availability are confirmed before booking.</p>
      </div>

      <div id="service-catalog" ref={gridRef} className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((service) => (
          <div key={`${filter}-${service.title}`} className="catalog-card">
            <ServiceCard {...service} />
          </div>
        ))}
      </div>
    </div>
  );
}
