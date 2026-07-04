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

      const track = trackRef.current;
      const distance = track.scrollWidth - track.parentElement!.clientWidth;
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
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section ref={sectionRef} id="act-choose" className="relative bg-bg-app py-24 md:overflow-hidden">
      <Container className="mb-10 md:mb-14">
        <SectionEyebrow>Act two, Choose</SectionEyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-headline text-ink">
          Services built as a premium catalog, not a generic laundry grid
        </h2>
        <p className="mt-4 max-w-xl font-body text-base text-ink-soft">
          Each category uses LNDRY&rsquo;s existing cutouts and careline logic. No random bubbles,
          no stock washing-machine clip art.
        </p>
      </Container>

      <div className={reducedMotion ? "px-6 md:px-11" : "overflow-hidden"}>
        <div
          ref={trackRef}
          className={
            reducedMotion
              ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              : "flex w-max gap-6 px-6 md:px-11"
          }
        >
          {FEATURED_SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} className={reducedMotion ? "" : "w-72 md:w-80"} />
          ))}
        </div>
      </div>
    </section>
  );
}
