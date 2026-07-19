import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { company, founder } from "@/lib/data/site";

const title = "About LNDRY | Laundry Marketplace for Urban India";
const description =
  "Learn about LNDRY, a Pune-based laundry and dry cleaning marketplace connecting customers with eligible local garment-care partners.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "LNDRY",
    type: "website",
    images: ["/brand/website-launch/og/about-og-1200x630.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/brand/website-launch/og/about-og-1200x630.png"],
  },
};

const values = [
  {
    title: "🛡 Trust First",
    body: "Verified partners and transparent service information before every booking.",
  },
  {
    title: "🤝 Empower Local Businesses",
    body: "Technology that helps local garment-care businesses reach and serve more customers.",
  },
  {
    title: "💜 Customer First",
    body: "A clearer booking, care, handover, and support experience from pickup to delivery.",
  },
  { title: "🌱 Sustainable Growth", body: "Build a dependable marketplace that can grow city by city with quality at its core." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,#ffffff_0%,#f4f3fb_58%,#eae8ff_100%)] py-20 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <Reveal>
            <SectionEyebrow>About LNDRY</SectionEyebrow>
            <h1 className="mt-3 max-w-2xl font-display text-hero text-ink">
              We&apos;re building India&apos;s trusted garment care marketplace.
            </h1>
            <p className="mt-6 max-w-xl font-body text-body-lg text-ink-soft">
              From everyday laundry to premium garment care, LNDRY connects customers with
              verified laundry partners through one trusted platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/#early-access">Book pickup</Button>
              <Button href="/partners" variant="secondary">
                Partner With LNDRY
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-elevated">
              <Image
                src="/brand/website-launch/hero/about-us-company-hero-v1.png"
                alt="LNDRY team reviewing garment care operations"
                fill
                priority
                sizes="(min-width: 1024px) 620px, 94vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-24">
        <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <SectionEyebrow>Company details</SectionEyebrow>
            <h2 className="mt-3 font-display text-headline text-ink">Built as a real company, not a landing-page idea.</h2>
            <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-ink-soft">
              LNDRY publishes company details clearly so customers, partners, payment providers,
              and support teams can verify the business behind the marketplace.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-xl border border-hairline bg-bg-app p-6 md:p-8">
              <p className="font-display text-xl font-semibold text-ink">{company.legalName}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Pill tone="violet">CIN: {company.cin}</Pill>
                <Pill tone="teal">Registered in Pune</Pill>
              </div>
              <p className="mt-6 font-body text-sm leading-relaxed text-ink-soft">
                Registered Office: {company.registeredOffice}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-bg-app py-20 md:py-24">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionEyebrow>Our mission &amp; vision</SectionEyebrow>
            <h2 className="mt-3 font-display text-headline text-ink">Making Garment Care Trusted, Transparent and Accessible.</h2>
            <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
              We believe customers should never have to guess which laundry to trust, and local
              laundry businesses should have access to technology that helps them grow.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-lg border border-hairline bg-white p-6"><p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-violet">Mission</p><p className="mt-3 font-display text-xl font-semibold text-ink">Simplify garment care through verified partners and technology.</p></article>
            <article className="rounded-lg border border-hairline bg-white p-6"><p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-violet">Vision</p><p className="mt-3 font-display text-xl font-semibold text-ink">Become India&apos;s most trusted garment-care marketplace.</p></article>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.05}>
                <article className="h-full rounded-lg border border-hairline bg-white p-6">
                  <h3 className="font-display text-xl font-semibold text-ink">{value.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">{value.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-xl bg-ink p-6 text-white shadow-elevated md:p-8">
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-violet/35 blur-3xl" />
              <div className="absolute -bottom-16 left-8 h-36 w-36 rounded-full bg-teal/25 blur-3xl" />
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white font-display text-2xl font-bold text-violet-deep">
                  AK
                </div>
                <p className="mt-8 font-body text-label font-semibold uppercase tracking-[0.14em] text-teal">
                  Founder profile
                </p>
                <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-white">
                  {founder.name}
                </h3>
                <p className="mt-2 font-body text-base font-semibold text-white/75">{founder.role}</p>
                <div className="mt-6 grid gap-3">
                  <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
                    <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
                      Education
                    </p>
                    <p className="mt-1 font-display text-xl font-semibold text-white">{founder.education}</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
                    <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
                      Operating background
                    </p>
                    <p className="mt-1 font-body text-sm leading-relaxed text-white/72">{founder.experience}</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
                    <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
                      Based in
                    </p>
                    <p className="mt-1 font-body text-sm font-semibold text-white/80">{founder.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionEyebrow>Founder information</SectionEyebrow>
            <h2 className="mt-3 font-display text-headline text-ink">
              Founder-led, operations-first garment care.
            </h2>
            <div className="mt-5 flex max-w-xl flex-col gap-4 font-body text-base leading-relaxed text-ink-soft">
              {founder.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-5 font-display text-xl font-semibold text-violet-deep">{founder.descriptor}</p>
            <blockquote className="mt-6 max-w-xl border-l-2 border-violet bg-lavender-soft px-5 py-4 font-body text-base leading-relaxed text-ink-soft">
              <p>&ldquo;{founder.quote}&rdquo;</p>
              <footer className="mt-3 font-semibold text-ink">— Anmol Kumar</footer>
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-3">
              <Pill tone="violet">{founder.education}</Pill>
              <Pill tone="teal">Marketplace operations</Pill>
              <Pill tone="neutral">Urban logistics</Pill>
            </div>
            <div className="mt-8 rounded-lg border border-hairline bg-bg-app p-5">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-violet">Founder timeline</p>
              <ol className="mt-4 grid gap-3 sm:grid-cols-2">
                {founder.timeline.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 font-body text-sm leading-relaxed text-ink-soft">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-violet font-semibold text-white">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
