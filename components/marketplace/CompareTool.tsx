"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { Pill } from "../ui/Pill";
import { Button } from "../ui/Button";
import { PARTNERS, SLOTS, SERVICE_FILTERS } from "@/lib/data/partners";

const CHIP_FILTERS = [...SERVICE_FILTERS, "6-7 PM slot", "Within 2 km", "Verified only"] as const;

export function CompareTool() {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(["Dry cleaning", "Verified only"]));
  const [selectedId, setSelectedId] = useState("urbanpress");
  const [selectedSlot, setSelectedSlot] = useState("6-7 PM");
  const reducedMotion = useReducedMotion();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rowRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const eligiblePartners = useMemo(() => {
    return PARTNERS.filter((p) => {
      if (activeFilters.has("Wash & fold") && !p.services.includes("Wash & fold")) return false;
      if (activeFilters.has("Dry cleaning") && !p.services.includes("Dry cleaning")) return false;
      if (activeFilters.has("6-7 PM slot") && p.slot !== "6-7 PM") return false;
      if (activeFilters.has("Within 2 km") && p.distanceKm > 2) return false;
      return true;
    });
  }, [activeFilters]);

  const recommendedPartner = eligiblePartners.find((p) => p.id === selectedId) ?? eligiblePartners[0];

  function toggleFilter(label: string) {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const summary = summaryRef.current;
    const row = recommendedPartner ? rowRefs.current[recommendedPartner.id] : null;
    const path = pathRef.current;
    if (!wrapper || !summary || !row || !path) return;

    function draw() {
      const wrapperRect = wrapper!.getBoundingClientRect();
      const rowRect = row!.getBoundingClientRect();
      const summaryRect = summary!.getBoundingClientRect();

      const x1 = rowRect.right - wrapperRect.left;
      const y1 = rowRect.top + rowRect.height / 2 - wrapperRect.top;
      const x2 = summaryRect.left - wrapperRect.left;
      const y2 = summaryRect.top + 36 - wrapperRect.top;
      const midX = (x1 + x2) / 2;

      path!.setAttribute("d", `M${x1},${y1} C${midX},${y1} ${midX},${y2} ${x2},${y2}`);

      if (!reducedMotion) {
        const length = path!.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 0.7, ease: "power2.out" }
        );
      } else {
        path!.removeAttribute("stroke-dasharray");
        path!.style.strokeDashoffset = "0";
      }
    }

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [recommendedPartner, eligiblePartners.length, reducedMotion]);

  return (
    <div ref={wrapperRef} className="relative grid gap-8 lg:grid-cols-[220px_1fr_260px]">
      <svg className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" aria-hidden="true">
        <path ref={pathRef} fill="none" stroke="var(--color-violet)" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <aside className="order-1 lg:order-none">
        <p className="font-display text-sm font-semibold text-ink">Booking needs</p>
        <div className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:items-start">
          {CHIP_FILTERS.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => toggleFilter(label)}
              aria-pressed={activeFilters.has(label)}
              className={`h-11 rounded-full px-4 font-body text-sm font-semibold transition-colors duration-300 ${
                activeFilters.has(label)
                  ? "bg-violet text-white"
                  : "border border-hairline bg-white text-ink-soft hover:border-violet hover:text-violet"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8 hidden rounded-lg bg-lavender-soft p-5 lg:block">
          <p className="font-display text-sm font-semibold text-ink">Why recommend?</p>
          <p className="mt-2 font-body text-xs leading-relaxed text-ink-soft">
            LNDRY can evaluate service type, area, partner capability, timing, and status signals,
            then show one confident next step.
          </p>
        </div>
      </aside>

      <div className="order-3 flex flex-col gap-4 lg:order-none" aria-label="Eligible partner recommendations">
        {eligiblePartners.length === 0 && (
          <p className="rounded-lg border border-hairline bg-white p-6 text-center font-body text-sm text-ink-soft">
            No eligible partner matches these needs right now.
          </p>
        )}
        {eligiblePartners.map((partner) => {
          const isSelected = partner.id === recommendedPartner?.id;
          return (
            <button
              key={partner.id}
              ref={(el) => {
                rowRefs.current[partner.id] = el;
              }}
              type="button"
              onClick={() => setSelectedId(partner.id)}
              aria-pressed={isSelected}
              className={`flex flex-col gap-3 rounded-lg border p-5 text-left transition-colors duration-300 sm:flex-row sm:items-center sm:justify-between ${
                isSelected ? "border-violet bg-lavender-soft" : "border-hairline bg-white hover:border-violet/50"
              }`}
            >
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">{partner.name}</h3>
                <p className="mt-1 font-body text-sm text-ink-soft">
                  {partner.distanceKm.toFixed(1)} km · ₹{partner.ratePerKg}/kg · {partner.slot} slot
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill tone="teal">Verified signal</Pill>
                  <Pill tone="neutral">{partner.availability}</Pill>
                </div>
              </div>
              <span
                className={`inline-flex h-11 shrink-0 items-center justify-center rounded-sm px-5 font-body text-sm font-semibold ${
                  isSelected ? "bg-violet text-white" : "border border-violet text-violet"
                }`}
              >
                {isSelected ? "Recommended" : "Use this partner"}
              </span>
            </button>
          );
        })}
      </div>

      <aside className="order-2 lg:order-none">
        <p className="font-display text-sm font-semibold text-ink">Preferred slot</p>
        <div className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
          {SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setSelectedSlot(slot)}
              aria-pressed={selectedSlot === slot}
              className={`h-11 rounded-full px-4 font-body text-sm font-semibold transition-colors duration-300 ${
                selectedSlot === slot
                  ? "bg-teal-tint text-teal"
                  : "border border-hairline bg-white text-ink-soft hover:border-teal hover:text-teal"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </aside>

      <div ref={summaryRef} className="order-4 rounded-xl bg-white p-6 shadow-elevated lg:col-span-3">
        {recommendedPartner ? (
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-wide text-muted">
                Recommended partner
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-ink">{recommendedPartner.name}</h3>
              <p className="mt-1 font-body text-sm text-ink-soft">
                {recommendedPartner.distanceKm.toFixed(1)} km · {recommendedPartner.services.join(", ")} eligible ·{" "}
                {selectedSlot} pickup
              </p>
            </div>
            <Button href="/#early-access">Book pickup</Button>
          </div>
        ) : (
          <p className="font-body text-sm text-ink-soft">Adjust the booking needs to see an eligible recommendation.</p>
        )}
      </div>
    </div>
  );
}
