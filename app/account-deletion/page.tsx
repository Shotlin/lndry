import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { deletionSections } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Account & Data Deletion | LNDRY",
  description:
    "How to permanently delete your LNDRY account and data, from the app or without it, and exactly what is deleted, retained, or lost.",
};

export default function AccountDeletionPage() {
  return (
    <LegalPage
      title="Account & Data Deletion"
      description="How to permanently delete your LNDRY account and personal data — with or without the app installed — and exactly what happens when you do."
      sections={deletionSections}
    />
  );
}
