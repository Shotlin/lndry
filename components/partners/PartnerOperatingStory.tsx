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
          <figure className="partner-journey-reveal relative min-h-[25rem] overflow-hidden rounded-md bg-[#121d29] sm:min-h-[29rem]">
            <Image
              src="/brand/illustrations/partner-activation-story-v1.png"
              alt="Indian laundry owner moving from LNDRY application review to a ready-for-orders garment-care studio"
              fill
              sizes="(min-width: 1024px) 460px, 100vw"
              className="object-cover object-[66%_center]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,15,20,0.96)_0%,rgba(8,15,20,0.78)_35%,rgba(8,15,20,0.08)_82%)]" />
            <div className="relative z-10 flex h-full min-h-[25rem] max-w-[13rem] flex-col justify-between p-5 sm:min-h-[29rem] sm:max-w-[15rem] sm:p-6">
              <div>
                <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 font-body text-xs font-semibold text-teal ring-1 ring-white/10">
                  Your activation, made visible
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold leading-tight text-white sm:text-2xl">
                  A partner journey with a visible destination.
                </h3>
              </div>
              <ol className="space-y-2.5">
                {[
                  ["01", "Application received"],
                  ["02", "Quality reviewed"],
                  ["03", "Ready for orders"],
                ].map(([number, label], index) => (
                  <li key={label} className="flex items-center gap-2.5">
                    <span className={`flex size-6 items-center justify-center rounded-full font-body text-[10px] font-bold ${index === 2 ? "bg-teal text-ink" : "bg-white/12 text-white"}`}>{number}</span>
                    <span className="font-body text-xs font-medium text-white/85">{label}</span>
                  </li>
                ))}
              </ol>
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
