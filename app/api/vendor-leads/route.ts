import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { isSameOriginRequest, jsonNoStore } from "@/lib/http/security";
import { vendorLeadSubmissionSchema } from "@/lib/vendor-leads/schema";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 32_000;

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return jsonNoStore({ error: "This submission could not be verified." }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return jsonNoStore({ error: "Please submit the form again." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return jsonNoStore({ error: "This submission is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
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
  const { error } = await supabase.from("vendor_leads").insert({
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
  });

  if (error) {
    return jsonNoStore(
      { error: "We could not save your enquiry right now. Please try again shortly." },
      { status: 500 },
    );
  }

  return jsonNoStore(
    {
      success: true,
      message: "Thanks. The LNDRY partner team has received your enquiry.",
    },
    { status: 201 },
  );
}
