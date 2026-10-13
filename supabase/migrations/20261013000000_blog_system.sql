-- LNDRY blog: categories, posts, trending views, full-text search, image storage.
-- Apply in the Supabase SQL editor (or CLI) AFTER 20260715000000_create_vendor_leads.sql,
-- because the access rules reuse public.admin_users.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------- categories
create table if not exists public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 60),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 80),
  description text check (description is null or char_length(description) <= 300),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- --------------------------------------------------------------------- posts
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 160),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 120),
  excerpt text check (excerpt is null or char_length(excerpt) <= 400),
  content_html text not null default '',
  content_json jsonb,
  cover_image_url text check (cover_image_url is null or cover_image_url ~ '^https://'),
  cover_image_alt text check (cover_image_alt is null or char_length(cover_image_alt) <= 200),
  category_id uuid references public.blog_categories(id) on delete set null,
  tags text[] not null default '{}' check (cardinality(tags) <= 12),
  author_name text not null default 'LNDRY Team' check (char_length(author_name) between 2 and 80),
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  is_featured boolean not null default false,
  -- SEO
  focus_keyword text check (focus_keyword is null or char_length(focus_keyword) <= 80),
  meta_title text check (meta_title is null or char_length(meta_title) <= 120),
  meta_description text check (meta_description is null or char_length(meta_description) <= 320),
  canonical_url text check (canonical_url is null or canonical_url ~ '^https://'),
  og_image_url text check (og_image_url is null or og_image_url ~ '^https://'),
  noindex boolean not null default false,
  -- derived / counters
  word_count integer not null default 0,
  reading_minutes integer not null default 1,
  view_count bigint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  search_vector tsvector
);

create index if not exists blog_posts_published_idx on public.blog_posts (published_at desc) where status = 'published';
create index if not exists blog_posts_category_idx on public.blog_posts (category_id);
create index if not exists blog_posts_tags_idx on public.blog_posts using gin (tags);
create index if not exists blog_posts_search_idx on public.blog_posts using gin (search_vector);

