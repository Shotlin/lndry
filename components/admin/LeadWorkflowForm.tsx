"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { VENDOR_LEAD_STATUSES, type VendorLeadStatus } from "@/lib/vendor-leads/types";
import { vendorLeadStatusLabel } from "@/lib/vendor-leads/presentation";

export function LeadWorkflowForm({
  leadId,
  initialStatus,
  initialNotes,
}: {
  leadId: string;
  initialStatus: VendorLeadStatus;
  initialNotes: string | null;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<VendorLeadStatus>(initialStatus);
  const [notes, setNotes] = useState(initialNotes ?? "");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const isDirty = useMemo(
    () => status !== initialStatus || notes.trim() !== (initialNotes ?? "").trim(),
    [initialNotes, initialStatus, notes, status],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isDirty || isPending) return;

    setIsPending(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`/api/admin/vendor-leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNotes: notes }),
      });
      const payload: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        setError(
          payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string"
            ? payload.error
            : "We could not save this update. Please try again.",
        );
        return;
      }

      setSuccess("Lead workflow saved.");
      router.refresh();
    } catch {
      setError("We could not save this update. Please check your connection and try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <label className="grid gap-2 font-body text-sm font-semibold text-ink-soft">
        Lead status
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as VendorLeadStatus)}
          className="h-12 rounded-sm border border-hairline bg-surface-cool px-3 font-body text-sm text-ink outline-none transition-colors focus:border-violet focus:bg-white"
        >
          {VENDOR_LEAD_STATUSES.map((option) => (
            <option key={option} value={option}>{vendorLeadStatusLabel(option)}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 font-body text-sm font-semibold text-ink-soft">
        Internal notes
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          maxLength={5000}
          className="min-h-36 rounded-sm border border-hairline bg-surface-cool px-3 py-3 font-body text-sm leading-relaxed text-ink outline-none transition-colors focus:border-violet focus:bg-white"
          placeholder="Add qualification notes, follow-up timing, or onboarding context. These notes are never shown to vendors."
        />
      </label>
      {error ? <p role="alert" className="rounded-sm bg-red-50 px-3 py-2 font-body text-sm font-semibold text-error">{error}</p> : null}
      {success ? <p role="status" className="rounded-sm bg-teal-tint px-3 py-2 font-body text-sm font-semibold text-ink">{success}</p> : null}
      <button
        type="submit"
        disabled={!isDirty || isPending}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-violet px-4 font-display text-sm font-semibold text-white transition-colors hover:bg-violet-deep disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Save size={16} aria-hidden="true" />
        {isPending ? "Saving…" : "Save workflow changes"}
      </button>
    </form>
  );
}
