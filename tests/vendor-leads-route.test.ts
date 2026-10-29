import { beforeEach, describe, expect, it, vi } from "vitest";
import { vendorBusinessTypes, vendorDailyCapacityOptions, vendorMonthlyOrderOptions, vendorPickupDeliveryOptions, vendorServiceValues, vendorYearsInBusinessOptions } from "@/lib/vendor-leads/options";

const state = { existing: false, inserts: [] as unknown[], updates: [] as unknown[] };

function table() {
  const chain: Record<string, unknown> = {};
  chain.select = () => chain;
  chain.eq = () => chain;
  chain.gte = () => chain;
  chain.limit = () => Promise.resolve({ data: state.existing ? [{ id: "dup" }] : [] });
  chain.insert = (row: unknown) => {
    state.inserts.push(row);
    return { select: () => ({ single: () => Promise.resolve({ data: { id: "new-id" }, error: null }) }) };
  };
  chain.update = (row: unknown) => {
    state.updates.push(row);
    return { eq: () => Promise.resolve({ error: null }) };
  };
  return chain;
}

vi.mock("@/lib/supabase/admin", () => ({ createAdminSupabaseClient: () => ({ from: () => table() }) }));
vi.mock("@/lib/vendor-leads/backend-handoff", () => ({
  handoffVendorLead: vi.fn().mockResolvedValue({ state: "delivered", error: null }),
}));

const valid = {
  fullName: "Asha Rao", businessName: "Clean Co", email: "asha@example.com", phone: "9876543210",
  city: "Pune", serviceArea: "Baner", selectedServices: [vendorServiceValues[0]],
  businessType: vendorBusinessTypes[0], yearsInBusiness: vendorYearsInBusinessOptions[0],
  estimatedMonthlyOrders: vendorMonthlyOrderOptions[0], pickupDelivery: vendorPickupDeliveryOptions[0],
  dailyCapacity: vendorDailyCapacityOptions[0], privacyConsent: true,
};

let ip = 0;
const send = async (body: unknown, headers: Record<string, string> = {}, rawBody?: BodyInit) => {
  const { POST } = await import("@/app/api/vendor-leads/route");
  return POST(
    new Request("https://lndry.in/api/vendor-leads", {
      method: "POST",
      headers: { "content-type": "application/json", "x-real-ip": `10.0.0.${++ip}`, ...headers },
      body: rawBody ?? JSON.stringify(body),
    }),
  );
};

beforeEach(() => {
  state.existing = false;
  state.inserts = [];
  state.updates = [];
});

describe("POST /api/vendor-leads", () => {
  it("stores a valid lead and records the handoff state", async () => {
    const res = await send(valid);
    expect(res.status).toBe(201);
    expect(state.inserts).toHaveLength(1);
    expect(state.updates[0]).toMatchObject({ canonical_handoff_status: "delivered" });
    expect(res.headers.get("cache-control")).toContain("no-store");
  });

  it("rejects cross-site, wrong content-type, invalid and honeypot submissions without storing", async () => {
    expect((await send(valid, { origin: "https://evil.example" })).status).toBe(403);
    expect((await send(valid, { "content-type": "text/plain" })).status).toBe(415);
    expect((await send({ ...valid, email: "bad" })).status).toBe(422);
    expect((await send({ ...valid, website: "http://spam" })).status).toBe(400);
    expect(state.inserts).toHaveLength(0);
  });

  it("caps the body by bytes actually received (no Content-Length reliance)", async () => {
    const res = await send(null, {}, JSON.stringify({ ...valid, message: "x".repeat(40_000) }));
    expect(res.status).toBe(413);
    expect(state.inserts).toHaveLength(0);
  });

  it("acknowledges a recent duplicate identically but does not store or hand it off again", async () => {
    state.existing = true;
    const res = await send(valid);
    expect(res.status).toBe(201);
    expect(await res.json()).toMatchObject({ success: true });
    expect(state.inserts).toHaveLength(0);
  });

  it("rate-limits a single client after 5 submissions", async () => {
    const same = { "x-real-ip": "203.0.113.9" };
    const statuses: number[] = [];
    for (let i = 0; i < 7; i++) statuses.push((await send({ ...valid, email: `u${i}@example.com`, phone: `98765432${10 + i}` }, same)).status);
    expect(statuses.slice(0, 5).every((s) => s === 201)).toBe(true);
    expect(statuses.slice(5)).toEqual([429, 429]);
  });
});
