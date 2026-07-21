"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { CalendarCheck2, ReceiptText, Tags } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

const signals = [
  {
    title: "Service basis",
    copy: "Per kg, item, pair, or panel is stated upfront.",
    label: "Rate unit visible",
    icon: Tags,
  },
  {
    title: "Care details",
    copy: "Garment count and specialist handling shape the final estimate.",
    label: "Care-aware estimate",
    icon: ReceiptText,
  },
  {
    title: "Pickup confirmed",
    copy: "The selected partner confirms your time window before payment.",
    label: "Slot before payment",
    icon: CalendarCheck2,
  },
];

export function EstimateDossierStory() {
  const scope = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.from(".estimate-dossier-intro", {
        opacity: 0,
        y: 18,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: ".estimate-dossier", start: "top 84%" },
      });
      gsap.from(".estimate-dossier-art", {
        opacity: 0,
        clipPath: "inset(7% 5% 7% 5% round 12px)",
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: ".estimate-dossier-art", start: "top 84%" },
      });
      gsap.from(".estimate-dossier-signal", {
        opacity: 0,
        x: 16,
        stagger: 0.12,
        duration: 0.52,
        ease: "power3.out",
        scrollTrigger: { trigger: ".estimate-dossier-signals", start: "top 84%" },
      });
      gsap.to(".estimate-dossier-halo", {
        scale: 1.16,
        opacity: 0.32,
        duration: 2.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope, dependencies: [reducedMotion] },
  );

  return (
    <section ref={scope} className="estimate-dossier relative overflow-hidden bg-white py-16 sm:py-20 md:py-24">
      <div aria-hidden="true" className="absolute left-0 top-1/4 size-64 rounded-full bg-lavender-soft/75 blur-3xl" />
      <Container className="relative">
        <div className="estimate-dossier-intro grid gap-5 border-b border-hairline pb-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:pb-10">
          <div>
            <SectionEyebrow>What your estimate includes</SectionEyebrow>
            <h2 className="mt-3 max-w-xl font-display text-headline text-ink text-balance">Price clarity comes from the details behind the number.</h2>
          </div>
          <p className="max-w-2xl font-body text-base leading-relaxed text-ink-soft sm:text-body-lg">
            Before a pickup is confirmed, the care route, garment details, and available time window give the estimate its practical meaning.
          </p>
        </div>

        <div className="mt-9 grid gap-6 lg:mt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:items-stretch">
          <figure className="estimate-dossier-art relative min-h-[18rem] overflow-hidden rounded-md bg-lavender-soft sm:min-h-[24rem]">
            <Image
              src="/brand/illustrations/pricing-estimate-dossier-v1.png"
              alt="Folded garments with a care tag, estimate sheet, and pickup confirmation token"
              fill
              sizes="(min-width: 1024px) 620px, 100vw"
              className="object-cover object-[68%_center]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,243,251,0.95)_0%,rgba(244,243,251,0.42)_35%,rgba(244,243,251,0)_76%)]" />
            <div className="absolute left-4 top-4 z-10 max-w-[13rem] sm:left-6 sm:top-6 sm:max-w-[16rem]">
              <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 font-body text-xs font-semibold text-teal">
                <span className="relative flex size-2"><span className="estimate-dossier-halo absolute inset-0 rounded-full bg-teal" /><span className="relative size-2 rounded-full bg-teal" /></span>
                Estimate signals
              </span>
              <p className="mt-3 font-display text-xl font-semibold leading-tight text-ink sm:text-2xl">The number is connected to real care decisions.</p>
            </div>
          </figure>

          <ol className="estimate-dossier-signals divide-y divide-hairline border-y border-hairline">
            {signals.map(({ title, copy, label, icon: Icon }, index) => (
              <li key={title} className="estimate-dossier-signal grid grid-cols-[3rem_1fr] gap-3 py-5 first:pt-0 last:pb-0 sm:grid-cols-[3.5rem_1fr] sm:gap-4 sm:py-6">
                <div className={`flex size-10 items-center justify-center rounded-full ${index === 2 ? "bg-teal text-ink" : "bg-lavender-soft text-violet"} sm:size-11`}>
                  <Icon className="size-5" aria-hidden="true" strokeWidth={2} />
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
                    <span className="font-body text-xs font-semibold text-teal">0{index + 1} · {label}</span>
                  </div>
                  <p className="mt-1.5 max-w-lg font-body text-sm leading-relaxed text-ink-soft">{copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
