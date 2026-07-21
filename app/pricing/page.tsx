import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { PricingCatalogExperience, PricingStudioExperience } from "@/components/pricing/PricingStudioExperience";
import { PricingRouteStory } from "@/components/pricing/PricingRouteStory";
import { EstimateDossierStory } from "@/components/pricing/EstimateDossierStory";

const title = "Laundry Service Pricing in Pune | LNDRY";
const description = "See LNDRY service starting prices, rate basis, expected turnaround, and how final estimates are confirmed before booking.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, siteName: "LNDRY", type: "website", images: ["/brand/website-finishing/og/services-og-1200x630.png"] },
  twitter: { card: "summary_large_image", title, description, images: ["/brand/website-finishing/og/services-og-1200x630.png"] },
};

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink py-20 sm:py-24 md:py-28">
        <div className="pointer-events-none absolute -right-12 top-0 size-96 rounded-full bg-violet/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-[28%] size-72 rounded-full bg-teal/12 blur-3xl" />
        <Container className="relative grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:gap-14">
          <div className="max-w-2xl">
            <SectionEyebrow tone="onDark">Pricing, made visible</SectionEyebrow>
            <h1 className="mt-3 font-display text-headline text-white">Know the starting price. See how your care route takes shape.</h1>
            <p className="mt-5 max-w-xl font-body text-body-lg leading-relaxed text-white/70">LNDRY shows the price basis, expected care window, and the signals behind your estimate before you decide to book.</p>
            <PricingRouteStory />
          </div>
          <PricingStudioExperience />
        </Container>
      </section>

      <section className="relative overflow-hidden bg-bg-app py-16 sm:py-20 md:py-24">
        <div className="pointer-events-none absolute right-0 top-24 size-80 rounded-full bg-violet/10 blur-3xl" />
        <Container className="relative"><PricingCatalogExperience /></Container>
      </section>

      <EstimateDossierStory />

      <section className="bg-white pb-16 sm:pb-20 md:pb-24">
        <Container className="flex flex-col gap-5 rounded-xl bg-violet px-6 py-8 text-white shadow-[0_14px_30px_rgba(102,76,240,0.22)] sm:px-8 md:flex-row md:items-center md:justify-between">
          <div><p className="font-body text-sm font-semibold text-white/74">Ready when you are</p><h2 className="mt-2 font-display text-2xl font-semibold">Choose your care route and let LNDRY make the next step clear.</h2></div>
          <Button href="/marketplace" variant="secondary" className="shrink-0 bg-white text-violet hover:bg-lavender-soft">Find a suitable partner</Button>
        </Container>
      </section>
    </>
  );
}
