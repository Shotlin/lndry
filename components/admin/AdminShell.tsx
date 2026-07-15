import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

export function AdminShell({ children, email }: { children: ReactNode; email: string | null }) {
  return (
    <div className="min-h-screen bg-bg-app text-ink">
      <header className="border-b border-ink-line bg-ink text-white">
        <div className="mx-auto flex min-h-18 max-w-[1440px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src="/brand/logos/lndry-final-logo.png"
              alt="LNDRY"
              width={44}
              height={44}
              className="size-10 rounded-sm object-cover"
              priority
            />
            <div className="min-w-0">
              <p className="font-display text-base font-semibold tracking-tight">LNDRY Operations</p>
              <p className="truncate font-body text-xs text-white/60">Vendor lead management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden max-w-56 truncate text-right font-body text-xs text-white/60 sm:block">{email}</div>
            <Link
              href="/"
              className="hidden font-body text-sm font-semibold text-white/80 transition-colors hover:text-white md:inline-flex"
            >
              View site
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1440px] px-5 py-7 sm:px-8 sm:py-9">{children}</main>
    </div>
  );
}
