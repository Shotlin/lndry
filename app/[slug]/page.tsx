import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { locationPages, trustSignals } from "@/lib/data/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return locationPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = locationPages.find((item) => item.slug === slug);
  if (!page) return {};

  return {
    title: `${page.title} | LNDRY`,
    description: `${page.service} launch information for ${page.area}. Join early access and learn how LNDRY recommends eligible laundry partners near you.`,
    openGraph: {
      title: `${page.title} | LNDRY`,
      description: `${page.service} launch information for ${page.area}.`,
      images: ["/brand/website-launch/og/launch-og-1200x630.png"],
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const page = locationPages.find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <>
      <section className="bg-[linear-gradient(135deg,#ffffff_0%,#f4f3fb_62%,#eae8ff_100%)] py-20 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <Reveal>
            <SectionEyebrow>{`${page.area} launch page`}</SectionEyebrow>
            <h1 className="mt-3 max-w-2xl font-display text-hero text-ink">{page.title}</h1>
            <p className="mt-6 max-w-xl font-body text-body-lg text-ink-soft">
              LNDRY is preparing a trust-first garment-care marketplace experience for {page.area}.
              Customers should be able to enter their address, get one eligible recommended
              partner, and book without calling multiple shops.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/#early-access">Join early access</Button>
              <Button href="/how-it-works" variant="secondary">
                How booking works
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Image
              src="/brand/website-launch/components/seo-location-page-template.svg"
              alt={`LNDRY ${page.title} page visual`}
              width={1200}
              height={640}
              className="h-auto w-full rounded-xl shadow-soft"
              priority
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-24">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionEyebrow>Why this page exists</SectionEyebrow>
            <h2 className="mt-3 font-display text-headline text-ink">
              Local trust matters before marketplace conversion.
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
              The client asked for dedicated location pages to improve organic discovery. Keep
              these pages honest: say LNDRY is launching in selected Pune areas until live service
              availability is confirmed.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trustSignals.slice(0, 6).map((signal, index) => (
              <Reveal key={signal.title} delay={index * 0.035}>
                <article className="h-full rounded-lg border border-hairline bg-bg-app p-6">
                  <Pill tone={index === 4 ? "violet" : "teal"}>{signal.title}</Pill>
                  <p className="mt-4 font-body text-sm leading-relaxed text-ink-soft">{signal.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
