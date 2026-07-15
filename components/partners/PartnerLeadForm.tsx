"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  partnerServiceCategories,
} from "@/lib/data/site";
import {
  vendorBusinessTypes,
  vendorDailyCapacityOptions,
  vendorMonthlyOrderOptions,
  vendorPickupDeliveryOptions,
  vendorYearsInBusinessOptions,
} from "@/lib/vendor-leads/options";

const initialState = {
  businessName: "",
  fullName: "",
  phone: "",
  email: "",
  city: "",
  address: "",
  serviceArea: "",
  selectedServices: [] as string[],
  businessType: "",
  yearsInBusiness: "",
  estimatedMonthlyOrders: "",
  pickupDelivery: "",
  dailyCapacity: "",
  message: "",
  privacyConsent: false,
  website: "",
};

type PartnerFormState = typeof initialState;
type FieldErrors = Record<string, string[] | undefined>;

function getResponseFieldErrors(value: unknown): FieldErrors {
  if (!value || typeof value !== "object" || !("fieldErrors" in value)) {
    return {};
  }

  const fieldErrors = (value as { fieldErrors?: unknown }).fieldErrors;
  if (!fieldErrors || typeof fieldErrors !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(fieldErrors as Record<string, unknown>).flatMap(([field, messages]) => {
      const validMessages = Array.isArray(messages)
        ? messages.filter((message): message is string => typeof message === "string")
        : [];
      return validMessages.length ? [[field, validMessages]] : [];
    }),
  );
}

