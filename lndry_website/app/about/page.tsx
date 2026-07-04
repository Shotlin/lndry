import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/lib/data/site";

const title = "About Us | LNDRY";
const description =
  "LNDRY is building a trust-first garment-care marketplace from Pune, connecting customers with eligible local laundry partners.";

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
    title: "Relief before promotion",
    body: "Every surface should reduce customer effort before it sells a service.",
  },
  {
    title: "Partners win, customers trust",
    body: "LNDRY grows by helping local laundry businesses operate with clearer demand and better customer confidence.",
  },
  {
    title: "Operational truth",
    body: "The site shows what the workflow can support, including recommended partners, order status, and OTP handover.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,#ffffff_0%,#f4f3fb_58%,#eae8ff_100%)] py-20 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <Reveal>
            <SectionEyebrow>About LNDRY</SectionEyebrow>
            <h1 className="mt-3 max-w-2xl font-display text-hero text-ink">
              A careline marketplace for modern urban India.
            </h1>
            <p className="mt-6 max-w-xl font-body text-body-lg text-ink-soft">
              LNDRY exists to make garment care feel dependable again. Customers should not need
              to call shops, guess quality, or browse a confusing vendor list. They should enter
              an address, see a recommended eligible partner, and book with confidence.
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
              These details come from the client feedback document and should remain visible for
              customer trust, business credibility, and payment gateway review.
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
            <SectionEyebrow>Mission and vision</SectionEyebrow>
            <h2 className="mt-3 font-display text-headline text-ink">Make professional garment care easier to trust.</h2>
            <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
              LNDRY is the technology layer between urban customers and local garment-care
              businesses. The mission is practical: reduce uncertainty for customers and bring
              better digital demand to partners.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
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
            <div className="rounded-xl border border-hairline bg-surface-cool p-6">
              <Image
                src="/brand/website-launch/components/founder-info-placeholder.svg"
                alt="LNDRY founder information placeholder"
                width={1200}
                height={640}
                className="h-auto w-full rounded-lg"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionEyebrow>Founder information</SectionEyebrow>
            <h2 className="mt-3 font-display text-headline text-ink">A human founder story belongs here.</h2>
            <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-ink-soft">
              The live LNDRY reference includes a founder narrative. Before launch, confirm the
              final founder name, photo, role, and biography with the client, then replace this
              placeholder with approved content. Do not publish unverified education, metric, or
              career claims.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
