"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowDown, BadgeCheck, CircleHelp, MessageCircle } from "lucide-react";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export function FaqSupportVisual() {
  const scope = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.from(".faq-visual-content", { opacity: 0, y: 18, stagger: 0.1, duration: 0.65, ease: "power3.out" });
      gsap.to(".faq-visual-art", { scale: 1.05, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".faq-visual-beacon", { scale: 1.45, opacity: 0.25, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    },
    { scope, dependencies: [reducedMotion] },
  );

  return (
    <a href="#faq-booking" ref={scope} aria-label="Explore booking and pricing answers" className="group relative isolate block min-h-[29rem] overflow-hidden rounded-md bg-ink p-5 text-white ring-1 ring-transparent transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(66,55,145,0.24)] focus-visible:outline-2 focus-visible:outline-violet focus-visible:outline-offset-4 sm:min-h-[32rem] sm:p-7">
      <Image src="/brand/illustrations/faq-support-route-v2.png" alt="LNDRY support route connecting garment care questions to secure help" fill sizes="(min-width: 1024px) 560px, 94vw" className="faq-visual-art object-cover object-[66%_center]" priority />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,15,20,0.93)_0%,rgba(8,15,20,0.68)_42%,rgba(8,15,20,0.1)_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,15,20,0.68),transparent_46%)]" />

      <div className="relative z-10 flex min-h-[27rem] flex-col justify-between sm:min-h-[30rem]">
        <div className="faq-visual-content max-w-xs">
          <p className="font-body text-sm font-semibold text-teal">The LNDRY support path</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">A useful answer should move the order forward.</h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-white/70">Follow the question to the signal, then take the next clear action.</p>
        </div>

        <div className="faq-visual-content max-w-sm">
          <div className="flex items-center gap-2">
            <span className="relative flex size-9 items-center justify-center rounded-full bg-teal text-ink"><span className="faq-visual-beacon absolute inset-1 rounded-full border border-teal" /><CircleHelp className="relative size-4" /></span>
            <span className="font-body text-xs font-semibold text-white/80">Question received</span>
            <ArrowDown className="ml-auto size-4 text-teal" aria-hidden="true" />
          </div>
          <div className="mt-2 flex items-center gap-2 pl-5">
            <span className="h-8 w-px bg-teal/55" aria-hidden="true" />
            <div className="flex flex-1 items-center justify-between rounded-sm bg-white/10 px-3 py-2 ring-1 ring-white/15 backdrop-blur-sm">
              <span className="font-body text-xs font-semibold text-white">Verified answer route</span>
              <BadgeCheck className="size-4 text-teal" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 pl-5">
            <span className="h-8 w-px bg-teal/55" aria-hidden="true" />
            <div className="flex flex-1 items-center justify-between rounded-sm bg-teal px-3 py-2 font-body text-xs font-semibold text-ink">
              <span>Next action, made clear</span>
              <MessageCircle className="size-4" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
