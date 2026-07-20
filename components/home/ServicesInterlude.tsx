"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { motionTokens } from "@/lib/motion/tokens";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { ServiceCard } from "../ui/ServiceCard";
import { FEATURED_SERVICES } from "@/lib/data/services";

export function ServicesInterlude() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current || !trackRef.current) return;
      const media = gsap.matchMedia();
      media.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        if (!track?.parentElement) return;
        const distance = track.scrollWidth - track.parentElement.clientWidth;
        if (distance <= 0) return;
        gsap.to(track, {
          x: -distance,
          ease: motionTokens.easeScrub,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => media.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section ref={sectionRef} id="act-choose" className="relative bg-bg-app py-16 sm:py-20 lg:overflow-hidden lg:py-24">
      <Container className="mb-8 sm:mb-10 md:mb-14">
        <SectionEyebrow>Act two, Choose</SectionEyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-headline text-ink">
          Services built as a premium catalog, not a generic laundry grid
        </h2>
        <p className="mt-4 max-w-xl font-body text-base text-ink-soft">
          Each category uses LNDRY&rsquo;s existing cutouts and careline logic. No random bubbles,
          no stock washing-machine clip art.
        </p>
      </Container>

      <div className="px-6 sm:px-11 lg:px-0 lg:overflow-hidden">
        <div
          ref={trackRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:flex lg:w-max lg:gap-6 lg:px-11"
        >
          {FEATURED_SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} className="lg:w-80" />
          ))}
        </div>
      </div>
    </section>
  );
}
