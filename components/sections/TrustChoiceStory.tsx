"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BadgeCheck, CreditCard, Headphones, MapPinCheck, ScanLine, ShieldCheck, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const proofPoints = [
  { title: "Verified partners", copy: "Every partner is reviewed before they join LNDRY.", icon: BadgeCheck },
  { title: "Doorstep pickup", copy: "A pickup window is confirmed before the order begins.", icon: Truck },
  { title: "Live order tracking", copy: "Order progress stays visible from pickup to return.", icon: MapPinCheck },
  { title: "OTP handover", copy: "Pickup and delivery can be confirmed with a one-time code.", icon: ShieldCheck },
  { title: "Transparent pricing", copy: "See the price basis before you confirm the booking.", icon: CreditCard },
  { title: "Customer support", copy: "Help stays close when you have an order question.", icon: Headphones },
];

const routeSteps = [
  { label: "Choose a service", detail: "Care route selected", icon: ScanLine },
  { label: "Confirm pickup", detail: "Partner and slot matched", icon: Truck },
  { label: "Follow the order", detail: "Updates through delivery", icon: MapPinCheck },
];

export function TrustChoiceStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".trust-story-intro", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".trust-story-intro", start: "top 82%" },
      });

      gsap.from(".trust-stage-reveal", {
        opacity: 0,
        y: 26,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: ".trust-stage-reveal", start: "top 80%" },
      });

      gsap.from(".trust-route-step", {
        opacity: 0,
        x: -16,
        stagger: 0.14,
        duration: 0.55,
        ease: "power3.out",
        scrollTrigger: { trigger: ".trust-route-steps", start: "top 82%" },
      });

      gsap.from(".trust-proof", {
        opacity: 0,
        y: 16,
        stagger: 0.07,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: { trigger: ".trust-proofs", start: "top 86%" },
      });

      gsap.to(".trust-signal-dot", {
        scale: 1.2,
        opacity: 0.55,
        stagger: 0.32,
        duration: 1.15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="trust-choice-heading" className="overflow-hidden bg-white py-16 sm:py-20 md:py-24">
      <Container>
        <div className="trust-story-intro max-w-2xl">
          <SectionEyebrow>Why thousands of customers will choose LNDRY</SectionEyebrow>
          <h2 id="trust-choice-heading" className="mt-3 font-display text-headline text-ink text-balance">
            Know what happens to your clothes before you book.
          </h2>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-ink-soft">
            LNDRY turns the usual uncertainty around laundry into a care route customers can see, check, and follow.
          </p>
        </div>

        <div className="trust-stage-reveal relative mt-9 overflow-hidden rounded-md bg-ink px-5 py-6 text-white sm:px-8 sm:py-9 lg:mt-12 lg:grid lg:grid-cols-[0.88fr_1.12fr] lg:gap-10 lg:px-10 lg:py-10">
          <div aria-hidden="true" className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-violet/30 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-28 left-1/3 h-52 w-52 rounded-full bg-teal/20 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between">
            <div>
              <p className="font-body text-sm font-semibold text-teal">A booking with visible proof</p>
              <h3 className="mt-3 max-w-md font-display text-2xl font-semibold leading-tight text-white sm:text-3xl text-balance">
                One trusted route, from your door to your door.
              </h3>
              <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-white/70">
                Customers do not need to guess who will collect the garments or call multiple shops for an update.
              </p>
            </div>

            <div className="trust-route-steps mt-7 space-y-3">
              {routeSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="trust-route-step flex items-center gap-3">
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                      <span className="trust-signal-dot absolute inset-1 rounded-full border border-teal/60" />
                      <Icon size={17} className="relative text-teal" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-white">{step.label}</p>
                      <p className="font-body text-xs text-white/60">{step.detail}</p>
                    </div>
                    {index < routeSteps.length - 1 ? <span aria-hidden="true" className="ml-auto h-px flex-1 bg-gradient-to-r from-violet/70 to-transparent" /> : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 mt-8 grid grid-cols-[1.1fr_0.9fr] gap-3 lg:mt-0">
            <div className="relative min-h-64 overflow-hidden rounded-sm bg-[#202b37] sm:min-h-80">
              <Image
                src="/brand/illustrations/journey-pickup-v1.png"
                alt="LNDRY pickup rider and garment bag"
                fill
                sizes="(min-width: 1024px) 420px, 60vw"
                className="object-contain p-4 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 rounded-full bg-teal px-3 py-1.5 font-body text-[11px] font-semibold text-ink shadow-sm">
                Pickup confirmed
              </div>
            </div>
            <div className="grid gap-3">
              <div className="relative min-h-30 overflow-hidden rounded-sm bg-[#202b37]">
                <Image src="/brand/illustrations/journey-processing-v1.png" alt="Garments in professional care" fill sizes="(min-width: 1024px) 230px, 35vw" className="object-contain p-3" />
                <div className="absolute bottom-2 left-2 rounded-full bg-white px-2.5 py-1 font-body text-[10px] font-semibold text-ink">Care update</div>
              </div>
              <div className="relative min-h-30 overflow-hidden rounded-sm bg-[#202b37]">
                <Image src="/brand/illustrations/journey-delivery-v1.png" alt="LNDRY doorstep delivery" fill sizes="(min-width: 1024px) 230px, 35vw" className="object-contain p-3" />
                <div className="absolute bottom-2 left-2 rounded-full bg-violet px-2.5 py-1 font-body text-[10px] font-semibold text-white">OTP delivery</div>
              </div>
            </div>
          </div>
        </div>

        <div className="trust-proofs mt-6 grid border-t border-hairline sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {proofPoints.map((point) => {
            const Icon = point.icon;
            return (
              <article key={point.title} className="trust-proof group border-b border-hairline px-1 py-5 sm:px-5 lg:px-6">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-tint text-teal transition-transform duration-300 ease-[var(--ease-signature)] group-hover:scale-110">
                    <Icon size={17} strokeWidth={2.25} />
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-semibold text-ink">{point.title}</h3>
                    <p className="mt-1 font-body text-sm leading-relaxed text-ink-soft">{point.copy}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
