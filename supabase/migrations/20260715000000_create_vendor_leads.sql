-- LNDRY vendor lead intake and small, reusable admin access model.
-- Apply through the Supabase SQL editor or Supabase CLI before enabling the form in production.

create extension if not exists "pgcrypto";

do $$
begin
  create type public.vendor_lead_status as enum (
    'new',
    'contacted',
    'qualified',
    'rejected',
    'onboarded',
    'archived'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role = 'admin'),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.vendor_leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 100),
  business_name text not null check (char_length(business_name) between 2 and 140),
  email text not null check (char_length(email) between 5 and 254),
  phone text not null check (phone ~ '^[+][1-9][0-9]{7,14}$'),
  city text not null check (char_length(city) between 2 and 80),
  address text check (address is null or char_length(address) <= 500),
  service_area text not null check (char_length(service_area) between 2 and 180),
  services text[] not null check (
    cardinality(services) between 1 and 8
    and services <@ array[
      'wash-fold',
      'wash-iron',
      'dry-cleaning',
      'steam-press',
      'shoe-cleaning',
      'bag-care',
      'tailoring-repairs',
      'home-linen'
    ]::text[]
  ),
  business_type text not null check (char_length(business_type) between 2 and 80),
  years_in_business text not null check (char_length(years_in_business) between 2 and 40),
  estimated_monthly_orders text not null check (char_length(estimated_monthly_orders) between 2 and 60),
  pickup_delivery text check (pickup_delivery is null or char_length(pickup_delivery) <= 120),
  daily_capacity text check (daily_capacity is null or char_length(daily_capacity) <= 80),
  message text check (message is null or char_length(message) <= 3000),
  privacy_consent boolean not null check (privacy_consent = true),
  status public.vendor_lead_status not null default 'new',
  admin_notes text check (admin_notes is null or char_length(admin_notes) <= 5000),
  source text not null default 'website-partners' check (char_length(source) between 2 and 80),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists vendor_leads_created_at_idx on public.vendor_leads (created_at desc);
create index if not exists vendor_leads_status_idx on public.vendor_leads (status);
create index if not exists vendor_leads_email_lower_idx on public.vendor_leads (lower(email));
create index if not exists vendor_leads_phone_idx on public.vendor_leads (phone);

create or replace function public.set_vendor_leads_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists vendor_leads_set_updated_at on public.vendor_leads;
create trigger vendor_leads_set_updated_at
before update on public.vendor_leads
for each row execute function public.set_vendor_leads_updated_at();

alter table public.admin_users enable row level security;
alter table public.vendor_leads enable row level security;

revoke all on public.admin_users from anon, authenticated;
revoke all on public.vendor_leads from anon, authenticated;
grant usage on schema public to anon, authenticated;

-- An authenticated account can only inspect its own active admin record.
grant select on public.admin_users to authenticated;
drop policy if exists "Authenticated users can view their own active admin access" on public.admin_users;
create policy "Authenticated users can view their own active admin access"
on public.admin_users
for select
to authenticated
using (user_id = (select auth.uid()) and is_active = true);

-- Leads are never readable, writable, or deletable by visitors. Active admins can
-- view leads and update only workflow fields. Public form inserts use a server-only
-- service-role client after server-side validation.
grant select on public.vendor_leads to authenticated;
grant update (status, admin_notes) on public.vendor_leads to authenticated;

drop policy if exists "Active admins can read vendor leads" on public.vendor_leads;
create policy "Active admins can read vendor leads"
on public.vendor_leads
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
      and is_active = true
  )
);

drop policy if exists "Active admins can update vendor lead workflow" on public.vendor_leads;
create policy "Active admins can update vendor lead workflow"
on public.vendor_leads
for update
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
      and is_active = true
  )
)
with check (
  exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
      and is_active = true
  )
);
