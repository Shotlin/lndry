import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RecommendationFlow } from "@/components/marketplace/RecommendationFlow";
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
      <section className="relative overflow-hidden bg-ink py-20 md:py-24">
        <div className="absolute inset-0">
          <Image
            src="/brand/illustrations/recommended-partner-route-v1.png"
            alt="A route from a customer pickup location to a verified LNDRY garment-care partner"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,15,20,0.97)_0%,rgba(8,15,20,0.88)_40%,rgba(8,15,20,0.34)_78%,rgba(8,15,20,0.1)_100%)]" />
        </div>
        <Container className="relative grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <SectionEyebrow>Smart recommendation</SectionEyebrow>
            <h1 className="mt-3 font-display text-headline text-white">
              Enter an address, get one eligible nearby partner
            </h1>
            <p className="mt-5 max-w-lg font-body text-body-lg text-white/75">
              LNDRY keeps marketplace complexity behind the scenes. You see one suitable partner,
              visible trust signals, care fit, and a clear booking next step.
            </p>
          </div>
          <div className="relative min-h-64 lg:min-h-80">
            <div className="absolute bottom-5 right-0 hidden w-72 rounded-xl border border-white/15 bg-[#0b1420]/88 p-5 text-white shadow-[0_16px_36px_rgba(0,0,0,0.28)] backdrop-blur-md sm:block">
              <span className="relative flex size-3"><span className="absolute inline-flex size-full animate-ping rounded-full bg-teal/65" /><span className="relative inline-flex size-3 rounded-full bg-teal" /></span>
              <p className="mt-4 font-body text-xs font-semibold uppercase tracking-[0.14em] text-teal">Care route matched</p>
              <p className="mt-2 font-display text-lg font-semibold">One suitable next step is ready.</p>
              <p className="mt-2 font-body text-sm leading-relaxed text-white/65">Address, service fit, availability, and pickup timing are checked together.</p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-body text-xs font-semibold text-white/78"><CheckCircle2 className="size-4 text-teal" aria-hidden="true" />Recommendation prepared</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bg-app py-20 pt-28 md:py-24 md:pt-28">
        <Container>
          <div className="mb-8 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <SectionEyebrow>Recommendation flow</SectionEyebrow>
              <h2 className="mt-3 font-display text-headline text-ink">Start with your care request. See one clear next step.</h2>
            </div>
            <p className="max-w-xl font-body text-base leading-relaxed text-ink-soft lg:justify-self-end">Service, area, capacity, and pickup timing are checked together so you do not need to compare a crowded list of vendors.</p>
          </div>
          <RecommendationFlow />
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionEyebrow>Care updates</SectionEyebrow>
            <h2 className="mt-3 font-display text-headline text-ink">Keep the important care milestones in view.</h2>
            <p className="mt-4 max-w-md font-body text-base text-ink-soft">
              After pickup, LNDRY keeps the order route clear with relevant milestones: care in
              progress, quality checked, and ready for a secure delivery handover.
            </p>
          </div>
          <LNDRYMotionOverlay variant="verified-badge" className="mx-auto w-full max-w-xs" />
        </Container>
      </section>
    </>
  );
}
