"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Partners", href: "/partners" },
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
          <Image src="/brand/logos/wordmark-horizontal.svg" alt="LNDRY" width={116} height={35} priority />
        </Link>

        <nav className="hidden items-center gap-6 lg:gap-8 md:flex" aria-label="Primary">
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

        <div className="hidden items-center gap-3 md:flex">
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
          className="flex h-11 w-11 items-center justify-center rounded-sm text-ink md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {menuOpen && (
        <div className="border-t border-hairline bg-white md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex h-12 items-center font-body text-base font-semibold text-ink-soft hover:text-violet"
              >
                {item.label}
              </Link>
            ))}
            <div onClick={() => setMenuOpen(false)}>
              <Button href="/#early-access" className="mt-2 w-full">
                Book pickup
              </Button>
            </div>
            <div onClick={() => setMenuOpen(false)}>
              <Button href="/partners" variant="secondary" className="w-full">
                Partner With LNDRY
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
