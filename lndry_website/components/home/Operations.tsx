"use client";

import { useScrollReveal } from "@/lib/motion/useScrollReveal";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { PhoneFrame } from "../ui/PhoneFrame";
import { BrowserFrame } from "../ui/BrowserFrame";
import { Card } from "../ui/Card";

export function Operations() {
  const scope = useScrollReveal<HTMLDivElement>({ selector: ".ops-item", y: 28 });

  return (
    <section id="act-trust" ref={scope} className="bg-bg-app py-24">
      <Container>
        <div className="max-w-2xl">
          <SectionEyebrow>Act five, Trust</SectionEyebrow>
          <h2 className="mt-3 font-display text-headline text-ink">
            Operational credibility for a big-industry feel
          </h2>
          <p className="mt-4 font-body text-base text-ink-soft">
            The website shows that LNDRY is not only a customer app. Vendor fulfilment, rider
            handovers and admin review are part of the same designed system.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr_1fr_0.9fr] lg:items-stretch">
          <BrowserFrame
            src="/brand/admin-mockups/dashboard-v1.png"
            alt="Admin operations overview dashboard"
            label="Admin operations"
            className="ops-item"
          />
          <PhoneFrame
            src="/brand/vendor-mockups/new-order-v1.png"
            alt="Vendor new order request screen"
            label="Vendor app"
            className="ops-item"
          />
          <PhoneFrame
            src="/brand/rider-mockups/assignments-v1.png"
            alt="Delivery employee assignments screen"
            label="Delivery employee"
            className="ops-item"
          />
          <Card tone="violet" className="ops-item flex flex-col justify-center p-7">
            <p className="font-display text-xl font-semibold">One system</p>
            <p className="mt-3 font-body text-sm leading-relaxed text-white/85">
              Customer, vendor, rider and admin surfaces share the same careline language.
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}
