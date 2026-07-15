# LNDRY Vendor Lead System

This feature adds a focused vendor-lead intake flow and a protected operations dashboard. It is intentionally separate from the future customer, vendor, rider, and permanent admin applications.

## What is included

- Public partner form at `/partners`, submitted to `POST /api/vendor-leads`.
- Strict server-side Zod validation, normalization, honeypot protection, same-origin checks, and generic server errors.
- Supabase PostgreSQL schema, indexes, RLS, and `admin_users` access control.
- Supabase Auth email/password login at `/admin/login`.
- Protected lead dashboard at `/admin/vendor-leads` with URL-based filters, pagination, detail views, workflow updates, contact actions, and filtered CSV export.

## Required environment variables

Copy `.env.example` to `.env.local` for local development and set these values:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SUPABASE_SERVICE_ROLE_KEY=sb_secret_or_legacy_service_role_key
```

`SUPABASE_SERVICE_ROLE_KEY` is server-only. Never expose it through a `NEXT_PUBLIC_` variable or commit it to Git.

## One-time Supabase setup

1. Create a Supabase project.
2. In the Supabase SQL Editor, run [`supabase/migrations/20260715000000_create_vendor_leads.sql`](../supabase/migrations/20260715000000_create_vendor_leads.sql).
3. In **Authentication → Providers**, keep Email enabled and disable public sign-ups if only LNDRY staff should use the dashboard.
4. In **Authentication → URL Configuration**, add:

   ```text
   https://lndry.in
   https://*.vercel.app
   http://localhost:3000
   ```

5. Create the first staff account in **Authentication → Users** with email and password.
6. Copy that Auth user UUID and run this SQL:

   ```sql
   insert into public.admin_users (user_id, role, is_active)
   values ('AUTH_USER_UUID_HERE', 'admin', true);
   ```

7. Sign in at `/admin/login`. An authenticated user without an active `admin_users` row is deliberately denied access.

## Vercel deployment

1. In Vercel, open the LNDRY project → **Settings → Environment Variables**.
2. Add the four required variables above for **Production**, **Preview**, and **Development**. Set `NEXT_PUBLIC_SITE_URL` to the exact environment origin for each environment where possible.
3. Do not add the service-role key with a public prefix.
4. Push the code to the deployment branch and redeploy.
5. Open `/admin/login` after deployment. If it reports missing configuration, confirm the public Supabase URL/key and redeploy after changing Vercel variables.

## Manual release checklist

- Submit a complete valid partner form: expect a success message and one `vendor_leads` row with `status = 'new'`.
- Submit an incomplete form: expect inline field errors and retained values.
- Fill the hidden `website` honeypot in a request: expect rejection and no stored row.
- Send the public endpoint a cross-origin request: expect HTTP 403.
- Visit `/admin/vendor-leads` while signed out: expect redirect to `/admin/login`.
- Sign in with an Auth user missing from `admin_users`: expect `/admin/access-denied`.
- Sign in with the authorized admin: expect dashboard access.
- Test search, status filter, date range, newest/oldest sort, clear filters, and pagination. URLs should remain shareable.
- Open a lead, change its status, edit internal notes, and reload to verify persistence.
- Test email, phone, WhatsApp, and copy actions in the lead detail view.
- Export a filtered CSV and verify it contains only the matching records.
- Check `/partners`, `/admin/login`, and `/admin/vendor-leads` at 390px, tablet, and desktop widths.

## Deferred optional integrations

- No email notification was added because no verified Resend or other email provider credentials are configured. A failed notification would never block a saved lead.
- No durable rate-limit provider is configured. The form includes an invisible honeypot and server-side same-origin protection. Add Vercel WAF/BotID, Cloudflare Turnstile, or a managed rate-limit provider when credentials and policy are available.
- Turnstile and Resend placeholder variables are included in `.env.example` for later integration.
