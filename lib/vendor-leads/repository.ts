import type { SupabaseClient } from "@supabase/supabase-js";
import {
  addDays,
  getPuneDate,
  type VendorLeadFilters,
} from "@/lib/vendor-leads/filters";
import type { VendorLead, VendorLeadSummary } from "@/lib/vendor-leads/types";

export const VENDOR_LEAD_PAGE_SIZE = 20;
export const VENDOR_LEAD_EXPORT_LIMIT = 2000;

type VendorLeadQuery = ReturnType<ReturnType<SupabaseClient["from"]>["select"]>;

function normalizeSearch(value: string) {
  return value.replace(/[%,_()]/g, " ").replace(/\s+/g, " ").trim();
}

function applyFilters(query: VendorLeadQuery, filters: VendorLeadFilters) {
  let filteredQuery = query;
  const search = normalizeSearch(filters.q);

  if (search) {
    const pattern = `%${search}%`;
    filteredQuery = filteredQuery.or(
      [
        `full_name.ilike.${pattern}`,
        `business_name.ilike.${pattern}`,
        `email.ilike.${pattern}`,
        `phone.ilike.${pattern}`,
        `city.ilike.${pattern}`,
        `service_area.ilike.${pattern}`,
      ].join(","),
    );
  }

  if (filters.status) {
    filteredQuery = filteredQuery.eq("status", filters.status);
  }

  if (filters.from) {
    filteredQuery = filteredQuery.gte("created_at", `${filters.from}T00:00:00+05:30`);
  }

  if (filters.to) {
    filteredQuery = filteredQuery.lt("created_at", `${addDays(filters.to, 1)}T00:00:00+05:30`);
  }

  return filteredQuery;
}

export async function getVendorLeadPage(supabase: SupabaseClient, filters: VendorLeadFilters) {
  const from = (filters.page - 1) * VENDOR_LEAD_PAGE_SIZE;
  const query = applyFilters(
    supabase.from("vendor_leads").select("*", { count: "exact" }),
    filters,
  )
    .order("created_at", { ascending: filters.sort === "oldest" })
    .range(from, from + VENDOR_LEAD_PAGE_SIZE - 1);

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return {
    leads: (data ?? []) as VendorLead[],
    total: count ?? 0,
    page: filters.page,
    pageSize: VENDOR_LEAD_PAGE_SIZE,
  };
}

export async function getVendorLeadSummary(supabase: SupabaseClient): Promise<VendorLeadSummary> {
  const today = getPuneDate();
  const tomorrow = addDays(today, 1);
  const count = async (status?: string) => {
    let query = supabase.from("vendor_leads").select("id", { count: "exact", head: true });
    if (status) query = query.eq("status", status);
    const { count: result, error } = await query;
    if (error) throw error;
    return result ?? 0;
  };

  const todayCount = async () => {
    const { count: result, error } = await supabase
      .from("vendor_leads")
      .select("id", { count: "exact", head: true })
      .gte("created_at", `${today}T00:00:00+05:30`)
      .lt("created_at", `${tomorrow}T00:00:00+05:30`);
    if (error) throw error;
    return result ?? 0;
  };

  const [total, newLeads, contacted, qualified, onboarded, todayLeads] = await Promise.all([
    count(),
    count("new"),
    count("contacted"),
    count("qualified"),
    count("onboarded"),
    todayCount(),
  ]);

  return { total, new: newLeads, contacted, qualified, onboarded, today: todayLeads };
}

export async function getVendorLeadById(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase.from("vendor_leads").select("*").eq("id", id).maybeSingle();

  if (error) {
    throw error;
  }

  return (data as VendorLead | null) ?? null;
}

export async function getVendorLeadExport(supabase: SupabaseClient, filters: VendorLeadFilters) {
  const { data, error } = await applyFilters(
    supabase.from("vendor_leads").select("*"),
    filters,
  )
    .order("created_at", { ascending: filters.sort === "oldest" })
    .limit(VENDOR_LEAD_EXPORT_LIMIT);

  if (error) {
    throw error;
  }

  return (data ?? []) as VendorLead[];
}
