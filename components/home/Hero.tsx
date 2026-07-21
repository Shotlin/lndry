"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowUpRight, BadgeCheck, CalendarCheck2, ChevronDown, Radio, Truck } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/motion/gsap";
import { motionTokens } from "@/lib/motion/tokens";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { Container } from "../ui/Container";
import { Pill } from "../ui/Pill";
import { Button } from "../ui/Button";
import { PhoneFrame } from "../ui/PhoneFrame";
import { Thread } from "../ui/Thread";
import { HeroThreadOverlay } from "../overlays/HeroThreadOverlay";
import { company } from "@/lib/data/site";

const AmbientRibbon = dynamic(() => import("../three/AmbientRibbon").then((m) => m.AmbientRibbon), {
  ssr: false,
});

export function Hero() {
  const scope = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!scope.current) return;

      if (reducedMotion) {
        gsap.set([".hero-eyebrow", ".hero-headline", ".hero-sub", ".hero-actions", ".hero-area", ".hero-visual"], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const split = new SplitText(".hero-headline", { type: "lines", linesClass: "overflow-hidden" });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.5, ease: motionTokens.easeSignature })
        .from(
          split.lines,
          { opacity: 0, yPercent: 110, duration: 0.8, ease: motionTokens.easeSignature, stagger: 0.09 },
          "-=0.25"
        )
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.6, ease: motionTokens.easeSignature }, "-=0.45")
        .from(
          ".hero-actions > *",
          { opacity: 0, y: 16, duration: 0.5, ease: motionTokens.easeSignature, stagger: 0.08 },
          "-=0.35"
        )
        .from(".hero-area", { opacity: 0, y: 16, duration: 0.5, ease: motionTokens.easeSignature }, "-=0.3")
        .from(
          ".hero-visual",
          { opacity: 0, scale: 0.94, duration: 0.9, ease: motionTokens.easeSignature },
          "-=0.7"
        )
        .from(".hero-scroll-cue", { opacity: 0, duration: 0.5 }, "-=0.2");

      // gentle scroll-tied parallax on the hero visual
      gsap.to(".hero-visual", {
        yPercent: -8,
        scale: 1.03,
        ease: motionTokens.easeScrub,
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-phone-primary", { y: -12, duration: 2.8, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".hero-phone-review", { y: 10, duration: 3.3, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 0.25 });
      gsap.to(".hero-trust-beacon", { scale: 1.45, opacity: 0.3, duration: 1.4, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".hero-trust-card", {
        y: -10,
        rotation: 0.35,
        boxShadow: "0 18px 40px rgba(66,55,145,0.16)",
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.35,
      });
      gsap.to(".hero-route-bead", { xPercent: 260, duration: 2.4, ease: "power1.inOut", repeat: -1, repeatDelay: 0.8 });

      return () => {
        split.revert();
      };
    },
    { scope, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={scope}
      id="act-discover"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#ffffff_0%,#f4f3fb_62%,#eae8ff_100%)]"
    >
      <Thread className="pointer-events-none absolute -left-10 top-0 h-[640px] w-48" opacity={0.1} />
      <HeroThreadOverlay className="pointer-events-none absolute inset-x-0 top-0 h-full w-full opacity-[0.08]" />

      <Container className="relative flex flex-col gap-10 pb-16 pt-10 sm:pt-14 md:gap-14 md:pb-24 md:pt-24 lg:flex-row lg:items-center lg:gap-10">
        <div className="relative z-10 max-w-xl">
          <div className="hero-eyebrow">
            <Pill tone="violet">{company.tagline}</Pill>
          </div>

          <h1 className="hero-headline mt-5 max-w-[12ch] font-display text-hero text-ink sm:mt-6">
            India&apos;s first garment-care marketplace.
          </h1>

          <p className="hero-sub mt-5 max-w-[38rem] font-body text-body-lg text-ink-soft sm:mt-6">
            Book verified laundry partners near you with doorstep pickup, live order tracking, and
            transparent pricing.
          </p>

          <div className="hero-actions mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button href="/#early-access" className="w-full sm:w-auto">Book pickup</Button>
            <Button href="/services" variant="secondary">
              View laundry services
            </Button>
          </div>

          <div className="hero-area hero-trust-card mt-7 max-w-xl rounded-lg border border-hairline bg-white p-4 shadow-soft will-change-transform sm:mt-8 sm:p-5">
            <div className="flex items-start justify-between gap-3 border-b border-hairline pb-3">
              <div>
                <p className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-violet">Pune care network</p>
                <p className="mt-1 font-display text-base font-semibold text-ink">A clearer route starts here.</p>
              </div>
              <span className="relative inline-flex shrink-0 items-center gap-1.5 rounded-full bg-teal-tint px-2.5 py-1.5 font-body text-[10px] font-bold text-teal">
                <span className="relative flex size-2"><span className="hero-trust-beacon absolute inset-0 rounded-full bg-teal" /><span className="relative size-2 rounded-full bg-teal" /></span>
                Live
              </span>
            </div>
            <div className="grid gap-2.5 py-3 sm:grid-cols-3 sm:gap-3">
              <div className="flex items-center gap-2 sm:block">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-lavender-soft text-violet sm:mb-2"><BadgeCheck className="size-4" aria-hidden="true" /></span>
                <span className="font-body text-xs font-semibold leading-snug text-ink-soft">Verified partners</span>
              </div>
              <div className="flex items-center gap-2 sm:block">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-tint text-teal sm:mb-2"><Truck className="size-4" aria-hidden="true" /></span>
                <span className="font-body text-xs font-semibold leading-snug text-ink-soft">Doorstep handover</span>
              </div>
              <div className="flex items-center gap-2 sm:block">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-lavender-soft text-violet sm:mb-2"><CalendarCheck2 className="size-4" aria-hidden="true" /></span>
                <span className="font-body text-xs font-semibold leading-snug text-ink-soft">Live order route</span>
              </div>
            </div>
            <div className="relative flex items-center justify-between gap-2 border-t border-hairline py-3">
              <span className="font-body text-[10px] font-semibold text-ink-soft">Your care route</span>
              <div className="flex flex-1 items-center justify-end gap-1.5" aria-label="Booking route: choose, care, return">
                <span className="flex size-6 items-center justify-center rounded-full bg-violet text-[9px] font-bold text-white">1</span>
                <span className="relative h-px w-8 overflow-hidden bg-lavender-electric/45 sm:w-12"><span className="hero-route-bead absolute left-0 top-[-2px] size-1.5 rounded-full bg-teal" /></span>
                <span className="flex size-6 items-center justify-center rounded-full bg-lavender-soft text-[9px] font-bold text-violet">2</span>
                <span className="h-px w-8 bg-lavender-electric/45 sm:w-12" />
                <span className="flex size-6 items-center justify-center rounded-full bg-teal text-[9px] font-bold text-ink">3</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-hairline pt-3">
              <p className="font-body text-xs text-muted"><span className="font-semibold text-ink-soft">Serving</span> Baner · Wakad · Hinjewadi · Kharadi · Viman Nagar</p>
              <ArrowUpRight className="size-4 shrink-0 text-violet" aria-hidden="true" />
            </div>
          </div>
          <div className="hero-area hidden">
            <div className="grid gap-2 font-body text-sm font-semibold text-ink-soft sm:flex sm:flex-wrap sm:gap-x-4">
              <span>✓ Verified Laundry Partners</span><span>✓ Doorstep Pickup &amp; Delivery</span><span>✓ Live Order Tracking</span>
            </div>
            <p className="mt-3 font-body text-sm text-muted sm:mt-4">Serving: Baner · Wakad · Hinjewadi · Kharadi · Viman Nagar</p>
          </div>
        </div>

        <div className="hero-visual relative z-0 mx-auto w-full max-w-md lg:mx-0 lg:max-w-none lg:flex-1">
          <div className="absolute -right-10 -top-14 h-56 w-56 rounded-full bg-lavender-soft/70 blur-[2px]" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 hidden md:block">
            <AmbientRibbon reducedMotion={reducedMotion} />
          </div>

          <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-xl shadow-elevated sm:aspect-[16/10] lg:aspect-[4/3]">
            <Image
              src="/brand/website-story/website-home-hero-indian-handoff-v1.png"
              alt="An LNDRY delivery partner handing a labeled garment bag to a couple at their doorstep"
              fill
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="relative -mt-12 flex justify-end gap-3 pr-3 sm:-mt-20 sm:gap-6 sm:pr-4">
            <div className="absolute bottom-0 right-3 h-28 w-52 rounded-full bg-violet/20 blur-2xl sm:right-8 sm:h-40 sm:w-64" aria-hidden="true" />
            <div className="hero-phone-primary relative w-24 rotate-[-4deg] sm:w-36">
              <PhoneFrame
                src="/brand/mockups/location-serviceability-v1.png"
                alt="Set your pickup location screen"
                label="Customer booking"
                priority
              />
            </div>
            <div className="hero-phone-review relative mt-6 w-20 rotate-[4deg] sm:mt-10 sm:w-32">
              <PhoneFrame
                src="/brand/mockups/review-order-v1.png"
                alt="Review order screen"
                label="Order review"
              />
            </div>
          </div>
        </div>
      </Container>

      <div className="hero-scroll-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-ink-soft md:flex">
        <span className="font-body text-xs font-medium">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </div>
    </section>
  );
}
