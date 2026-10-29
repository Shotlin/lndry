import { getAdminAccess } from "@/lib/auth/require-admin";
import { adminJson } from "@/lib/http/security";
import { parseVendorLeadFilters } from "@/lib/vendor-leads/filters";
import { getVendorLeadExport } from "@/lib/vendor-leads/repository";
import { toCsv } from "@/lib/vendor-leads/csv";

export const runtime = "nodejs";

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
