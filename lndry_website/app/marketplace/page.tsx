import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { CompareTool } from "@/components/marketplace/CompareTool";
import { LNDRYMotionOverlay } from "@/components/overlays/LNDRYMotionOverlay";

const title = "Recommended partner flow | LNDRY";
const description =
  "How LNDRY can recommend one eligible nearby laundry partner after the customer enters an address.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "LNDRY",
    type: "website",
    images: ["/brand/website-launch/og/marketplace-og-1200x630.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/brand/website-launch/og/marketplace-og-1200x630.png"],
  },
};

export default function MarketplacePage() {
  return (
    <>
      <section className="bg-surface-cool py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <SectionEyebrow>Smart recommendation</SectionEyebrow>
            <h1 className="mt-3 font-display text-headline text-ink">
              Enter an address, get one eligible nearby partner
            </h1>
            <p className="mt-5 max-w-lg font-body text-body-lg text-ink-soft">
              LNDRY should keep marketplace complexity behind the scenes. Customers see a clear
              recommended partner, visible trust signals, service fit, and booking next step.
            </p>
          </div>
          <div className="relative">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl shadow-elevated">
              <Image
                src="/brand/website-launch/hero/smart-recommended-partner-hero-v1.png"
                alt="LNDRY smart recommended partner flow with customer and vendor"
                fill
                sizes="(min-width: 1024px) 560px, 90vw"
                className="object-cover"
                priority
              />
            </div>
            <LNDRYMotionOverlay
              variant="marketplace-proof"
              className="absolute -bottom-10 -right-6 hidden w-[62%] sm:block"
            />
          </div>
        </Container>
      </section>

      <section className="bg-bg-app py-20 pt-28 md:py-24 md:pt-28">
        <Container>
          <CompareTool />
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-headline text-ink">No unsupported live map promise</h2>
            <p className="mt-4 max-w-md font-body text-base text-ink-soft">
              This page shows area, eligibility, and order status logic, not continuous live rider
              tracking. The trust story stays operationally true to the approved workflow.
            </p>
          </div>
          <LNDRYMotionOverlay variant="verified-badge" className="mx-auto w-full max-w-xs" />
        </Container>
      </section>
    </>
  );
}
