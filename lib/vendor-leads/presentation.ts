import { partnerServiceCategories } from "@/lib/data/site";
import type { VendorLeadStatus } from "@/lib/vendor-leads/types";

const serviceLabels = new Map(partnerServiceCategories.map((service) => [service.value, service.label]));

export function vendorLeadStatusLabel(status: VendorLeadStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function vendorLeadServiceLabels(services: string[]) {
  return services.map((service) => serviceLabels.get(service) ?? service).join(", ");
}

export function formatVendorLeadDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}
