"use client";

import { useRef } from "react";
import Image from "next/image";
import { CalendarCheck, MapPinCheck, Sparkles, Truck, WandSparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";

const BOOKING_STEPS = [
  { label: "Book pickup", desc: "Choose a convenient pickup slot.", icon: CalendarCheck, illustration: "/brand/illustrations/journey-pickup-v1.png" },
  { label: "Best partner matched", desc: "Area, service, capacity, and slot checked.", icon: MapPinCheck, illustration: "/brand/illustrations/journey-processing-v1.png" },
  { label: "Pickup confirmed", desc: "A partner collects your clothes.", icon: Truck, illustration: "/brand/illustrations/journey-delivery-v1.png" },
  { label: "Professional cleaning", desc: "Care updates as the work progresses.", icon: Sparkles, illustration: "/brand/illustrations/journey-processing-v1.png" },
  { label: "Delivered back to your door", desc: "OTP-verified handover when ready.", icon: WandSparkles, illustration: "/brand/illustrations/journey-quality-check-v1.png" },
];

const CARELINE_STAGES = [
  { label: "Pickup", desc: "60-minute slot", x: 120, y: 164, illustration: "/brand/illustrations/journey-pickup-v1.png" },
  { label: "Processing", desc: "Partner updates", x: 410, y: 82, illustration: "/brand/illustrations/journey-processing-v1.png" },
  { label: "Quality check", desc: "Care verification", x: 750, y: 190, illustration: "/brand/illustrations/journey-quality-check-v1.png" },
  { label: "OTP delivery", desc: "Secure handover", x: 1070, y: 112, illustration: "/brand/illustrations/journey-delivery-v1.png" },
];

const CARELINE_PATH = "M120,164 C220,104 318,60 410,82 C535,64 635,220 750,190 C850,228 970,132 1070,112";
const MOBILE_CARELINE_PATH = "M34,114 C74,72 101,42 126,60 C176,42 195,152 236,132 C270,145 298,84 328,78";
const MOBILE_CARELINE_NODES = [{ x: 34, y: 114 }, { x: 126, y: 60 }, { x: 236, y: 132 }, { x: 328, y: 78 }];
// The booking route is deliberately quiet: a precision rail, not a decorative squiggle.
// It intersects every station so the animation reads as one continuous handover.
const BOOKING_PATH = "M112,72 L1088,72";

export function BookingJourney() {
  const scope = useRef<HTMLElement>(null);
  const desktopRouteRef = useRef<SVGPathElement>(null);
  const mobileTrackRef = useRef<SVGPathElement>(null);
  const mobileRouteRef = useRef<SVGPathElement>(null);
  const mobileSvgRef = useRef<SVGSVGElement>(null);
  const mobileListRef = useRef<HTMLOListElement>(null);
  const mobileStationRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!scope.current) return;

      // Mobile cards vary in height with the viewport and copy wrapping. Build the
      // route from the real icon centres instead of guessed SVG coordinates.
      const syncMobileRoute = () => {
        const list = mobileListRef.current;
        const svg = mobileSvgRef.current;
        const track = mobileTrackRef.current;
        const route = mobileRouteRef.current;
        const stations = mobileStationRefs.current.filter((station): station is HTMLSpanElement => Boolean(station));
        if (!list || !svg || !track || !route || stations.length !== BOOKING_STEPS.length) return;

        const listBounds = list.getBoundingClientRect();
        const width = Math.max(1, Math.round(listBounds.width));
        const height = Math.max(1, Math.round(listBounds.height));
        const stationsPath = stations.map((station) => {
            const bounds = station.getBoundingClientRect();
            return {
              x: Math.round(bounds.left - listBounds.left + bounds.width / 2),
              y: Math.round(bounds.top - listBounds.top + bounds.height / 2),
            };
          });
        // The path runs through the icon centres, but sits behind the card surfaces.
        // It is therefore visible only in each gap, reading as a clean handoff rather
        // than a line drawn across the cards themselves.
        const routePath = stationsPath
          .map((station, index) => `${index === 0 ? "M" : "L"}${station.x},${station.y}`)
          .join(" ");

        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        track.setAttribute("d", routePath);
        route.setAttribute("d", routePath);
      };

      syncMobileRoute();
      if (reducedMotion) {
        gsap.set(".booking-step, .booking-mobile-step", { autoAlpha: 1, y: 0, scale: 1 });
        [desktopRouteRef.current, mobileRouteRef.current].filter((path): path is SVGPathElement => Boolean(path)).forEach((path) => gsap.set(path, { strokeDashoffset: 0 }));
        return;
      }

      const paths = [desktopRouteRef.current, mobileRouteRef.current].filter((path): path is SVGPathElement => Boolean(path));
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });
      gsap.set(".booking-step, .booking-mobile-step", { autoAlpha: 0.14, y: 22, scale: 0.96 });
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top 76%",
          end: "bottom 34%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });
      timeline.to(paths, { strokeDashoffset: 0, duration: 1, ease: "none" }, 0);
      BOOKING_STEPS.forEach((_, index) => {
        // Each card arrives only after the blue route has reached its station.
        const moment = 0.06 + index * 0.205;
        timeline.to(`.booking-step-${index}, .booking-mobile-step-${index}`, { autoAlpha: 1, y: 0, scale: 1, duration: 0.16, ease: "power3.out" }, moment);
      });

      const resizeObserver = new ResizeObserver(() => {
        syncMobileRoute();
      });
      if (mobileListRef.current) resizeObserver.observe(mobileListRef.current);
      return () => resizeObserver.disconnect();
    },
    { scope, dependencies: [reducedMotion] },
  );

  return (
    <section ref={scope} id="how-it-works" className="relative overflow-hidden bg-bg-app py-16 sm:py-20 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <SectionEyebrow>How LNDRY works</SectionEyebrow>
          <h2 className="mt-3 font-display text-headline text-ink">One visible booking flow, from pickup to handover.</h2>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-ink-soft">A five-step story makes it clear what happens next, without asking customers to compare every local laundry.</p>
        </div>

        <div className="relative mt-10 hidden md:block">
          <svg viewBox="0 0 1200 144" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full" aria-hidden="true">
            <path d={BOOKING_PATH} fill="none" stroke="#eae8ff" strokeWidth="3" strokeLinecap="round" />
            <path ref={desktopRouteRef} d={BOOKING_PATH} fill="none" stroke="#664cf0" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div className="relative grid grid-cols-5 gap-5">
            {BOOKING_STEPS.map((step, index) => {
              const Icon = step.icon;
              return <article key={step.label} className={`booking-step booking-step-${index} relative z-10 text-center`}><div className="mx-auto flex size-24 items-center justify-center rounded-full border-4 border-bg-app bg-white shadow-[0_10px_24px_rgba(79,54,207,0.16)] ring-1 ring-violet/15"><div className="relative size-16"><Image src={step.illustration} alt="" fill sizes="64px" className="object-contain" /></div></div><div className="mt-4 rounded-2xl border border-violet/10 bg-white px-3 py-3 shadow-[0_10px_24px_rgba(31,24,75,0.06)]"><Icon className="mx-auto size-4 text-violet" aria-hidden="true" /><h3 className="mt-2 font-display text-sm font-semibold leading-snug text-ink">{step.label}</h3><p className="mx-auto mt-1.5 max-w-40 font-body text-xs leading-relaxed text-ink-soft">{step.desc}</p></div></article>;
            })}
          </div>
        </div>

        <div className="relative mt-8 md:hidden">
          <svg ref={mobileSvgRef} preserveAspectRatio="none" className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible" aria-hidden="true">
            <path ref={mobileTrackRef} fill="none" stroke="#eae8ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path ref={mobileRouteRef} fill="none" stroke="#664cf0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <ol ref={mobileListRef} className="relative z-10 grid gap-3">
          {BOOKING_STEPS.map((step, index) => {
            const Icon = step.icon;
            return <li key={step.label} className={`booking-mobile-step booking-mobile-step-${index} relative flex gap-4 rounded-2xl border border-violet/10 bg-white p-4 pl-5 shadow-[0_10px_24px_rgba(31,24,75,0.06)]`}><span ref={(station) => { mobileStationRefs.current[index] = station; }} className="relative z-20 flex size-11 shrink-0 items-center justify-center rounded-full bg-lavender-soft text-violet-deep ring-2 ring-white"><Icon className="size-5" aria-hidden="true" /><span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-violet font-body text-[9px] font-bold text-white">{index + 1}</span></span><div><h3 className="font-display text-base font-semibold text-ink">{step.label}</h3><p className="mt-1 font-body text-sm leading-relaxed text-ink-soft">{step.desc}</p></div></li>;
          })}
        </ol>
        </div>
      </Container>
    </section>
  );
}

