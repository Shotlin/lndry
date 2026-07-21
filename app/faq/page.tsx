import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, CalendarCheck2, CircleHelp, PackageCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { company } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "FAQ | LNDRY",
  description:
    "Clear answers about booking, pricing, verified partner recommendations, order care, support, delivery, and refunds at LNDRY.",
};

const FAQ_GROUPS = [
  {
    id: "faq-booking",
    label: "Booking & pricing",
    title: "Plan the pickup",
    description: "Choose the care you need, review the estimate, then select a pickup window.",
    icon: CalendarCheck2,
    questions: [
      {
        q: "How does LNDRY work?",
        a: "Choose the service your garments need and share your pickup area. LNDRY recommends an eligible nearby partner, then you review the estimate and pickup window before confirming your booking.",
      },
      {
        q: "How long does delivery take?",
        a: "Turnaround depends on the service, garment-care requirement, pickup slot, and partner capacity. The applicable delivery estimate is shown before you confirm the booking.",
      },
      {
        q: "How do I pay?",
        a: "Available payment methods and the applicable estimate are shown before confirmation. Cash payment appears only when it is offered for your selected service and area.",
      },
    ],
  },
  {
    id: "faq-partner",
    label: "Partner selection",
    title: "Know who will handle your garments",
    description: "LNDRY recommends one eligible partner instead of asking you to compare every local laundry.",
    icon: BadgeCheck,
    questions: [
      {
        q: "Who washes my clothes?",
        a: "Your garments are handled by a verified laundry partner that matches your service need, pickup area, availability, and delivery requirement.",
      },
      {
        q: "How are partners selected?",
        a: "LNDRY checks service eligibility, area coverage, capacity, timing, and marketplace quality signals before making a recommendation. The goal is one clear next step, not a crowded vendor list.",
      },
    ],
  },
  {
    id: "faq-order-care",
    label: "Order care",
    title: "Follow the care journey",
    description: "Pickup, processing, quality check, and delivery are presented as clear order stages.",
    icon: PackageCheck,
    questions: [
      {
        q: "Can I track my order?",
        a: "LNDRY keeps the available order stages visible, including pickup, processing, quality check, delivery, and completion. Continuous rider-map tracking is not presented unless it is available for that order.",
      },
      {
        q: "What if my clothes are damaged?",
        a: "Contact support promptly with your order details and photos. LNDRY reviews the concern with the partner against garment notes, care labels, and the applicable refund or liability policy.",
      },
    ],
  },
  {
    id: "faq-support",
    label: "Support & policies",
    title: "Get help without starting over",
    description: "One support path covers booking questions, order concerns, cancellations, and policy requests.",
    icon: CircleHelp,
    questions: [
      {
        q: "What if something goes wrong with my order?",
        a: `Contact the LNDRY support team at ${company.supportEmail} with your order details and any relevant photos. The team will guide you through the next step for your concern.`,
      },
      {
        q: "How do refunds and cancellations work?",
        a: "Refunds, cancellations, re-service, and credits follow the published Refund & Cancellation Policy. Review the policy before payment, or contact support if you need help with an existing order.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#ffffff_0%,#f4f3fb_62%,#eae8ff_100%)] py-16 sm:py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
          <div>
            <SectionEyebrow>Help centre</SectionEyebrow>
            <h1 className="mt-3 max-w-3xl text-balance font-display text-hero text-ink">
              Answers before your first pickup.
            </h1>
            <p className="mt-5 max-w-2xl font-body text-body-lg text-ink-soft">
              Start with the part of the journey you need. Each route explains what happens next,
              from choosing care to a secure handover.
            </p>

            <nav aria-label="FAQ topics" className="mt-8 grid gap-3 sm:grid-cols-2">
              {FAQ_GROUPS.map((topic) => {
                const Icon = topic.icon;
                return (
                  <a
                    key={topic.id}
                    href={`#${topic.id}`}
                    className="group flex min-h-16 items-center gap-3 rounded-md bg-white px-4 py-3 ring-1 ring-hairline transition-colors duration-300 hover:bg-lavender-soft hover:ring-violet focus-visible:outline-2 focus-visible:outline-violet focus-visible:outline-offset-2"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-lavender-soft text-violet transition-transform duration-300 group-hover:scale-105">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-body text-sm font-semibold text-ink">{topic.label}</span>
                      <span className="mt-0.5 block font-body text-xs leading-snug text-ink-soft">{topic.description}</span>
                    </span>
                    <ArrowUpRight className="ml-auto size-4 shrink-0 text-violet transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="relative isolate overflow-hidden rounded-xl bg-ink p-5 text-white sm:p-7">
            <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-violet/35 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-12 size-48 rounded-full bg-teal/20 blur-3xl" />

            <div className="relative">
              <p className="font-body text-sm font-semibold text-lavender-electric">The LNDRY support path</p>
              <h2 className="mt-3 max-w-lg text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Clear signals at the moments customers care about.
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-[0.86fr_1.14fr] sm:items-stretch">
                <div className="flex flex-col justify-between rounded-lg bg-white p-4 text-ink">
                  <div className="relative h-24 w-full">
                    <Image
                      src="/brand/website-finishing/overlays/verified-partner-badge.svg"
                      alt=""
                      fill
                      sizes="180px"
                      className="object-contain object-left"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="font-body text-xs font-semibold text-violet">Partner recommendation</p>
                    <p className="mt-1 font-display text-lg font-semibold">Verified before booking</p>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-lg bg-white/[0.08] p-4 ring-1 ring-white/15">
                  <div className="absolute right-3 top-3 rounded-full bg-teal-tint px-2.5 py-1 font-body text-[11px] font-semibold text-ink">
                    Secure handover
                  </div>
                  <div className="relative h-28 w-full">
                    <Image
                      src="/brand/website-finishing/overlays/otp-verified-handoff-card.svg"
                      alt=""
                      fill
                      sizes="260px"
                      className="object-contain object-left"
                    />
                  </div>
                  <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-white/75">
                    Pickup and delivery can be confirmed through the defined OTP handover flow.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/12 pt-5 font-body text-sm text-white/72">
                <span className="inline-flex items-center gap-2"><BadgeCheck className="size-4 text-teal" aria-hidden="true" />Recommended partner</span>
                <span className="inline-flex items-center gap-2"><PackageCheck className="size-4 text-teal" aria-hidden="true" />Visible care stages</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.31fr_0.69fr] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-xl bg-ink p-6 text-white sm:p-7">
              <p className="font-body text-sm font-semibold text-lavender-electric">Quick support</p>
              <h2 className="mt-3 text-balance font-display text-2xl font-semibold leading-tight">
                Find the next answer, then take the next action.
              </h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-white/75">
                For a live order concern, support is available every day from 8:00 AM to 9:00 PM.
              </p>
              <a
                href={`mailto:${company.supportEmail}`}
                className="mt-6 flex min-h-12 items-center justify-between gap-3 rounded-md bg-white px-4 py-3 font-body text-sm font-semibold text-ink transition-colors hover:bg-lavender-soft focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                <span className="min-w-0 truncate">Email support</span>
                <ArrowUpRight className="size-4 shrink-0 text-violet" aria-hidden="true" />
              </a>
              <p className="mt-3 break-words font-body text-xs text-white/58">{company.supportEmail}</p>
            </div>

            <nav aria-label="FAQ section links" className="mt-5 hidden lg:grid lg:gap-1">
              {FAQ_GROUPS.map((topic) => (
                <a
                  key={topic.id}
                  href={`#${topic.id}`}
                  className="rounded-sm px-3 py-2.5 font-body text-sm font-semibold text-ink-soft transition-colors hover:bg-lavender-soft hover:text-violet focus-visible:outline-2 focus-visible:outline-violet focus-visible:outline-offset-2"
                >
                  {topic.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="space-y-10 md:space-y-14">
            {FAQ_GROUPS.map((group, groupIndex) => {
              const Icon = group.icon;
              return (
                <section key={group.id} id={group.id} className="scroll-mt-28" aria-labelledby={`${group.id}-title`}>
                  <div className="flex items-start gap-4 border-b border-hairline pb-5">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-lavender-soft text-violet">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-body text-sm font-semibold text-violet">{group.label}</p>
                      <h2 id={`${group.id}-title`} className="mt-1 text-balance font-display text-2xl font-semibold text-ink md:text-3xl">
                        {group.title}
                      </h2>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3">
                    {group.questions.map((item, questionIndex) => (
                      <details
                        key={item.q}
                        open={groupIndex === 0 && questionIndex === 0}
                        className="group rounded-lg bg-bg-app p-5 ring-1 ring-hairline transition-colors open:bg-white open:ring-violet md:p-6"
                      >
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-5 rounded-sm focus-visible:outline-2 focus-visible:outline-violet focus-visible:outline-offset-4">
                          <span className="font-display text-lg font-semibold leading-snug text-ink md:text-xl">{item.q}</span>
                          <span aria-hidden="true" className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-white font-display text-xl text-violet ring-1 ring-hairline transition-transform duration-300 group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <div className="mt-5 border-t border-hairline pt-5">
                          <p className="max-w-3xl font-body text-sm leading-relaxed text-ink-soft md:text-base">{item.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-bg-app py-16 sm:py-20">
        <Container className="flex flex-col gap-5 rounded-xl bg-violet px-6 py-8 text-white sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-body text-sm font-semibold text-white/75">Need help with a specific order?</p>
            <h2 className="mt-2 text-balance font-display text-2xl font-semibold">Our support team can guide the next step.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact" variant="secondary" className="border-white/25 bg-white text-violet hover:border-white">
              Contact support
            </Button>
            <Link
              href={company.whatsappHref}
              className="inline-flex h-13 items-center justify-center rounded-sm border border-white/40 px-6 font-display text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Chat on WhatsApp
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
