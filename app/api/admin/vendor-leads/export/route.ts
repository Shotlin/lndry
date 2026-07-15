import { getAdminAccess } from "@/lib/auth/require-admin";
import { adminJson } from "@/lib/http/security";
import { parseVendorLeadFilters } from "@/lib/vendor-leads/filters";
import { getVendorLeadExport } from "@/lib/vendor-leads/repository";
import type { VendorLead } from "@/lib/vendor-leads/types";

export const runtime = "nodejs";

function csvValue(value: string | number | boolean | null | undefined) {
  const text = value === null || value === undefined ? "" : String(value);
  const formulaSafe = /^[=+\-@]/.test(text) ? `'${text}` : text;
  return `"${formulaSafe.replace(/"/g, '""')}"`;
}

function statusForCsv(lead: VendorLead) {
  return lead.status.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function toCsv(leads: VendorLead[]) {
  const headings = [
    "Submitted at",
    "Status",
    "Business name",
    "Contact person",
    "Email",
    "Phone",
    "City",
    "Service area",
    "Services",
    "Business type",
    "Years in business",
    "Estimated monthly orders",
    "Pickup and delivery",
    "Daily capacity",
    "Address",
    "Message",
    "Internal notes",
    "Source",
  ];

  const rows = leads.map((lead) => [
    lead.created_at,
    statusForCsv(lead),
    lead.business_name,
    lead.full_name,
    lead.email,
    lead.phone,
    lead.city,
    lead.service_area,
    lead.services.join(", "),
    lead.business_type,
    lead.years_in_business,
    lead.estimated_monthly_orders,
    lead.pickup_delivery,
    lead.daily_capacity,
    lead.address,
    lead.message,
    lead.admin_notes,
    lead.source,
  ]);

  return `\uFEFF${[headings, ...rows].map((row) => row.map(csvValue).join(",")).join("\r\n")}`;
}

export async function GET(request: Request) {
  const access = await getAdminAccess();
  if (access.kind === "missing-configuration") {
    return adminJson({ error: "Admin access is not configured." }, { status: 503 });
  }
  if (access.kind === "anonymous") {
    return adminJson({ error: "Sign in is required." }, { status: 401 });
  }
  if (access.kind === "forbidden") {
    return adminJson({ error: "You do not have permission to export vendor leads." }, { status: 403 });
  }

  const filters = parseVendorLeadFilters(Object.fromEntries(new URL(request.url).searchParams));

  try {
    const leads = await getVendorLeadExport(access.supabase, filters);
    const filename = `lndry-vendor-leads-${new Date().toISOString().slice(0, 10)}.csv`;

    return new Response(toCsv(leads), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, max-age=0",
        Pragma: "no-cache",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch {
    return adminJson({ error: "We could not prepare this export. Please try again." }, { status: 500 });
  }
}
