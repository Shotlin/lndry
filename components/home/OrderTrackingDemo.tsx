"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Check, Clock3, MapPin, PackageCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { PhoneFrame } from "../ui/PhoneFrame";
import { Button } from "../ui/Button";

const CARE_STATES = [
  {
    title: "Pickup complete",
    detail: "Your garments are checked in with the selected partner.",
    icon: PackageCheck,
    pulseClass: "bg-teal/25",
    iconClass: "text-teal",
  },
  {
    title: "Cleaning now",
    detail: "The current care stage is visible the moment your partner updates it.",
    icon: Sparkles,
    pulseClass: "bg-violet/25",
    iconClass: "text-[#c4baff]",
  },
  {
    title: "OTP handover",
    detail: "Delivery closes with a secure confirmation at your door.",
    icon: ShieldCheck,
    pulseClass: "bg-teal/25",
    iconClass: "text-teal",
  },
];

export function OrderTrackingDemo() {
  const scope = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!scope.current) return;

      if (reducedMotion) {
        gsap.set(".tracking-reveal", { autoAlpha: 1, y: 0 });
        gsap.set(".tracking-pulse", { scale: 1, opacity: 1 });
        return;
      }

      gsap.from(".tracking-reveal", {
        autoAlpha: 0,
        y: 28,
        duration: 0.72,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: scope.current,
          start: "top 76%",
        },
      });

      gsap.to(".tracking-pulse", {
        scale: 1.17,
        opacity: 0.35,
        duration: 1.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.16,
      });

      gsap.to(".tracking-orbit", {
        y: -8,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      });
    },
    { scope, dependencies: [reducedMotion] },
  );

  return (
    <section id="order-tracking" ref={scope} className="relative overflow-hidden bg-[#081018] py-16 sm:py-20 md:py-24">
      <div className="pointer-events-none absolute -left-28 top-28 size-72 rounded-full bg-violet/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 size-64 rounded-full bg-teal/12 blur-3xl" />

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div className="tracking-reveal max-w-xl">
            <SectionEyebrow tone="onDark">Live order tracking</SectionEyebrow>
            <h2 className="mt-3 font-display text-headline text-white">Your garments stay visible after pickup.</h2>
            <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-white/70">
              LNDRY turns the care process into a calm order story, from partner check-in to secure delivery at your door.
            </p>
          </div>
          <div className="tracking-reveal flex flex-wrap gap-2 lg:justify-end">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 font-body text-xs font-semibold text-white/90"><MapPin className="size-3.5 text-teal" aria-hidden="true" />Partner confirmed</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 font-body text-xs font-semibold text-white/90"><Clock3 className="size-3.5 text-violet-300" aria-hidden="true" />Care ETA visible</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 font-body text-xs font-semibold text-white/90"><ShieldCheck className="size-3.5 text-teal" aria-hidden="true" />OTP handover</span>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.7fr_0.78fr_1.02fr] lg:items-center">
          <div className="tracking-reveal order-2 lg:order-1">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-[#c4baff]">One order, three clear moments</p>
            <div className="relative mt-5 grid gap-5 before:absolute before:bottom-5 before:left-5 before:top-5 before:w-px before:bg-gradient-to-b before:from-teal before:via-violet before:to-teal">
              {CARE_STATES.map((state) => {
                const Icon = state.icon;
                return (
                  <article key={state.title} className="tracking-reveal relative flex gap-4 pl-1">
                    <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-[#111c29] ring-1 ring-white/15">
                      <span className={`tracking-pulse absolute size-8 rounded-full ${state.pulseClass}`} aria-hidden="true" />
                      <Icon className={`relative size-4 ${state.iconClass}`} aria-hidden="true" />
                    </div>
                    <div className="pt-0.5">
                      <h3 className="font-display text-base font-semibold text-white">{state.title}</h3>
                      <p className="mt-1 max-w-xs font-body text-sm leading-relaxed text-white/60">{state.detail}</p>
                    </div>
                  </article>
                );
              })}
            </div>
            <Button href="/#early-access" className="mt-7 w-full sm:w-auto">Book pickup</Button>
          </div>

          <div className="tracking-reveal order-1 relative mx-auto w-full max-w-[17rem] lg:order-2 lg:max-w-none">
            <div className="tracking-orbit pointer-events-none absolute -left-5 top-14 hidden rounded-full bg-teal px-3 py-2 font-body text-xs font-semibold text-ink shadow-[0_4px_8px_rgba(15,181,166,0.32)] sm:block">Partner updated</div>
            <div className="tracking-orbit pointer-events-none absolute -right-6 bottom-24 hidden rounded-full bg-lavender-soft px-3 py-2 font-body text-xs font-semibold text-violet-deep shadow-[0_4px_8px_rgba(102,76,240,0.24)] sm:block">Quality check next</div>
            <PhoneFrame src="/brand/mockups/track-order-v1.png" alt="LNDRY app showing an order currently being cleaned" label="Customer order tracking" className="mx-auto w-48 sm:w-56" priority />
          </div>

          <div className="tracking-reveal order-3 overflow-hidden rounded-xl bg-white p-5 text-ink shadow-[0_8px_8px_rgba(2,6,15,0.25)] sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-violet">Order LN-4827</p>
                <h3 className="mt-2 font-display text-2xl font-semibold">Care is in progress</h3>
              </div>
              <div className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-teal-tint text-teal">
                <span className="tracking-pulse absolute size-10 rounded-full bg-teal/20" aria-hidden="true" />
                <Sparkles className="relative size-5" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-6 overflow-hidden rounded-lg bg-[#edfafa] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-teal">Now</p>
                  <p className="mt-1 font-display text-lg font-semibold">Washing your order</p>
                </div>
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-teal text-white"><Check className="size-4" aria-hidden="true" /></span>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-teal/15"><span className="block h-full w-2/3 rounded-full bg-gradient-to-r from-teal to-violet" /></div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-bg-app p-4"><p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-muted">Next</p><p className="mt-2 font-display text-base font-semibold">Quality check</p><p className="mt-1 font-body text-sm text-ink-soft">Partner confirms care.</p></div>
              <div className="rounded-lg bg-bg-app p-4"><p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-muted">Delivery</p><p className="mt-2 font-display text-base font-semibold">Tomorrow, 7 PM</p><p className="mt-1 font-body text-sm text-ink-soft">OTP handover ready.</p></div>
            </div>
            <div className="mt-4 flex items-center gap-2 font-body text-sm font-medium text-ink-soft"><Truck className="size-4 text-violet" aria-hidden="true" />Updates arrive where you already check your order.</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
