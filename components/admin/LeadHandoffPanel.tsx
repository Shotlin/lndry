"use client";

import { RefreshCw, ShieldCheck, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { VendorLeadHandoffStatus } from "@/lib/vendor-leads/types";

type HandoffView = {
  canonical_handoff_status: VendorLeadHandoffStatus;
  canonical_handoff_attempts: number;
  canonical_handoff_last_error: string | null;
  canonical_handoff_at: string | null;
};

const statusCopy: Record<VendorLeadHandoffStatus, { title: string; detail: string; tone: string }> = {
  delivered: { title: "Canonical intake recorded", detail: "This enquiry reached LNDRY’s controlled staging queue. It is not a vendor approval.", tone: "border-teal-200 bg-teal-tint text-teal-900" },
  pending: { title: "Handoff awaiting retry", detail: "This stored enquiry has not yet received a recorded canonical delivery result.", tone: "border-amber-200 bg-amber-50 text-amber-950" },
  not_configured: { title: "Handoff is not configured", detail: "The website’s server-only canonical handoff configuration must be completed before delivery can be retried.", tone: "border-amber-200 bg-amber-50 text-amber-950" },
  failed: { title: "Canonical handoff needs retry", detail: "The enquiry is safely stored here, but the last canonical delivery attempt did not complete.", tone: "border-red-200 bg-red-50 text-red-950" },
};

function attemptLabel(attempts: number) {
  return `${attempts} recorded attempt${attempts === 1 ? "" : "s"}`;
}

export function LeadHandoffPanel({ leadId, initial }: { leadId: string; initial: HandoffView }) {
  const router = useRouter();
  const [handoff, setHandoff] = useState(initial);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const view = statusCopy[handoff.canonical_handoff_status];
  const canRetry = handoff.canonical_handoff_status !== "delivered";

  async function retry() {
    if (!canRetry || isPending) return;
    setIsPending(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/vendor-leads/${leadId}/handoff`, { method: "POST" });
      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok || !payload || typeof payload !== "object" || !("handoff" in payload)) {
        setError(payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string" ? payload.error : "We could not record this handoff retry. Please try again.");
        return;
      }
      const result = payload.handoff as Partial<HandoffView>;
      if (!result.canonical_handoff_status || typeof result.canonical_handoff_attempts !== "number") {
        setError("The handoff response was incomplete. Refresh this lead before trying again.");
        return;
      }
      setHandoff({
        canonical_handoff_status: result.canonical_handoff_status,
        canonical_handoff_attempts: result.canonical_handoff_attempts,
        canonical_handoff_last_error: result.canonical_handoff_last_error ?? null,
        canonical_handoff_at: result.canonical_handoff_at ?? null,
      });
      router.refresh();
    } catch {
      setError("We could not reach the handoff service. Please check the connection and try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <section className={`rounded-md border p-5 ${view.tone}`} aria-live="polite">
      <div className="flex items-start gap-3">
        {handoff.canonical_handoff_status === "delivered" ? <ShieldCheck className="mt-0.5 shrink-0" size={19} aria-hidden="true" /> : <TriangleAlert className="mt-0.5 shrink-0" size={19} aria-hidden="true" />}
        <div className="min-w-0">
          <p className="font-body text-sm font-semibold">Canonical partner intake</p>
          <h2 className="mt-1 font-display text-xl font-semibold">{view.title}</h2>
          <p className="mt-2 font-body text-sm leading-relaxed opacity-80">{view.detail}</p>
          <p className="mt-3 font-body text-xs font-semibold opacity-70">{attemptLabel(handoff.canonical_handoff_attempts)}</p>
          {handoff.canonical_handoff_last_error ? <p className="mt-2 rounded-sm bg-white/55 px-3 py-2 font-body text-xs leading-relaxed">Last result: {handoff.canonical_handoff_last_error}</p> : null}
          {canRetry ? <button type="button" onClick={retry} disabled={isPending} className="mt-4 inline-flex h-10 items-center gap-2 rounded-sm bg-ink px-3 font-body text-sm font-semibold text-white transition-colors hover:bg-violet-deep disabled:cursor-not-allowed disabled:opacity-60"><RefreshCw className={isPending ? "animate-spin" : ""} size={15} aria-hidden="true" />{isPending ? "Recording retry…" : "Retry canonical handoff"}</button> : null}
          {error ? <p role="alert" className="mt-3 rounded-sm bg-white/70 px-3 py-2 font-body text-sm font-semibold text-error">{error}</p> : null}
        </div>
      </div>
    </section>
  );
}
