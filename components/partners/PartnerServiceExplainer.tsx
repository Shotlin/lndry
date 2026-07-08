"use client";

import { useScrollReveal } from "@/lib/motion/useScrollReveal";

const stages = [
  {
    title: "Service fit",
    body: "LNDRY checks which categories the partner can genuinely fulfil, including capacity and delivery coverage.",
    signal: "Category clarity",
  },
  {
    title: "Operating radius",
    body: "Coverage is mapped by neighbourhood, pickup slot, and return feasibility so customers see realistic availability.",
    signal: "Area control",
  },
  {
    title: "Quality baseline",
    body: "Partner notes, garment handling, handover proof, and status language become part of the marketplace trust layer.",
    signal: "Trust proof",
  },
  {
    title: "Order assignment",
    body: "Eligible orders can be routed to the right partner without asking customers to compare every laundry vendor.",
    signal: "Less confusion",
  },
];

export function PartnerServiceExplainer() {
  const scope = useScrollReveal<HTMLDivElement>({ selector: ".partner-stage", y: 24, stagger: 0.08 });

  return (
    <div ref={scope} className="overflow-hidden rounded-xl bg-ink p-6 text-white md:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <div>
          <p className="font-body text-label font-semibold uppercase tracking-[0.14em] text-teal">
            Partner onboarding story
          </p>
          <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            The form is the first quality gate.
          </h3>
          <p className="mt-4 font-body text-sm leading-relaxed text-white/70 md:text-base">
            Instead of a generic signup, LNDRY asks for the details that decide whether a partner
            can serve customers well: service category, capacity, radius, and handover readiness.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-5 top-6 hidden h-[calc(100%-3rem)] w-px bg-white/15 sm:block" />
          <div className="grid gap-4">
            {stages.map((stage, index) => (
              <article
                key={stage.title}
                className="partner-stage relative grid gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-4 sm:grid-cols-[2.75rem_1fr] sm:p-5"
              >
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-teal font-display text-sm font-bold text-ink">
                  {index + 1}
                </div>
                <div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="font-display text-lg font-semibold text-white">{stage.title}</h4>
                    <span className="w-fit rounded-full bg-white/10 px-3 py-1 font-body text-xs font-semibold text-white/75">
                      {stage.signal}
                    </span>
                  </div>
                  <p className="mt-2 font-body text-sm leading-relaxed text-white/68">{stage.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
