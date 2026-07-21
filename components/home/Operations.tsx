"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowRight, BadgeCheck, CalendarCheck2, Eye, PhoneCall, ScanSearch, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { Button } from "../ui/Button";

const BEFORE_SIGNALS = [
  { label: "Calling around for availability", icon: PhoneCall },
  { label: "Unsure who can care for the garment", icon: Eye },
  { label: "No clear order update after pickup", icon: Eye },
];

const LNDRY_SIGNALS = [
  { label: "A suitable verified partner", icon: BadgeCheck },
  { label: "A visible care journey", icon: Truck },
  { label: "A secure handover at delivery", icon: ShieldCheck },
];

const CARE_STORY = [
  {
    step: "01",
    title: "Pickup feels certain",
    copy: "Choose a care route and a practical pickup window before the order begins.",
    signal: "Pickup confirmed",
    image: "/brand/illustrations/journey-pickup-v1.png",
    icon: CalendarCheck2,
  },
  {
    step: "02",
    title: "Care stays visible",
    copy: "The journey moves through the care stages without leaving customers to chase updates.",
    signal: "Care updates",
    image: "/brand/illustrations/journey-processing-v1.png",
    icon: ScanSearch,
  },
  {
    step: "03",
    title: "Return feels secure",
    copy: "A clear final handover brings garments back with a visible, verifiable close.",
    signal: "OTP handover",
    image: "/brand/illustrations/journey-delivery-v1.png",
    icon: ShieldCheck,
  },
];

