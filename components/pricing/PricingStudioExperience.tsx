"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { BadgeCheck, CalendarClock, CheckCircle2, Clock3, Sparkles } from "lucide-react";
import { gsap } from "@/lib/motion/gsap";
import { motionTokens } from "@/lib/motion/tokens";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { SERVICES, type ServiceEntry } from "@/lib/data/services";
import { Button } from "@/components/ui/Button";

const CARE_GROUPS = [
  { id: "popular", label: "Everyday care", caption: "6 routes", services: SERVICES.filter((service) => service.tag.label === "Popular") },
  { id: "specialist", label: "Specialist care", caption: "5 routes", services: SERVICES.filter((service) => service.tag.label === "Specialist") },
] as const;

export function PricingStudioExperience() {
  const scope = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.fromTo(
        ".pricing-studio-card",
        { autoAlpha: 0, y: 28, rotate: 1.5 },
        { autoAlpha: 1, y: 0, rotate: 0, duration: 0.78, ease: motionTokens.easeSignature, delay: 0.12 }
      );
      gsap.to(".pricing-studio-orb", { y: -12, x: 8, scale: 1.08, duration: 3.4, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".pricing-studio-scan", { xPercent: 220, duration: 3.1, ease: "power1.inOut", repeat: -1, repeatDelay: 1.1 });
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <div ref={scope} className="relative mx-auto w-full max-w-md">
      <div className="pricing-studio-orb pointer-events-none absolute -right-8 top-10 size-44 rounded-full bg-teal/25 blur-3xl" />
      <div className="pricing-studio-card relative overflow-hidden rounded-[1.65rem] border border-white/20 bg-white p-2.5 shadow-[0_18px_46px_rgba(0,0,0,0.34)]">
        <div className="relative overflow-hidden rounded-[1.15rem] bg-ink">
          <div className="relative h-52 sm:h-60">
            <Image
              src="/brand/illustrations/luxe-fabric-care-studio-v1.png"
              alt="Luxe Fabric Care garment-care studio, recommended by LNDRY"
              fill
              priority
              sizes="(min-width: 1024px) 440px, 88vw"
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b13]/78 via-transparent to-transparent" />
            <div className="pricing-studio-scan pointer-events-none absolute -left-1/2 inset-y-0 w-20 -skew-x-12 bg-white/20 blur-xl" />
            <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#07101a]/76 px-3 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-white/92 backdrop-blur-md">
              <BadgeCheck className="size-3.5 text-teal" aria-hidden="true" />
              Verified by LNDRY
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
              <div><p className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-teal">Recommended studio</p><p className="mt-1 font-display text-xl font-semibold">Luxe Fabric Care</p></div>
              <span className="rounded-full bg-white/12 px-2.5 py-1.5 font-body text-[10px] font-semibold backdrop-blur">Pickup ready</span>
            </div>
          </div>

          <div className="relative bg-[linear-gradient(145deg,#ffffff_0%,#f3f1ff_100%)] p-5 text-ink sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div><p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-violet">Your care estimate</p><h2 className="mt-2 font-display text-xl font-semibold">The important price signals, before pickup.</h2></div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-tint text-teal"><CheckCircle2 className="size-5" aria-hidden="true" /></span>
            </div>
            <div className="mt-5 grid gap-2.5">
              <EstimateLine label="Wash & fold" value="₹99 / kg" />
              <EstimateLine label="Dry cleaning" value="₹99 / item" />
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-ink px-4 py-3 font-body text-xs text-white/74"><CalendarClock className="size-4 text-teal" aria-hidden="true" />Final estimate and pickup window confirmed before payment.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PricingCatalogExperience() {
  const scope = useRef<HTMLDivElement>(null);
  const [activeGroup, setActiveGroup] = useState<(typeof CARE_GROUPS)[number]["id"]>("popular");
  const reducedMotion = useReducedMotion();
  const active = CARE_GROUPS.find((group) => group.id === activeGroup) ?? CARE_GROUPS[0];

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.fromTo(
        ".pricing-service-card",
        { autoAlpha: 0, y: 20, scale: 0.985 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.48, ease: motionTokens.easeSignature, stagger: 0.055, clearProps: "transform" }
      );
    },
    { scope, dependencies: [activeGroup, reducedMotion], revertOnUpdate: true }
  );

  return (
    <div id="pricing-catalog" ref={scope} className="scroll-mt-24">
      <div className="flex flex-col gap-5 border-b border-hairline pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl"><p className="font-body text-label font-semibold text-violet">Care price catalog</p><h2 className="mt-3 font-display text-headline text-ink">Choose the care route. See the starting basis instantly.</h2></div>
        <p className="max-w-lg font-body text-sm leading-relaxed text-ink-soft">The chosen partner confirms the final estimate from garment details, item count, pickup area, and available care capacity.</p>
      </div>

      <div className="mt-7 flex flex-col gap-4 rounded-xl bg-white p-3 ring-1 ring-hairline sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <div role="tablist" aria-label="Price catalog groups" className="grid gap-2 sm:flex">
          {CARE_GROUPS.map((group) => (
            <button
              key={group.id}
              type="button"
              role="tab"
              aria-selected={activeGroup === group.id}
              onClick={() => setActiveGroup(group.id)}
              className={`flex min-h-12 items-center justify-between gap-5 rounded-lg px-4 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-violet focus-visible:outline-offset-2 sm:min-w-48 ${activeGroup === group.id ? "bg-ink text-white shadow-[0_8px_16px_rgba(8,15,20,0.18)]" : "bg-bg-app text-ink hover:bg-lavender-soft"}`}
            >
              <span><span className="block font-display text-sm font-semibold">{group.label}</span><span className={`mt-0.5 block font-body text-xs ${activeGroup === group.id ? "text-white/58" : "text-ink-soft"}`}>{group.caption}</span></span>
              <span className={`flex size-7 items-center justify-center rounded-full font-body text-xs font-bold ${activeGroup === group.id ? "bg-violet text-white" : "bg-white text-violet ring-1 ring-hairline"}`}>{group.services.length}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 font-body text-xs font-semibold text-ink-soft"><Sparkles className="size-4 text-teal" aria-hidden="true" />Starting price visible on every route</div>
      </div>

      <div role="tabpanel" aria-live="polite" className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {active.services.map((service) => <PricingServiceCard key={service.title} service={service} />)}
      </div>

      <div className="mt-8 grid gap-4 rounded-xl bg-ink p-5 text-white sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
        <div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-teal"><Clock3 className="size-5" aria-hidden="true" /></span><p className="max-w-2xl font-body text-sm leading-relaxed text-white/72"><span className="font-semibold text-white">No surprise handover.</span> The final item count, price, and available pickup window are confirmed before booking.</p></div>
        <Button href="/marketplace" variant="secondary" className="shrink-0 bg-white">See recommendation flow</Button>
      </div>
    </div>
  );
}

function EstimateLine({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow-[0_3px_10px_rgba(51,42,112,0.06)]"><span className="font-body text-sm font-medium text-ink">{label}</span><span className="font-display text-sm font-semibold text-violet-deep">{value}</span></div>;
}

function PricingServiceCard({ service }: { service: ServiceEntry }) {
  return (
    <article className="pricing-service-card group relative min-h-80 overflow-hidden rounded-xl bg-ink p-4 text-white shadow-[0_8px_8px_rgba(66,55,145,0.16)]">
      <Image src={service.illustration} alt="" fill sizes="(min-width: 1280px) 360px, (min-width: 640px) 46vw, 92vw" className="pointer-events-none object-contain p-7 pb-32 transition-transform duration-700 ease-out group-hover:scale-110" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,20,0.08)_5%,rgba(8,15,20,0)_42%,rgba(8,15,20,0.92)_100%)]" />
      <div className="relative flex items-start justify-between gap-3"><span className="rounded-full bg-white/12 px-2.5 py-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur">{service.tag.label}</span><span className="rounded-full bg-teal px-3 py-1.5 font-body text-xs font-bold text-ink shadow-[0_4px_10px_rgba(15,181,166,0.26)]">{service.price?.replace("Starting ", "")}</span></div>
      <div className="absolute inset-x-4 bottom-4">
        <p className="font-display text-xl font-semibold">{service.title}</p>
        <p className="mt-1 font-body text-sm text-white/68">Best for {service.bestFor?.toLowerCase()}</p>
        <div className="mt-4 flex items-center justify-between border-t border-white/14 pt-3 font-body text-xs"><span className="text-white/62">Typical turnaround</span><span className="font-semibold text-teal">{service.delivery}</span></div>
      </div>
    </article>
  );
}
