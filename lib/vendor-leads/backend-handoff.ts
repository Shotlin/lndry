import "server-only";

import { createHmac, createHash } from "node:crypto";
import type { VendorLeadSubmission } from "@/lib/vendor-leads/schema";

type HandoffState = "delivered" | "not_configured" | "failed";

export type BackendHandoffResult = {
  state: HandoffState;
  error: string | null;
};

const HANDOFF_SOURCE = "website-partners";
const HANDOFF_TIMEOUT_MS = 8_000;

function configuredBaseUrl() {
  const raw = process.env.LNDRY_PARTNER_LEAD_API_URL?.trim();
  const secret = process.env.LNDRY_PARTNER_LEAD_HMAC_SECRET?.trim();
  if (!raw || !secret) return null;
  const url = new URL(raw);
  if (url.protocol !== "https:") throw new Error("LNDRY_PARTNER_LEAD_API_URL must use HTTPS.");
  return { baseUrl: raw.replace(/\/+$/, ""), secret };
}

function boundedError(error: unknown) {
  const message = error instanceof Error ? error.message : "The canonical intake service is unavailable.";
  return message.replace(/[\r\n\t]+/g, " ").slice(0, 500);
}

/**
 * Deliver a Supabase-backed website lead to LNDRY's canonical staging area.
 * The HMAC authenticates this server-to-server call; no key is ever shipped
 * to a browser. A successful handoff is intentionally not vendor approval.
 */
export async function handoffVendorLead(
  leadId: string,
  lead: VendorLeadSubmission,
  fetchImpl: typeof fetch = fetch,
): Promise<BackendHandoffResult> {
  let config: { baseUrl: string; secret: string } | null;
  try {
    config = configuredBaseUrl();
  } catch (error) {
    return { state: "failed", error: boundedError(error) };
  }
  if (!config) return { state: "not_configured", error: null };

  const payload = JSON.stringify({
    fullName: lead.fullName,
    businessName: lead.businessName,
    email: lead.email,
    phone: lead.phone,
    city: lead.city,
    address: lead.address,
    serviceArea: lead.serviceArea,
    selectedServices: lead.selectedServices,
    businessType: lead.businessType,
    yearsInBusiness: lead.yearsInBusiness,
    estimatedMonthlyOrders: lead.estimatedMonthlyOrders,
    pickupDelivery: lead.pickupDelivery,
    dailyCapacity: lead.dailyCapacity,
    message: lead.message,
    privacyConsent: lead.privacyConsent,
    submittedAt: new Date().toISOString(),
  });
  const timestamp = new Date().toISOString();
  const digest = createHash("sha256").update(payload).digest("hex");
  const signature = createHmac("sha256", config.secret).update(`${timestamp}.${leadId}.${digest}`).digest("hex");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), HANDOFF_TIMEOUT_MS);
  try {
    const response = await fetchImpl(`${config.baseUrl}/integrations/partner-leads`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-lndry-source": HANDOFF_SOURCE,
        "x-lndry-timestamp": timestamp,
        "x-lndry-external-lead-id": leadId,
        "x-lndry-signature": signature,
      },
      body: payload,
      signal: controller.signal,
      cache: "no-store",
    });
    if (!response.ok) return { state: "failed", error: `Canonical intake returned HTTP ${response.status}.` };
    return { state: "delivered", error: null };
  } catch (error) {
    return { state: "failed", error: boundedError(error) };
  } finally {
    clearTimeout(timeout);
  }
}
