"use client";

import { useRef } from "react";
import Image from "next/image";
import { CalendarClock, CreditCard, PackageCheck, ScanSearch, ShieldCheck, Shirt } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { motionTokens } from "@/lib/motion/tokens";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { Container } from "../ui/Container";

const STEPS = [
  {
    label: "Service",
    title: "Choose the care your garments need",
    desc: "Choose from everyday laundry, dry cleaning, steam press, bedding, shoes, and specialist garment care.",
    visual: "service",
    proof: "Care route selected",
    icon: Shirt,
  },
  {
    label: "Garments",
    title: "Build the basket with visible pricing",
    desc: "Add the items you want cleaned. The price basis stays visible before your pickup is confirmed.",
    visual: "garments",
    proof: "Visible estimate",
    icon: PackageCheck,
  },
  {
    label: "Slot",
    title: "Pick a pickup window that feels real",
    desc: "Select a 60-minute pickup window that fits your day and keeps the handover clear.",
    visual: "slot",
    proof: "60-minute pickup slot",
    icon: CalendarClock,
  },
  {
    label: "Payment",
    title: "Confirm the order with a clean payment state",
    desc: "Review your address, pickup window, and estimate before you confirm the order.",
    visual: "payment",
    proof: "Order reviewed",
    icon: CreditCard,
  },
  {
    label: "Status",
    title: "Follow the order without calling support",
    desc: "Follow the order through pickup, care, quality check, and delivery without needing to call around.",
    visual: "status",
    proof: "Care updates",
    icon: ScanSearch,
  },
  {
    label: "OTP",
    title: "Close the loop with secure handover",
    desc: "Pickup and delivery handovers are confirmed with OTP, so the final moment stays clear and secure.",
    visual: "otp",
    proof: "Verified handover",
    icon: ShieldCheck,
  },
];

const SERVICES = [
  { label: "Wash & fold", src: "/brand/illustrations/service-wash-fold-v1.png" },
  { label: "Dry clean", src: "/brand/illustrations/service-dry-cleaning-v1.png" },
  { label: "Steam press", src: "/brand/illustrations/service-steam-press-v1.png" },
];

const GARMENTS = [
  { label: "Shirts", qty: "1", price: "₹99" },
  { label: "Trousers", qty: "1", price: "₹99" },
  { label: "Bedsheet", qty: "1", price: "₹99" },
];

const STATUS = ["Pickup", "Processing", "Quality check", "Delivery"];

