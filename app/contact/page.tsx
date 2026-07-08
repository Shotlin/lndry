import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact LNDRY | Laundry Support & Partner Enquiries in Pune",
  description:
    "Contact LNDRY for laundry service support, dry cleaning enquiries, partner onboarding, privacy requests, and registered office details in Pune.",
  openGraph: {
    title: "Contact LNDRY",
    description: "Customer support, partner enquiries, privacy requests, and registered office details in Pune.",
    images: ["/brand/website-launch/og/contact-og-1200x630.png"],
  },
};

const contactRows = [
  ["General enquiries", company.email],
  ["Customer support", company.supportEmail],
  ["Privacy requests", company.privacyEmail],
  ["Legal and grievances", company.legalEmail],
  ["Phone", company.phonePlaceholder],
  ["WhatsApp", company.whatsappPlaceholder],
  ["Business hours", company.businessHours],
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,#ffffff_0%,#f4f3fb_62%,#eae8ff_100%)] py-20 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <Reveal>
            <SectionEyebrow>Contact Us</SectionEyebrow>
            <h1 className="mt-3 max-w-2xl font-display text-hero text-ink">
              Contact LNDRY for customer support and partner enquiries.
            </h1>
            <p className="mt-6 max-w-xl font-body text-body-lg text-ink-soft">
              Get help with laundry pickup, dry cleaning, order status, privacy requests, legal
              enquiries, and partner onboarding for the LNDRY Pune launch.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`mailto:${company.supportEmail}`}>Email support</Button>
              <Button href="/partners" variant="secondary">
                Become a partner
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-elevated">
              <Image
                src="/brand/website-launch/hero/contact-support-hero-v1.png"
                alt="LNDRY support specialist helping a customer"
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
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionEyebrow>Contact details</SectionEyebrow>
            <h2 className="mt-3 font-display text-headline text-ink">Support details in one place.</h2>
            <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
              Email support is open for early enquiries. Phone and WhatsApp support will be added
              as operational coverage expands.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-xl border border-hairline bg-bg-app p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {contactRows.map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-white p-4">
                    <p className="font-body text-xs font-semibold text-muted">{label}</p>
                    <p className="mt-1 font-display text-base font-semibold text-ink">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-white p-4">
                <p className="font-body text-xs font-semibold text-muted">Registered office</p>
                <p className="mt-1 font-body text-sm leading-relaxed text-ink-soft">{company.registeredOffice}</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
