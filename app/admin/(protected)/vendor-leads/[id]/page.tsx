import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Building2, CalendarClock, ClipboardCheck, MapPin, ShieldCheck } from "lucide-react";
import { LeadContactActions } from "@/components/admin/LeadContactActions";
import { LeadWorkflowForm } from "@/components/admin/LeadWorkflowForm";
import { VendorLeadStatusBadge } from "@/components/admin/VendorLeadStatusBadge";
import { getAdminAccess } from "@/lib/auth/require-admin";
import { vendorLeadIdSchema } from "@/lib/vendor-leads/schema";
import { formatVendorLeadDate, vendorLeadServiceLabels } from "@/lib/vendor-leads/presentation";
import { getVendorLeadById } from "@/lib/vendor-leads/repository";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function DetailItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-hairline py-4 last:border-b-0 sm:grid-cols-[11rem_1fr] sm:gap-5">
      <dt className="font-body text-sm font-semibold text-ink-soft">{label}</dt>
      <dd className="font-body text-sm leading-relaxed text-ink">{children}</dd>
    </div>
  );
}

export default async function VendorLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [access, route] = await Promise.all([getAdminAccess(), params]);
  if (access.kind !== "authorized") {
    redirect("/admin/login?next=/admin/vendor-leads");
  }

  const parsedId = vendorLeadIdSchema.safeParse(route.id);
  if (!parsedId.success) {
    notFound();
  }

  let lead;
  try {
    lead = await getVendorLeadById(access.supabase, parsedId.data);
  } catch {
    lead = null;
  }

  if (!lead) {
    notFound();
  }

  return (
    <div className="grid gap-6">
      <Link href="/admin/vendor-leads" className="inline-flex w-fit items-center gap-2 font-body text-sm font-semibold text-violet underline underline-offset-4">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to vendor leads
      </Link>

      <header className="flex flex-col justify-between gap-5 rounded-md bg-ink p-5 text-white sm:p-7 lg:flex-row lg:items-end">
        <div>
          <p className="font-body text-sm font-semibold text-lavender-soft">Vendor enquiry</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{lead.business_name}</h1>
          <p className="mt-2 font-body text-sm text-white/70">Submitted {formatVendorLeadDate(lead.created_at)} · {lead.full_name}</p>
        </div>
        <VendorLeadStatusBadge status={lead.status} />
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_25rem]">
        <div className="grid gap-6">
          <section className="rounded-md border border-hairline bg-white p-5 sm:p-6">
            <div className="flex items-center gap-2 text-violet-deep">
              <Building2 size={18} aria-hidden="true" />
              <h2 className="font-display text-xl font-semibold text-ink">Business and contact</h2>
            </div>
            <dl className="mt-4">
              <DetailItem label="Contact person">{lead.full_name}</DetailItem>
              <DetailItem label="Email"><a href={`mailto:${lead.email}`} className="text-violet underline underline-offset-2">{lead.email}</a></DetailItem>
              <DetailItem label="Phone"><a href={`tel:${lead.phone}`} className="text-violet underline underline-offset-2">{lead.phone}</a></DetailItem>
              <DetailItem label="Business type">{lead.business_type}</DetailItem>
              <DetailItem label="Years in business">{lead.years_in_business}</DetailItem>
            </dl>
            <div className="mt-5"><LeadContactActions email={lead.email} phone={lead.phone} /></div>
          </section>

          <section className="rounded-md border border-hairline bg-white p-5 sm:p-6">
            <div className="flex items-center gap-2 text-violet-deep">
              <MapPin size={18} aria-hidden="true" />
              <h2 className="font-display text-xl font-semibold text-ink">Service coverage</h2>
            </div>
            <dl className="mt-4">
              <DetailItem label="City">{lead.city}</DetailItem>
              <DetailItem label="Service area">{lead.service_area}</DetailItem>
              <DetailItem label="Business address">{lead.address ? <span className="whitespace-pre-wrap">{lead.address}</span> : "Not provided"}</DetailItem>
              <DetailItem label="Services">{vendorLeadServiceLabels(lead.services)}</DetailItem>
              <DetailItem label="Estimated monthly orders">{lead.estimated_monthly_orders}</DetailItem>
              <DetailItem label="Daily capacity">{lead.daily_capacity ?? "Not provided"}</DetailItem>
              <DetailItem label="Pickup and delivery">{lead.pickup_delivery ?? "Not provided"}</DetailItem>
            </dl>
          </section>

          <section className="rounded-md border border-hairline bg-white p-5 sm:p-6">
            <div className="flex items-center gap-2 text-violet-deep">
              <ClipboardCheck size={18} aria-hidden="true" />
              <h2 className="font-display text-xl font-semibold text-ink">Vendor message</h2>
            </div>
            <p className="mt-4 whitespace-pre-wrap font-body text-sm leading-relaxed text-ink">{lead.message || "No message provided."}</p>
          </section>

          <section className="rounded-md border border-hairline bg-white p-5 sm:p-6">
            <div className="flex items-center gap-2 text-violet-deep">
              <ShieldCheck size={18} aria-hidden="true" />
              <h2 className="font-display text-xl font-semibold text-ink">Submission record</h2>
            </div>
            <dl className="mt-4">
              <DetailItem label="Privacy consent">{lead.privacy_consent ? "Recorded" : "Not recorded"}</DetailItem>
              <DetailItem label="Source">{lead.source}</DetailItem>
              <DetailItem label="Submitted"><span className="inline-flex items-center gap-2"><CalendarClock size={15} aria-hidden="true" />{formatVendorLeadDate(lead.created_at)}</span></DetailItem>
              <DetailItem label="Last updated">{formatVendorLeadDate(lead.updated_at)}</DetailItem>
            </dl>
          </section>
        </div>

        <aside className="h-fit rounded-md border border-hairline bg-white p-5 sm:p-6 xl:sticky xl:top-5">
          <p className="font-body text-sm font-semibold text-violet-deep">Internal workflow</p>
          <h2 className="mt-2 font-display text-xl font-semibold text-ink">Review this lead</h2>
          <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">Status and notes are visible only to authorized LNDRY administrators.</p>
          <div className="mt-5"><LeadWorkflowForm leadId={lead.id} initialStatus={lead.status} initialNotes={lead.admin_notes} /></div>
        </aside>
      </div>
    </div>
  );
}
