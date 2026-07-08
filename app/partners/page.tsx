import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { AudienceNav } from "@/components/partners/AudienceNav";
import { PartnerLeadForm } from "@/components/partners/PartnerLeadForm";
import { PartnerServiceExplainer } from "@/components/partners/PartnerServiceExplainer";
import { partnerBenefits } from "@/lib/data/site";

const title = "Partner With LNDRY | Laundry Vendor Onboarding in Pune";
const description =
  "Laundry vendors in Pune can join LNDRY for recurring customers, order visibility, digital presence, partner support, and service-category onboarding.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "LNDRY",
    type: "website",
    images: ["/brand/website-finishing/og/partners-og-1200x630.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/brand/website-finishing/og/partners-og-1200x630.png"],
  },
};

const ONBOARDING_STEPS = ["Application review", "Service editor", "Order assignment", "Processing audit"];
const OTP_STEPS = ["Pickup OTP", "Partner return", "Delivery OTP", "Completed"];

export default function PartnersPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#5046c8_0%,#6c63e8_100%)] py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <SectionEyebrow tone="onDark">Partner With Us</SectionEyebrow>
            <h1 className="mt-3 max-w-2xl font-display text-headline text-white">
              Grow your laundry business with LNDRY
            </h1>
            <p className="mt-5 max-w-xl font-body text-body-lg text-white/80">
              Join a marketplace built to bring recurring customers, digital presence, order
              visibility, and technology support to local garment-care businesses.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#audience-vendors" variant="secondary" className="bg-white">
                View partner benefits
              </Button>
              <Button href="#partner-lead-form" variant="ghost" className="text-white hover:text-white/80">
                Become a LNDRY Partner
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-elevated">
            <Image
              src="/brand/website-launch/hero/partner-with-us-growth-hero-v1.png"
              alt="LNDRY partner receiving digital orders in a clean laundry studio"
              fill
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover"
              priority
            />
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionEyebrow>Why partners join</SectionEyebrow>
            <h2 className="mt-3 font-display text-headline text-ink">
              More demand, cleaner operations, no separate marketing engine.
            </h2>
            <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-ink-soft">
              LNDRY gives local laundry, dry cleaning, wash and iron, and garment-care partners a
              clearer way to receive qualified demand while keeping customer handovers and order
              status easier to manage.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {partnerBenefits.map((benefit, index) => (
              <div key={benefit} className="rounded-lg border border-hairline bg-bg-app p-5">
                <Pill tone={index < 2 ? "teal" : "neutral"}>{benefit}</Pill>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="partner-lead-form" className="bg-bg-app py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionEyebrow>Partner lead form</SectionEyebrow>
            <h2 className="mt-3 font-display text-headline text-ink">Become a LNDRY Partner</h2>
            <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-ink-soft">
              Choose the service category first so the LNDRY team can understand what you can
              fulfil, where you can operate, and how quickly orders can be assigned.
            </p>
            <Image
              src="/brand/website-launch/components/partner-benefit-grid.svg"
              alt="LNDRY partner benefit grid"
              width={1200}
              height={640}
              className="mt-8 h-auto w-full rounded-lg shadow-soft"
            />
          </div>
          <PartnerLeadForm />
        </Container>
      </section>

      <section className="bg-bg-app pb-20 md:pb-24">
        <Container>
          <PartnerServiceExplainer />
        </Container>
      </section>

      <section className="bg-bg-app py-20 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[200px_1fr]">
          <AudienceNav />

          <div className="flex flex-col gap-24">
            <div id="audience-vendors" className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <SectionEyebrow>Vendors</SectionEyebrow>
                <h2 className="mt-3 font-display text-headline text-ink">
                  Vendor onboarding is framed as quality control
                </h2>
                <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-ink-soft">
                  Application review, documents, service radius, capacity and order assignment are
                  presented as a trust system, not a generic business sign-up.
                </p>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  {ONBOARDING_STEPS.map((label, i) => (
                    <Pill key={label} tone={i === 0 ? "teal" : "neutral"}>
                      {label}
                    </Pill>
                  ))}
                </div>
              </div>
              <PhoneFrame
                src="/brand/vendor-mockups/new-order-v1.png"
                alt="Vendor new order request screen"
                label="Vendor fulfilment"
                className="mx-auto w-56"
              />
            </div>

            <div id="audience-riders" className="rounded-xl bg-ink p-8 md:p-12">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <SectionEyebrow tone="onDark">Riders</SectionEyebrow>
                  <h2 className="mt-3 font-display text-headline text-white">
                    Delivery handovers stay explicit
                  </h2>
                  <p className="mt-4 max-w-lg font-body text-base text-white/70">
                    Pickup and delivery OTP are visible in the operations story because they are
                    central to customer confidence, and the page never promises continuous live
                    tracking.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {OTP_STEPS.map((label, i) => (
                      <div key={label} className="rounded-lg border border-ink-line bg-ink-raised p-4 text-center">
                        <p className="font-display text-xl font-bold text-teal">{i + 1}</p>
                        <p className="mt-1 font-body text-xs text-white/70">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <PhoneFrame
                  src="/brand/rider-mockups/assignments-v1.png"
                  alt="Delivery employee assignments screen"
                  label="Delivery handover"
                  className="mx-auto w-56"
                />
              </div>
            </div>

            <div id="audience-admin" className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <SectionEyebrow>Admin</SectionEyebrow>
                <h2 className="mt-3 font-display text-headline text-ink">
                  Admin visibility for marketplace operations
                </h2>
                <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-ink-soft">
                  Operations teams can review partners, orders, capacity, and marketplace signals
                  in a visual system that stays connected to the customer and vendor experience.
                </p>
              </div>
              <BrowserFrame
                src="/brand/admin-mockups/dashboard-v1.png"
                alt="Admin operations overview dashboard"
                label="Admin review"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 text-center">
        <Container className="flex flex-col items-center">
          <h2 className="max-w-xl font-display text-headline text-ink">
            Customer-facing, partner-facing, and operations-ready
          </h2>
          <p className="mt-4 max-w-lg font-body text-base text-ink-soft">
            No claims outside the approved workflow, just one credible, connected system.
          </p>
          <div className="mt-8">
            <Button href="/how-it-works">See how it works</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
