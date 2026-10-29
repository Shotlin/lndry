import { createHash, createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { handoffVendorLead } from "@/lib/vendor-leads/backend-handoff";
import type { VendorLeadSubmission } from "@/lib/vendor-leads/schema";

const lead = { fullName: "A", businessName: "B", email: "a@b.co", phone: "+919999999999", city: "Pune", address: null, serviceArea: "x", selectedServices: ["wash"], businessType: "t", yearsInBusiness: "y", estimatedMonthlyOrders: "z", pickupDelivery: "p", dailyCapacity: "d", message: null, privacyConsent: true, website: "" } as unknown as VendorLeadSubmission;

describe("handoffVendorLead", () => {
  const saved = { ...process.env };
  beforeEach(() => {
    process.env.LNDRY_PARTNER_LEAD_API_URL = "https://api.example.test/api/v1/";
    process.env.LNDRY_PARTNER_LEAD_HMAC_SECRET = "s3cret";
  });
  afterEach(() => {
    process.env = { ...saved };
  });

  it("reports not_configured without a secret and makes no request", async () => {
    delete process.env.LNDRY_PARTNER_LEAD_HMAC_SECRET;
    const f = vi.fn();
    expect(await handoffVendorLead("id", lead, f as unknown as typeof fetch)).toEqual({ state: "not_configured", error: null });
    expect(f).not.toHaveBeenCalled();
  });

  it("refuses a non-HTTPS endpoint", async () => {
    process.env.LNDRY_PARTNER_LEAD_API_URL = "http://api.example.test";
    const f = vi.fn();
    const r = await handoffVendorLead("id", lead, f as unknown as typeof fetch);
    expect(r.state).toBe("failed");
    expect(f).not.toHaveBeenCalled();
  });

  it("signs timestamp.leadId.sha256(body) and never sends the secret", async () => {
    const f = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    const r = await handoffVendorLead("lead-1", lead, f as unknown as typeof fetch);
    expect(r).toEqual({ state: "delivered", error: null });
    const [url, init] = f.mock.calls[0];
    expect(url).toBe("https://api.example.test/api/v1/integrations/partner-leads");
    const h = init.headers as Record<string, string>;
    const digest = createHash("sha256").update(init.body as string).digest("hex");
    const expected = createHmac("sha256", "s3cret").update(`${h["x-lndry-timestamp"]}.lead-1.${digest}`).digest("hex");
    expect(h["x-lndry-signature"]).toBe(expected);
    expect(JSON.stringify(init)).not.toContain("s3cret");
    expect(JSON.parse(init.body as string)).not.toHaveProperty("website");
  });

  it("maps HTTP errors and network failures to failed with a bounded message", async () => {
    const bad = vi.fn().mockResolvedValue(new Response("no", { status: 502 }));
    expect((await handoffVendorLead("i", lead, bad as unknown as typeof fetch)).error).toBe("Canonical intake returned HTTP 502.");
    const boom = vi.fn().mockRejectedValue(new Error("x\n".repeat(1000)));
    const r = await handoffVendorLead("i", lead, boom as unknown as typeof fetch);
    expect(r.state).toBe("failed");
    expect(r.error!.length).toBeLessThanOrEqual(500);
    expect(r.error).not.toMatch(/[\r\n]/);
  });
});
