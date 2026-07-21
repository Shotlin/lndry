import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Clock3, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { CatalogGrid } from "@/components/services/CatalogGrid";

const title = "Services | LNDRY";
const description =
  "Explore laundry, dry cleaning, and specialist garment-care services with clear starting prices, care scope, and delivery expectations.";

const SPECIALIST_PROOF = [
  { title: "Specialist matched", copy: "Eligible partners are selected for the garment and service you choose.", icon: ShieldCheck },
  { title: "From ₹99 / item", copy: "A clear starting basis before you request a pickup window.", icon: Sparkles },
  { title: "Typical 48-hour care", copy: "The expected turnaround is visible before you book.", icon: Clock3 },
];

const SPECIALIST_CARDS = [
  { title: "Premium garments", description: "Suits, blazers, silk, designer wear and delicate fabrics.", image: "/brand/illustrations/service-premium-garment-care-v1.png", price: "From ₹99 / item" },
  { title: "Home textiles", description: "Curtains, blankets and other bulky care routes.", image: "/brand/illustrations/service-curtain-cleaning-v1.png", price: "From ₹99 / item" },
];

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
          <div className="absolute inset-0 bg-[linear-gradient(100deg,#080f14_12%,rgba(8,15,20,0.78)_51%,rgba(8,15,20,0.32)_100%)]" />
        </div>

        <Container className="relative grid gap-10 lg:grid-cols-[1fr_0.76fr] lg:items-end">
          <div className="max-w-2xl">
            <SectionEyebrow tone="onDark">Services</SectionEyebrow>
            <h1 className="mt-3 font-display text-headline text-white">Garment care for the everyday, and the garments that need more.</h1>
            <p className="mt-5 max-w-xl font-body text-body-lg text-white/74">
              Choose the care you need. LNDRY makes the price basis, expected turnaround, and partner path visible before you book.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 font-body text-sm font-semibold text-white"><Truck className="size-4 text-teal" aria-hidden="true" />Doorstep pickup</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 font-body text-sm font-semibold text-white"><ShieldCheck className="size-4 text-teal" aria-hidden="true" />Care matched</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 font-body text-sm font-semibold text-white"><CheckCircle2 className="size-4 text-teal" aria-hidden="true" />Secure delivery</span>
            </div>
          </div>
          <div className="justify-self-start lg:justify-self-end">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Care catalog</p>
            <p className="mt-2 font-display text-4xl font-semibold text-white">11 routes</p>
            <p className="mt-1 max-w-xs font-body text-sm leading-relaxed text-white/65">Popular essentials and specialist care, with a clear starting price on every route.</p>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-bg-app py-16 sm:py-20 md:py-24">
        <div className="pointer-events-none absolute right-0 top-24 size-80 rounded-full bg-violet/10 blur-3xl" />
        <Container className="relative">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SectionEyebrow>Service catalog</SectionEyebrow>
              <h2 className="mt-3 max-w-2xl font-display text-headline text-ink">Pick a care route, then let LNDRY find who can handle it.</h2>
            </div>
            <p className="max-w-xl font-body text-base leading-relaxed text-ink-soft lg:justify-self-end">Starting prices are shown on every service card. Final pricing and pickup availability are confirmed before you continue.</p>
          </div>
          <div className="mt-9"><CatalogGrid /></div>
        </Container>
      </section>

      <section id="pricing" className="relative overflow-hidden bg-lavender-soft py-16 sm:py-20 md:py-24">
        <div className="pointer-events-none absolute -left-20 bottom-0 size-72 rounded-full bg-teal/12 blur-3xl" />
        <Container className="relative">
          <div className="max-w-2xl">
            <SectionEyebrow>Specialist care spotlight</SectionEyebrow>
            <h2 className="mt-3 font-display text-headline text-ink">When the garment matters more, the care route should be clearer.</h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="relative min-h-[25rem] overflow-hidden rounded-xl bg-ink p-6 text-white sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(130,109,247,0.6),transparent_34%)]" />
              <div className="relative z-10 max-w-sm">
                <Pill tone="onDark" className="h-8 px-3 text-xs">Dry cleaning</Pill>
                <h3 className="mt-5 font-display text-3xl font-semibold leading-tight">Premium dry cleaning starts with the right care match.</h3>
                <p className="mt-4 font-body text-sm leading-relaxed text-white/70">For suits, blazers, sarees, gowns, shawls, winter jackets and designer garments.</p>
                <div className="mt-6 inline-flex items-baseline gap-2"><span className="font-display text-4xl font-semibold text-teal">₹99</span><span className="font-body text-sm text-white/68">starting per item</span></div>
              </div>
              <Image src="/brand/illustrations/service-dry-cleaning-v1.png" alt="Dry cleaned jacket on a hanger" fill sizes="(min-width: 1024px) 52vw, 100vw" className="pointer-events-none object-contain object-[78%_84%] p-6 pt-36 sm:p-8 sm:pt-32" />
            </article>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {SPECIALIST_CARDS.map((card) => (
                <article key={card.title} className="relative min-h-52 overflow-hidden rounded-xl bg-white p-5 ring-1 ring-hairline sm:p-6">
                  <div className="relative z-10 max-w-[12rem]">
                    <p className="font-body text-xs font-semibold uppercase tracking-[0.13em] text-violet">Specialist route</p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-ink">{card.title}</h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{card.description}</p>
                    <p className="mt-4 font-body text-sm font-semibold text-violet-deep">{card.price}</p>
                  </div>
                  <Image src={card.image} alt="" fill sizes="(min-width: 1024px) 40vw, (min-width: 640px) 45vw, 100vw" className="pointer-events-none object-contain object-[88%_75%] p-4 pl-36" />
                </article>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 rounded-xl bg-white p-5 ring-1 ring-hairline sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-tint text-teal"><CheckCircle2 className="size-4" aria-hidden="true" /></span><p className="max-w-3xl font-body text-sm leading-relaxed text-ink-soft">The final item count, price, and available pickup window are confirmed before booking. LNDRY recommends the partner, so you do not have to compare every shop yourself.</p></div>
            <Button href="/marketplace" className="shrink-0">See the recommendation flow</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
