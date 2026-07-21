"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { CalendarCheck2, CheckCircle2, ReceiptText, ShieldCheck } from "lucide-react";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

const steps = [
  { title: "Choose the care", copy: "Select the garment-care route you need.", icon: ReceiptText },
  { title: "See the starting basis", copy: "Rate unit and typical care window stay visible.", icon: CalendarCheck2 },
  { title: "Confirm before payment", copy: "Your partner confirms the final estimate and pickup slot.", icon: ShieldCheck },
];

export function PricingRouteStory() {
  const scope = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.from(".pricing-route-art", {
        opacity: 0,
        scale: 0.93,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pricing-route-story", start: "top 86%" },
      });
      gsap.from(".pricing-route-step", {
        opacity: 0,
        x: 16,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pricing-route-story", start: "top 86%" },
      });
      gsap.to(".pricing-route-pulse", {
        scale: 1.5,
        opacity: 0.25,
        duration: 1.35,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope, dependencies: [reducedMotion] },
  );

  return (
    <div ref={scope} className="pricing-route-story relative mt-8 overflow-hidden rounded-md bg-white/[0.065] p-3 ring-1 ring-white/10 sm:p-4">
      <div className="grid grid-cols-[7.5rem_1fr] gap-3 sm:grid-cols-[9rem_1fr] sm:gap-5">
        <figure className="pricing-route-art relative min-h-[13.5rem] overflow-hidden rounded-sm bg-[#121b2a] sm:min-h-[15rem]">
          <Image src="/brand/illustrations/pricing-care-route-v1.png" alt="A visual LNDRY pricing route from garment selection through estimate confirmation" fill sizes="(min-width: 640px) 144px, 120px" className="object-cover object-center" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,20,0.02),rgba(8,15,20,0.3))]" />
          <div className="absolute bottom-2 left-2 rounded-full bg-ink/80 px-2 py-1 font-body text-[9px] font-semibold text-teal backdrop-blur-sm">Price route</div>
        </figure>

        <ol className="relative flex flex-col justify-between py-1">
          <div aria-hidden="true" className="absolute bottom-7 left-[1.1rem] top-7 w-px bg-white/14" />
          {steps.map(({ title, copy, icon: Icon }, index) => (
            <li key={title} className="pricing-route-step relative grid grid-cols-[2.25rem_1fr] gap-2.5">
              <div className={`relative z-10 flex size-9 items-center justify-center rounded-full ${index === steps.length - 1 ? "bg-teal text-ink" : "bg-violet text-white"}`}>
                {index === 1 ? <span className="pricing-route-pulse absolute inset-1 rounded-full border border-teal" /> : null}
                <Icon className="relative size-4" aria-hidden="true" />
              </div>
              <div className="pt-0.5">
                <p className="font-body text-[10px] font-semibold tracking-[0.12em] text-lavender-electric">0{index + 1}</p>
                <h2 className="mt-0.5 font-display text-sm font-semibold leading-tight text-white sm:text-base">{title}</h2>
                <p className="mt-1 font-body text-xs leading-relaxed text-white/62">{copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3 font-body text-xs font-semibold text-white/78">
        <CheckCircle2 className="size-4 shrink-0 text-teal" aria-hidden="true" />
        Starting from ₹99 across the listed care routes.
      </div>
    </div>
  );
}
