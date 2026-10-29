import type { VendorLead } from "@/lib/vendor-leads/types";

// Characters a spreadsheet treats as the start of a formula. Tab and carriage
// return are included because Excel strips them before evaluating the cell.
const FORMULA_PREFIX = /^[\s\u0000-\u001f]*[=+\-@]/;

export function csvValue(value: string | number | boolean | null | undefined) {
  const text = value === null || value === undefined ? "" : String(value);
  const formulaSafe = FORMULA_PREFIX.test(text) || /^[\t\r]/.test(text) ? `'${text}` : text;
  return `"${formulaSafe.replace(/"/g, '""')}"`;
}

function statusForCsv(lead: VendorLead) {
  return lead.status.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function toCsv(leads: VendorLead[]) {
  const headings = [
    "Submitted at",
    "Status",
    "Business name",
    "Contact person",
    "Email",
    "Phone",
    "City",
    "Service area",
    "Services",
    "Business type",
    "Years in business",
    "Estimated monthly orders",
    "Pickup and delivery",
    "Daily capacity",
    "Address",
    "Message",
    "Internal notes",
    "Source",
  ];

  const rows = leads.map((lead) => [
    lead.created_at,
    statusForCsv(lead),
    lead.business_name,
    lead.full_name,
    lead.email,
    lead.phone,
    lead.city,
    lead.service_area,
    lead.services.join(", "),
    lead.business_type,
    lead.years_in_business,
    lead.estimated_monthly_orders,
    lead.pickup_delivery,
    lead.daily_capacity,
    lead.address,
    lead.message,
    lead.admin_notes,
    lead.source,
  ]);

  return `﻿${[headings, ...rows].map((row) => row.map(csvValue).join(",")).join("\r\n")}`;
}
