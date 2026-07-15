"use client";

import { usePathname } from "next/navigation";
import { FloatingSupportCTA } from "@/components/layout/FloatingSupportCTA";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function SiteChrome({ position }: { position: "header" | "footer" }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  if (position === "header") {
    return <Header />;
  }

  return (
    <>
      <Footer />
      <FloatingSupportCTA />
    </>
  );
}
