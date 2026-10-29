import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { isSameOriginRequest, jsonNoStore } from "@/lib/http/security";
import { getClientIp } from "@/lib/http/client-ip";
import { createRateLimiter } from "@/lib/http/rate-limit";
import { BodyTooLargeError, readJsonBody } from "@/lib/http/read-body";
import { vendorLeadSubmissionSchema } from "@/lib/vendor-leads/schema";
import { handoffVendorLead } from "@/lib/vendor-leads/backend-handoff";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 32_000;
const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000;

// Per warm instance, per client. Blunts floods from one source; the durable
// protection against repeat spam is the duplicate check against the database.
const submissionLimiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

const SUCCESS_BODY = {
  success: true,
  message: "Thanks. The LNDRY partner team has received your enquiry.",
};

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return jsonNoStore({ error: "This submission could not be verified." }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return jsonNoStore({ error: "Please submit the form again." }, { status: 415 });
  }

  const limit = submissionLimiter.hit(getClientIp(request));
  if (!limit.allowed) {
    return jsonNoStore(
      { error: "Too many submissions. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await readJsonBody(request, MAX_BODY_BYTES);
  } catch (error) {
    if (error instanceof BodyTooLargeError) {
      return jsonNoStore({ error: "This submission is too large." }, { status: 413 });
    }
    return jsonNoStore({ error: "Please check the form and try again." }, { status: 400 });
  }

  const parsed = vendorLeadSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    const flattened = parsed.error.flatten();
    return jsonNoStore(
      {
        error: "Please check the highlighted fields.",
        fieldErrors: flattened.fieldErrors,
        formErrors: flattened.formErrors,
      },
      { status: 422 },
    );
  }

  // Honeypot values are never stored. Keep the response generic so bots do not learn the rule.
  if (parsed.data.website.trim()) {
    return jsonNoStore({ error: "We could not submit this enquiry. Please try again." }, { status: 400 });
  }

  const supabase = createAdminSupabaseClient();
  if (!supabase) {
    return jsonNoStore({ error: "Vendor onboarding is temporarily unavailable. Please try again shortly." }, { status: 503 });
  }

  const lead = parsed.data;

  // Same email or phone already enquired in the last 24h: acknowledge without
  // storing again, so a repeated or scripted submit cannot flood the pipeline
  // or the backend handoff. The response is identical, so it reveals nothing.
  const since = new Date(Date.now() - DUPLICATE_WINDOW_MS).toISOString();
  const [byEmail, byPhone] = await Promise.all([
    supabase.from("vendor_leads").select("id").eq("email", lead.email).gte("created_at", since).limit(1),
    supabase.from("vendor_leads").select("id").eq("phone", lead.phone).gte("created_at", since).limit(1),
  ]);
  if ((byEmail.data?.length ?? 0) > 0 || (byPhone.data?.length ?? 0) > 0) {
    return jsonNoStore(SUCCESS_BODY, { status: 201 });
  }

  const { data: savedLead, error } = await supabase.from("vendor_leads").insert({
    full_name: lead.fullName,
    business_name: lead.businessName,
    email: lead.email,
    phone: lead.phone,
    city: lead.city,
    address: lead.address,
    service_area: lead.serviceArea,
    services: lead.selectedServices,
    business_type: lead.businessType,
    years_in_business: lead.yearsInBusiness,
    estimated_monthly_orders: lead.estimatedMonthlyOrders,
    pickup_delivery: lead.pickupDelivery,
    daily_capacity: lead.dailyCapacity,
    message: lead.message,
    privacy_consent: lead.privacyConsent,
    // Source is decided by the server, not by a browser-controlled form field.
    source: "website-partners",
  }).select("id").single();

  if (error) {
    return jsonNoStore(
      { error: "We could not save your enquiry right now. Please try again shortly." },
      { status: 500 },
    );
  }

  // The Supabase lead remains durable even if LNDRY is unavailable. Record
  // the handoff state truthfully; this does not turn a marketing enquiry into
  // a vendor application or claim that onboarding has completed.
  const handoff = await handoffVendorLead(savedLead.id, lead);
  const { error: handoffStateError } = await supabase.from("vendor_leads").update({
    canonical_handoff_status: handoff.state,
    canonical_handoff_attempts: 1,
    canonical_handoff_last_error: handoff.error,
    canonical_handoff_at: handoff.state === "delivered" ? new Date().toISOString() : null,
  }).eq("id", savedLead.id);
  if (handoffStateError) {
    // The lead itself is safely recorded. Do not disclose internal transport
    // detail to a public applicant; platform staff can reconcile it later.
    console.error("Unable to persist canonical handoff state", handoffStateError.message);
  }

  return jsonNoStore(SUCCESS_BODY, { status: 201 });
}
