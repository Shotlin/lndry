import Link from "next/link";
import { redirect } from "next/navigation";
import { Download, Users, UserCheck, UserRoundCheck, UserRoundPlus, UsersRound } from "lucide-react";
import { VendorLeadFilters } from "@/components/admin/VendorLeadFilters";
import { VendorLeadTable } from "@/components/admin/VendorLeadTable";
import { getAdminAccess } from "@/lib/auth/require-admin";
import {
  parseVendorLeadFilters,
  type LeadSearchParams,
  vendorLeadFilterSearchParams,
} from "@/lib/vendor-leads/filters";
import { getVendorLeadPage, getVendorLeadSummary } from "@/lib/vendor-leads/repository";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const summaryIcons = [Users, UserRoundPlus, UserCheck, UserRoundCheck, UsersRound, Users] as const;

export default async function VendorLeadsPage({
  searchParams,
}: {
  searchParams: Promise<LeadSearchParams>;
}) {
  const [access, query] = await Promise.all([getAdminAccess(), searchParams]);
  if (access.kind !== "authorized") {
    redirect("/admin/login?next=/admin/vendor-leads");
  }

  const filters = parseVendorLeadFilters(query);

  const dashboard = await Promise.all([
    getVendorLeadSummary(access.supabase),
    getVendorLeadPage(access.supabase, filters),
  ])
    .then(([summary, leadPage]) => ({ summary, leadPage }))
    .catch(() => null);

  if (!dashboard) {
    return (
      <section className="rounded-md border border-hairline bg-white p-6 sm:p-8">
        <p className="font-body text-sm font-semibold text-error">Vendor leads are temporarily unavailable</p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-ink">We could not load this workspace</h1>
        <p className="mt-3 max-w-lg font-body text-sm leading-relaxed text-ink-soft">
          Check the Supabase configuration and migration, then reload this page. No lead data was exposed.
        </p>
        <Link href="/admin/vendor-leads" className="mt-6 inline-flex font-body text-sm font-semibold text-violet underline underline-offset-4">Try again</Link>
      </section>
    );
  }

  const { summary, leadPage } = dashboard;
  const totalPages = Math.max(1, Math.ceil(leadPage.total / leadPage.pageSize));
  const exportQuery = vendorLeadFilterSearchParams({ ...filters, page: 1 }, 1);
  const exportHref = `/api/admin/vendor-leads/export${exportQuery ? `?${exportQuery}` : ""}`;
  const previousQuery = vendorLeadFilterSearchParams(filters, filters.page - 1);
  const nextQuery = vendorLeadFilterSearchParams(filters, filters.page + 1);
  const summaries = [
    ["Total leads", summary.total, "All submitted leads"],
    ["New leads", summary.new, "Needs first review"],
    ["Contacted", summary.contacted, "Follow-up underway"],
    ["Qualified", summary.qualified, "Ready for onboarding"],
    ["Onboarded", summary.onboarded, "Approved partners"],
    ["Received today", summary.today, "Asia/Kolkata"],
  ] as const;

  return (
      <div className="grid gap-7">
        <header className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="font-body text-sm font-semibold text-violet-deep">Operations workspace</p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Vendor leads</h1>
            <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-ink-soft">
              Review partner enquiries, record follow-ups, and keep the onboarding pipeline clear for the LNDRY team.
            </p>
          </div>
          <a
            href={exportHref}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-hairline bg-white px-4 font-body text-sm font-semibold text-violet transition-colors hover:border-violet"
          >
            <Download size={16} aria-hidden="true" />
            Export filtered CSV
          </a>
        </header>

        <section aria-label="Vendor lead summary" className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {summaries.map(([label, value, detail], index) => {
            const Icon = summaryIcons[index];
            return (
              <article key={label} className="rounded-md border border-hairline bg-white p-4">
                <Icon size={18} className="text-violet-deep" aria-hidden="true" />
                <p className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">{value}</p>
                <p className="mt-1 font-body text-sm font-semibold text-ink">{label}</p>
                <p className="mt-1 font-body text-xs leading-relaxed text-ink-soft">{detail}</p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-4">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-xl font-semibold text-ink">Lead inbox</h2>
              <p className="mt-1 font-body text-sm text-ink-soft">{leadPage.total} matching lead{leadPage.total === 1 ? "" : "s"}</p>
            </div>
            <p className="font-body text-xs text-ink-soft">CSV exports include the current filters and up to 2,000 leads.</p>
          </div>
          <VendorLeadFilters filters={filters} />
          <VendorLeadTable leads={leadPage.leads} />

          {leadPage.total > leadPage.pageSize ? (
            <nav aria-label="Vendor lead pagination" className="flex items-center justify-between gap-4 rounded-md border border-hairline bg-white px-4 py-3">
              {filters.page > 1 ? (
                <Link
                  href={`/admin/vendor-leads${previousQuery ? `?${previousQuery}` : ""}`}
                  className="font-body text-sm font-semibold text-violet underline underline-offset-4"
                >
                  Previous
                </Link>
              ) : <span className="font-body text-sm text-muted">Previous</span>}
              <span className="font-body text-sm text-ink-soft">Page {Math.min(filters.page, totalPages)} of {totalPages}</span>
              {filters.page < totalPages ? (
                <Link
                  href={`/admin/vendor-leads${nextQuery ? `?${nextQuery}` : ""}`}
                  className="font-body text-sm font-semibold text-violet underline underline-offset-4"
                >
                  Next
                </Link>
              ) : <span className="font-body text-sm text-muted">Next</span>}
            </nav>
          ) : null}
        </section>
      </div>
  );
}
