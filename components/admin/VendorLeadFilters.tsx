import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import type { VendorLeadFilters as FilterValues } from "@/lib/vendor-leads/filters";
import { VENDOR_LEAD_STATUSES } from "@/lib/vendor-leads/types";
import { vendorLeadStatusLabel } from "@/lib/vendor-leads/presentation";

export function VendorLeadFilters({ filters }: { filters: FilterValues }) {
  return (
    <form action="/admin/vendor-leads" method="get" className="grid gap-3 rounded-md border border-hairline bg-white p-4 lg:grid-cols-[minmax(16rem,1fr)_10rem_10rem_10rem_9rem_auto] lg:items-end">
      <label className="grid gap-2 font-body text-xs font-semibold text-ink-soft">
        Search
        <span className="relative">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            name="q"
            defaultValue={filters.q}
            className="h-11 w-full rounded-sm border border-hairline bg-surface-cool pl-9 pr-3 font-body text-sm text-ink outline-none transition-colors focus:border-violet focus:bg-white"
            placeholder="Name, business, email, phone, city"
          />
        </span>
      </label>
      <label className="grid gap-2 font-body text-xs font-semibold text-ink-soft">
        Status
        <select name="status" defaultValue={filters.status ?? ""} className="h-11 rounded-sm border border-hairline bg-surface-cool px-3 font-body text-sm text-ink outline-none focus:border-violet focus:bg-white">
          <option value="">All statuses</option>
          {VENDOR_LEAD_STATUSES.map((status) => <option key={status} value={status}>{vendorLeadStatusLabel(status)}</option>)}
        </select>
      </label>
      <label className="grid gap-2 font-body text-xs font-semibold text-ink-soft">
        From
        <input name="from" type="date" defaultValue={filters.from} className="h-11 rounded-sm border border-hairline bg-surface-cool px-3 font-body text-sm text-ink outline-none focus:border-violet focus:bg-white" />
      </label>
      <label className="grid gap-2 font-body text-xs font-semibold text-ink-soft">
        To
        <input name="to" type="date" defaultValue={filters.to} className="h-11 rounded-sm border border-hairline bg-surface-cool px-3 font-body text-sm text-ink outline-none focus:border-violet focus:bg-white" />
      </label>
      <label className="grid gap-2 font-body text-xs font-semibold text-ink-soft">
        Sort
        <select name="sort" defaultValue={filters.sort} className="h-11 rounded-sm border border-hairline bg-surface-cool px-3 font-body text-sm text-ink outline-none focus:border-violet focus:bg-white">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </label>
      <div className="flex gap-2 lg:pb-0">
        <button type="submit" className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-sm bg-violet px-4 font-body text-sm font-semibold text-white transition-colors hover:bg-violet-deep">
          <SlidersHorizontal size={16} aria-hidden="true" />
          Apply
        </button>
        <Link href="/admin/vendor-leads" className="inline-flex h-11 items-center justify-center rounded-sm border border-hairline px-3 font-body text-sm font-semibold text-violet transition-colors hover:border-violet">
          Clear
        </Link>
      </div>
    </form>
  );
}
