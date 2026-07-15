export const VENDOR_LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "rejected",
  "onboarded",
  "archived",
] as const;

export type VendorLeadStatus = (typeof VENDOR_LEAD_STATUSES)[number];

export interface VendorLead {
  id: string;
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  city: string;
  address: string | null;
  service_area: string;
  services: string[];
  business_type: string;
  years_in_business: string;
  estimated_monthly_orders: string;
  pickup_delivery: string | null;
  daily_capacity: string | null;
  message: string | null;
  privacy_consent: boolean;
  status: VendorLeadStatus;
  admin_notes: string | null;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface VendorLeadSummary {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  onboarded: number;
  today: number;
}
