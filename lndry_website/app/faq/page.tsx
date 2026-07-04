import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CustomerReviewsSection } from "@/components/sections/CustomerReviewsSection";
import { company, faqs } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "FAQ | LNDRY",
  description: "Answers about how LNDRY works, partner selection, order status, support, delivery, and refunds.",
};

const SUPPORT_POINTS = [
  "Booking flow",
  "Partner recommendation",
  "Pickup and delivery",
  "Refunds and support",
];

export default function FAQPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#ffffff_0%,#f4f3fb_62%,#eae8ff_100%)] py-20 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h1 className="mt-3 max-w-3xl font-display text-hero text-ink">
              Questions answered before the first pickup.
            </h1>
            <p className="mt-6 max-w-2xl font-body text-body-lg text-ink-soft">
              A sharper FAQ page for customers, partners, and payment review. The answers explain
              the marketplace flow without promising unsupported features.
            </p>
            <div className="mt-8 grid max-w-xl grid-cols-2 gap-3">
              {SUPPORT_POINTS.map((item) => (
                <div key={item} className="rounded-full border border-hairline bg-white px-4 py-3 font-body text-sm font-semibold text-ink shadow-soft">
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative overflow-hidden rounded-xl border border-hairline bg-white p-5 shadow-elevated">
              <Image
                src="/brand/website-launch/components/faq-accordion-preview.svg"
                alt="LNDRY FAQ accordion preview showing support topics"
                width={1200}
                height={720}
                className="h-auto w-full rounded-lg"
                priority
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
          <Reveal>
            <div className="sticky top-28 rounded-xl bg-ink p-6 text-white shadow-elevated">
              <p className="font-body text-sm font-semibold text-lavender-electric">Support map</p>
              <h2 className="mt-3 font-display text-2xl font-semibold">The questions are grouped around real order anxiety.</h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-white/68">
                Customers need to know who handles clothes, how the partner is chosen, what status
                means, and how to get help if something goes wrong.
              </p>
              <div className="mt-6 rounded-lg bg-white/8 p-4">
                <p className="font-body text-xs text-white/50">Support email</p>
                <p className="mt-1 break-words font-display text-base font-semibold text-white">{company.supportEmail}</p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {faqs.map((item, index) => (
              <Reveal key={item.q} delay={index * 0.03}>
                <details className="group rounded-lg border border-hairline bg-bg-app p-5 transition-colors open:border-violet open:bg-white md:p-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-5">
                    <span>
                      <span className="font-body text-xs font-semibold text-violet">Answer {index + 1}</span>
                      <span className="mt-2 block font-display text-lg font-semibold leading-snug text-ink md:text-xl">
                        {item.q}
                      </span>
                    </span>
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white font-display text-xl text-violet shadow-soft transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="mt-5 border-t border-hairline pt-5">
                    <p className="max-w-3xl font-body text-sm leading-relaxed text-ink-soft md:text-base">
                      {item.a}
                    </p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CustomerReviewsSection compact />
    </>
  );
}
