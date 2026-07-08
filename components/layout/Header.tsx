"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { legalPolicies } from "@/lib/data/site";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Partners", href: "/partners" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 [transition-timing-function:var(--ease-signature)] ${
        scrolled ? "border-hairline bg-white/90 shadow-soft backdrop-blur-xl" : "border-transparent bg-white/70 backdrop-blur-md"
      }`}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="LNDRY home">
          <Image
            src="/brand/logos/lndry-final-logo.png"
            alt="LNDRY"
            width={56}
            height={56}
            priority
            className="h-12 w-12 rounded-full object-contain"
          />
          <span className="hidden font-display text-lg font-bold tracking-tight text-ink sm:inline">LNDRY</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex lg:gap-8" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-body text-sm font-semibold transition-colors hover:text-violet ${
                pathname === item.href ? "text-violet" : "text-ink-soft"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/#early-access" size="md">
            Book pickup
          </Button>
          <Button href="/partners" variant="secondary" size="md">
            Partner With LNDRY
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-sm text-ink lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {menuOpen && (
        <div className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto border-t border-hairline bg-white lg:hidden">
          <Container className="flex min-h-full flex-col gap-6 py-5 lg:hidden">
            <nav aria-label="Mobile primary" className="grid gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-12 items-center rounded-sm px-2 font-body text-base font-semibold text-ink hover:bg-bg-app hover:text-violet"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="rounded-lg bg-bg-app p-4">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-violet">Legal pages</p>
              <div className="mt-3 grid gap-1">
                {legalPolicies.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-10 items-center rounded-sm font-body text-sm font-semibold text-ink-soft hover:text-violet"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto grid gap-3 pb-4" onClick={() => setMenuOpen(false)}>
              <Button href="/#early-access" className="w-full">
                Book pickup
              </Button>
              <Button href="/partners#partner-lead-form" variant="secondary" className="w-full">
                Partner With LNDRY
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
