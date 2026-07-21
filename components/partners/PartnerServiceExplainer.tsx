"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { BadgeCheck, MapPinned, PackageCheck, ScanSearch } from "lucide-react";
import { gsap } from "@/lib/motion/gsap";

const stages = [
  {
    title: "Service fit",
    signal: "Category and capacity",
    body: "LNDRY checks which services the partner can genuinely fulfil, including capacity and delivery coverage.",
    image: "/brand/illustrations/service-dry-cleaning-v1.png",
    icon: ScanSearch,
  },
  {
    title: "Operating radius",
    signal: "Coverage and slots",
    body: "Coverage is matched by neighbourhood, pickup slot, and return feasibility before availability is shown.",
    image: "/brand/icons/operating-radius-v1.png",
    icon: MapPinned,
  },
  {
    title: "Quality baseline",
    signal: "Handover readiness",
    body: "Garment handling, handover proof, and order-status readiness become part of the marketplace trust layer.",
    image: "/brand/illustrations/journey-quality-check-v1.png",
    icon: BadgeCheck,
  },
  {
    title: "Order assignment",
    signal: "Eligible route",
    body: "Eligible orders can reach the right partner without customers comparing a long list of laundry vendors.",
    image: "/brand/icons/order-assignment-v1.png",
    icon: PackageCheck,
  },
];

export function PartnerServiceExplainer() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".quality-story-intro", {
        opacity: 0,
        y: 18,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: ".quality-story-intro", start: "top 84%" },
      });
      gsap.from(".quality-story-canvas", {
        opacity: 0,
        scale: 0.97,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".quality-story-canvas", start: "top 82%" },
      });
      gsap.from(".quality-story-stage", {
        opacity: 0,
        x: 18,
        stagger: 0.1,
        duration: 0.55,
        ease: "power3.out",
        scrollTrigger: { trigger: ".quality-story-stages", start: "top 84%" },
      });
      gsap.to(".quality-story-pulse", {
        scale: 1.35,
        opacity: 0.35,
        duration: 1.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope },
  );

  return (
    <div ref={scope} className="relative overflow-hidden rounded-md bg-ink px-5 py-8 text-white sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <div aria-hidden="true" className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-violet/30 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-teal/15 blur-3xl" />

      <div className="quality-story-intro relative z-10 grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <div>
          <p className="font-body text-label font-semibold text-teal">Partner onboarding story</p>
          <h3 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight text-white md:text-4xl text-balance">
            The form opens a quality-gated route to the right orders.
          </h3>
        </div>
        <p className="max-w-2xl font-body text-sm leading-relaxed text-white/72 md:text-base">
          The first application is not paperwork for its own sake. It gives LNDRY the signals needed to check whether a partner can serve a customer well, then route suitable work with confidence.
        </p>
      </div>

      <div className="relative z-10 mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[0.87fr_1.13fr] lg:gap-10 lg:items-center">
        <figure className="quality-story-canvas relative min-h-[23rem] overflow-hidden rounded-sm bg-[#121d29] sm:min-h-[28rem]">
          <Image
            src="/brand/illustrations/partner-onboarding-quality-gate-v1.png"
            alt="Indian garment-care team reviewing service coverage and partner quality details during LNDRY onboarding"
            fill
            sizes="(min-width: 1024px) 540px, 100vw"
            className="object-cover object-[67%_center]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,15,20,0.94)_0%,rgba(8,15,20,0.73)_38%,rgba(8,15,20,0.08)_80%)]" />
          <div className="absolute left-4 top-4 z-10 max-w-[13rem] sm:left-6 sm:top-6 sm:max-w-[15rem]">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 font-body text-xs font-semibold text-teal ring-1 ring-white/10">
              <span className="relative flex size-2">
                <span className="quality-story-pulse absolute inset-0 rounded-full bg-teal" />
                <span className="relative size-2 rounded-full bg-teal" />
              </span>
              Partner profile in review
            </div>
            <p className="mt-4 font-display text-xl font-semibold leading-tight text-white sm:text-2xl">
              The information becomes a route to readiness.
            </p>
          </div>
          <div className="absolute bottom-4 left-4 z-10 right-4 rounded-sm bg-ink/75 p-3 backdrop-blur-sm sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[16rem]">
            <p className="font-body text-xs font-semibold text-white">The outcome</p>
            <p className="mt-1 font-body text-xs leading-relaxed text-white/66">A partner profile with enough evidence to receive appropriate booking requests.</p>
          </div>
        </figure>

        <ol className="quality-story-stages grid gap-3 sm:grid-cols-2 sm:gap-4">
          {stages.map(({ title, signal, body, image, icon: Icon }, index) => (
            <li key={title} className="quality-story-stage group relative overflow-hidden rounded-sm border border-white/10 bg-white/[0.055] p-4 transition-colors duration-300 hover:bg-white/[0.09] sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal text-ink">
                  <Icon aria-hidden="true" size={17} strokeWidth={2.2} />
                </div>
                <span className="font-body text-xs font-semibold text-white/45">0{index + 1}</span>
              </div>
              <div className="mt-4 flex items-end gap-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xs bg-[#1b2733]">
                  <Image src={image} alt="" fill sizes="64px" className="object-contain p-1 transition-transform duration-500 ease-[var(--ease-signature)] group-hover:scale-110" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-semibold text-white">{title}</h4>
                  <p className="mt-1 font-body text-xs font-semibold text-teal">{signal}</p>
                </div>
              </div>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/65">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
