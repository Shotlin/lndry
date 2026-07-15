import Link from "next/link";
import { ArrowUpRight, Inbox } from "lucide-react";
import { VendorLeadStatusBadge } from "@/components/admin/VendorLeadStatusBadge";
import { formatVendorLeadDate, vendorLeadServiceLabels } from "@/lib/vendor-leads/presentation";
import type { VendorLead } from "@/lib/vendor-leads/types";

export function VendorLeadTable({ leads }: { leads: VendorLead[] }) {
  if (!leads.length) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-md border border-dashed border-hairline bg-white px-6 text-center">
        <div className="flex size-11 items-center justify-center rounded-sm bg-lavender-soft text-violet-deep">
          <Inbox size={21} aria-hidden="true" />
        </div>
        <h2 className="mt-4 font-display text-xl font-semibold text-ink">No vendor leads match this view</h2>
        <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-ink-soft">Adjust the filters or clear them to review all submitted partner enquiries.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-3 lg:hidden">
        {leads.map((lead) => (
          <article key={lead.id} className="rounded-md border border-hairline bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-display text-base font-semibold text-ink">{lead.business_name}</p>
                <p className="mt-1 truncate font-body text-sm text-ink-soft">{lead.full_name}</p>
              </div>
              <VendorLeadStatusBadge status={lead.status} />
            </div>
            <div className="mt-4 grid gap-1 font-body text-sm text-ink-soft">
              <p>{lead.phone}</p>
              <p className="truncate">{lead.email}</p>
              <p>{lead.city} · {lead.service_area}</p>
              <p className="text-xs">{formatVendorLeadDate(lead.created_at)}</p>
            </div>
            <Link href={`/admin/vendor-leads/${lead.id}`} className="mt-4 inline-flex h-10 items-center gap-2 font-body text-sm font-semibold text-violet underline underline-offset-4">
              View lead <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-md border border-hairline bg-white lg:block">
        <table className="min-w-[1050px] w-full border-collapse text-left">
          <thead className="bg-surface-cool">
            <tr className="border-b border-hairline">
              {['Submitted', 'Business', 'Contact person', 'Phone', 'Email', 'City / service area', 'Status', ''].map((heading) => (
                <th key={heading || 'action'} className="px-4 py-3 font-body text-xs font-semibold text-ink-soft">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-hairline last:border-b-0 hover:bg-surface-cool/70">
                <td className="whitespace-nowrap px-4 py-4 font-body text-sm text-ink-soft">{formatVendorLeadDate(lead.created_at)}</td>
                <td className="max-w-48 px-4 py-4">
                  <p className="truncate font-display text-sm font-semibold text-ink">{lead.business_name}</p>
                  <p className="mt-1 truncate font-body text-xs text-ink-soft">{vendorLeadServiceLabels(lead.services)}</p>
                </td>
                <td className="max-w-40 px-4 py-4 font-body text-sm text-ink">{lead.full_name}</td>
                <td className="whitespace-nowrap px-4 py-4 font-body text-sm text-ink">{lead.phone}</td>
                <td className="max-w-48 px-4 py-4 font-body text-sm text-ink"><span className="block truncate">{lead.email}</span></td>
                <td className="max-w-48 px-4 py-4 font-body text-sm text-ink"><p>{lead.city}</p><p className="mt-1 truncate text-xs text-ink-soft">{lead.service_area}</p></td>
                <td className="px-4 py-4"><VendorLeadStatusBadge status={lead.status} /></td>
                <td className="px-4 py-4 text-right">
                  <Link href={`/admin/vendor-leads/${lead.id}`} className="inline-flex h-9 items-center gap-1 rounded-sm px-2 font-body text-sm font-semibold text-violet transition-colors hover:bg-lavender-soft">
                    View <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
