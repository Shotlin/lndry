"use client";

import Image from "next/image";
import { useScrollReveal } from "@/lib/motion/useScrollReveal";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { Button } from "../ui/Button";
import { Thread } from "../ui/Thread";

export function CloseCTA() {
  const scope = useScrollReveal<HTMLDivElement>({ selector: ".close-reveal", y: 24 });

  return (
    <section id="act-close" ref={scope} className="relative overflow-hidden py-28 text-center">
      <div className="absolute inset-0">
        <Image
          src="/brand/website-story/website-closing-trust-cta-v1.png"
          alt="An LNDRY delivery partner completing a verified handover with a customer at their door"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(80,70,200,0.82)_0%,rgba(80,70,200,0.55)_45%,rgba(108,99,232,0.68)_100%)]" />
      </div>

      <Thread className="pointer-events-none absolute -right-8 top-0 hidden h-full w-48 md:block" opacity={0.18} />
      <Thread className="pointer-events-none absolute -left-8 top-0 hidden h-full w-48 md:block" opacity={0.18} flip />

      <Container className="relative flex flex-col items-center">
        <div className="close-reveal">
          <SectionEyebrow tone="onDark">Act six, Close</SectionEyebrow>
        </div>
        <h2 className="close-reveal mt-3 max-w-2xl font-display text-headline text-white">
          Book your first pickup in under a minute
        </h2>
        <p className="close-reveal mt-4 max-w-lg font-body text-base text-white/80">
          Enter your area, review the recommended eligible partner, and follow order status
          without calling multiple shops.
        </p>
        <div className="close-reveal mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button href="/how-it-works" variant="secondary" className="bg-white">
            Book a pickup
          </Button>
          <Button href="/services" variant="ghost" className="text-white hover:text-white/80">
            Explore services
          </Button>
        </div>
      </Container>
    </section>
  );
}
