import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ServicesInterlude } from "@/components/home/ServicesInterlude";
import { MarketplaceCompare } from "@/components/home/MarketplaceCompare";
import { CarelineJourney } from "@/components/home/CarelineJourney";
import { Operations } from "@/components/home/Operations";
import { AppLaunchSection } from "@/components/home/AppLaunchSection";
import { CloseCTA } from "@/components/home/CloseCTA";
import { ProgressRail } from "@/components/home/ProgressRail";
import { LaunchTrustSection } from "@/components/sections/LaunchTrustSection";
import { CustomerReviewsSection } from "@/components/sections/CustomerReviewsSection";

export const metadata: Metadata = {
  title: "Laundry Service in Pune | Dry Cleaning, Wash & Iron | LNDRY",
  description:
    "Drop your dirty work with LNDRY. Join early access for laundry pickup, dry cleaning, wash and iron, and order tracking across selected Pune launch areas.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Laundry Service in Pune | LNDRY",
    description:
      "Book laundry pickup, dry cleaning, wash and iron, and garment-care services through LNDRY, a trusted laundry marketplace launching in Pune.",
    siteName: "LNDRY",
    type: "website",
    locale: "en_IN",
    images: ["/brand/website-finishing/og/home-og-1200x630.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laundry Service in Pune | LNDRY",
    description:
      "Drop your dirty work. LNDRY is preparing laundry pickup, dry cleaning, wash and iron, and order tracking for Pune.",
    images: ["/brand/website-finishing/og/home-og-1200x630.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <ProgressRail />
      <Hero />
      <ServicesInterlude />
      <MarketplaceCompare />
      <CarelineJourney />
      <Operations />
      <AppLaunchSection />
      <LaunchTrustSection />
      <CustomerReviewsSection />
      <CloseCTA />
    </>
  );
}
