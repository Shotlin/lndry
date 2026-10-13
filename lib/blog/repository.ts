import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig } from "@/lib/supabase/config";
import { FULL_COLUMNS, SUMMARY_COLUMNS, toCategory, toPost, toSummary } from "./mappers";
import type { BlogCategoryWithCount, BlogPost, BlogPostSummary } from "./types";

/**
 * Public (visitor) reads. Uses the anonymous key with no cookies, so pages stay
 * statically cacheable. Row-level security guarantees only live posts come back.
 */
function publicClient() {
  const config = getSupabasePublicConfig();
  if (!config) return null;
  return createClient(config.url, config.publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

const nowIso = () => new Date().toISOString();

export const BLOG_PAGE_SIZE = 9;

export async function getLivePosts(options: { page?: number; categorySlug?: string } = {}) {
  const supabase = publicClient();
  if (!supabase) return { posts: [] as BlogPostSummary[], total: 0 };
  const page = Math.max(1, options.page ?? 1);
  const from = (page - 1) * BLOG_PAGE_SIZE;

  let categoryId: string | null = null;
  if (options.categorySlug) {
    const { data } = await supabase.from("blog_categories").select("id").eq("slug", options.categorySlug).maybeSingle();
    if (!data) return { posts: [], total: 0 };
    categoryId = data.id;
  }

  let query = supabase
    .from("blog_posts")
    .select(SUMMARY_COLUMNS, { count: "exact" })
    .eq("status", "published")
    .lte("published_at", nowIso())
    .order("published_at", { ascending: false })
    .range(from, from + BLOG_PAGE_SIZE - 1);
  if (categoryId) query = query.eq("category_id", categoryId);

  const { data, count, error } = await query;
  if (error) return { posts: [], total: 0 };
  return { posts: (data ?? []).map(toSummary), total: count ?? 0 };
}

export async function getFeaturedPost(): Promise<BlogPostSummary | null> {
  const supabase = publicClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("blog_posts")
    .select(SUMMARY_COLUMNS)
    .eq("status", "published")
    .eq("is_featured", true)
    .lte("published_at", nowIso())
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data ? toSummary(data) : null;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = publicClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("blog_posts")
    .select(FULL_COLUMNS)
    .eq("slug", slug)
    .eq("status", "published")
    .lte("published_at", nowIso())
    .maybeSingle();
  return data ? toPost(data) : null;
}

export async function getTrendingPosts(limit = 5): Promise<BlogPostSummary[]> {
  const supabase = publicClient();
  if (!supabase) return [];
  const { data: ranked } = await supabase.rpc("blog_trending", { p_days: 14, p_limit: limit });
  const ids = (ranked as { post_id: string }[] | null)?.map((r) => r.post_id) ?? [];
  if (ids.length === 0) return [];
  const { data } = await supabase.from("blog_posts").select(SUMMARY_COLUMNS).in("id", ids);
  const byId = new Map((data ?? []).map((row) => [row.id as string, toSummary(row)]));
  return ids.map((id) => byId.get(id)).filter((p): p is BlogPostSummary => Boolean(p));
}

export async function getCategoriesWithCounts(): Promise<BlogCategoryWithCount[]> {
  const supabase = publicClient();
  if (!supabase) return [];
  const [{ data: categories }, { data: posts }] = await Promise.all([
    supabase.from("blog_categories").select("*").order("sort_order").order("name"),
    supabase.from("blog_posts").select("category_id").eq("status", "published").lte("published_at", nowIso()),
  ]);
  const counts = new Map<string, number>();
  for (const row of posts ?? []) {
    if (row.category_id) counts.set(row.category_id, (counts.get(row.category_id) ?? 0) + 1);
  }
  return (categories ?? []).map((row) => ({ ...toCategory(row), postCount: counts.get(row.id) ?? 0 }));
}

export async function getCategoryBySlug(slug: string) {
  const supabase = publicClient();
  if (!supabase) return null;
  const { data } = await supabase.from("blog_categories").select("*").eq("slug", slug).maybeSingle();
  return data ? toCategory(data) : null;
}

export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPostSummary[]> {
  const supabase = publicClient();
  if (!supabase) return [];
  const picked: BlogPostSummary[] = [];
  const seen = new Set<string>([post.id]);

  if (post.categoryId) {
    const { data } = await supabase
      .from("blog_posts")
      .select(SUMMARY_COLUMNS)
      .eq("status", "published")
      .eq("category_id", post.categoryId)
      .lte("published_at", nowIso())
      .neq("id", post.id)
      .order("published_at", { ascending: false })
      .limit(limit);
    for (const row of data ?? []) {
      picked.push(toSummary(row));
      seen.add(row.id);
    }
  }
  if (picked.length < limit) {
    const { data } = await supabase
      .from("blog_posts")
      .select(SUMMARY_COLUMNS)
      .eq("status", "published")
      .lte("published_at", nowIso())
      .order("published_at", { ascending: false })
      .limit(limit + 4);
    for (const row of data ?? []) {
      if (picked.length >= limit) break;
      if (!seen.has(row.id)) picked.push(toSummary(row));
    }
  }
  return picked;
}

export async function searchPosts(query: string): Promise<BlogPostSummary[]> {
  const supabase = publicClient();
  const q = query.trim().slice(0, 80);
  if (!supabase || q.length < 2) return [];
  const { data: ranked } = await supabase.rpc("search_blog_posts", { p_query: q, p_limit: 24 });
  const ids = (ranked as { post_id: string }[] | null)?.map((r) => r.post_id) ?? [];
  if (ids.length === 0) return [];
  const { data } = await supabase.from("blog_posts").select(SUMMARY_COLUMNS).in("id", ids);
  const byId = new Map((data ?? []).map((row) => [row.id as string, toSummary(row)]));
  return ids.map((id) => byId.get(id)).filter((p): p is BlogPostSummary => Boolean(p));
}

export async function getSitemapEntries() {
  const supabase = publicClient();
  if (!supabase) return { posts: [], categories: [] as { slug: string }[] };
  const [{ data: posts }, { data: categories }] = await Promise.all([
    supabase
      .from("blog_posts")
      .select("slug, updated_at, published_at, noindex, cover_image_url")
      .eq("status", "published")
      .lte("published_at", nowIso())
      .order("published_at", { ascending: false }),
    supabase.from("blog_categories").select("slug"),
  ]);
  return {
    posts: (posts ?? []).filter((p) => !p.noindex) as {
      slug: string;
      updated_at: string;
      published_at: string;
      cover_image_url: string | null;
    }[],
    categories: (categories ?? []) as { slug: string }[],
  };
}

export async function getRssPosts(limit = 30) {
  const supabase = publicClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("blog_posts")
    .select("title, slug, excerpt, published_at, author_name, blog_categories(name)")
    .eq("status", "published")
    .lte("published_at", nowIso())
    .order("published_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}
