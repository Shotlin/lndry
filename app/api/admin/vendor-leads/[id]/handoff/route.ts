import { getAdminAccess } from "@/lib/auth/require-admin";
import { adminJson, isSameOriginRequest } from "@/lib/http/security";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { handoffVendorLead } from "@/lib/vendor-leads/backend-handoff";
import { vendorLeadIdSchema, vendorLeadSubmissionSchema } from "@/lib/vendor-leads/schema";
import type { VendorLead, VendorLeadHandoffStatus } from "@/lib/vendor-leads/types";

export const runtime = "nodejs";

const retryableStates: VendorLeadHandoffStatus[] = ["pending", "failed", "not_configured"];

function unauthorizedResponse(kind: "missing-configuration" | "anonymous" | "forbidden") {
  if (kind === "missing-configuration") {
    return adminJson({ error: "Admin access is not configured." }, { status: 503 });
  }
  if (kind === "anonymous") {
    return adminJson({ error: "Sign in is required." }, { status: 401 });
  }
  return adminJson({ error: "You do not have permission to retry partner intake." }, { status: 403 });
}

/** The public submission was validated before this row could exist. Rebuild
 * that exact semantic contract for a retry; do not take client-supplied
 * contact data or treat the website lead as a vendor application. */
function handoffPayload(lead: VendorLead) {
  return vendorLeadSubmissionSchema.safeParse({
    fullName: lead.full_name,
    businessName: lead.business_name,
    email: lead.email,
    phone: lead.phone,
    city: lead.city,
    address: lead.address,
    serviceArea: lead.service_area,
    selectedServices: lead.services,
    businessType: lead.business_type,
    yearsInBusiness: lead.years_in_business,
    estimatedMonthlyOrders: lead.estimated_monthly_orders,
    pickupDelivery: lead.pickup_delivery,
    dailyCapacity: lead.daily_capacity,
    message: lead.message,
    privacyConsent: lead.privacy_consent,
    source: "website-partners" as const,
    website: "",
  });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isSameOriginRequest(request)) {
    return adminJson({ error: "This request could not be verified." }, { status: 403 });
  }

  const access = await getAdminAccess();
  if (access.kind !== "authorized") {
    return unauthorizedResponse(access.kind);
  }

  const id = vendorLeadIdSchema.safeParse((await params).id);
  if (!id.success) {
    return adminJson({ error: "This vendor lead could not be found." }, { status: 404 });
  }

  const { data, error } = await access.supabase
    .from("vendor_leads")
    .select("*")
    .eq("id", id.data)
    .maybeSingle();
  const lead = data as VendorLead | null;
  if (error) {
    return adminJson({ error: "We could not read this lead for a handoff retry." }, { status: 500 });
  }
  if (!lead) {
    return adminJson({ error: "This vendor lead could not be found." }, { status: 404 });
  }
  if (!retryableStates.includes(lead.canonical_handoff_status)) {
    return adminJson({ error: "This lead is already recorded as delivered to the canonical intake service." }, { status: 409 });
  }

  // The service-role client is deliberately created only after the request's
  // authenticated-admin and row-access checks. Its sole purpose is to write
  // server-only transport evidence that browser RLS correctly forbids.
  const adminSupabase = createAdminSupabaseClient();
  if (!adminSupabase) {
    return adminJson({ error: "The server cannot record a secure handoff retry right now." }, { status: 503 });
  }

  const rebuilt = handoffPayload(lead);
  const handoff = rebuilt.success
    ? await handoffVendorLead(lead.id, rebuilt.data)
    : { state: "failed" as const, error: "Stored lead data requires review before it can be sent to canonical intake." };
  const nextAttemptCount = Math.max(0, Number(lead.canonical_handoff_attempts) || 0) + 1;
  const update = {
    canonical_handoff_status: handoff.state,
    canonical_handoff_attempts: nextAttemptCount,
    canonical_handoff_last_error: handoff.error,
    canonical_handoff_at: handoff.state === "delivered" ? new Date().toISOString() : null,
  };
  const { data: saved, error: saveError } = await adminSupabase
    .from("vendor_leads")
    .update(update)
    .eq("id", lead.id)
    .in("canonical_handoff_status", retryableStates)
    .select("canonical_handoff_status, canonical_handoff_attempts, canonical_handoff_last_error, canonical_handoff_at")
    .maybeSingle();
  if (saveError) {
    return adminJson({ error: "The canonical handoff result could not be recorded. Retry remains safe because the backend deduplicates this lead." }, { status: 500 });
  }
  if (!saved) {
    return adminJson({ error: "This handoff changed while it was being retried. Refresh the lead before trying again." }, { status: 409 });
  }

  return adminJson({ handoff: saved });
}
