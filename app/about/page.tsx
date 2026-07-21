import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Eye,
  GraduationCap,
  Handshake,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { DpiitRecognitionCard } from "@/components/ui/DpiitRecognitionCard";
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

const marketplacePrinciples = [
  {
    title: "A match people can trust",
    body: "Customers can discover eligible local garment-care professionals with clearer service and partner information before booking.",
    icon: BadgeCheck,
  },
  {
    title: "A booking people can follow",
    body: "Pickup, processing, quality checks, delivery, and support are presented as visible parts of one care journey.",
    icon: Eye,
  },
  {
    title: "A platform built with local teams",
    body: "Laundry businesses get an operating layer that helps them manage demand while keeping care quality central.",
    icon: Handshake,
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#ffffff_0%,#f4f3fb_60%,#eae8ff_100%)] py-16 sm:py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-12">
          <Reveal>
            <SectionEyebrow>About LNDRY</SectionEyebrow>
            <h1 className="mt-3 max-w-2xl font-display text-hero text-ink [text-wrap:balance]">
              A clearer way to find trusted garment care.
            </h1>
            <p className="mt-5 max-w-xl font-body text-body-lg text-ink-soft [text-wrap:pretty]">
              LNDRY is a Pune-based marketplace for laundry, dry cleaning, and specialist garment
              care. We connect customers with carefully reviewed local professionals, then make
              each booking easier to understand from pickup to handover.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              <Pill tone="violet">Pune-based marketplace</Pill>
              <Pill tone="teal">DPIIT recognised startup</Pill>
            </div>

            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <Button href="/#early-access" className="w-full sm:w-auto">
                Book pickup
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Button>
              <Button href="/partners" variant="secondary" className="w-full sm:w-auto">
                Partner with LNDRY
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-elevated">
              <Image
                src="/brand/website-launch/hero/about-us-company-hero-v1.png"
                alt="Garment-care professionals reviewing a customer order in a LNDRY partner studio"
                fill
                priority
                sizes="(min-width: 1024px) 680px, 94vw"
                className="object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 flex max-w-xs items-start gap-3 rounded-lg bg-ink/90 p-4 text-white shadow-soft sm:inset-x-6 sm:bottom-6">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal text-ink">
                  <ShieldCheck className="size-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-body text-xs font-semibold uppercase tracking-[0.12em] text-teal">
                    Care made visible
                  </span>
                  <span className="mt-1 block font-display text-sm font-semibold leading-snug sm:text-base">
                    Better information before a garment changes hands.
                  </span>
                </span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
          <Reveal>
            <SectionEyebrow>Company details</SectionEyebrow>
            <h2 className="mt-3 max-w-xl font-display text-headline text-ink [text-wrap:balance]">
              A marketplace customers and care teams can verify.
            </h2>
            <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-ink-soft [text-wrap:pretty]">
              We publish the details behind LNDRY so customers, partners, and service providers can
              identify the company operating the marketplace.
            </p>

            <dl className="mt-8 overflow-hidden rounded-xl border border-hairline bg-bg-app">
              <div className="border-b border-hairline px-5 py-5 sm:px-6">
                <dt className="flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  <Building2 className="size-4 text-violet" aria-hidden="true" />
                  Legal entity
                </dt>
                <dd className="mt-2 font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
                  {company.legalName}
                </dd>
              </div>
              <div className="grid sm:grid-cols-2">
                <div className="border-b border-hairline px-5 py-5 sm:border-b-0 sm:border-r sm:px-6">
                  <dt className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    Corporate identity number
                  </dt>
                  <dd className="mt-2 font-body text-sm font-semibold text-ink">{company.cin}</dd>
                </div>
                <div className="px-5 py-5 sm:px-6">
                  <dt className="flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    <MapPin className="size-4 text-violet" aria-hidden="true" />
                    Registered office
                  </dt>
                  <dd className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                    {company.registeredOffice}
                  </dd>
                </div>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative overflow-hidden rounded-xl bg-ink p-6 text-white md:p-8">
              <div className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-violet/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 left-16 size-52 rounded-full bg-teal/20 blur-3xl" />
              <div className="relative">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                  Official recognition
                </p>
                <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold tracking-tight text-white [text-wrap:balance]">
                  Registered as a startup, built for real care operations.
                </h2>
                <p className="mt-4 max-w-lg font-body text-sm leading-relaxed text-white/74">
                  LNDRY&apos;s DPIIT Startup Recognition confirms the company&apos;s startup registration.
                  Open the official certificate to review its reference details.
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <Pill tone="onDark">Certificate no. DIPP269393</Pill>
                  <Pill tone="onDark">Issued 27 June 2026</Pill>
                </div>
                <div className="mt-7">
                  <DpiitRecognitionCard />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-ink py-16 text-white sm:py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal>
            <SectionEyebrow tone="onDark">What LNDRY is here to improve</SectionEyebrow>
            <h2 className="mt-3 max-w-xl font-display text-headline text-white [text-wrap:balance]">
              Good garment care starts with a more confident decision.
            </h2>
            <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-white/72 [text-wrap:pretty]">
              Local professionals already carry the craft. LNDRY focuses on the parts around that
              craft: discovery, service clarity, visible handovers, and a reliable route to support.
            </p>

            <div className="mt-8 border-t border-white/15 pt-6">
              <p className="font-display text-xl font-semibold text-white">Our mission</p>
              <p className="mt-2 max-w-lg font-body text-sm leading-relaxed text-white/70">
                Make trusted garment care more transparent and accessible through verified partners
                and practical marketplace technology.
              </p>
            </div>
          </Reveal>

          <div className="divide-y divide-white/15 border-y border-white/15">
            {marketplacePrinciples.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <Reveal key={principle.title} delay={index * 0.06}>
                  <article className="grid gap-4 py-6 sm:grid-cols-[3.25rem_1fr] sm:items-start sm:gap-5 sm:py-7">
                    <span className="flex size-12 items-center justify-center rounded-full bg-white/10 text-teal">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white">{principle.title}</h3>
                      <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-white/70">
                        {principle.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-bg-app py-16 sm:py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
          <Reveal>
            <div className="relative overflow-hidden rounded-xl bg-[linear-gradient(145deg,#16162b_0%,#080f14_58%,#21134f_100%)] p-6 text-white md:p-8">
              <div className="pointer-events-none absolute -right-20 top-4 size-52 rounded-full bg-violet/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-28 left-2 size-56 rounded-full bg-teal/15 blur-3xl" />
              <div className="relative">
                <div className="flex size-16 items-center justify-center rounded-full bg-white font-display text-xl font-bold text-violet-deep">
                  AK
                </div>
                <p className="mt-7 font-body text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                  Founder &amp; CEO
                </p>
                <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white">
                  {founder.name}
                </h2>
                <p className="mt-3 font-body text-sm font-semibold text-white/76">{founder.descriptor}</p>

                <blockquote className="mt-8 border-t border-white/15 pt-6 font-body text-base leading-relaxed text-white/82">
                  <p>&ldquo;{founder.quote}&rdquo;</p>
                </blockquote>

                <div className="mt-7 grid gap-3 border-t border-white/15 pt-6 sm:grid-cols-3">
                  <div>
                    <GraduationCap className="size-4 text-teal" aria-hidden="true" />
                    <p className="mt-2 font-body text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
                      Education
                    </p>
                    <p className="mt-1 font-display text-sm font-semibold text-white">{founder.education}</p>
                  </div>
                  <div>
                    <Building2 className="size-4 text-teal" aria-hidden="true" />
                    <p className="mt-2 font-body text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
                      Experience
                    </p>
                    <p className="mt-1 font-body text-sm leading-snug text-white/80">{founder.experience}</p>
                  </div>
                  <div>
                    <MapPin className="size-4 text-teal" aria-hidden="true" />
                    <p className="mt-2 font-body text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
                      Based in
                    </p>
                    <p className="mt-1 font-body text-sm font-semibold text-white">{founder.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <SectionEyebrow>Founder story</SectionEyebrow>
            <h2 className="mt-3 max-w-xl font-display text-headline text-ink [text-wrap:balance]">
              Founder-led, with the day-to-day reality of care in view.
            </h2>
            <div className="mt-5 flex max-w-xl flex-col gap-4 font-body text-base leading-relaxed text-ink-soft [text-wrap:pretty]">
              {founder.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-9">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-violet">
                The path to LNDRY
              </p>
              <ol className="mt-4 divide-y divide-hairline border-y border-hairline bg-white">
                {founder.timeline.map((step, index) => (
                  <li key={step} className="grid grid-cols-[2.5rem_1fr] items-center gap-4 px-5 py-4 sm:grid-cols-[3rem_1fr] sm:px-6">
                    <span className="flex size-8 items-center justify-center rounded-full bg-lavender-soft font-body text-xs font-bold text-violet-deep">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body text-sm font-medium leading-relaxed text-ink-soft">{step}</span>
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
