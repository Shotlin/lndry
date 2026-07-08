"use client";

import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  company,
  partnerCapacityOptions,
  partnerMonthlyOrderOptions,
  partnerServiceCategories,
} from "@/lib/data/site";

const initialState = {
  laundryName: "",
  ownerName: "",
  mobile: "",
  email: "",
  area: "",
  monthlyOrders: partnerMonthlyOrderOptions[0],
  pickupDelivery: "Yes, we already provide pickup and delivery",
  capacity: partnerCapacityOptions[0],
  primaryService: partnerServiceCategories[0].value,
  notes: "",
};

export function PartnerLeadForm() {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const selectedService = useMemo(
    () => partnerServiceCategories.find((service) => service.value === form.primaryService) ?? partnerServiceCategories[0],
    [form.primaryService],
  );

  function updateField(name: keyof typeof form, value: string) {
    setSubmitted(false);
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = [
      "New LNDRY partner enquiry",
      "",
      `Laundry name: ${form.laundryName}`,
      `Owner name: ${form.ownerName}`,
      `Mobile: ${form.mobile}`,
      `Email: ${form.email || "Not provided"}`,
      `Area: ${form.area}`,
      `Primary service: ${selectedService.label}`,
      `Monthly orders: ${form.monthlyOrders}`,
      `Pickup and delivery: ${form.pickupDelivery}`,
      `Capacity: ${form.capacity}`,
      `Notes: ${form.notes || "No extra notes"}`,
    ].join("\n");

    const mailto = `mailto:${company.supportEmail}?subject=${encodeURIComponent(
      "LNDRY partner enquiry",
    )}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
    window.location.href = mailto;
  }

  const inputClass =
    "h-12 rounded-sm border border-hairline bg-surface-cool px-4 font-body text-sm text-ink outline-none transition-colors focus:border-violet focus:bg-white";
  const labelClass = "flex flex-col gap-2 font-body text-sm font-semibold text-ink-soft";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-xl border border-hairline bg-white p-5 shadow-elevated sm:grid-cols-2 md:p-6"
    >
      <label className={labelClass}>
        Laundry name
        <input
          required
          className={inputClass}
          placeholder="Example: FreshFold Laundry"
          value={form.laundryName}
          onChange={(event) => updateField("laundryName", event.target.value)}
        />
      </label>

      <label className={labelClass}>
        Owner name
        <input
          required
          className={inputClass}
          placeholder="Full name"
          value={form.ownerName}
          onChange={(event) => updateField("ownerName", event.target.value)}
        />
      </label>

      <label className={labelClass}>
        Mobile number
        <input
          required
          type="tel"
          inputMode="tel"
          className={inputClass}
          placeholder="+91 98765 43210"
          value={form.mobile}
          onChange={(event) => updateField("mobile", event.target.value)}
        />
      </label>

      <label className={labelClass}>
        Email
        <input
          type="email"
          className={inputClass}
          placeholder="owner@example.com"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
        />
      </label>

      <label className={labelClass}>
        Area served
        <input
          required
          className={inputClass}
          placeholder="Baner, Wakad, Kharadi..."
          value={form.area}
          onChange={(event) => updateField("area", event.target.value)}
        />
      </label>

      <label className={labelClass}>
        Existing monthly orders
        <select
          className={inputClass}
          value={form.monthlyOrders}
          onChange={(event) => updateField("monthlyOrders", event.target.value)}
        >
          {partnerMonthlyOrderOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label className={`${labelClass} sm:col-span-2`}>
        Primary service category
        <select
          className={inputClass}
          value={form.primaryService}
          onChange={(event) => updateField("primaryService", event.target.value)}
        >
          {partnerServiceCategories.map((service) => (
            <option key={service.value} value={service.value}>
              {service.label}
            </option>
          ))}
        </select>
        <span className="rounded-sm bg-lavender-soft px-3 py-2 text-xs font-medium leading-relaxed text-violet-deep">
          {selectedService.description}
        </span>
      </label>

      <label className={labelClass}>
        Pickup and delivery available
        <select
          className={inputClass}
          value={form.pickupDelivery}
          onChange={(event) => updateField("pickupDelivery", event.target.value)}
        >
          <option>Yes, we already provide pickup and delivery</option>
          <option>No, we need LNDRY delivery support</option>
          <option>Partial coverage in selected areas</option>
        </select>
      </label>

      <label className={labelClass}>
        Current capacity per day
        <select
          className={inputClass}
          value={form.capacity}
          onChange={(event) => updateField("capacity", event.target.value)}
        >
          {partnerCapacityOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label className={`${labelClass} sm:col-span-2`}>
        Notes for LNDRY team
        <textarea
          className="min-h-28 rounded-sm border border-hairline bg-surface-cool px-4 py-3 font-body text-sm text-ink outline-none transition-colors focus:border-violet focus:bg-white"
          placeholder="Tell us about special equipment, delivery coverage, premium services, or timing constraints."
          value={form.notes}
          onChange={(event) => updateField("notes", event.target.value)}
        />
      </label>

      {submitted ? (
        <p className="rounded-sm bg-teal-tint px-4 py-3 font-body text-sm font-semibold text-ink sm:col-span-2">
          Opening your email app with the partner enquiry. If it does not open, email {company.supportEmail}.
        </p>
      ) : null}

      <Button type="submit" className="mt-2 w-full sm:col-span-2">
        Send partner enquiry
      </Button>
    </form>
  );
}
