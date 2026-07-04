"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { motionTokens } from "@/lib/motion/tokens";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";

const STATIONS = [
  {
    label: "Pickup",
    desc: "60-minute slot",
    icon: "/brand/illustrations/journey-pickup-v1.png",
    x: 150,
    y: 170,
  },
  {
    label: "Processing",
    desc: "Partner updates",
    icon: "/brand/illustrations/journey-processing-v1.png",
    x: 450,
    y: 90,
  },
  {
    label: "Quality check",
    desc: "Care verification",
    icon: "/brand/illustrations/journey-quality-check-v1.png",
    x: 750,
    y: 190,
  },
  {
    label: "OTP delivery",
    desc: "Secure handover",
    icon: "/brand/illustrations/journey-delivery-v1.png",
    x: 1050,
    y: 110,
  },
];

const PATH_D =
  "M150,170 C250,110 350,70 450,90 C550,70 650,210 750,190 C850,230 950,130 1050,110";

export function CarelineJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGGElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || !pathRef.current) return;

      if (reducedMotion) {
        gsap.set(pathRef.current, { strokeDashoffset: 0 });
        gsap.set(".station-dot, .station-card", { opacity: 1, scale: 1, y: 0 });
        return;
      }

      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(".station-dot", { transformOrigin: "center", scale: 0.6, opacity: 0.4 });
      gsap.set(".station-card", { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=140%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(pathRef.current, { strokeDashoffset: 0, duration: 1, ease: motionTokens.easeScrub }, 0);

      if (markerRef.current) {
        tl.to(
          markerRef.current,
          {
            motionPath: {
              path: pathRef.current,
              align: pathRef.current,
              alignOrigin: [0.5, 0.5],
            },
            duration: 1,
            ease: motionTokens.easeScrub,
          },
          0
        );
      }

      STATIONS.forEach((_, i) => {
        const t = 0.06 + i * 0.29;
        tl.to(`.station-dot-${i}`, { scale: 1, opacity: 1, duration: 0.12 }, t);
        tl.to(`.station-card-${i}`, { opacity: 1, y: 0, duration: 0.12 }, t);
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      id="act-journey"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-bg-app py-20"
    >
      <Container>
        <div className="max-w-2xl">
          <SectionEyebrow>Act four, The careline journey</SectionEyebrow>
          <h2 className="mt-3 font-display text-headline text-ink">
            The booking story is a visible careline
          </h2>
          <p className="mt-4 max-w-xl font-body text-base text-ink-soft">
            The site introduces the full order arc so the customer understands what happens after
            checkout, one continuous thread from pickup to handover.
          </p>
        </div>

        <div className="relative mt-16">
          <svg viewBox="0 0 1200 260" className="w-full" preserveAspectRatio="none" aria-hidden="true">
            <path d={PATH_D} fill="none" stroke="var(--color-hairline)" strokeWidth="3" />
            <path ref={pathRef} d={PATH_D} fill="none" stroke="var(--color-violet)" strokeWidth="3" strokeLinecap="round" />

            {STATIONS.map((s, i) => (
              <g key={s.label} className={`station-dot station-dot-${i}`}>
                <circle cx={s.x} cy={s.y} r={9} fill="var(--color-teal)" />
                <circle cx={s.x} cy={s.y} r={16} fill="none" stroke="var(--color-teal)" strokeWidth="1.5" opacity="0.4" />
              </g>
            ))}

            <g ref={markerRef} transform={`translate(${STATIONS[0].x}, ${STATIONS[0].y})`}>
              <circle r="7" fill="var(--color-violet-deep)" />
              <circle r="12" fill="none" stroke="var(--color-lavender-electric)" strokeWidth="2" />
            </g>
          </svg>

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
            {STATIONS.map((s, i) => (
              <div key={s.label} className={`station-card station-card-${i} flex flex-col items-center text-center`}>
                <div className="relative h-16 w-16">
                  <Image src={s.icon} alt="" fill sizes="64px" className="object-contain" />
                </div>
                <p className="mt-3 font-display text-base font-semibold text-ink">{s.label}</p>
                <p className="mt-1 font-body text-xs text-ink-soft">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
