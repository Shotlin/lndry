-- A website enquiry is not a vendor application. These fields only record
-- whether the server-side, signed handoff reached the canonical LNDRY API.
-- The admin must still explicitly invite/verify the prospect before any
-- vendor onboarding record can exist.

alter table public.vendor_leads
  add column if not exists canonical_handoff_status text not null default 'pending'
    check (canonical_handoff_status in ('pending', 'delivered', 'not_configured', 'failed')),
  add column if not exists canonical_handoff_attempts integer not null default 0
    check (canonical_handoff_attempts >= 0),
  add column if not exists canonical_handoff_last_error text
    check (canonical_handoff_last_error is null or char_length(canonical_handoff_last_error) <= 500),
  add column if not exists canonical_handoff_at timestamptz;

create index if not exists vendor_leads_canonical_handoff_idx
  on public.vendor_leads (canonical_handoff_status, created_at desc);

-- The existing RLS policy only permits admins to change status/admin_notes.
-- Keep the handoff operational fields server-only: the website route uses a
-- service-role client after validation, and browser clients receive no grant.
