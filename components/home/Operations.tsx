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
          <SectionEyebrow>Why choose LNDRY instead of your local laundry?</SectionEyebrow>
          <h2 className="mt-3 font-display text-headline text-ink">
            One booking platform. Clearer care. More confidence.
          </h2>
          <p className="mt-4 font-body text-base text-ink-soft">
            Traditional laundry often means multiple calls, no tracking, cash payments and uncertain
            delivery. LNDRY brings verified partners, digital payments, visible order stages, and dedicated support.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[['Call multiple shops','One booking platform'],['No tracking','Live tracking'],['Cash payments','Digital payments'],['No customer support','Dedicated support'],['Uncertain delivery','Scheduled delivery'],['Corporate Laundry · PGs · Hostels · Co-living · Hotels · Restaurants','Coming Soon']].map(([oldWay,newWay]) => <div key={oldWay} className="rounded-lg border border-hairline bg-white p-5"><p className="font-body text-sm text-muted">{oldWay}</p><p className="mt-2 font-display text-lg font-semibold text-violet-deep">{newWay}</p></div>)}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr_1fr_0.9fr] lg:items-stretch">
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
