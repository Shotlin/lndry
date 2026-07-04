import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { deliverySections } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Delivery Policy | LNDRY",
  description: "LNDRY pickup windows, handover checks, order status updates, delivery attempts, and service areas.",
};

export default function DeliveryPolicyPage() {
  return (
    <LegalPage
      title="Delivery Policy"
      description="How pickup windows, order status, handover verification, delivery attempts, and launch-area coverage should be communicated."
      sections={deliverySections}
    />
  );
}
