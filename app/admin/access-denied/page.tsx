import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { AdminConfigurationNotice } from "@/components/admin/AdminConfigurationNotice";
import { getAdminAccess } from "@/lib/auth/require-admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AccessDeniedPage() {
  const access = await getAdminAccess();

  if (access.kind === "missing-configuration") {
    return <AdminConfigurationNotice />;
  }
  if (access.kind === "anonymous") {
    redirect("/admin/login");
  }
  if (access.kind === "authorized") {
    redirect("/admin/vendor-leads");
  }

  return (
    <main className="min-h-screen bg-bg-app px-5 py-12 sm:px-8">
      <section className="mx-auto max-w-xl rounded-md bg-white p-6 shadow-soft sm:p-8">
        <div className="flex size-11 items-center justify-center rounded-sm bg-red-50 text-error">
          <ShieldAlert size={22} aria-hidden="true" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink">Admin access denied</h1>
        <p className="mt-3 font-body text-base leading-relaxed text-ink-soft">
          This account is authenticated but is not listed as an active LNDRY operations administrator.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <AdminLogoutButton />
          <Link href="/" className="inline-flex h-10 items-center justify-center rounded-sm border border-hairline px-4 font-body text-sm font-semibold text-violet transition-colors hover:border-violet">
            Return to LNDRY
          </Link>
        </div>
      </section>
    </main>
  );
}
