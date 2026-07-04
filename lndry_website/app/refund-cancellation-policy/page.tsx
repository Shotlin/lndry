import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { refundSections } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | LNDRY",
  description: "How LNDRY handles cancellations, refund eligibility, service issues, and support requests.",
};

export default function RefundCancellationPolicyPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      description="A clear customer-facing policy for cancellations, service issues, refund review, and support escalation."
      sections={refundSections}
    />
  );
}