function StepVisual({ type }: { type: string }) {
  if (type === "service") {
    return (
      <div className="grid gap-3 sm:grid-cols-3">
        {SERVICES.map((service, index) => (
          <div
            key={service.label}
            className={`rounded-md border bg-white p-4 shadow-soft ${
              index === 0 ? "border-violet" : "border-hairline"
            }`}
          >
            <div className="relative mx-auto h-24 w-24">
              <Image src={service.src} alt="" fill sizes="96px" className="object-contain" />
            </div>
            <p className="mt-3 text-center font-body text-sm font-semibold text-ink">{service.label}</p>
          </div>
        ))}
      </div>
    );
  }

  if (type === "garments") {
    return (
      <div className="rounded-lg border border-hairline bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <p className="font-display text-base font-semibold text-ink">Garment basket</p>
          <span className="rounded-full bg-teal-tint px-3 py-1 font-body text-xs font-semibold text-teal">
            Priced
          </span>
        </div>
        <div className="mt-4 space-y-2">
          {GARMENTS.map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-sm bg-surface-cool px-4 py-3">
              <div>
                <p className="font-body text-sm font-semibold text-ink">{item.label}</p>
                <p className="font-body text-xs text-ink-soft">Quantity {item.qty}</p>
              </div>
              <p className="font-display text-base font-bold text-violet">{item.price}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between rounded-md bg-lavender-soft px-4 py-3">
          <span className="font-body text-sm font-semibold text-ink">Estimated total</span>
          <span className="font-display text-xl font-bold text-violet">₹297</span>
        </div>
      </div>
    );
  }

  if (type === "slot") {
    return (
      <div className="rounded-lg border border-hairline bg-white p-5 shadow-soft">
        <p className="font-display text-base font-semibold text-ink">Available pickup windows</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {["10:00", "12:00", "18:00"].map((time, index) => (
            <div
              key={time}
              className={`rounded-md border p-4 text-center ${
                index === 1 ? "border-violet bg-lavender-soft" : "border-hairline bg-white"
              }`}
            >
              <p className="font-display text-xl font-bold text-ink">{time}</p>
              <p className="mt-1 font-body text-xs text-ink-soft">60 min slot</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-md bg-ink px-4 py-3 text-white">
              <p className="font-body text-xs text-white/60">Selected pickup</p>
          <p className="font-display text-base font-semibold">Today, 12:00 to 1:00 PM</p>
        </div>
      </div>
    );
  }

  if (type === "payment") {
    return (
      <div className="overflow-hidden rounded-lg border border-hairline bg-white shadow-soft">
        <div className="bg-violet-deep p-5 text-white">
          <p className="font-body text-xs text-white/65">Review and pay</p>
          <p className="mt-1 font-display text-3xl font-bold">₹297</p>
        </div>
        <div className="space-y-3 p-5">
          {["Order summary checked", "Pickup address confirmed", "Estimate ready to review"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-sm bg-surface-cool px-4 py-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal text-xs font-bold text-white">
                ✓
              </span>
              <span className="font-body text-sm font-semibold text-ink">{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "status") {
    return (
      <div className="rounded-lg border border-hairline bg-white p-5 shadow-soft">
        <p className="font-display text-base font-semibold text-ink">Order status</p>
        <div className="mt-5 space-y-4">
          {STATUS.map((item, index) => (
            <div key={item} className="flex items-center gap-4">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full font-body text-xs font-bold ${
                  index < 3 ? "bg-violet text-white" : "bg-lavender-soft text-violet"
                }`}
              >
                {index < 2 ? "✓" : index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-body text-sm font-semibold text-ink">{item}</p>
                  <p className="font-body text-xs text-ink-soft">{index < 2 ? "Done" : "Next"}</p>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-lavender-soft">
                  <div className={`h-full rounded-full bg-violet ${index < 3 ? "w-full" : "w-1/3"}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 rounded-lg border border-hairline bg-white p-5 shadow-soft sm:grid-cols-[0.9fr_1.1fr] sm:items-center">
      <div className="relative aspect-square overflow-hidden rounded-md bg-lavender-soft">
        <Image
          src="/brand/website-finishing/overlays/otp-verified-handoff-card.svg"
          alt=""
          fill
          sizes="220px"
          className="object-contain p-4"
        />
      </div>
      <div>
        <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-violet">Delivery OTP</p>
        <p className="mt-3 font-display text-4xl font-bold tracking-[0.16em] text-ink">4821</p>
        <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
          Your delivery handover is completed after the code is confirmed.
        </p>
      </div>
    </div>
  );
}

export function StepThrough() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const visualRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const fillRef = useRef<HTMLDivElement>(null);
  const activeIndex = useRef(0);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set(panelRefs.current.slice(1), { autoAlpha: 0, y: 18 });
        gsap.set(visualRefs.current.slice(1), { autoAlpha: 0, y: 24, scale: 0.97 });
        gsap.set(panelRefs.current[0], { autoAlpha: 1, y: 0 });
        gsap.set(visualRefs.current[0], { autoAlpha: 1, y: 0, scale: 1 });

        const setActive = (idx: number) => {
          if (idx === activeIndex.current) return;
          const prev = activeIndex.current;

          gsap.to(panelRefs.current[prev], {
            autoAlpha: 0,
            y: -18,
            duration: 0.28,
            ease: motionTokens.easeSignature,
          });
          gsap.to(visualRefs.current[prev], {
            autoAlpha: 0,
            y: -20,
            scale: 0.98,
            duration: 0.28,
            ease: motionTokens.easeSignature,
          });
          gsap.to(panelRefs.current[idx], {
            autoAlpha: 1,
            y: 0,
            duration: 0.34,
            ease: motionTokens.easeSignature,
          });
          gsap.to(visualRefs.current[idx], {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.34,
            ease: motionTokens.easeSignature,
          });

          dotRefs.current.forEach((dot, i) => {
            if (!dot) return;
            dot.dataset.active = i <= idx ? "true" : "false";
          });

          activeIndex.current = idx;
        };

        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=420%",
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            const idx = Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length));
            setActive(idx);
            if (fillRef.current) fillRef.current.style.height = `${self.progress * 100}%`;
          },
        });

        return () => trigger.kill();
      });

      mm.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".mobile-step-reveal");
        const animations = cards.map((card) =>
          gsap.from(card, {
            autoAlpha: 0,
            y: 22,
            duration: 0.62,
            ease: motionTokens.easeSignature,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "bottom 42%",
              toggleActions: "play reverse play reverse",
            },
          })
        );

        return () => animations.forEach((animation) => animation.kill());
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-bg-app py-16 md:flex md:min-h-screen md:flex-col md:justify-center">
      <Container>
        <div id="booking-story" className="scroll-mt-24 md:hidden">
          <div className="mb-8">
            <p className="font-body text-sm font-semibold text-violet">Six-step booking story</p>
            <h2 className="mt-2 font-display text-headline text-ink">See the booking story, one clear step at a time.</h2>
          </div>
          <div className="grid gap-5">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.label} className="mobile-step-reveal relative rounded-lg border border-hairline bg-white p-5 shadow-soft">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lavender-soft text-violet ring-1 ring-violet/10"><Icon className="size-4.5" aria-hidden="true" strokeWidth={1.9} /></span>
                    <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-violet">Step {index + 1}, {step.label}</p>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{step.desc}</p>
                  <div className="mt-5">
                    <StepVisual type={step.visual} />
                  </div>
                  {index < STEPS.length - 1 ? <span className="pointer-events-none absolute -bottom-5 left-[2.4rem] h-5 w-px bg-[linear-gradient(#664cf0_0%,rgba(102,76,240,0.18)_100%)]" aria-hidden="true" /> : null}
                </article>
              );
            })}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-[0.22fr_0.9fr_1.1fr] md:items-center md:gap-10 lg:gap-14">
          <div className="relative mx-auto h-[32rem] w-12">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-hairline" />
            <div ref={fillRef} className="absolute left-1/2 top-0 h-0 w-px -translate-x-1/2 bg-violet" />
            <div className="relative flex h-full flex-col justify-between">
              {STEPS.map((step, index) => (
                <span
                  key={step.label}
                  ref={(el) => {
                    dotRefs.current[index] = el;
                  }}
                  data-active={index === 0 ? "true" : "false"}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-hairline bg-white font-display text-sm font-bold text-ink-soft shadow-soft transition-colors data-[active=true]:border-violet data-[active=true]:bg-violet data-[active=true]:text-white"
                >
                  {index + 1}
                </span>
              ))}
            </div>
          </div>

          <div className="relative h-[32rem]">
            {STEPS.map((step, index) => (
              <div
                key={step.label}
                ref={(el) => {
                  panelRefs.current[index] = el;
                }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <p className="font-body text-sm font-semibold text-violet">{step.proof}</p>
                <h2 className="mt-3 max-w-xl font-display text-headline text-ink">{step.title}</h2>
                <p className="mt-5 max-w-lg font-body text-base leading-relaxed text-ink-soft">{step.desc}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-4 py-2 font-body text-xs font-semibold text-ink shadow-soft">
                    Step {index + 1}
                  </span>
                  <span className="rounded-full bg-teal-tint px-4 py-2 font-body text-xs font-semibold text-teal">
                    {step.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="relative h-[32rem] rounded-xl border border-hairline bg-white/72 p-5 shadow-elevated">
            <div className="absolute inset-x-6 top-6 flex items-center justify-between rounded-full bg-white px-4 py-3 shadow-soft">
              <span className="font-display text-sm font-semibold text-ink">LNDRY booking console</span>
              <span className="h-2.5 w-2.5 rounded-full bg-teal" />
            </div>
            <div className="relative h-full pt-20">
              {STEPS.map((step, index) => (
                <div
                  key={step.label}
                  ref={(el) => {
                    visualRefs.current[index] = el;
                  }}
                  className="absolute inset-x-0 top-20"
                >
                  <StepVisual type={step.visual} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
