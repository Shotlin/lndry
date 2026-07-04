import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { legalPolicies } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Legal | LNDRY",
  description: "LNDRY legal pages for privacy, terms, refund and cancellation, and delivery policy.",
};

export default function LegalHubPage() {
  return (
    <section className="bg-[linear-gradient(135deg,#ffffff_0%,#f4f3fb_62%,#eae8ff_100%)] py-20 md:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionEyebrow>Legal hub</SectionEyebrow>
          <h1 className="mt-3 font-display text-hero text-ink">Payment gateway readiness starts with clear policies.</h1>
          <p className="mt-6 max-w-xl font-body text-body-lg text-ink-soft">
            These pages cover the minimum policy set requested in the client feedback document.
            They should be reviewed by legal counsel before payment gateway submission.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Image
            src="/brand/website-launch/components/payment-gateway-readiness-checklist.svg"
            alt="LNDRY payment gateway readiness checklist"
            width={1200}
            height={640}
            className="h-auto w-full rounded-xl shadow-soft"
          />
        </Reveal>

        <div className="lg:col-span-2 grid gap-4 md:grid-cols-2">
          {legalPolicies.map((policy, index) => (
            <Reveal key={policy.href} delay={index * 0.04}>
              <Link href={policy.href} className="block h-full rounded-lg border border-hairline bg-white p-6 hover:border-violet">
                <h2 className="font-display text-xl font-semibold text-ink">{policy.title}</h2>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">{policy.body}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
