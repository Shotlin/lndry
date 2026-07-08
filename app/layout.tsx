import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/lib/motion/SmoothScrollProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingSupportCTA } from "@/components/layout/FloatingSupportCTA";
import { company, launchAreas, partnerServiceCategories } from "@/lib/data/site";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://lndry.in";
const title = "LNDRY | Laundry Service & Dry Cleaning Marketplace in Pune";
const description =
  "Drop your dirty work with LNDRY. Book laundry pickup, wash and iron, dry cleaning, and garment-care services in Pune through a trusted local marketplace.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: company.brandName,
      legalName: company.legalName,
      slogan: company.tagline,
      url: siteUrl,
      logo: `${siteUrl}/brand/logos/lndry-final-logo.png`,
      email: company.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.registeredOffice,
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: `${company.brandName} laundry marketplace`,
      description,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#laundry-service`,
      name: "Laundry pickup, dry cleaning, wash and iron in Pune",
      serviceType: "Laundry service marketplace",
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
      areaServed: launchAreas.map((area) => ({
        "@type": "City",
        name: `${area}, Pune`,
      })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "LNDRY garment-care services",
        itemListElement: partnerServiceCategories.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.label,
            description: service.description,
          },
        })),
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: company.brandName,
  title: {
    default: title,
    template: "%s",
  },
  description,
  keywords: [
    "laundry service Pune",
    "dry cleaning Pune",
    "laundry pickup Pune",
    "wash and iron Pune",
    "online laundry marketplace",
    "LNDRY",
    "Baner laundry service",
    "Wakad laundry service",
    "Hinjewadi laundry service",
    "Kharadi laundry service",
  ],
  alternates: {
    canonical: siteUrl,
  },
  category: "Laundry service marketplace",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/brand/logos/lndry-final-logo.png",
    apple: "/brand/logos/lndry-final-logo.png",
  },
  openGraph: {
    title,
    description,
    siteName: "LNDRY",
    type: "website",
    locale: "en_IN",
    images: ["/brand/website-finishing/og/home-og-1200x630.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/brand/website-finishing/og/home-og-1200x630.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <SmoothScrollProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-sm focus:bg-white focus:px-4 focus:py-3 focus:font-body focus:text-sm focus:font-semibold focus:text-violet focus:shadow-elevated"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <FloatingSupportCTA />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