export function PartnerLeadForm() {
  const [form, setForm] = useState<PartnerFormState>(initialState);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedServiceDescriptions = useMemo(
    () => partnerServiceCategories.filter((service) => form.selectedServices.includes(service.value)),
    [form.selectedServices],
  );

  function clearFieldError(field: string) {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function updateField(field: Exclude<keyof PartnerFormState, "selectedServices" | "privacyConsent">, value: string) {
    setSuccessMessage("");
    setFormError("");
    clearFieldError(field);
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleService(value: string) {
    setSuccessMessage("");
    setFormError("");
    clearFieldError("selectedServices");
    setForm((current) => ({
      ...current,
      selectedServices: current.selectedServices.includes(value)
        ? current.selectedServices.filter((service) => service !== value)
        : [...current.selectedServices, value],
    }));
  }

  function updateConsent(value: boolean) {
    setSuccessMessage("");
    setFormError("");
    clearFieldError("privacyConsent");
    setForm((current) => ({ ...current, privacyConsent: value }));
  }

  function focusFirstError(errors: FieldErrors) {
    const field = Object.keys(errors)[0];
    if (!field) return;

    window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(`[name="${field}"]`)?.focus();
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFormError("");
    setSuccessMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/vendor-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "website-partners" }),
      });
      const payload: unknown = await response.json().catch(() => null);

      if (response.status === 422) {
        const errors = getResponseFieldErrors(payload);
        setFieldErrors(errors);
        setFormError(
          payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string"
            ? payload.error
            : "Please check the highlighted fields.",
        );
        focusFirstError(errors);
        return;
      }

      if (!response.ok) {
        setFormError(
          payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string"
            ? payload.error
            : "We could not submit your enquiry right now. Please try again shortly.",
        );
        return;
      }

      const message =
        payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string"
          ? payload.message
          : "Thanks. The LNDRY partner team has received your enquiry.";
      setForm(initialState);
      setSuccessMessage(message);
    } catch {
      setFormError("We could not submit your enquiry right now. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "h-12 w-full min-w-0 rounded-sm border border-hairline bg-surface-cool px-4 font-body text-sm text-ink outline-none transition-colors focus:border-violet focus:bg-white aria-[invalid=true]:border-error aria-[invalid=true]:bg-red-50";
  const textareaClass =
    "min-h-28 w-full min-w-0 rounded-sm border border-hairline bg-surface-cool px-4 py-3 font-body text-sm text-ink outline-none transition-colors focus:border-violet focus:bg-white aria-[invalid=true]:border-error aria-[invalid=true]:bg-red-50";
  const labelClass = "flex min-w-0 flex-col gap-2 font-body text-sm font-semibold text-ink-soft";
  const errorFor = (field: string) => fieldErrors[field]?.[0];

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative grid min-w-0 gap-4 rounded-xl border border-hairline bg-white p-5 shadow-elevated sm:grid-cols-2 md:p-6"
    >
      <div className="pointer-events-none absolute -left-[10000px] h-px w-px overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="partner-website">Website</label>
        <input
          id="partner-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      <label className={labelClass}>
        Laundry or business name
        <input
          required
          name="businessName"
          autoComplete="organization"
          aria-invalid={Boolean(errorFor("businessName"))}
          aria-describedby={errorFor("businessName") ? "businessName-error" : undefined}
          className={inputClass}
          placeholder="Example: FreshFold Laundry"
          value={form.businessName}
          onChange={(event) => updateField("businessName", event.target.value)}
        />
        {errorFor("businessName") ? <span id="businessName-error" className="text-xs font-medium text-error">{errorFor("businessName")}</span> : null}
      </label>

      <label className={labelClass}>
        Contact person
        <input
          required
          name="fullName"
          autoComplete="name"
          aria-invalid={Boolean(errorFor("fullName"))}
          aria-describedby={errorFor("fullName") ? "fullName-error" : undefined}
          className={inputClass}
          placeholder="Full name"
          value={form.fullName}
          onChange={(event) => updateField("fullName", event.target.value)}
        />
        {errorFor("fullName") ? <span id="fullName-error" className="text-xs font-medium text-error">{errorFor("fullName")}</span> : null}
      </label>

      <label className={labelClass}>
        Mobile number
        <input
          required
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          aria-invalid={Boolean(errorFor("phone"))}
          aria-describedby={errorFor("phone") ? "phone-error" : undefined}
          className={inputClass}
          placeholder="+91 98765 43210"
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
        />
        {errorFor("phone") ? <span id="phone-error" className="text-xs font-medium text-error">{errorFor("phone")}</span> : null}
      </label>

      <label className={labelClass}>
        Email address
        <input
          required
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-invalid={Boolean(errorFor("email"))}
          aria-describedby={errorFor("email") ? "email-error" : undefined}
          className={inputClass}
          placeholder="owner@example.com"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
        />
        {errorFor("email") ? <span id="email-error" className="text-xs font-medium text-error">{errorFor("email")}</span> : null}
      </label>

      <label className={labelClass}>
        City
        <input
          required
          name="city"
          autoComplete="address-level2"
          aria-invalid={Boolean(errorFor("city"))}
          aria-describedby={errorFor("city") ? "city-error" : undefined}
          className={inputClass}
          placeholder="Pune"
          value={form.city}
          onChange={(event) => updateField("city", event.target.value)}
        />
        {errorFor("city") ? <span id="city-error" className="text-xs font-medium text-error">{errorFor("city")}</span> : null}
      </label>

      <label className={labelClass}>
        Areas you can serve
        <input
          required
          name="serviceArea"
          aria-invalid={Boolean(errorFor("serviceArea"))}
          aria-describedby={errorFor("serviceArea") ? "serviceArea-error" : undefined}
          className={inputClass}
          placeholder="Baner, Wakad, Kharadi..."
          value={form.serviceArea}
          onChange={(event) => updateField("serviceArea", event.target.value)}
        />
        {errorFor("serviceArea") ? <span id="serviceArea-error" className="text-xs font-medium text-error">{errorFor("serviceArea")}</span> : null}
      </label>

      <label className={`${labelClass} sm:col-span-2`}>
        Business address <span className="font-normal text-muted">(optional)</span>
        <textarea
          name="address"
          autoComplete="street-address"
          aria-invalid={Boolean(errorFor("address"))}
          aria-describedby={errorFor("address") ? "address-error" : undefined}
          className={textareaClass}
          placeholder="Street, building, locality, and landmark"
          value={form.address}
          onChange={(event) => updateField("address", event.target.value)}
        />
        {errorFor("address") ? <span id="address-error" className="text-xs font-medium text-error">{errorFor("address")}</span> : null}
      </label>

      <fieldset className="min-w-0 sm:col-span-2" aria-describedby={errorFor("selectedServices") ? "selectedServices-error" : undefined}>
        <legend className="font-body text-sm font-semibold text-ink-soft">Service categories you can fulfil</legend>
        <p className="mt-1 font-body text-xs leading-relaxed text-muted">Select every service your team can reliably handle.</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {partnerServiceCategories.map((service) => {
            const selected = form.selectedServices.includes(service.value);
            return (
              <label
                key={service.value}
                className={`flex cursor-pointer items-start gap-3 rounded-sm border p-3 transition-colors ${
                  selected ? "border-violet bg-lavender-soft" : "border-hairline bg-surface-cool hover:border-violet/60"
                }`}
              >
                <input
                  name="selectedServices"
                  type="checkbox"
                  className="mt-0.5 size-4 accent-violet"
                  checked={selected}
                  onChange={() => toggleService(service.value)}
                />
                <span className="min-w-0">
                  <span className="block font-body text-sm font-semibold text-ink">{service.label}</span>
                  <span className="mt-0.5 block font-body text-xs leading-relaxed text-ink-soft">{service.description}</span>
                </span>
              </label>
            );
          })}
        </div>
        {selectedServiceDescriptions.length ? (
          <p className="mt-3 rounded-sm bg-teal-tint px-3 py-2 font-body text-xs font-medium leading-relaxed text-ink">
            {selectedServiceDescriptions.length} service{selectedServiceDescriptions.length === 1 ? "" : "s"} selected for review.
          </p>
        ) : null}
        {errorFor("selectedServices") ? <p id="selectedServices-error" className="mt-2 text-xs font-medium text-error">{errorFor("selectedServices")}</p> : null}
      </fieldset>

      <label className={labelClass}>
        Business type
        <select
          required
          name="businessType"
          aria-invalid={Boolean(errorFor("businessType"))}
          aria-describedby={errorFor("businessType") ? "businessType-error" : undefined}
          className={inputClass}
          value={form.businessType}
          onChange={(event) => updateField("businessType", event.target.value)}
        >
          <option value="" disabled>Select business type</option>
          {vendorBusinessTypes.map((option) => <option key={option}>{option}</option>)}
        </select>
        {errorFor("businessType") ? <span id="businessType-error" className="text-xs font-medium text-error">{errorFor("businessType")}</span> : null}
      </label>

      <label className={labelClass}>
        Years in business
        <select
          required
          name="yearsInBusiness"
          aria-invalid={Boolean(errorFor("yearsInBusiness"))}
          aria-describedby={errorFor("yearsInBusiness") ? "yearsInBusiness-error" : undefined}
          className={inputClass}
          value={form.yearsInBusiness}
          onChange={(event) => updateField("yearsInBusiness", event.target.value)}
        >
          <option value="" disabled>Select experience</option>
          {vendorYearsInBusinessOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
        {errorFor("yearsInBusiness") ? <span id="yearsInBusiness-error" className="text-xs font-medium text-error">{errorFor("yearsInBusiness")}</span> : null}
      </label>

      <label className={labelClass}>
        Estimated monthly orders
        <select
          required
          name="estimatedMonthlyOrders"
          aria-invalid={Boolean(errorFor("estimatedMonthlyOrders"))}
          aria-describedby={errorFor("estimatedMonthlyOrders") ? "estimatedMonthlyOrders-error" : undefined}
          className={inputClass}
          value={form.estimatedMonthlyOrders}
          onChange={(event) => updateField("estimatedMonthlyOrders", event.target.value)}
        >
          <option value="" disabled>Select order range</option>
          {vendorMonthlyOrderOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
        {errorFor("estimatedMonthlyOrders") ? <span id="estimatedMonthlyOrders-error" className="text-xs font-medium text-error">{errorFor("estimatedMonthlyOrders")}</span> : null}
      </label>

      <label className={labelClass}>
        Current daily capacity
        <select
          required
          name="dailyCapacity"
          aria-invalid={Boolean(errorFor("dailyCapacity"))}
          aria-describedby={errorFor("dailyCapacity") ? "dailyCapacity-error" : undefined}
          className={inputClass}
          value={form.dailyCapacity}
          onChange={(event) => updateField("dailyCapacity", event.target.value)}
        >
          <option value="" disabled>Select daily capacity</option>
          {vendorDailyCapacityOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
        {errorFor("dailyCapacity") ? <span id="dailyCapacity-error" className="text-xs font-medium text-error">{errorFor("dailyCapacity")}</span> : null}
      </label>

      <label className={`${labelClass} sm:col-span-2`}>
        Pickup and delivery availability
        <select
          required
          name="pickupDelivery"
          aria-invalid={Boolean(errorFor("pickupDelivery"))}
          aria-describedby={errorFor("pickupDelivery") ? "pickupDelivery-error" : undefined}
          className={inputClass}
          value={form.pickupDelivery}
          onChange={(event) => updateField("pickupDelivery", event.target.value)}
        >
          <option value="" disabled>Select your current setup</option>
          {vendorPickupDeliveryOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
        {errorFor("pickupDelivery") ? <span id="pickupDelivery-error" className="text-xs font-medium text-error">{errorFor("pickupDelivery")}</span> : null}
      </label>

      <label className={`${labelClass} sm:col-span-2`}>
        Notes for LNDRY team <span className="font-normal text-muted">(optional)</span>
        <textarea
          name="message"
          aria-invalid={Boolean(errorFor("message"))}
          aria-describedby={errorFor("message") ? "message-error" : undefined}
          className={textareaClass}
          placeholder="Tell us about special equipment, delivery coverage, premium services, or timing constraints."
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
        />
        {errorFor("message") ? <span id="message-error" className="text-xs font-medium text-error">{errorFor("message")}</span> : null}
      </label>

      <label className="flex cursor-pointer items-start gap-3 rounded-sm border border-hairline bg-surface-cool p-4 sm:col-span-2">
        <input
          required
          name="privacyConsent"
          type="checkbox"
          className="mt-1 size-4 shrink-0 accent-violet"
          checked={form.privacyConsent}
          onChange={(event) => updateConsent(event.target.checked)}
          aria-invalid={Boolean(errorFor("privacyConsent"))}
          aria-describedby={errorFor("privacyConsent") ? "privacyConsent-error" : undefined}
        />
        <span className="font-body text-sm leading-relaxed text-ink-soft">
          I agree that LNDRY may use these details to assess my onboarding enquiry and contact me about it. Read the{" "}
          <Link href="/privacy" className="font-semibold text-violet underline underline-offset-2">Privacy Policy</Link>.
          {errorFor("privacyConsent") ? <span id="privacyConsent-error" className="mt-1 block text-xs font-medium text-error">{errorFor("privacyConsent")}</span> : null}
        </span>
      </label>

      {formError ? <p role="alert" className="rounded-sm bg-red-50 px-4 py-3 font-body text-sm font-semibold text-error sm:col-span-2">{formError}</p> : null}
      {successMessage ? <p role="status" aria-live="polite" className="rounded-sm bg-teal-tint px-4 py-3 font-body text-sm font-semibold text-ink sm:col-span-2">{successMessage}</p> : null}

      <Button type="submit" disabled={isSubmitting} className="mt-2 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2">
        {isSubmitting ? "Sending enquiry…" : "Send partner enquiry"}
      </Button>
    </form>
  );
}
