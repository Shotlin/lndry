import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacySections } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | LNDRY",
  description: "How LNDRY collects, uses, shares, and protects personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How LNDRY collects, uses, shares, stores, and protects personal information for customers, partners, and website visitors."
      sections={privacySections}
    />
  );
}
