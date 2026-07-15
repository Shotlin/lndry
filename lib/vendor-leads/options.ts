import {
  partnerCapacityOptions,
  partnerMonthlyOrderOptions,
  partnerServiceCategories,
} from "@/lib/data/site";

export const vendorBusinessTypes = [
  "Laundry & garment care studio",
  "Dry-cleaning specialist",
  "Wash, fold & iron service",
  "Pressing / ironing service",
  "Multi-service garment-care business",
  "Home service / collection point",
  "Other",
] as const;

export const vendorYearsInBusinessOptions = [
  "Less than 1 year",
  "1 to 3 years",
  "4 to 7 years",
  "8+ years",
] as const;

export const vendorPickupDeliveryOptions = [
  "Yes, we already provide pickup and delivery",
  "No, we need LNDRY delivery support",
  "Partial coverage in selected areas",
] as const;

export const vendorServiceValues = partnerServiceCategories.map((service) => service.value);
export const vendorMonthlyOrderOptions = partnerMonthlyOrderOptions;
export const vendorDailyCapacityOptions = partnerCapacityOptions;

export function isVendorService(value: string) {
  return vendorServiceValues.includes(value);
}
