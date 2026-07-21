"use client";

import { useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, CalendarClock, CheckCircle2, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PARTNERS, SERVICE_FILTERS } from "@/lib/data/partners";

const SLOT_OPTIONS = ["First available", "5-6 PM", "6-7 PM", "Tomorrow"] as const;

const CHECKS = [
  { title: "Care fit", copy: "Can this partner handle the selected service?", icon: ShieldCheck },
  { title: "Area & capacity", copy: "Is a suitable pickup route available nearby?", icon: MapPin },
  { title: "Pickup window", copy: "Which available window makes the handover clear?", icon: CalendarClock },
];

export function RecommendationFlow() {
  const [service, setService] = useState<(typeof SERVICE_FILTERS)[number]>("Dry cleaning");
  const [slot, setSlot] = useState<(typeof SLOT_OPTIONS)[number]>("First available");

  const recommendedPartner = useMemo(() => {
    const eligible = PARTNERS.filter((partner) => partner.services.includes(service));
    return eligible.find((partner) => slot === "First available" || partner.slot === slot || (slot === "Tomorrow" && partner.availability === "Tomorrow")) ?? eligible[0];
  }, [service, slot]);

  return (
    <div id="recommendation-flow" className="relative scroll-mt-24 overflow-hidden rounded-xl border border-hairline bg-white p-5 shadow-[0_8px_8px_rgba(66,55,145,0.12)] sm:p-7 lg:p-8">
      <div className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-violet/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-20 size-64 rounded-full bg-teal/10 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-12">
        <div>
          <p className="font-body text-label font-semibold text-violet">Your care request</p>
          <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-ink">Give LNDRY the details that make a good match.</h3>
          <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-ink-soft">Choose the care route and your preferred window. LNDRY handles the marketplace checks in the background.</p>

          <fieldset className="mt-7">
            <legend className="font-body text-xs font-semibold uppercase tracking-[0.13em] text-muted">Care route</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {SERVICE_FILTERS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setService(item)}
                  aria-pressed={service === item}
                  className={`min-h-11 rounded-full px-4 font-body text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-violet focus-visible:outline-offset-2 ${service === item ? "bg-violet text-white shadow-[0_6px_14px_rgba(102,76,240,0.22)]" : "bg-bg-app text-ink-soft ring-1 ring-hairline hover:bg-lavender-soft hover:text-violet"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="font-body text-xs font-semibold uppercase tracking-[0.13em] text-muted">Pickup preference</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {SLOT_OPTIONS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSlot(item)}
                  aria-pressed={slot === item}
                  className={`min-h-10 rounded-full px-3.5 font-body text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-2 ${slot === item ? "bg-teal-tint text-teal ring-1 ring-teal/25" : "bg-white text-ink-soft ring-1 ring-hairline hover:bg-teal-tint hover:text-teal"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-7 flex items-start gap-3 rounded-lg bg-ink px-4 py-3.5 text-white">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-teal"><MapPin className="size-3.5" aria-hidden="true" /></span>
            <p className="font-body text-sm leading-relaxed text-white/72"><span className="font-semibold text-white">Pune pilot area.</span> Coverage, capacity, and the final pickup window are confirmed before booking.</p>
          </div>
        </div>

        <div className="relative">
          <div className="hidden items-center gap-0 lg:flex" aria-label="LNDRY matching sequence">
            {CHECKS.map(({ title, icon: Icon }, index) => (
              <div key={title} className="flex min-w-0 flex-1 items-center">
                <div className="min-w-0 flex-1 rounded-lg bg-bg-app px-3 py-3.5 ring-1 ring-hairline">
                  <Icon className="size-4 text-teal" aria-hidden="true" />
                  <p className="mt-2 font-body text-xs font-semibold text-ink">{title}</p>
                </div>
                {index < CHECKS.length - 1 ? <ArrowRight className="mx-1.5 size-4 shrink-0 text-violet" aria-hidden="true" /> : null}
              </div>
            ))}
          </div>

          <div className="mt-4 overflow-hidden rounded-xl bg-ink p-1 shadow-[0_16px_32px_rgba(8,15,20,0.2)] lg:mt-5">
            <div className="relative overflow-hidden rounded-[0.7rem] bg-[linear-gradient(135deg,#101b2c_0%,#1b1839_64%,#5441c8_145%)] p-5 text-white sm:p-6">
              <div className="pointer-events-none absolute -right-10 top-8 size-44 rounded-full bg-violet/40 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-14 left-8 size-36 rounded-full bg-teal/20 blur-3xl" />

              <div className="relative flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-teal/15 px-2.5 py-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-teal ring-1 ring-teal/20"><Sparkles className="size-3" aria-hidden="true" />Recommended for this request</div>
                  <h4 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">{recommendedPartner?.name ?? "Suitable nearby partner"}</h4>
                  <p className="mt-2 font-body text-sm text-white/68">Matched to your {service.toLowerCase()} request in the Pune launch area.</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 font-body text-xs font-semibold text-ink"><BadgeCheck className="size-4 text-teal" aria-hidden="true" />Verified</span>
              </div>

              <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
                <MatchDetail label="Starting basis" value="₹99" note={service === "Wash & fold" ? "per kg" : "per item"} />
                <MatchDetail label="Available pickup" value={recommendedPartner?.slot ?? "To confirm"} note={recommendedPartner?.availability === "Tomorrow" ? "next available" : "today when available"} />
                <MatchDetail label="Care route" value={service} note="eligible for this request" />
              </div>

              <div className="relative mt-6 flex flex-col gap-3 border-t border-white/12 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex max-w-sm items-start gap-2 font-body text-xs leading-relaxed text-white/64"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />One suitable partner, a visible price basis, and a clear next action.</p>
                <Button href="/#early-access" variant="secondary" className="shrink-0 bg-white">Book a pickup</Button>
              </div>
            </div>
          </div>

          <ol className="mt-5 grid gap-3 sm:grid-cols-3 lg:hidden">
            {CHECKS.map(({ title, copy, icon: Icon }, index) => (
              <li key={title} className="relative rounded-lg bg-bg-app p-4 ring-1 ring-hairline">
                <span className="flex size-8 items-center justify-center rounded-full bg-lavender-soft text-violet"><Icon className="size-4" aria-hidden="true" /></span>
                <p className="mt-3 font-body text-sm font-semibold text-ink">{title}</p>
                <p className="mt-1 font-body text-xs leading-relaxed text-ink-soft">{copy}</p>
                <span className="absolute right-4 top-4 font-body text-[10px] font-semibold tracking-[0.12em] text-muted">0{index + 1}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function MatchDetail({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-lg bg-white/[0.08] p-3.5 ring-1 ring-white/10">
      <p className="font-body text-[10px] font-semibold uppercase tracking-[0.13em] text-white/48">{label}</p>
      <p className="mt-2 font-display text-base font-semibold text-white">{value}</p>
      <p className="mt-1 font-body text-xs text-white/56">{note}</p>
    </div>
  );
}
