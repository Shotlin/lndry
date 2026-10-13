import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { FULL_COLUMNS, SUMMARY_COLUMNS, toCategory, toPost, toSummary } from "./mappers";
import type { BlogCategory, BlogPost, BlogPostSummary } from "./types";

export type AdminPostRow = BlogPostSummary & {
  status: "draft" | "published";
  noindex: boolean;
  updatedAt: string;
  wordCount: number;
  focusKeyword: string | null;
};

const LIST_COLUMNS = `${SUMMARY_COLUMNS}, status, noindex, updated_at, word_count, focus_keyword`;

export async function listAdminPosts(
  supabase: SupabaseClient,
  filters: { status?: string; q?: string; categoryId?: string },
): Promise<AdminPostRow[]> {
  let query = supabase.from("blog_posts").select(LIST_COLUMNS).order("updated_at", { ascending: false }).limit(300);
  if (filters.status === "draft" || filters.status === "published") query = query.eq("status", filters.status);
  if (filters.categoryId) query = query.eq("category_id", filters.categoryId);
  if (filters.q) {
    const safe = filters.q.replace(/[%,()]/g, " ").trim().slice(0, 80);
    if (safe) query = query.or(`title.ilike.%${safe}%,slug.ilike.%${safe}%`);
  }
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map((row) => ({
    ...toSummary(row),
    status: row.status,
    noindex: Boolean(row.noindex),
    updatedAt: row.updated_at,
    wordCount: row.word_count ?? 0,
    focusKeyword: row.focus_keyword ?? null,
  }));
}

export async function getAdminPost(supabase: SupabaseClient, id: string): Promise<BlogPost | null> {
  const { data, error } = await supabase.from("blog_posts").select(FULL_COLUMNS).eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? toPost(data) : null;
}

export async function listAdminCategories(supabase: SupabaseClient): Promise<(BlogCategory & { postCount: number })[]> {
  const [{ data: categories, error }, { data: posts }] = await Promise.all([
    supabase.from("blog_categories").select("*").order("sort_order").order("name"),
    supabase.from("blog_posts").select("category_id"),
  ]);
  if (error) throw error;
  const counts = new Map<string, number>();
  for (const row of posts ?? []) {
    if (row.category_id) counts.set(row.category_id, (counts.get(row.category_id) ?? 0) + 1);
  }
  return (categories ?? []).map((row) => ({ ...toCategory(row), postCount: counts.get(row.id) ?? 0 }));
}

export async function getBlogStats(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("blog_posts").select("status, published_at, view_count");
  if (error) throw error;
  const now = Date.now();
  let published = 0;
  let scheduled = 0;
  let drafts = 0;
  let views = 0;
  for (const row of data ?? []) {
    views += Number(row.view_count ?? 0);
    if (row.status === "draft") drafts += 1;
    else if (row.published_at && new Date(row.published_at).getTime() > now) scheduled += 1;
    else published += 1;
  }
  return { total: data?.length ?? 0, published, scheduled, drafts, views };
}