export function Operations() {
  const scope = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!scope.current) return;

      if (reducedMotion) {
        gsap.set(".why-choice-reveal", { autoAlpha: 1, y: 0 });
        gsap.set(".why-choice-pulse", { scale: 1, opacity: 1 });
        return;
      }

      gsap.from(".why-choice-reveal", {
        autoAlpha: 0,
        y: 26,
        duration: 0.72,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: scope.current,
          start: "top 77%",
        },
      });

      gsap.to(".why-choice-pulse", {
        scale: 1.16,
        opacity: 0.38,
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      });

      gsap.from(".why-journey-reveal", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".why-journey-story",
          start: "top 82%",
        },
      });

      gsap.from(".why-journey-card", {
        autoAlpha: 0,
        y: 30,
        scale: 0.98,
        duration: 0.64,
        ease: "power4.out",
        stagger: 0.11,
        scrollTrigger: {
          trigger: ".why-journey-story",
          start: "top 68%",
        },
      });

      gsap.from(".why-journey-image", {
        scale: 0.9,
        rotate: -2,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".why-journey-story",
          start: "top 65%",
        },
      });

      const route = scope.current.querySelector<SVGPathElement>(".why-journey-route");
      if (route) {
        const length = route.getTotalLength();
        gsap.fromTo(route, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.1, ease: "power2.out", scrollTrigger: { trigger: ".why-journey-story", start: "top 62%" } });
      }
    },
    { scope, dependencies: [reducedMotion] },
  );

  return (
    <section id="why-lndy" ref={scope} className="relative overflow-hidden bg-[linear-gradient(145deg,#ffffff_0%,#f4f3fb_58%,#ebe9ff_100%)] py-16 sm:py-20 md:py-24">
      <div className="pointer-events-none absolute -left-20 bottom-0 size-72 rounded-full bg-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-10 size-72 rounded-full bg-violet/14 blur-3xl" />

      <Container className="relative">
        <div className="grid gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div className="why-choice-reveal max-w-2xl">
            <SectionEyebrow>Why customers choose LNDRY</SectionEyebrow>
            <h2 className="mt-3 text-balance font-display text-headline text-ink">The decision feels easier when the care route is visible.</h2>
          </div>
          <p className="why-choice-reveal max-w-xl font-body text-base leading-relaxed text-ink-soft lg:justify-self-end">
            Customers do not need another directory of local shops. They need to know who can help, what happens after pickup, and how their order returns safely.
          </p>
        </div>

        <figure className="why-choice-reveal relative mt-10 overflow-hidden rounded-xl bg-[#eae8ff] p-2 shadow-[0_8px_8px_rgba(66,55,145,0.14)] sm:p-3">
          <div className="relative min-h-[19rem] overflow-hidden rounded-[0.7rem] bg-[#f7f6fd] sm:min-h-[28rem] lg:min-h-[34rem]">
            <Image
              src="/brand/illustrations/why-lndry-problem-to-care-v1.png"
              alt="A garment-care search becoming a verified LNDRY pickup and care route"
              fill
              sizes="(min-width: 1280px) 1180px, (min-width: 768px) 92vw, 100vw"
              className="object-cover object-center"
              priority
              unoptimized
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#efedff]/28 via-transparent to-white/12" />

            <div className="pointer-events-none absolute left-[47%] top-[57%] hidden size-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/20 blur-md lg:block" />
            <div className="why-choice-pulse pointer-events-none absolute left-[47%] top-[57%] hidden size-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/55 lg:block" />

            <article className="why-choice-reveal relative m-4 max-w-[17rem] rounded-lg bg-[#0a111a]/94 p-4 text-white shadow-[0_4px_8px_rgba(2,6,15,0.32)] sm:m-6 sm:p-5 lg:absolute lg:left-0 lg:top-0">
              <p className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-[#c4baff]">Before LNDRY</p>
              <h3 className="mt-2 font-display text-lg font-semibold leading-snug">A garment-care decision can feel uncertain.</h3>
              <ul className="mt-4 grid gap-3">
                {BEFORE_SIGNALS.map((signal) => {
                  const Icon = signal.icon;
                  return <li key={signal.label} className="flex items-start gap-2.5 font-body text-sm leading-snug text-white/72"><span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#c4baff]"><Icon className="size-3" aria-hidden="true" /></span>{signal.label}</li>;
                })}
              </ul>
            </article>

            <article className="why-choice-reveal relative mx-4 mb-4 max-w-[17rem] rounded-lg bg-white/95 p-4 text-ink shadow-[0_4px_8px_rgba(66,55,145,0.14)] sm:mx-6 sm:mb-6 sm:p-5 lg:absolute lg:bottom-0 lg:right-0 lg:mb-0">
              <div className="flex items-center gap-2"><span className="flex size-7 items-center justify-center rounded-full bg-teal-tint text-teal"><Sparkles className="size-3.5" aria-hidden="true" /></span><p className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-violet">With LNDRY</p></div>
              <h3 className="mt-3 font-display text-lg font-semibold leading-snug">One clear route to cared-for garments.</h3>
              <ul className="mt-4 grid gap-3">
                {LNDRY_SIGNALS.map((signal) => {
                  const Icon = signal.icon;
                  return <li key={signal.label} className="flex items-start gap-2.5 font-body text-sm leading-snug text-ink-soft"><span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-tint text-teal"><Icon className="size-3" aria-hidden="true" /></span>{signal.label}</li>;
                })}
              </ul>
            </article>
          </div>

          <figcaption className="why-choice-reveal flex flex-col gap-4 px-3 pb-2 pt-5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="max-w-2xl font-display text-lg font-semibold leading-snug text-ink">The result is not more marketplace browsing. It is a confident next step.</p>
            <Button href="/#how-it-works" variant="secondary" className="shrink-0">See how it works</Button>
          </figcaption>
        </figure>

        <section id="why-care-story" className="why-journey-story relative mt-8 scroll-mt-24 overflow-hidden rounded-xl bg-ink px-5 py-7 text-white shadow-[0_18px_44px_rgba(8,15,20,0.2)] sm:px-7 sm:py-9 lg:px-9 lg:py-10">
          <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-violet/35 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-teal/14 blur-3xl" />
          <div className="why-journey-reveal relative grid gap-5 border-b border-white/12 pb-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="font-body text-label font-semibold text-teal">The care route, made tangible</p>
              <h3 className="mt-3 max-w-xl font-display text-subhead text-white">One booking turns into a sequence customers can follow without guessing.</h3>
            </div>
            <p className="max-w-2xl font-body text-sm leading-relaxed text-white/68 lg:justify-self-end">It is not more marketplace browsing. It is a single, guided route from pickup confirmation through care and back to a secure handover.</p>
          </div>

          <div className="relative mt-7">
            <svg className="pointer-events-none absolute inset-x-[14%] top-20 hidden h-24 w-[72%] lg:block" viewBox="0 0 1000 180" preserveAspectRatio="none" aria-hidden="true">
              <path className="why-journey-route" d="M0,56 C195,178 320,4 500,92 S816,180 1000,52" fill="none" stroke="url(#why-journey-gradient)" strokeWidth="3" strokeLinecap="round" />
              <defs><linearGradient id="why-journey-gradient" x1="0" x2="1"><stop offset="0" stopColor="#0fb5a6" /><stop offset="0.52" stopColor="#826df7" /><stop offset="1" stopColor="#0fb5a6" /></linearGradient></defs>
            </svg>
            <ol className="relative grid gap-4 lg:grid-cols-3 lg:gap-5">
              {CARE_STORY.map(({ step, title: storyTitle, copy, signal, image, icon: Icon }, index) => (
                <li key={storyTitle} className="why-journey-card group relative overflow-hidden rounded-xl bg-white/[0.06] p-3 ring-1 ring-white/10 backdrop-blur-sm transition-colors duration-500 hover:bg-white/[0.1] sm:p-4">
                  <div className="relative h-40 overflow-hidden rounded-lg bg-[radial-gradient(circle_at_50%_10%,rgba(130,109,247,0.26),transparent_48%),#121c2c] sm:h-48">
                    <Image src={image} alt="" fill sizes="(min-width: 1024px) 360px, 92vw" className="why-journey-image object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-105" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09101a]/48 via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 flex size-8 items-center justify-center rounded-full bg-[#08111d]/78 font-body text-xs font-bold text-teal backdrop-blur">{step}</span>
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[#08111d]/78 px-2.5 py-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.11em] text-white/88 backdrop-blur"><Icon className="size-3 text-teal" aria-hidden="true" />{signal}</span>
                  </div>
                  <div className="px-1 pb-1 pt-4">
                    <p className="font-display text-xl font-semibold text-white">{storyTitle}</p>
                    <p className="mt-2 font-body text-sm leading-relaxed text-white/65">{copy}</p>
                  </div>
                  {index < CARE_STORY.length - 1 ? <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 rounded-full bg-violet p-1 text-white shadow-[0_5px_16px_rgba(102,76,240,0.42)] lg:block" aria-hidden="true" /> : null}
                </li>
              ))}
            </ol>
          </div>

          <div className="why-journey-reveal relative mt-7 flex flex-col gap-4 border-t border-white/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-body text-sm text-white/70"><span className="font-semibold text-white">The difference customers feel:</span> a useful next step, at every point in the journey.</p>
            <Button href="/marketplace" variant="secondary" className="shrink-0 bg-white">See a recommended route</Button>
          </div>
        </section>
      </Container>
    </section>
  );
}
