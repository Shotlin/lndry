import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { StepThrough } from "@/components/how-it-works/StepThrough";
import { LNDRYMotionOverlay } from "@/components/overlays/LNDRYMotionOverlay";

const title = "How it works | LNDRY";
const description =
  "A desktop booking story that remains calm and readable, explaining the same auditable journey as the mobile app.";

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

const STATUS_STEPS = ["Pickup OTP", "Processing", "Quality check", "Delivery OTP"];

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,#ffffff_0%,#f4f3fb_62%,#eae8ff_100%)] py-20 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <SectionEyebrow>How it works</SectionEyebrow>
            <h1 className="mt-3 font-display text-headline text-ink">
              A calm, auditable path from booking to handover
            </h1>
            <p className="mt-5 max-w-xl font-body text-body-lg text-ink-soft">
              The same journey as the app, explained with the extra room a desktop screen gives
              you: no new promises, just clearer booking guidance.
            </p>
            <div className="mt-8">
              <Button href="/marketplace">Start booking</Button>
            </div>
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
            <SectionEyebrow tone="onDark">Status visibility</SectionEyebrow>
            <h2 className="mt-3 font-display text-headline text-white">
              Status visibility after checkout
            </h2>
            <p className="mt-4 font-body text-base text-white/70">
              Pickup OTP, partner processing and quality checks are explained clearly, without
              implying unsupported live rider maps.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATUS_STEPS.map((label, i) => (
                <div
                  key={label}
                  className={`rounded-lg border p-6 text-center ${
                    i < 2 ? "border-violet bg-violet" : "border-ink-line bg-ink-raised"
                  }`}
                >
                  <p className={`font-display text-2xl font-bold ${i < 2 ? "text-white" : "text-white/40"}`}>
                    {i === 0 ? "✓" : i + 1}
                  </p>
                  <p className={`mt-2 font-body text-xs font-semibold ${i < 2 ? "text-white" : "text-white/60"}`}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <LNDRYMotionOverlay variant="otp-verified" className="mx-auto w-full max-w-xs" />
          </div>
        </Container>
      </section>

      <section className="bg-bg-app py-20 text-center">
        <Container className="flex flex-col items-center">
          <h2 className="max-w-xl font-display text-headline text-ink">
            Web checkout is the same LNDRY journey, at a larger scale
          </h2>
          <p className="mt-4 max-w-lg font-body text-base text-ink-soft">
            Desktop users see more booking context, not extra features the platform hasn&rsquo;t
            approved.
          </p>
          <div className="mt-8">
            <Button href="/marketplace">See recommendation flow</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
