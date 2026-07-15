import { z } from "zod";
import {
  isVendorService,
  vendorBusinessTypes,
  vendorDailyCapacityOptions,
  vendorMonthlyOrderOptions,
  vendorPickupDeliveryOptions,
  vendorYearsInBusinessOptions,
} from "@/lib/vendor-leads/options";
import { VENDOR_LEAD_STATUSES } from "@/lib/vendor-leads/types";

function normalizeOneLine(value: string) {
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeMultiline(value: string) {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim();
}

function normalizePhone(value: string) {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "");

  if (trimmed.startsWith("+")) {
    return `+${digits}`;
  }

  if (digits.startsWith("00")) {
    return `+${digits.slice(2)}`;
  }

  // LNDRY launches in India. A ten-digit local mobile number is safely made E.164.
  if (digits.length === 10) {
    return `+91${digits}`;
  }

  return `+${digits}`;
}

const oneLineText = (minimum: number, maximum: number, errorMessage: string) =>
  z
    .string({ error: errorMessage })
    .max(maximum, errorMessage)
    .transform(normalizeOneLine)
    .pipe(z.string().min(minimum, errorMessage).max(maximum, errorMessage));

const optionalOneLineText = (maximum: number) =>
  z
    .string()
    .max(maximum)
    .optional()
    .transform((value) => (value ? normalizeOneLine(value) || null : null));

const optionalMultilineText = (maximum: number) =>
  z
    .string()
    .max(maximum)
    .optional()
    .transform((value) => (value ? normalizeMultiline(value) || null : null));

const phoneSchema = z
  .string({ error: "Enter a valid mobile number." })
  .min(7, "Enter a valid mobile number.")
  .max(32, "Enter a valid mobile number.")
  .transform(normalizePhone)
  .pipe(z.string().regex(/^\+[1-9]\d{7,14}$/, "Enter a valid phone number with country code."));

const selectedServicesSchema = z
  .array(z.string().refine(isVendorService, "Select a valid service category."), {
    error: "Select at least one service category.",
  })
  .min(1, "Select at least one service category.")
  .max(8, "Select up to eight service categories.")
  .refine((services) => new Set(services).size === services.length, "Duplicate service selections are not allowed.");

export const vendorLeadSubmissionSchema = z
  .object({
    fullName: oneLineText(2, 100, "Enter the contact person's full name."),
    businessName: oneLineText(2, 140, "Enter your laundry or business name."),
    email: z
      .string({ error: "Enter your email address." })
      .trim()
      .toLowerCase()
      .max(254, "Enter a valid email address.")
      .email("Enter a valid email address."),
    phone: phoneSchema,
    city: oneLineText(2, 80, "Enter the city where your business operates."),
    address: optionalMultilineText(500),
    serviceArea: oneLineText(2, 180, "Enter at least one area you can serve."),
    selectedServices: selectedServicesSchema,
    businessType: z.enum(vendorBusinessTypes, { error: "Select your business type." }),
    yearsInBusiness: z.enum(vendorYearsInBusinessOptions, { error: "Select your years of experience." }),
    estimatedMonthlyOrders: z.string({ error: "Select an estimated monthly order range." }).refine(
      (value) => vendorMonthlyOrderOptions.some((option) => option === value),
      "Select an estimated monthly order range.",
    ),
    pickupDelivery: z
      .string({ error: "Select your pickup and delivery setup." })
      .refine(
        (value) => vendorPickupDeliveryOptions.some((option) => option === value),
        "Select your pickup and delivery setup.",
      ),
    dailyCapacity: z
      .string({ error: "Select your current daily capacity." })
      .refine(
        (value) => vendorDailyCapacityOptions.some((option) => option === value),
        "Select your current daily capacity.",
      ),
    message: optionalMultilineText(3000),
    privacyConsent: z.literal(true, {
      error: "Please confirm that LNDRY may use these details to contact you about onboarding.",
    }),
    source: z.literal("website-partners").optional(),
    website: z.string().max(200).optional().default(""),
  })
  .strict();

export type VendorLeadSubmission = z.output<typeof vendorLeadSubmissionSchema>;

export const vendorLeadUpdateSchema = z
  .object({
    status: z.enum(VENDOR_LEAD_STATUSES).optional(),
    adminNotes: optionalMultilineText(5000).optional(),
  })
  .strict()
  .refine((value) => value.status !== undefined || value.adminNotes !== undefined, {
    message: "Provide a status or internal note to update this lead.",
  });

export const vendorLeadIdSchema = z.string().uuid("Invalid vendor lead identifier.");
