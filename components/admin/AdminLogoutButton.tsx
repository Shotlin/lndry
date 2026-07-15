"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function AdminLogoutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleLogout() {
    if (isPending) return;
    setIsPending(true);

    try {
      const supabase = createBrowserSupabaseClient();
      await supabase.auth.signOut({ scope: "local" });
    } finally {
      router.replace("/admin/login");
      router.refresh();
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-sm border border-ink-line px-3 font-body text-sm font-semibold text-white transition-colors hover:border-white/60 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <LogOut size={16} aria-hidden="true" />
      {isPending ? "Signing out…" : "Sign out"}
    </button>
  );
}
