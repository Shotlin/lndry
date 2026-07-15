import Link from "next/link";

export default function VendorLeadNotFound() {
  return (
    <section className="rounded-md border border-hairline bg-white p-6 sm:p-8">
      <p className="font-body text-sm font-semibold text-violet-deep">Vendor lead</p>
      <h1 className="mt-2 font-display text-2xl font-semibold text-ink">This lead is unavailable</h1>
      <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">It may not exist or your access may have changed.</p>
      <Link href="/admin/vendor-leads" className="mt-6 inline-flex font-body text-sm font-semibold text-violet underline underline-offset-4">Return to vendor leads</Link>
    </section>
  );
}
