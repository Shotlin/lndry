import { vendorLeadStatusLabel } from "@/lib/vendor-leads/presentation";
import type { VendorLeadStatus } from "@/lib/vendor-leads/types";

const statusClasses: Record<VendorLeadStatus, string> = {
  new: "bg-lavender-soft text-violet-deep",
  contacted: "bg-sky-100 text-sky-800",
  qualified: "bg-teal-tint text-teal-800",
  rejected: "bg-red-50 text-error",
  onboarded: "bg-emerald-100 text-emerald-800",
  archived: "bg-slate-200 text-slate-700",
};

export function VendorLeadStatusBadge({ status }: { status: VendorLeadStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 font-body text-xs font-semibold ${statusClasses[status]}`}>
      {vendorLeadStatusLabel(status)}
    </span>
  );
}
