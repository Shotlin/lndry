"use client";

import { useRef, type PointerEvent } from "react";
import { Check, Clock3, MapPin, PackageCheck, Search, Star, Trophy, Truck } from "lucide-react";
import { useScrollReveal } from "@/lib/motion/useScrollReveal";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { Pill } from "../ui/Pill";
import { Button } from "../ui/Button";

const RECOMMENDATION_STEPS = [
  { label: "Enter your address", icon: MapPin },
  { label: "We check nearby verified partners", icon: Search },
  { label: "Compare ratings, capacity & delivery time", icon: Star },
  { label: "Best partner recommended", icon: Trophy },
  { label: "Pickup confirmed", icon: PackageCheck },
];

const WHY_THIS_PARTNER = ["Highest rating nearby", "Available pickup slot", "Fastest delivery", "Specialist for dry cleaning"];

export function MarketplaceCompare() {
  const scope = useScrollReveal<HTMLElement>({ selector: ".recommend-reveal", y: 28 });
  const spotlightRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const el = spotlightRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  return (
    <section id="recommended-partner" ref={scope} className="relative overflow-hidden bg-ink py-16 sm:py-20 md:py-24">
      <div
        ref={spotlightRef}
        onPointerMove={handlePointerMove}
        className="absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100"
        style={{ background: "radial-gradient(440px circle at var(--x, 50%) var(--y, 50%), rgba(130,109,247,0.22), transparent 70%)" }}
      />
      <Container className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="recommend-reveal">
          <SectionEyebrow tone="onDark">Recommended partner flow</SectionEyebrow>
          <h2 className="mt-3 max-w-xl font-display text-headline text-white">We find the best laundry for you — automatically.</h2>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-white/70">
            You don&apos;t need to compare dozens of laundries. LNDRY recommends the most suitable verified partner based on your location, service type, availability, ratings, and delivery commitment.
          </p>
          <ol className="mt-7 grid gap-3">
            {RECOMMENDATION_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.label} className="flex items-center gap-3 font-body text-sm font-medium text-white/85">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-teal"><Icon className="size-4" aria-hidden="true" /></span>
                  <span>{step.label}</span>
                  {index < RECOMMENDATION_STEPS.length - 1 ? <span className="ml-auto text-white/25" aria-hidden="true">↓</span> : null}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="recommend-reveal mx-auto w-full max-w-xl rounded-xl bg-white p-5 shadow-elevated sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-violet">Recommended partner</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-ink">Luxe Fabric Care</h3>
            </div>
            <Pill tone="teal">Verified by LNDRY</Pill>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg bg-bg-app p-3"><Star className="size-4 text-warning" fill="currentColor" /><p className="mt-2 font-display text-sm font-semibold text-ink">4.9 rating</p></div>
            <div className="rounded-lg bg-bg-app p-3"><MapPin className="size-4 text-violet" /><p className="mt-2 font-display text-sm font-semibold text-ink">1.8 km away</p></div>
            <div className="rounded-lg bg-bg-app p-3"><Truck className="size-4 text-teal" /><p className="mt-2 font-display text-sm font-semibold text-ink">Pickup today</p></div>
            <div className="rounded-lg bg-bg-app p-3"><Clock3 className="size-4 text-violet" /><p className="mt-2 font-display text-sm font-semibold text-ink">24 hr delivery</p></div>
          </div>
          <div className="mt-5 rounded-lg border border-hairline bg-surface-cool p-4">
            <p className="font-display text-base font-semibold text-ink">Why this partner?</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {WHY_THIS_PARTNER.map((reason) => <li key={reason} className="flex gap-2 font-body text-sm text-ink-soft"><Check className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />{reason}</li>)}
            </ul>
          </div>
          <Button href="/#early-access" className="mt-6 w-full sm:w-auto">Book pickup</Button>
        </div>
      </Container>
    </section>
  );
}
