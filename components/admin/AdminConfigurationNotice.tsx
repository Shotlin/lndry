import Link from "next/link";

export function AdminConfigurationNotice() {
  return (
    <main className="min-h-screen bg-bg-app px-5 py-12 sm:px-8">
      <section className="mx-auto max-w-xl rounded-md bg-white p-6 shadow-soft sm:p-8">
        <p className="font-body text-sm font-semibold text-violet-deep">LNDRY operations</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">Admin access needs configuration</h1>
        <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-ink-soft">
          Add the Supabase environment variables, apply the vendor-leads migration, and create an authorized admin user before using this dashboard.
        </p>
        <Link href="/" className="mt-7 inline-flex font-body text-sm font-semibold text-violet underline underline-offset-4">
          Return to LNDRY
        </Link>
      </section>
    </main>
  );
}
