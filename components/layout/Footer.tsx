import Image from "next/image";
import Link from "next/link";
import { Container } from "../ui/Container";
import { Thread } from "../ui/Thread";
import { Button } from "../ui/Button";
import { company, legalPolicies, locationPages } from "@/lib/data/site";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Partners", href: "/partners" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-violet-deep text-white">
      <Thread className="pointer-events-none absolute -right-6 top-0 hidden h-full w-40 md:block" opacity={0.16} flip />

      <Container className="relative py-16 md:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Image
              src="/brand/logos/lndry-white-horizontal.png"
              alt="LNDRY — Drop your dirty work"
              width={176}
              height={57}
              className="h-12 w-auto"
            />
            <p className="mt-5 font-body text-sm leading-relaxed text-white/70">
              {company.tagline}. LNDRY is a Pune laundry and dry cleaning marketplace for pickup,
              partner recommendation, secure handover, and visible order status.
            </p>
            <p className="mt-4 font-body text-xs leading-relaxed text-white/55">
              {company.legalName}
              <br />
              CIN: {company.cin}
            </p>
          </div>

          <nav className="grid gap-10 sm:grid-cols-3 lg:flex lg:gap-14" aria-label="Footer">
            <div className="flex flex-col gap-3">
              <p className="font-body text-label font-semibold uppercase tracking-[0.14em] text-white/50">
                Explore
              </p>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-body text-sm font-medium text-white/85 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-body text-label font-semibold uppercase tracking-[0.14em] text-white/50">
                Legal
              </p>
              {legalPolicies.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-body text-sm font-medium text-white/85 hover:text-white"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-body text-label font-semibold uppercase tracking-[0.14em] text-white/50">
                Pune launch
              </p>
              {locationPages.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="font-body text-sm font-medium text-white/85 hover:text-white"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex flex-col items-start gap-4">
            <p className="font-body text-label font-semibold uppercase tracking-[0.14em] text-white/50">
              Ready when you are
            </p>
            <Button href="/#early-access" variant="secondary" className="bg-white">
              Book a pickup
            </Button>
            <Button href="/partners" variant="ghost" className="text-white hover:text-white/80">
              Partner With LNDRY
            </Button>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 LNDRY. Quietly premium garment care.</p>
          <p>{company.registeredOffice}</p>
        </div>
      </Container>
    </footer>
  );
}
