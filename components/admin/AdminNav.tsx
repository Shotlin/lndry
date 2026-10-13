"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { label: "Vendor leads", href: "/admin/vendor-leads" },
];

export function AdminNav() {
  const pathname = usePathname();
  const activeHref =
    [...ITEMS].sort((a, b) => b.href.length - a.href.length).find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))?.href ?? "";

  return (
    <nav className="border-b border-hairline bg-white" aria-label="Dashboard sections">
      <div className="mx-auto flex max-w-[1440px] gap-1 overflow-x-auto px-5 sm:px-8">
        {ITEMS.map((item) => {
          const active = item.href === activeHref;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`whitespace-nowrap border-b-2 px-4 py-3.5 font-body text-sm font-semibold transition-colors ${
                active ? "border-violet text-violet" : "border-transparent text-ink-soft hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
