import { getAdminAccess } from "@/lib/auth/require-admin";
import { adminJson, isSameOriginRequest } from "@/lib/http/security";
import { vendorLeadIdSchema, vendorLeadUpdateSchema } from "@/lib/vendor-leads/schema";

export const runtime = "nodejs";

function unauthorizedResponse(kind: "missing-configuration" | "anonymous" | "forbidden") {
  if (kind === "missing-configuration") {
    return adminJson({ error: "Admin access is not configured." }, { status: 503 });
  }

  if (kind === "anonymous") {
    return adminJson({ error: "Sign in is required." }, { status: 401 });
  }

  return adminJson({ error: "You do not have permission to manage vendor leads." }, { status: 403 });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isSameOriginRequest(request)) {
    return adminJson({ error: "This request could not be verified." }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return adminJson({ error: "Please submit a valid update." }, { status: 415 });
  }

  const access = await getAdminAccess();
  if (access.kind !== "authorized") {
    return unauthorizedResponse(access.kind);
  }

  const id = vendorLeadIdSchema.safeParse((await params).id);
  if (!id.success) {
    return adminJson({ error: "This vendor lead could not be found." }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return adminJson({ error: "Please check the update and try again." }, { status: 400 });
  }

  const update = vendorLeadUpdateSchema.safeParse(body);
  if (!update.success) {
    const flattened = update.error.flatten();
    return adminJson(
      { error: "Please check the update and try again.", fieldErrors: flattened.fieldErrors },
      { status: 422 },
    );
  }

  const changes: { status?: string; admin_notes?: string | null } = {};
  if (update.data.status !== undefined) {
    changes.status = update.data.status;
  }
  if (update.data.adminNotes !== undefined) {
    changes.admin_notes = update.data.adminNotes || null;
  }

  const { data, error } = await access.supabase
    .from("vendor_leads")
    .update(changes)
    .eq("id", id.data)
    .select("id, status, admin_notes, updated_at")
    .maybeSingle();

  if (error) {
    return adminJson({ error: "We could not save this update. Please try again." }, { status: 500 });
  }

  if (!data) {
    return adminJson({ error: "This vendor lead could not be found." }, { status: 404 });
  }

  return adminJson({ lead: data });
}
