import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { termsSections } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions | LNDRY",
  description: "The terms that govern use of the LNDRY website, marketplace, bookings, and partner participation.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description="The rules and responsibilities that apply to customers, partners, bookings, payments, support, and marketplace use."
      sections={termsSections}
    />
  );
}