export function CarelineJourney() {
  const scope = useRef<HTMLElement>(null);
  const desktopPathRef = useRef<SVGPathElement>(null);
  const mobilePathRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!scope.current) return;
      const paths = [desktopPathRef.current, mobilePathRef.current].filter((path): path is SVGPathElement => Boolean(path));
      if (reducedMotion) {
        paths.forEach((path) => gsap.set(path, { strokeDashoffset: 0 }));
        gsap.set(".careline-node, .careline-card", { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });
      gsap.set(".careline-node", { autoAlpha: 0.22, scale: 0.72, transformOrigin: "center" });
      gsap.set(".careline-card", { autoAlpha: 0.28, y: 18, scale: 0.96 });
      gsap.set(".careline-shimmer", { strokeDashoffset: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "+=140%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });
      timeline.to(paths, { strokeDashoffset: 0, duration: 1 }, 0).to(".careline-shimmer", { strokeDashoffset: -112, duration: 1, ease: "none" }, 0);
      CARELINE_STAGES.forEach((_, index) => {
        const moment = 0.12 + index * 0.22;
        timeline.to(`.careline-node-${index}`, { autoAlpha: 1, scale: 1, duration: 0.16 }, moment).to(`.careline-card-${index}`, { autoAlpha: 1, y: 0, scale: 1, duration: 0.18 }, moment + 0.08);
      });
    },
    { scope, dependencies: [reducedMotion] },
  );

  return (
    <section ref={scope} id="careline-journey" className="relative flex min-h-[760px] items-center overflow-hidden bg-bg-app py-12 sm:min-h-screen sm:py-16 md:py-20">
      <Container>
        <div className="max-w-2xl">
          <SectionEyebrow>Act four, the careline journey</SectionEyebrow>
          <h2 className="mt-3 font-display text-headline text-ink">The booking story is a visible careline.</h2>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-ink-soft">The full order arc stays visible after checkout—one continuous, scroll-driven thread from pickup to secure handover.</p>
        </div>

        <div className="relative mt-10 hidden md:block">
          <svg viewBox="0 0 1200 260" preserveAspectRatio="none" className="h-48 w-full" aria-hidden="true">
            <defs>
              <linearGradient id="careline-desktop-stroke" x1="0%" x2="100%"><stop offset="0%" stopColor="#0fb5a6" /><stop offset="42%" stopColor="#826df7" /><stop offset="100%" stopColor="#4f36cf" /></linearGradient>
              <radialGradient id="careline-desktop-node" cx="30%" cy="25%"><stop offset="0%" stopColor="#ffffff" /><stop offset="18%" stopColor="#c7c1ff" /><stop offset="62%" stopColor="#664cf0" /><stop offset="100%" stopColor="#4f36cf" /></radialGradient>
              <filter id="careline-desktop-glow" x="-30%" y="-50%" width="160%" height="200%"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <path d={CARELINE_PATH} fill="none" stroke="#dedcf7" strokeWidth="8" strokeLinecap="round" opacity="0.58" />
            <path ref={desktopPathRef} d={CARELINE_PATH} fill="none" stroke="url(#careline-desktop-stroke)" strokeWidth="4" strokeLinecap="round" filter="url(#careline-desktop-glow)" />
            <path className="careline-shimmer" d={CARELINE_PATH} fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeDasharray="7 25" opacity="0.88" />
            {CARELINE_STAGES.map((stage, index) => <g key={stage.label} className={`careline-node careline-node-${index}`}><circle cx={stage.x} cy={stage.y} r="21" fill="#ffffff" opacity="0.94" /><circle cx={stage.x} cy={stage.y} r="18" fill="none" stroke="#bcb5ff" strokeWidth="2" /><circle cx={stage.x} cy={stage.y} r="12" fill="url(#careline-desktop-node)" filter="url(#careline-desktop-glow)" /><circle cx={stage.x - 4} cy={stage.y - 5} r="2.5" fill="#ffffff" opacity="0.82" /></g>)}
          </svg>
          <div className="mt-2 grid grid-cols-4 gap-5">
            {CARELINE_STAGES.map((stage, index) => <article key={stage.label} className={`careline-card careline-card-${index} text-center`}><div className="relative mx-auto size-16"><Image src={stage.illustration} alt="" fill sizes="64px" className="object-contain" /></div><p className="mt-3 font-display text-base font-semibold text-ink">{stage.label}</p><p className="mt-1 font-body text-xs text-ink-soft">{stage.desc}</p></article>)}
          </div>
        </div>

        <div className="relative mt-9 md:hidden">
          <svg viewBox="0 0 360 170" preserveAspectRatio="none" className="h-44 w-full" aria-hidden="true">
            <defs>
              <linearGradient id="careline-mobile-stroke" x1="0%" x2="100%"><stop offset="0%" stopColor="#0fb5a6" /><stop offset="42%" stopColor="#826df7" /><stop offset="100%" stopColor="#4f36cf" /></linearGradient>
              <radialGradient id="careline-mobile-node" cx="30%" cy="25%"><stop offset="0%" stopColor="#ffffff" /><stop offset="18%" stopColor="#c7c1ff" /><stop offset="62%" stopColor="#664cf0" /><stop offset="100%" stopColor="#4f36cf" /></radialGradient>
              <filter id="careline-mobile-glow" x="-40%" y="-60%" width="180%" height="220%"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <path d={MOBILE_CARELINE_PATH} fill="none" stroke="#dedcf7" strokeWidth="8" strokeLinecap="round" opacity="0.58" />
            <path ref={mobilePathRef} d={MOBILE_CARELINE_PATH} fill="none" stroke="url(#careline-mobile-stroke)" strokeWidth="4" strokeLinecap="round" filter="url(#careline-mobile-glow)" />
            <path className="careline-shimmer" d={MOBILE_CARELINE_PATH} fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeDasharray="7 25" opacity="0.88" />
            {MOBILE_CARELINE_NODES.map((node, index) => <g key={CARELINE_STAGES[index].label} className={`careline-node careline-node-${index}`}><circle cx={node.x} cy={node.y} r="19" fill="#ffffff" opacity="0.94" /><circle cx={node.x} cy={node.y} r="16" fill="none" stroke="#bcb5ff" strokeWidth="2" /><circle cx={node.x} cy={node.y} r="11" fill="url(#careline-mobile-node)" filter="url(#careline-mobile-glow)" /><circle cx={node.x - 3.5} cy={node.y - 4.5} r="2.25" fill="#ffffff" opacity="0.82" /></g>)}
          </svg>
          <ol className="mt-3 grid grid-cols-2 gap-x-3 gap-y-5">
            {CARELINE_STAGES.map((stage, index) => <li key={stage.label} className={`careline-card careline-card-${index} text-center`}><div className="relative mx-auto size-14"><Image src={stage.illustration} alt="" fill sizes="56px" className="object-contain" /></div><p className="mt-2 font-display text-sm font-semibold text-ink">{stage.label}</p><p className="mt-1 font-body text-xs leading-relaxed text-ink-soft">{stage.desc}</p></li>)}
          </ol>
        </div>
      </Container>
    </section>
  );
}