create or replace function public.set_blog_posts_derived_fields()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  new.search_vector :=
    setweight(to_tsvector('english', coalesce(new.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(new.excerpt, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(array_to_string(new.tags, ' '), '')), 'B') ||
    setweight(to_tsvector('english', coalesce(new.focus_keyword, '')), 'B');
  return new;
end;
$$;

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
drop trigger if exists blog_posts_set_derived_fields on public.blog_posts;
create trigger blog_posts_set_derived_fields
before insert or update on public.blog_posts
for each row execute function public.set_blog_posts_derived_fields();

-- A post that is published without a date gets "now".
create or replace function public.blog_posts_default_published_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.status = 'published' and new.published_at is null then
    new.published_at = now();
  end if;
  return new;
end;
$$;

drop trigger if exists blog_posts_default_published_at on public.blog_posts;
create trigger blog_posts_default_published_at
before insert or update on public.blog_posts
for each row execute function public.blog_posts_default_published_at();

-- ------------------------------------------------------------ trending views
create table if not exists public.blog_post_daily_views (
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  day date not null,
  views integer not null default 0,
  primary key (post_id, day)
);

alter table public.blog_post_daily_views enable row level security;
revoke all on public.blog_post_daily_views from anon, authenticated;

-- Called by the public post page (once per browser session). Only counts posts
-- that are actually live, and cannot be used to read anything.
create or replace function public.record_blog_view(p_slug text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  select id into v_id
  from public.blog_posts
  where slug = p_slug and status = 'published' and published_at <= now();

  if v_id is null then
    return;
  end if;

  insert into public.blog_post_daily_views (post_id, day, views)
  values (v_id, (now() at time zone 'Asia/Kolkata')::date, 1)
  on conflict (post_id, day) do update set views = public.blog_post_daily_views.views + 1;

  update public.blog_posts set view_count = view_count + 1 where id = v_id;
end;
$$;

revoke all on function public.record_blog_view(text) from public;
grant execute on function public.record_blog_view(text) to anon, authenticated;

-- Trending = most views in the last N days (ties broken by lifetime views).
create or replace function public.blog_trending(p_days integer default 14, p_limit integer default 5)
returns table (post_id uuid, recent_views bigint)
language sql
stable
security definer
set search_path = public
as $$
  select p.id, coalesce(sum(d.views), 0)::bigint as recent_views
  from public.blog_posts p
  left join public.blog_post_daily_views d
    on d.post_id = p.id and d.day >= (now() at time zone 'Asia/Kolkata')::date - greatest(p_days, 1)
  where p.status = 'published' and p.published_at <= now()
  group by p.id
  order by recent_views desc, p.view_count desc, p.published_at desc
  limit greatest(least(p_limit, 20), 1);
$$;

revoke all on function public.blog_trending(integer, integer) from public;
grant execute on function public.blog_trending(integer, integer) to anon, authenticated;

-- Full-text search over live posts. Returns ids ranked by relevance.
create or replace function public.search_blog_posts(p_query text, p_limit integer default 24)
returns table (post_id uuid, rank real)
language sql
stable
security definer
set search_path = public
as $$
  select p.id,
         (ts_rank(p.search_vector, websearch_to_tsquery('english', p_query))
          + case when lower(p.title) like '%' || lower(p_query) || '%' then 0.5 else 0 end)::real as rank
  from public.blog_posts p
  where p.status = 'published' and p.published_at <= now()
    and length(trim(p_query)) >= 2
    and (p.search_vector @@ websearch_to_tsquery('english', p_query)
         or lower(p.title) like '%' || lower(p_query) || '%'
         or lower(p.content_html) like '%' || lower(p_query) || '%')
  order by rank desc, p.published_at desc
  limit greatest(least(p_limit, 50), 1);
$$;

revoke all on function public.search_blog_posts(text, integer) from public;
grant execute on function public.search_blog_posts(text, integer) to anon, authenticated;

-- ------------------------------------------------------------ access control
alter table public.blog_categories enable row level security;
alter table public.blog_posts enable row level security;

revoke all on public.blog_categories from anon, authenticated;
revoke all on public.blog_posts from anon, authenticated;

grant select on public.blog_categories to anon, authenticated;
grant select on public.blog_posts to anon, authenticated;
grant insert, update, delete on public.blog_categories to authenticated;
grant insert, update, delete on public.blog_posts to authenticated;

drop policy if exists "Anyone can read blog categories" on public.blog_categories;
create policy "Anyone can read blog categories"
on public.blog_categories for select to anon, authenticated using (true);

drop policy if exists "Anyone can read live blog posts" on public.blog_posts;
create policy "Anyone can read live blog posts"
on public.blog_posts for select to anon, authenticated
using (status = 'published' and published_at <= now());

drop policy if exists "Active admins can read all blog posts" on public.blog_posts;
create policy "Active admins can read all blog posts"
on public.blog_posts for select to authenticated
using (exists (select 1 from public.admin_users where user_id = (select auth.uid()) and is_active = true));

drop policy if exists "Active admins can write blog posts" on public.blog_posts;
create policy "Active admins can write blog posts"
on public.blog_posts for all to authenticated
using (exists (select 1 from public.admin_users where user_id = (select auth.uid()) and is_active = true))
with check (exists (select 1 from public.admin_users where user_id = (select auth.uid()) and is_active = true));

drop policy if exists "Active admins can write blog categories" on public.blog_categories;
create policy "Active admins can write blog categories"
on public.blog_categories for all to authenticated
using (exists (select 1 from public.admin_users where user_id = (select auth.uid()) and is_active = true))
with check (exists (select 1 from public.admin_users where user_id = (select auth.uid()) and is_active = true));

-- --------------------------------------------------------------- image bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('blog-images', 'blog-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'])
on conflict (id) do update
set public = true, file_size_limit = 5242880,
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];

drop policy if exists "Active admins can upload blog images" on storage.objects;
create policy "Active admins can upload blog images"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'blog-images'
  and exists (select 1 from public.admin_users where user_id = (select auth.uid()) and is_active = true)
);

drop policy if exists "Active admins can delete blog images" on storage.objects;
create policy "Active admins can delete blog images"
on storage.objects for delete to authenticated
using (
  bucket_id = 'blog-images'
  and exists (select 1 from public.admin_users where user_id = (select auth.uid()) and is_active = true)
);

-- Starter categories (editable from the dashboard).
insert into public.blog_categories (name, slug, description, sort_order) values
  ('Laundry Tips', 'laundry-tips', 'Everyday washing, drying and ironing know-how.', 1),
  ('Dry Cleaning', 'dry-cleaning', 'What to dry clean, what not to, and how it works.', 2),
  ('Fabric Care', 'fabric-care', 'Look after silk, wool, cotton, denim and more.', 3),
  ('Stain Removal', 'stain-removal', 'Get rid of tough stains the right way.', 4),
  ('LNDRY News', 'lndry-news', 'Product updates, new areas and partner stories.', 5)
on conflict (slug) do nothing;
