import { describe, expect, it } from "vitest";
import { csvValue, toCsv } from "@/lib/vendor-leads/csv";
import { normalizeSearch } from "@/lib/vendor-leads/repository";
import { parseVendorLeadFilters, vendorLeadFilterSearchParams } from "@/lib/vendor-leads/filters";
import { vendorLeadSubmissionSchema, vendorLeadUpdateSchema, vendorLeadIdSchema } from "@/lib/vendor-leads/schema";
import { vendorBusinessTypes, vendorDailyCapacityOptions, vendorMonthlyOrderOptions, vendorPickupDeliveryOptions, vendorServiceValues, vendorYearsInBusinessOptions } from "@/lib/vendor-leads/options";
import type { VendorLead } from "@/lib/vendor-leads/types";

describe("csvValue (formula injection)", () => {
  it.each(["=SUM(A1)", "+1+1", "-2+3", "@cmd", "\t=1+1", "\r=1+1", " =1+1", "\n=1+1"])("neutralises %j", (v) => {
    expect(csvValue(v).startsWith(`"'`)).toBe(true);
  });
  it("leaves ordinary text and numbers alone and escapes quotes", () => {
    expect(csvValue("Pune")).toBe('"Pune"');
    expect(csvValue('say "hi"')).toBe('"say ""hi"""');
    expect(csvValue(12)).toBe('"12"');
    expect(csvValue(null)).toBe('""');
  });
});

describe("toCsv", () => {
  it("renders a header row plus data, with BOM and CRLF", () => {
    const lead = {
      created_at: "2026-01-01", status: "new", business_name: "=HYPERLINK(\"http://x\")", full_name: "A",
      email: "a@b.co", phone: "+919999999999", city: "Pune", service_area: "Baner", services: ["wash", "iron"],
      business_type: "x", years_in_business: "y", estimated_monthly_orders: "z", pickup_delivery: null,
      daily_capacity: null, address: null, message: "hi", admin_notes: null, source: "website-partners",
    } as unknown as VendorLead;
    const csv = toCsv([lead]);
    expect(csv.startsWith("\uFEFF")).toBe(true);
    expect(csv.split("\r\n")).toHaveLength(2);
    expect(csv).toContain(`"'=HYPERLINK(""http://x"")"`);
    expect(csv).toContain('"wash, iron"');
  });
});

describe("normalizeSearch (PostgREST filter injection)", () => {
  it("strips characters that can alter an or() filter expression", () => {
    const out = normalizeSearch(`a,email.eq.x),(phone.ilike."*\\'%_`);
    expect(out).not.toMatch(/[,()"'\\*%_]/);
  });
});

describe("filters", () => {
  it("falls back to safe defaults on junk", () => {
    expect(parseVendorLeadFilters({ page: "-3", status: "hacked", from: "nope" })).toEqual({ q: "", sort: "newest", page: 1 });
  });
  it("swaps an inverted date range and takes the first of repeated params", () => {
    const f = parseVendorLeadFilters({ from: "2026-02-10", to: "2026-02-01", q: ["first", "second"] });
    expect(f.from).toBe("2026-02-01");
    expect(f.to).toBe("2026-02-10");
    expect(f.q).toBe("first");
  });
  it("round-trips to search params", () => {
    const f = parseVendorLeadFilters({ q: "pune", status: "new", sort: "oldest", page: "3" });
    expect(new URLSearchParams(vendorLeadFilterSearchParams(f)).get("page")).toBe("3");
  });
});

const valid = {
  fullName: "Asha Rao", businessName: "Clean Co", email: "  Asha@Example.COM ", phone: "98765 43210",
  city: "Pune", serviceArea: "Baner, Aundh", selectedServices: [vendorServiceValues[0]],
  businessType: vendorBusinessTypes[0], yearsInBusiness: vendorYearsInBusinessOptions[0],
  estimatedMonthlyOrders: vendorMonthlyOrderOptions[0], pickupDelivery: vendorPickupDeliveryOptions[0],
  dailyCapacity: vendorDailyCapacityOptions[0], privacyConsent: true,
};

describe("vendorLeadSubmissionSchema", () => {
  it("normalises email/phone and accepts a valid lead", () => {
    const r = vendorLeadSubmissionSchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.email).toBe("asha@example.com");
      expect(r.data.phone).toBe("+919876543210");
      expect(r.data.website).toBe("");
    }
  });
  it("rejects unknown fields (mass assignment) and missing consent", () => {
    expect(vendorLeadSubmissionSchema.safeParse({ ...valid, status: "onboarded" }).success).toBe(false);
    expect(vendorLeadSubmissionSchema.safeParse({ ...valid, privacyConsent: false }).success).toBe(false);
  });
  it("rejects bad phones, services and oversize / abusive collections", () => {
    expect(vendorLeadSubmissionSchema.safeParse({ ...valid, phone: "12" }).success).toBe(false);
    expect(vendorLeadSubmissionSchema.safeParse({ ...valid, selectedServices: ["nope"] }).success).toBe(false);
    expect(vendorLeadSubmissionSchema.safeParse({ ...valid, selectedServices: Array(9).fill(vendorServiceValues[0]) }).success).toBe(false);
    expect(vendorLeadSubmissionSchema.safeParse({ ...valid, message: "x".repeat(3001) }).success).toBe(false);
  });
  it("collapses control characters in one-line fields", () => {
    const r = vendorLeadSubmissionSchema.safeParse({ ...valid, fullName: "Asha\u0000\n\tRao" });
    expect(r.success && r.data.fullName).toBe("Asha Rao");
  });
});

describe("admin update schema", () => {
  it("requires at least one field and rejects unknown keys / bad status / bad id", () => {
    expect(vendorLeadUpdateSchema.safeParse({}).success).toBe(false);
    expect(vendorLeadUpdateSchema.safeParse({ status: "contacted" }).success).toBe(true);
    expect(vendorLeadUpdateSchema.safeParse({ status: "root" }).success).toBe(false);
    expect(vendorLeadUpdateSchema.safeParse({ status: "new", id: "x" }).success).toBe(false);
    expect(vendorLeadIdSchema.safeParse("1 OR 1=1").success).toBe(false);
  });
});
