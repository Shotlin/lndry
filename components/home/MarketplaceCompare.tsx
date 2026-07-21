"use client";

import Image from "next/image";
import { useRef, type PointerEvent } from "react";
import { ArrowRight, BadgeCheck, CalendarCheck, Check, Clock3, MapPin, ShieldCheck, Sparkles, Star } from "lucide-react";
import { useScrollReveal } from "@/lib/motion/useScrollReveal";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { Button } from "../ui/Button";

const MATCH_SIGNALS = [
  {
    title: "Your request",
    detail: "Location, service and preferred time",
    icon: MapPin,
  },
  {
    title: "Care fit checked",
    detail: "Verified coverage, capacity and delivery",
    icon: ShieldCheck,
  },
  {
    title: "One clear next step",
    detail: "A partner ready for your pickup",
    icon: Sparkles,
  },
];

const PARTNER_SIGNALS = [
  { label: "Verified", icon: BadgeCheck, tone: "text-teal" },
  { label: "Pickup today", icon: CalendarCheck, tone: "text-violet" },
  { label: "24 hr care cycle", icon: Clock3, tone: "text-teal" },
];

export function MarketplaceCompare() {
  const scope = useScrollReveal<HTMLElement>({ selector: ".recommend-reveal", y: 26, stagger: 0.12 });
  const spotlightRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const element = spotlightRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  return (
    <section id="recommended-partner" ref={scope} className="group relative overflow-hidden bg-ink py-16 sm:py-20 md:py-24">
      <div
        ref={spotlightRef}
        onPointerMove={handlePointerMove}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 sm:group-hover:opacity-100"
        style={{ background: "radial-gradient(520px circle at var(--x, 50%) var(--y, 50%), rgba(102,76,240,0.24), transparent 68%)" }}
      />
      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="recommend-reveal max-w-xl">
            <SectionEyebrow tone="onDark">Act three, recommend</SectionEyebrow>
            <h2 className="mt-3 font-display text-headline text-white">Tell us where you are. We&apos;ll recommend who can care for it.</h2>
            <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-white/70">
              LNDRY quietly checks the signals that matter, then gives you one confident partner and one clear booking action.
            </p>
          </div>

          <div className="recommend-reveal hidden items-center justify-end gap-3 lg:flex" aria-label="The LNDRY partner matching sequence">
            {MATCH_SIGNALS.map((signal, index) => {
              const Icon = signal.icon;
              return (
                <div key={signal.title} className="flex items-center gap-3">
                  <div className="max-w-[10.5rem] rounded-lg border border-white/10 bg-white/[0.055] px-4 py-3">
                    <Icon className="size-4 text-teal" aria-hidden="true" />
                    <p className="mt-2 font-display text-sm font-semibold text-white">{signal.title}</p>
                    <p className="mt-1 font-body text-xs leading-snug text-white/55">{signal.detail}</p>
                  </div>
                  {index < MATCH_SIGNALS.length - 1 ? <ArrowRight className="size-4 shrink-0 text-violet" aria-hidden="true" /> : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="recommend-reveal group relative mt-9 overflow-hidden rounded-xl border border-white/10 bg-[#111927] p-2 shadow-[0_28px_80px_rgba(0,0,0,0.32)] sm:p-3">
          <div className="relative overflow-hidden rounded-[0.7rem]">
            <Image
              src="/brand/illustrations/recommended-partner-route-v1.png"
              alt="An LNDRY route from a customer pickup location to a verified garment care partner"
              width={1536}
              height={1024}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1280px) 1180px, (min-width: 768px) 92vw, 100vw"
              priority={false}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0b111b]/85 via-[#0b111b]/15 to-transparent" />
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-[#0a111c]/75 px-3 py-2 backdrop-blur-md sm:left-6 sm:top-6">
              <span className="relative flex size-2.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-teal/60" /><span className="relative inline-flex size-2.5 rounded-full bg-teal" /></span>
              <span className="font-body text-xs font-semibold text-white">Matching your care route</span>
            </div>
          </div>

          <div className="relative mx-auto -mt-6 flex w-[calc(100%-1rem)] max-w-4xl flex-col overflow-hidden rounded-xl bg-surface shadow-[0_8px_8px_rgba(2,6,15,0.32)] sm:-mt-12 sm:w-[calc(100%-3rem)] lg:grid lg:h-[14.5rem] lg:grid-cols-2">
            <div className="order-2 flex min-h-[12.75rem] flex-col justify-between bg-[linear-gradient(145deg,#ffffff_0%,#f0efff_100%)] p-5 sm:min-h-[13.5rem] sm:p-6 lg:order-1 lg:min-h-0">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-violet/10 px-2.5 py-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-deep">
                  <Sparkles className="size-3" aria-hidden="true" />
                  Recommended for your pickup
                </div>
                <p className="mt-4 max-w-sm font-display text-subhead text-ink">A confident match, ready for your next pickup.</p>
                <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-ink-soft">Care expertise, nearby capacity and delivery commitment checked.</p>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-center gap-2 font-body text-sm font-semibold text-ink"><Star className="size-4 text-warning" fill="currentColor" aria-hidden="true" />4.9 customer rating</span>
                <Button href="/#early-access" className="w-full shrink-0 sm:w-auto">Book now</Button>
              </div>
            </div>
            <div className="order-1 min-h-[12.5rem] bg-[linear-gradient(135deg,#ffffff_0%,#e6e2ff_38%,#806cf5_68%,#efeefe_100%)] p-3 lg:order-2 lg:min-h-0">
              <div className="group/card relative min-h-[11rem] overflow-hidden rounded-lg bg-ink lg:min-h-0 lg:h-full">
                <Image
                  src="/brand/illustrations/luxe-fabric-care-studio-v1.png"
                  alt="Luxe Fabric Care garment care studio"
                  fill
                  className="object-cover object-center transition-transform duration-[1800ms] ease-out will-change-transform group-hover/card:scale-[1.045]"
                  sizes="(min-width: 1280px) 896px, (min-width: 640px) 82vw, calc(100vw - 2rem)"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-violet/25 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b13]/45 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
                  <p className="font-display text-xl font-semibold text-white sm:text-2xl">Luxe Fabric Care</p>
                  <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-[#07101a]/76 px-2.5 py-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur-md">
                    <BadgeCheck className="size-3 text-teal" aria-hidden="true" />
                    Verified by LNDRY
                  </span>
                </div>
                <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-[#07101a]/76 px-3 py-2 font-body text-xs font-semibold text-white backdrop-blur-md sm:right-5 sm:top-5">
                  <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-teal/70" /><span className="relative inline-flex size-2 rounded-full bg-teal" /></span>
                  Ready for pickup
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:hidden">
          {MATCH_SIGNALS.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <div key={signal.title} className="recommend-reveal relative rounded-lg border border-white/10 bg-white/[0.055] px-4 py-4">
                {index < MATCH_SIGNALS.length - 1 ? <span className="absolute -bottom-3 left-7 h-3 w-px bg-violet/70 sm:hidden" aria-hidden="true" /> : null}
                <Icon className="size-4 text-teal" aria-hidden="true" />
                <p className="mt-2 font-display text-sm font-semibold text-white">{signal.title}</p>
                <p className="mt-1 font-body text-xs leading-snug text-white/55">{signal.detail}</p>
              </div>
            );
          })}
        </div>

        <div className="recommend-reveal mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-white/70 sm:mt-6">
          {PARTNER_SIGNALS.map((signal) => {
            const Icon = signal.icon;
            return (
              <span key={signal.label} className="flex items-center gap-2 font-body text-sm font-medium">
                <Icon className={`size-4 ${signal.tone}`} aria-hidden="true" />
                {signal.label}
              </span>
            );
          })}
          <span className="flex items-center gap-2 font-body text-sm font-medium"><Star className="size-4 text-warning" fill="currentColor" aria-hidden="true" />4.9 customer rating</span>
          <span className="hidden items-center gap-2 font-body text-sm font-medium sm:flex"><Check className="size-4 text-teal" aria-hidden="true" />No marketplace browsing required</span>
        </div>
      </Container>
    </section>
  );
}
