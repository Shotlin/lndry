"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDown, BadgeCheck, ClipboardCheck, Rocket, Send } from "lucide-react";

const journey = [
  { title: "Share the basics", copy: "Business name, owner name, mobile, and city.", icon: Send },
  { title: "We review the fit", copy: "Service coverage, capability, and readiness are checked.", icon: ClipboardCheck },
  { title: "Prepare to go live", copy: "Eligible partners continue with the onboarding team.", icon: Rocket },
];

export function PartnerLeadVisual() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".lead-visual-reveal", {
        opacity: 0,
        y: 18,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".lead-visual", start: "top 82%" },
      });
      gsap.to(".lead-visual-orbit", {
        rotate: 360,
        duration: 18,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".lead-visual-phone", {
        y: -8,
        duration: 1.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope },
  );

  return (
    <div ref={scope} className="lead-visual relative overflow-hidden rounded-md bg-ink p-5 text-white sm:p-6">
      <div aria-hidden="true" className="lead-visual-orbit absolute -right-20 -top-20 h-56 w-56 rounded-full border border-violet/50" />
      <div aria-hidden="true" className="absolute -right-8 top-10 h-28 w-28 rounded-full bg-violet/40 blur-3xl" />

      <div className="lead-visual-reveal relative z-10 flex items-center gap-2 font-body text-xs font-semibold text-teal">
        <BadgeCheck size={16} />
        A practical application, not a long first form
      </div>

      <div className="relative z-10 mt-5 grid grid-cols-[1fr_7rem] gap-4 sm:grid-cols-[1fr_8.5rem]">
        <div>
          <h3 className="lead-visual-reveal max-w-sm font-display text-xl font-semibold leading-tight text-white sm:text-2xl">
            A clear first step for a laundry business ready to grow.
          </h3>
          <div className="mt-5 space-y-3">
            {journey.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="lead-visual-reveal flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-teal ring-1 ring-white/10">
                    <Icon size={15} />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-0.5 font-body text-xs leading-relaxed text-white/65">{item.copy}</p>
                  </div>
                  {index < journey.length - 1 ? <ArrowDown aria-hidden="true" size={14} className="mt-8 -ml-5 text-violet" /> : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="lead-visual-reveal lead-visual-phone relative self-end overflow-hidden rounded-sm border border-white/15 bg-[#202b37] shadow-[0_10px_16px_rgba(0,0,0,0.25)] will-change-transform">
          <Image
            src="/brand/vendor-mockups/application-v1.png"
            alt="LNDRY vendor application screen"
            width={390}
            height={844}
            sizes="136px"
            className="h-auto w-full translate-y-2 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
