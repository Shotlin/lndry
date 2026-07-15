import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase/server";

type ServerSupabaseClient = NonNullable<Awaited<ReturnType<typeof createServerSupabaseClient>>>;

export type AdminAccess =
  | { kind: "missing-configuration" }
  | { kind: "anonymous" }
  | { kind: "forbidden"; userId: string; email: string | null }
  | { kind: "authorized"; userId: string; email: string | null; supabase: ServerSupabaseClient };

export async function getAdminAccess(): Promise<AdminAccess> {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return { kind: "missing-configuration" };
  }

  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const userId = claims?.sub;

  if (error || typeof userId !== "string") {
    return { kind: "anonymous" };
  }

  const email = typeof claims?.email === "string" ? claims.email : null;
  const { data: membership, error: membershipError } = await supabase
    .from("admin_users")
    .select("user_id, role, is_active")
    .eq("user_id", userId)
    .maybeSingle();

  if (membershipError || !membership || membership.role !== "admin" || !membership.is_active) {
    return { kind: "forbidden", userId, email };
  }

  return { kind: "authorized", userId, email, supabase };
}
