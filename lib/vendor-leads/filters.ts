import { z } from "zod";
import { VENDOR_LEAD_STATUSES, type VendorLeadStatus } from "@/lib/vendor-leads/types";

export type VendorLeadSort = "newest" | "oldest";

export interface VendorLeadFilters {
  q: string;
  status?: VendorLeadStatus;
  from?: string;
  to?: string;
  sort: VendorLeadSort;
  page: number;
}

export type SearchParamValue = string | string[] | undefined;
export type LeadSearchParams = Record<string, SearchParamValue>;

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(
  (value) => !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`)),
  "Use a valid date.",
);

const filterSchema = z.object({
  q: z.string().trim().max(120).default(""),
  status: z.enum(VENDOR_LEAD_STATUSES).optional(),
  from: dateSchema.optional(),
  to: dateSchema.optional(),
  sort: z.enum(["newest", "oldest"]).default("newest"),
  page: z.coerce.number().int().min(1).max(100000).default(1),
});

function getParam(value: SearchParamValue) {
  return Array.isArray(value) ? value[0] : value;
}

export function parseVendorLeadFilters(searchParams: LeadSearchParams): VendorLeadFilters {
  const parsed = filterSchema.safeParse({
    q: getParam(searchParams.q),
    status: getParam(searchParams.status),
    from: getParam(searchParams.from),
    to: getParam(searchParams.to),
    sort: getParam(searchParams.sort),
    page: getParam(searchParams.page),
  });

  if (!parsed.success) {
    return { q: "", sort: "newest", page: 1 };
  }

  const filters = parsed.data;
  if (filters.from && filters.to && filters.from > filters.to) {
    return { ...filters, from: filters.to, to: filters.from };
  }

  return filters;
}

export function vendorLeadFilterSearchParams(filters: VendorLeadFilters, page = filters.page) {
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  if (filters.status) params.set("status", filters.status);
  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);
  if (filters.sort !== "newest") params.set("sort", filters.sort);
  if (page > 1) params.set("page", String(page));

  return params.toString();
}

export function addDays(date: string, days: number) {
  const value = new Date(`${date}T00:00:00.000Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

export function getPuneDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const getPart = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value;

  return `${getPart("year")}-${getPart("month")}-${getPart("day")}`;
}
