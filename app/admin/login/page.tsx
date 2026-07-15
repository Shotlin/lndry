import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { AdminLoginForm } from "@/app/admin/login/AdminLoginForm";
import { getAdminAccess } from "@/lib/auth/require-admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function validNextPath(value: string | undefined) {
  return value?.startsWith("/admin/") ? value : "/admin/vendor-leads";
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const [access, params] = await Promise.all([getAdminAccess(), searchParams]);

  if (access.kind === "authorized") {
    redirect(validNextPath(params.next));
  }

  if (access.kind === "forbidden") {
    redirect("/admin/access-denied");
  }

  const isConfigurationMissing = access.kind === "missing-configuration";

  return (
    <main className="min-h-screen bg-bg-app px-5 py-10 sm:px-8 sm:py-16">
      <section className="mx-auto max-w-md rounded-md bg-white p-6 shadow-soft sm:p-8">
        <div className="flex size-11 items-center justify-center rounded-sm bg-lavender-soft text-violet-deep">
          <ShieldCheck size={22} aria-hidden="true" />
        </div>
        <p className="mt-6 font-body text-sm font-semibold text-violet-deep">LNDRY operations</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">Vendor lead management</h1>
        <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
          Sign in with an authorized admin account to review and manage partner onboarding enquiries.
        </p>
        {isConfigurationMissing ? (
          <p role="alert" className="mt-5 rounded-sm bg-red-50 px-4 py-3 font-body text-sm font-semibold text-error">
            Supabase is not configured yet. Add the required environment variables before signing in.
          </p>
        ) : null}
        <AdminLoginForm nextPath={validNextPath(params.next)} disabled={isConfigurationMissing} />
        <Link href="/" className="mt-7 inline-flex font-body text-sm font-semibold text-violet underline underline-offset-4">
          Return to LNDRY
        </Link>
      </section>
    </main>
  );
}
