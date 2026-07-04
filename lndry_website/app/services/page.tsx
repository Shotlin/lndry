import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { CatalogGrid } from "@/components/services/CatalogGrid";
import { LNDRYMotionOverlay } from "@/components/overlays/LNDRYMotionOverlay";

const title = "Services | LNDRY";
const description =
  "A premium web catalog that makes service scope, partner eligibility and rate basis visible before you start booking.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "LNDRY",
    type: "website",
    images: ["/brand/website-finishing/og/services-og-1200x630.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/brand/website-finishing/og/services-og-1200x630.png"],
  },
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink py-24 md:py-32">
        <div className="absolute inset-0">
          <Image
            src="/brand/website-story/website-services-hero-care-specialist-v1.png"
            alt="An LNDRY partner inspecting a freshly pressed shirt at a specialist care counter"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,#080f14_18%,rgba(8,15,20,0.75)_55%,rgba(8,15,20,0.35)_100%)]" />
        </div>

        <Container className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow tone="onDark">Services</SectionEyebrow>
            <h1 className="mt-3 font-display text-headline text-white">
              Every service, explained before you book
            </h1>
            <p className="mt-5 max-w-xl font-body text-body-lg text-white/70">
              A premium web catalog that makes service scope, partner eligibility and rate basis
              visible before you start booking.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Pill tone="onDark">11 service families</Pill>
            <Pill tone="onDark">Every icon carries the careline</Pill>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-bg-app py-20 md:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-6 hidden opacity-70 md:block">
          <LNDRYMotionOverlay variant="service-tags" className="mx-auto max-w-3xl" />
        </div>

        <Container className="relative">
          <h2 className="max-w-2xl font-display text-headline text-ink">
            Choose a service, then let LNDRY recommend who can handle it
          </h2>
          <div className="mt-16">
            <CatalogGrid />
          </div>
        </Container>
      </section>

      <section className="bg-lavender-soft py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionEyebrow>Spotlight</SectionEyebrow>
            <h2 className="mt-3 font-display text-headline text-ink">
              Dry cleaning, handled the way a specialist would
            </h2>
            <p className="mt-5 max-w-lg font-body text-base leading-relaxed text-ink-soft">
              The catalog can use larger service cutouts, while the product detail remains
              grounded in marketplace facts: service basis, partner capability, pickup slots and
              handover verification.
            </p>
          </div>

          <div className="rounded-xl bg-white p-8 shadow-elevated">
            <div className="relative mx-auto h-40 w-40">
              <Image
                src="/brand/illustrations/service-dry-cleaning-v1.png"
                alt="Dry cleaned jacket on a hanger"
                fill
                sizes="160px"
                className="object-contain"
              />
            </div>
            <h3 className="mt-6 font-display text-lg font-semibold text-ink">
              Example service detail
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
              Dry cleaning partners are shown only when eligible for the selected address. Rate
              basis and expected completion are shown before payment.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Pill tone="neutral">₹ per item</Pill>
              <Pill tone="teal">OTP handover</Pill>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 text-center">
        <Container className="flex flex-col items-center">
          <h2 className="max-w-lg font-display text-headline text-ink">
            Ready to get a recommended partner near you?
          </h2>
          <div className="mt-8">
            <Button href="/marketplace">See recommendation flow</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
