# Canonical partner-lead handoff

The public website remains a partner-marketing surface. Its Supabase
`vendor_leads` row is **not** a `vendor_applications` row and does not create a
user, vendor, KYC approval, payment account, or marketplace access.

When both server-only variables are configured, the website sends each newly
stored lead to the canonical LNDRY API:

```text
LNDRY_PARTNER_LEAD_API_URL=https://api.lndry.in/api/v1
LNDRY_PARTNER_LEAD_HMAC_SECRET=<32+-character shared random secret>
```

The backend must receive the same `WEBSITE_PARTNER_LEAD_HMAC_SECRET`. The
secret must never use `NEXT_PUBLIC_`, browser code, source control, or chat.

Each request is signed over the exact JSON body plus an external lead UUID and
a five-minute timestamp. LNDRY validates the HMAC in constant time and stores
an idempotent `partner_leads` staging record keyed by
`(website-partners, external_lead_id)`. Retry of the same lead cannot create a
second prospect or mutate its originally submitted facts.

If either service is unavailable, the website keeps the validated Supabase
lead and marks its `canonical_handoff_status` honestly as `failed` or
`not_configured`; it never tells the applicant that vendor onboarding was
completed. An authorized website administrator can use the protected lead
detail's **Retry canonical handoff** action for only `pending`, `failed`, or
`not_configured` rows. It reads the already validated lead under normal admin
RLS, revalidates it against the current submission schema, then uses the
server-only client solely to record the result and attempt count. The same
external UUID reaches LNDRY again, so canonical deduplication makes a retry
safe; the action cannot create a vendor, user, KYC decision, or marketplace
session. `delivered` rows are deliberately not re-sent as a normal workflow.

This feature is still deployment-gated: apply migration
`20260915114428_partner_lead_handoff.sql`, set the matching secret in both
server environments, and set the website API URL before enabling it. The
admin UI reports `not_configured` or `failed` rather than fabricating a
successful canonical delivery.
