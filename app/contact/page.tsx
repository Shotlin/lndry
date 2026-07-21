import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowUpRight,
  Building2,
  Clock3,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
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

const supportChannels = [
  {
    label: "Customer support",
    value: "Chat on WhatsApp",
    detail: "Quick help with booking, pickup, and order questions.",
    href: company.whatsappHref,
    icon: MessageCircle,
    tone: "bg-teal-tint text-teal",
  },
  {
    label: "Call LNDRY",
    value: company.phonePlaceholder,
    detail: "Talk through an order or service enquiry.",
    href: company.supportPhoneHref,
    icon: Phone,
    tone: "bg-lavender-soft text-violet",
  },
  {
    label: "Email support",
    value: company.supportEmail,
    detail: "For business enquiries and detailed order help.",
    href: `mailto:${company.supportEmail}`,
    icon: Mail,
    tone: "bg-surface-cool text-violet-deep",
  },
  {
    label: "Partner team",
    value: "Become a LNDRY partner",
    detail: "Start your laundry-business onboarding enquiry.",
    href: "/partners#partner-lead-form",
    icon: Building2,
    tone: "bg-violet text-white",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,#ffffff_0%,#f4f3fb_62%,#eae8ff_100%)] py-16 sm:py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-12">
          <Reveal>
            <SectionEyebrow>Contact Us</SectionEyebrow>
            <h1 className="mt-3 max-w-2xl font-display text-hero text-ink">
              Customer support that stays with your order.
            </h1>
            <p className="mt-5 max-w-xl font-body text-body-lg text-ink-soft">
              Get help with pickup, garment care, order questions, privacy requests, and partner
              enquiries from one LNDRY support team.
            </p>

            <div className="mt-8 grid max-w-md gap-3 sm:flex sm:flex-wrap">
              <Button href={company.whatsappHref} className="w-full sm:w-auto">
                <MessageCircle className="size-4" aria-hidden="true" />
                Chat on WhatsApp
              </Button>
              <Button href={company.supportPhoneHref} variant="secondary" className="w-full sm:w-auto">
                <Phone className="size-4" aria-hidden="true" />
                Call support
              </Button>
            </div>
            <a
              href={`mailto:${company.supportEmail}`}
              className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-violet transition-colors hover:text-violet-deep"
            >
              Prefer email? Write to {company.supportEmail}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-elevated">
              <Image
                src="/brand/website-launch/hero/contact-support-hero-v1.webp"
                alt="LNDRY support specialist helping a customer"
                fill
                priority
                sizes="(min-width: 1024px) 620px, 94vw"
                className="object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-lg border border-white/35 bg-ink/80 p-3 text-white shadow-elevated backdrop-blur sm:inset-x-6 sm:bottom-6 sm:p-4">
                <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-teal text-ink">
                  <span className="absolute inset-0 rounded-full bg-teal motion-safe:animate-ping" />
                  <ShieldCheck className="relative size-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-body text-xs font-semibold uppercase tracking-[0.12em] text-teal">
                    Order support
                  </span>
                  <span className="mt-0.5 block font-display text-sm font-semibold sm:text-base">
                    One team from pickup to handover
                  </span>
                </span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
          <Reveal>
            <SectionEyebrow>Need Help?</SectionEyebrow>
            <h2 className="mt-3 max-w-lg font-display text-headline text-ink">
              Choose the quickest way to reach us.
            </h2>
            <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-ink-soft">
              Start on WhatsApp for fast order support, call for an immediate conversation, email
              when you need to share details, or speak to the partner team about joining LNDRY.
            </p>

            <div className="mt-7 grid max-w-xl gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-hairline bg-bg-app p-5 shadow-soft">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-teal-tint text-teal">
                    <MessageCircle className="size-5" aria-hidden="true" />
                  </span>
                  <span className="relative flex size-2.5 rounded-full bg-teal">
                    <span className="absolute inset-0 rounded-full bg-teal motion-safe:animate-ping" />
                  </span>
                </div>
                <p className="mt-5 font-body text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Average reply
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-ink">Within 10 min</p>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                  A clear first response for order support.
                </p>
              </div>

              <div className="rounded-xl border border-hairline bg-ink p-5 text-white shadow-elevated">
                <span className="flex size-10 items-center justify-center rounded-full bg-white/10 text-teal">
                  <Clock3 className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-5 font-body text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                  Support hours
                </p>
                <p className="mt-1 font-display text-2xl font-semibold">8 AM - 9 PM</p>
                <p className="mt-2 font-body text-sm leading-relaxed text-white/68">Monday to Sunday</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-xl border border-hairline bg-bg-app shadow-soft">
              <div className="border-b border-hairline bg-white px-5 py-5 sm:px-6">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-violet">
                  Support channels
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl">
                  Reach the right LNDRY team in one tap.
                </h3>
              </div>

              <div className="grid gap-px bg-hairline sm:grid-cols-2">
                {supportChannels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <a
                      key={channel.label}
                      href={channel.href}
                      className="group relative bg-white p-5 transition-colors hover:bg-lavender-soft focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-violet focus-visible:outline-offset-[-2px] sm:min-h-48"
                    >
                      <span className={`flex size-10 items-center justify-center rounded-full ${channel.tone}`}>
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="mt-5 block pr-7 font-body text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                        {channel.label}
                      </span>
                      <span className="mt-2 block font-display text-base font-semibold leading-snug text-ink">
                        {channel.value}
                      </span>
                      <span className="mt-2 block max-w-xs font-body text-sm leading-relaxed text-ink-soft">
                        {channel.detail}
                      </span>
                      <ArrowUpRight className="absolute right-5 top-5 size-4 text-violet opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>

              <div className="border-t border-hairline bg-white p-5 sm:p-6">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Registered office
                </p>
                <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-ink-soft">
                  {company.registeredOffice}
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
