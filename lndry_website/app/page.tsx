import { Hero } from "@/components/home/Hero";
import { ServicesInterlude } from "@/components/home/ServicesInterlude";
import { MarketplaceCompare } from "@/components/home/MarketplaceCompare";
import { CarelineJourney } from "@/components/home/CarelineJourney";
import { Operations } from "@/components/home/Operations";
import { CloseCTA } from "@/components/home/CloseCTA";
import { ProgressRail } from "@/components/home/ProgressRail";
import { LaunchTrustSection } from "@/components/sections/LaunchTrustSection";
import { CustomerReviewsSection } from "@/components/sections/CustomerReviewsSection";

export default function HomePage() {
  return (
    <>
      <ProgressRail />
      <Hero />
      <ServicesInterlude />
      <MarketplaceCompare />
      <CarelineJourney />
      <Operations />
      <LaunchTrustSection />
      <CustomerReviewsSection />
      <CloseCTA />
    </>
  );
}
