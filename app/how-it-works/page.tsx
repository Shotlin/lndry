import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, PackageCheck, ScanSearch, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { StepThrough } from "@/components/how-it-works/StepThrough";
import { LNDRYMotionOverlay } from "@/components/overlays/LNDRYMotionOverlay";

const title = "How it works | LNDRY";
const description =
  "See how LNDRY moves from service choice and pickup to garment care, quality checks, and secure delivery in Pune.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "LNDRY",
    type: "website",
    images: ["/brand/website-finishing/og/journey-og-1200x630.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/brand/website-finishing/og/journey-og-1200x630.png"],
  },
};

const STATUS_STEPS = [
  { title: "Pickup confirmed", copy: "A pickup window and handover are confirmed.", icon: PackageCheck },
  { title: "Care in progress", copy: "Your partner starts the selected garment-care route.", icon: ScanSearch },
  { title: "Quality checked", copy: "Care notes and the finishing stage are reviewed.", icon: CheckCircle2 },
  { title: "Secure delivery", copy: "A final OTP helps complete the handover.", icon: ShieldCheck },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,#ffffff_0%,#f4f3fb_62%,#eae8ff_100%)] py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <SectionEyebrow>How it works</SectionEyebrow>
            <h1 className="mt-3 font-display text-headline text-ink">From your first choice to a secure final handover.</h1>
            <p className="mt-5 max-w-xl font-body text-body-lg text-ink-soft">
              Choose the care you need, confirm a pickup window, and follow the clear milestones that move your garments from your door back to you.
            </p>
            <div className="mt-8"><Button href="/marketplace">Start booking</Button></div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-elevated">
            <Image
              src="/brand/website-story/website-how-it-works-careline-journey-v1.png"
              alt="A chain of LNDRY partners handing off a garment bag along the careline, door to door"
              fill
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-cover"
              priority
            />
          </div>
        </Container>
      </section>

      <StepThrough />

      <section className="relative overflow-hidden bg-ink py-20 md:py-24">
        <Container className="relative">
          <div className="max-w-2xl">
            <SectionEyebrow tone="onDark">Your careline, clearly visible</SectionEyebrow>
            <h2 className="mt-3 font-display text-headline text-white">A sequence you can understand at a glance.</h2>
            <p className="mt-4 font-body text-base text-white/70">
              Receive useful updates at pickup, during care, after quality checks, and when your garments are ready for a secure delivery handover.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <ol className="relative grid gap-3 sm:grid-cols-4 sm:gap-4">
              <div className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-[linear-gradient(90deg,#0fb5a6_0%,#826df7_48%,#0fb5a6_100%)] sm:block" aria-hidden="true" />
              {STATUS_STEPS.map(({ title: label, copy, icon: Icon }, index) => (
                <li key={label} className="relative grid grid-cols-[3.25rem_1fr] gap-3 rounded-xl bg-white/[0.06] p-4 ring-1 ring-white/10 sm:block sm:bg-transparent sm:p-0 sm:ring-0">
                  <span className="relative z-10 flex size-12 items-center justify-center rounded-full border border-white/20 bg-ink text-teal shadow-[0_0_0_5px_rgba(8,15,20,0.86)] sm:mx-auto"><Icon className="size-5" aria-hidden="true" strokeWidth={1.8} /></span>
                  <div className="sm:mt-5 sm:text-center">
                    <p className="font-display text-sm font-semibold text-white">{label}</p>
                    <p className="mt-1 font-body text-xs leading-relaxed text-white/60">{copy}</p>
                  </div>
                  <span className="absolute bottom-3 right-4 font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-white/32 sm:bottom-auto sm:right-auto sm:left-1/2 sm:top-14 sm:-translate-x-1/2">0{index + 1}</span>
                </li>
              ))}
            </ol>
            <LNDRYMotionOverlay variant="otp-verified" className="mx-auto w-full max-w-xs" />
          </div>
        </Container>
      </section>

      <section className="bg-bg-app py-20 text-center">
        <Container className="flex flex-col items-center">
          <h2 className="max-w-xl font-display text-headline text-ink">Ready to start your care journey?</h2>
          <p className="mt-4 max-w-lg font-body text-base text-ink-soft">
            Start with one service choice. LNDRY makes the next step clear: a suitable partner, a pickup window, and a visible care route.
          </p>
          <div className="mt-8"><Button href="/marketplace">See recommendation flow</Button></div>
        </Container>
      </section>
    </>
  );
}
