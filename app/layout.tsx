import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/lib/motion/SmoothScrollProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingSupportCTA } from "@/components/layout/FloatingSupportCTA";

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

const title = "LNDRY | Premium laundry marketplace in Pune";
const description =
  "LNDRY helps customers enter their address, get a recommended nearby laundry partner, book pickup, and follow order status without calling multiple shops.";

export const metadata: Metadata = {
  metadataBase: new URL("https://lndry.in"),
  title: {
    default: title,
    template: "%s",
  },
  description,
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
