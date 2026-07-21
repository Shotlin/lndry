import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Clock3, ReceiptText, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { PricingCatalogExperience, PricingStudioExperience } from "@/components/pricing/PricingStudioExperience";

const title = "Laundry Service Pricing in Pune | LNDRY";
const description = "See LNDRY service starting prices, rate basis, expected turnaround, and how final estimates are confirmed before booking.";

const PRICE_STEPS = [
  { title: "Choose the care", copy: "Start with the garment-care route you need.", icon: ReceiptText },
  { title: "See the starting basis", copy: "Rate unit and typical care window stay visible.", icon: Clock3 },
  { title: "Confirm before payment", copy: "Your partner confirms the final estimate and pickup slot.", icon: ShieldCheck },
];

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

            <ol className="mt-9 grid gap-3 sm:grid-cols-3">
              {PRICE_STEPS.map(({ title: stepTitle, copy, icon: Icon }, index) => (
                <li key={stepTitle} className="relative rounded-xl bg-white/[0.065] p-4 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.1]">
                  <span className="flex size-9 items-center justify-center rounded-full bg-white/10 text-teal"><Icon className="size-4.5" aria-hidden="true" /></span>
                  <p className="mt-4 font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-lavender-electric">0{index + 1}</p>
                  <h2 className="mt-1.5 font-display text-base font-semibold text-white">{stepTitle}</h2>
                  <p className="mt-1.5 font-body text-xs leading-relaxed text-white/60">{copy}</p>
                  {index < PRICE_STEPS.length - 1 ? <ArrowRight className="absolute -right-5 top-1/2 hidden size-4 -translate-y-1/2 text-violet sm:block" aria-hidden="true" /> : null}
                </li>
              ))}
            </ol>
            <div className="mt-7 inline-flex items-center gap-2 font-body text-sm font-semibold text-white/78"><CheckCircle2 className="size-4 text-teal" aria-hidden="true" />Starting from ₹99 across the listed care routes.</div>
          </div>
          <PricingStudioExperience />
        </Container>
      </section>

      <section className="relative overflow-hidden bg-bg-app py-16 sm:py-20 md:py-24">
        <div className="pointer-events-none absolute right-0 top-24 size-80 rounded-full bg-violet/10 blur-3xl" />
        <Container className="relative"><PricingCatalogExperience /></Container>
      </section>

      <section className="bg-white py-16 sm:py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <SectionEyebrow>What your estimate includes</SectionEyebrow>
            <h2 className="mt-3 font-display text-headline text-ink">Price clarity that moves with the care journey.</h2>
            <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-ink-soft">A starting price is useful only when the next decisions are just as clear. LNDRY connects each estimate to the service, garment details, and pickup window that shape it.</p>
          </div>
          <ol className="relative grid gap-4 sm:grid-cols-3">
            <div className="absolute left-[15%] right-[15%] top-7 hidden h-px bg-[linear-gradient(90deg,#664cf0_0%,#0fb5a6_100%)] sm:block" aria-hidden="true" />
            {[
              ["Service basis", "Per kg, item, pair, or panel is stated upfront."],
              ["Care details", "Garment count and specialist handling shape the final estimate."],
              ["Pickup confirmed", "The selected partner confirms your time window before payment."],
            ].map(([label, copy], index) => (
              <li key={label} className="relative rounded-xl bg-bg-app p-5 ring-1 ring-hairline">
                <span className="relative z-10 flex size-14 items-center justify-center rounded-full bg-white font-display text-lg font-semibold text-violet shadow-soft ring-1 ring-hairline sm:mx-auto">0{index + 1}</span>
                <p className="mt-5 font-display text-lg font-semibold text-ink sm:text-center">{label}</p>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft sm:text-center">{copy}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-white pb-16 sm:pb-20 md:pb-24">
        <Container className="flex flex-col gap-5 rounded-xl bg-violet px-6 py-8 text-white shadow-[0_14px_30px_rgba(102,76,240,0.22)] sm:px-8 md:flex-row md:items-center md:justify-between">
          <div><p className="font-body text-sm font-semibold text-white/74">Ready when you are</p><h2 className="mt-2 font-display text-2xl font-semibold">Choose your care route and let LNDRY make the next step clear.</h2></div>
          <Button href="/marketplace" variant="secondary" className="shrink-0 bg-white text-violet hover:bg-lavender-soft">Find a suitable partner</Button>
        </Container>
      </section>
    </>
  );
}
