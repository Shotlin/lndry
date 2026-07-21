"use client";

import Image from "next/image";
import {
  CalendarCheck2,
  ClipboardCheck,
  FileCheck2,
  Gauge,
  GraduationCap,
  Handshake,
  PackageCheck,
  Rocket,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { useScrollReveal } from "@/lib/motion/useScrollReveal";

const OPERATING_SIGNALS = [
  {
    icon: CalendarCheck2,
    title: "More customers",
    body: "Receive booking requests when your service coverage and capacity are a fit.",
  },
  {
    icon: Gauge,
    title: "Technology that keeps work visible",
    body: "Review order details and keep each handover connected to the marketplace journey.",
  },
  {
    icon: PackageCheck,
    title: "Flexible capacity",
    body: "Accept work your team can confidently fulfil, without overcommitting your operation.",
  },
  {
    icon: Handshake,
    title: "Growth built around care",
    body: "Focus on garment care while LNDRY helps bring relevant local demand to your business.",
  },
];

const ONBOARDING_STEPS = [
  {
    icon: Send,
    title: "Submit application",
    body: "Share the basics of your business and where you operate.",
  },
  {
    icon: ShieldCheck,
    title: "Business verification",
    body: "We review the business, service area, and contact details.",
  },
  {
    icon: ClipboardCheck,
    title: "Quality review",
    body: "Service capability, handling, capacity, and delivery readiness are checked.",
  },
  {
    icon: FileCheck2,
    title: "Agreement",
    body: "The operating expectations are made clear before activation.",
  },
  {
    icon: GraduationCap,
    title: "Training",
    body: "Your team is introduced to booking, status, and handover workflows.",
  },
  {
    icon: Rocket,
    title: "Go live",
    body: "Eligible bookings can be routed to your business when capacity fits.",
  },
];

export function PartnerOperatingStory() {
  const scope = useScrollReveal<HTMLElement>({
    selector: ".partner-operating-reveal",
    y: 22,
    stagger: 0.1,
  });

  return (
    <section ref={scope} id="partner-story" className="bg-white py-16 sm:py-20 md:py-24">
      <Container>
        <div className="partner-operating-reveal grid gap-5 border-b border-hairline pb-8 sm:gap-8 sm:pb-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
          <div>
            <p className="font-body text-label font-semibold text-violet">Built around your real operating capacity</p>
            <h2 className="mt-3 max-w-xl font-display text-headline text-ink">
              A connected operation, from the first request to a secure handover.
            </h2>
          </div>
          <p className="max-w-2xl font-body text-base leading-relaxed text-ink-soft sm:text-body-lg">
            LNDRY does not ask a customer to choose from a crowded vendor list. The marketplace checks
            service fit, area, and availability, then sends an eligible order to the right partner.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
          <figure className="partner-operating-reveal relative min-h-[22rem] overflow-hidden rounded-xl bg-lavender-soft shadow-[0_8px_8px_rgba(66,55,145,0.16)] sm:min-h-[31rem]">
            <Image
              src="/brand/website-story/website-partners-operations-system-v1.png"
              alt="A LNDRY partner team coordinating garment care, pickup, and marketplace operations"
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover object-[59%_center]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,243,251,0.82)_0%,rgba(244,243,251,0.1)_45%,rgba(8,15,20,0.04)_100%)]" />

            <div className="absolute left-5 top-5 max-w-[11.5rem] sm:left-7 sm:top-7 sm:max-w-[14rem]">
              <span className="inline-flex items-center rounded-full bg-ink px-3 py-1.5 font-body text-xs font-semibold text-white">
                One operational careline
              </span>
              <p className="mt-3 font-display text-xl font-semibold leading-tight text-ink sm:text-2xl">
                Bookings meet the team that can actually care for them.
              </p>
            </div>

            <div className="absolute bottom-0 right-5 w-28 translate-y-5 sm:right-8 sm:w-36 sm:translate-y-7 lg:w-40">
              <PhoneFrame
                src="/brand/vendor-mockups/new-order-v1.png"
                alt="Vendor view of a new LNDRY order request"
                className="w-full shadow-[0_12px_26px_rgba(8,15,20,0.25)]"
              />
            </div>
          </figure>

          <div className="partner-operating-reveal lg:py-4">
            <p className="font-body text-label font-semibold text-teal">Why join LNDRY</p>
            <dl className="mt-5 divide-y divide-hairline border-y border-hairline">
              {OPERATING_SIGNALS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="grid grid-cols-[2.75rem_1fr] gap-3 py-4 sm:grid-cols-[3.25rem_1fr] sm:gap-4 sm:py-5">
                  <div className="flex size-10 items-center justify-center rounded-full bg-lavender-soft text-violet sm:size-11">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <dt className="font-display text-lg font-semibold text-ink">{title}</dt>
                    <dd className="mt-1 max-w-md font-body text-sm leading-relaxed text-ink-soft">{body}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function PartnerOnboardingJourney() {
  const scope = useScrollReveal<HTMLElement>({
    selector: ".partner-journey-reveal",
    y: 18,
    stagger: 0.08,
  });

  return (
    <section ref={scope} className="relative overflow-hidden bg-ink py-16 text-white sm:py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_9%,rgba(102,76,240,0.28),transparent_25rem)]" />
      <Container className="relative">
        <div className="partner-journey-reveal grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-body text-label font-semibold text-teal">A clear way to join</p>
            <h2 className="mt-3 max-w-xl font-display text-headline text-white">
              Apply, review, then go live with a process your team can follow.
            </h2>
          </div>
          <p className="max-w-2xl font-body text-base leading-relaxed text-white/72 sm:text-body-lg">
            Every step is visible before LNDRY begins routing customer bookings. It gives both the partner
            and the customer a more dependable start.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.73fr_1.27fr] lg:gap-12 lg:items-center">
          <figure className="partner-journey-reveal relative min-h-[22rem] overflow-hidden rounded-md bg-[#121d29] p-5 sm:min-h-[25rem] sm:p-6">
            <div aria-hidden="true" className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet/35 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-16 left-1/3 h-36 w-36 rounded-full bg-teal/20 blur-3xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 font-body text-xs font-semibold text-teal ring-1 ring-white/10">
                Your activation, made visible
              </div>
              <h3 className="mt-3 max-w-sm font-display text-xl font-semibold leading-tight text-white">
                From application review to the first order your team can accept.
              </h3>
            </div>
            <div className="relative z-10 mt-5 grid grid-cols-[0.8fr_1.2fr] items-end gap-3">
              <div className="overflow-hidden rounded-sm bg-white p-1.5 shadow-[0_8px_16px_rgba(0,0,0,0.28)]">
                <Image
                  src="/brand/vendor-mockups/application-v1.png"
                  alt="LNDRY vendor application workflow"
                  width={390}
                  height={844}
                  sizes="(min-width: 1024px) 150px, 36vw"
                  className="h-auto w-full"
                />
              </div>
              <div className="relative overflow-hidden rounded-sm border border-white/10 bg-ink-raised p-2 shadow-[0_8px_16px_rgba(0,0,0,0.22)]">
                <Image
                  src="/brand/vendor-mockups/new-order-v1.png"
                  alt="LNDRY vendor receiving a new order"
                  width={500}
                  height={1000}
                  sizes="(min-width: 1024px) 220px, 48vw"
                  className="h-auto w-full"
                />
                <div className="absolute bottom-3 left-3 rounded-full bg-teal px-2.5 py-1 font-body text-[10px] font-semibold text-ink">Ready for orders</div>
              </div>
            </div>
          </figure>

          <div className="relative">
            <div aria-hidden="true" className="absolute left-[1.35rem] top-7 h-[calc(100%-3.5rem)] w-px bg-[linear-gradient(#7461f4,#0fb5a6)] lg:hidden" />
            <ol className="grid gap-0 sm:grid-cols-2 sm:gap-x-7 lg:grid-cols-3 lg:gap-x-8">
              {ONBOARDING_STEPS.map(({ icon: Icon, title, body }, index) => (
                <li key={title} className="partner-journey-reveal relative grid grid-cols-[3rem_1fr] gap-4 border-b border-white/10 py-5 first:pt-0 sm:py-6 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6 lg:block lg:border-r lg:px-5 lg:py-0 lg:first:pl-0 lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(n+4)]:mt-7 lg:[&:nth-child(n+4)]:border-t lg:[&:nth-child(n+4)]:pt-7">
                  <div className={`relative z-10 flex size-11 items-center justify-center rounded-full ${index === ONBOARDING_STEPS.length - 1 ? "bg-teal text-ink" : "bg-violet text-white"}`}>
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                  </div>
                  <div className="pt-1 lg:pt-4">
                    <p className="font-display text-base font-semibold text-white">{title}</p>
                    <p className="mt-1 max-w-[15rem] font-body text-sm leading-relaxed text-white/62">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="partner-journey-reveal mt-10 flex flex-col gap-3 border-t border-white/12 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-sm leading-relaxed text-white/68">
            Start with four details. LNDRY gathers service, coverage, and capacity information after your initial contact.
          </p>
          <a href="#partner-lead-form" className="w-fit font-body text-sm font-semibold text-teal underline decoration-teal/45 underline-offset-4 transition-colors hover:text-white">
            Start your application
          </a>
        </div>
      </Container>
    </section>
  );
}
