import "server-only";

import type { BlogCategory, BlogCategoryWithCount, BlogPost, BlogPostSummary } from "./types";

/**
 * Public (visitor) blog reads. Everything comes from the LNDRY backend
 * (`GET /api/v1/blog/*`); the posts are written and managed in the LNDRY
 * dashboard. The backend only ever returns live posts.
 */
const API_BASE = (process.env.LNDRY_API_URL ?? process.env.LNDRY_PARTNER_LEAD_API_URL ?? "https://api.lndry.in/api/v1").replace(/\/+$/, "");

export const BLOG_PAGE_SIZE = 9;

type Envelope<T> = { data: T; page?: number; total?: number; totalPages?: number };

async function api<T>(path: string): Promise<Envelope<T> | null> {
  try {
    const res = await fetch(`${API_BASE}/blog${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60, tags: ["blog"] },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return (await res.json()) as Envelope<T>;
  } catch {
    return null;
  }
}

export async function getLivePosts(options: { page?: number; categorySlug?: string } = {}) {
  const params = new URLSearchParams({ page: String(Math.max(1, options.page ?? 1)) });
  if (options.categorySlug) params.set("category", options.categorySlug);
  const res = await api<BlogPostSummary[]>(`/posts?${params}`);
  return { posts: res?.data ?? [], total: res?.total ?? 0 };
}

export async function getFeaturedPost(): Promise<BlogPostSummary | null> {
  return (await api<BlogPostSummary | null>("/posts/featured"))?.data ?? null;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await api<BlogPost>(`/posts/${encodeURIComponent(slug)}`);
  return res?.data ? { ...res.data, contentJson: null } : null;
}

export async function getTrendingPosts(limit = 5): Promise<BlogPostSummary[]> {
  return (await api<BlogPostSummary[]>(`/posts/trending?limit=${limit}`))?.data ?? [];
}

export async function getCategoriesWithCounts(): Promise<BlogCategoryWithCount[]> {
  return (await api<BlogCategoryWithCount[]>("/categories"))?.data ?? [];
}

export async function getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  return (await api<BlogCategory>(`/categories/${encodeURIComponent(slug)}`))?.data ?? null;
}

export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPostSummary[]> {
  const sameCategory = post.category ? (await getLivePosts({ categorySlug: post.category.slug })).posts : [];
  const picked = sameCategory.filter((p) => p.id !== post.id).slice(0, limit);
  if (picked.length >= limit) return picked;
  const seen = new Set([post.id, ...picked.map((p) => p.id)]);
  const latest = (await getLivePosts()).posts.filter((p) => !seen.has(p.id));
  return [...picked, ...latest].slice(0, limit);
}

export async function searchPosts(query: string): Promise<BlogPostSummary[]> {
  const q = query.trim().slice(0, 80);
  if (q.length < 2) return [];
  return (await api<BlogPostSummary[]>(`/posts/search?q=${encodeURIComponent(q)}`))?.data ?? [];
}

export async function getSitemapEntries() {
  const res = await api<{
    posts: { slug: string; updatedAt: string; publishedAt: string; coverImageUrl: string | null }[];
    categories: { slug: string }[];
  }>("/sitemap");
  return res?.data ?? { posts: [], categories: [] };
}

export async function getRssPosts() {
  return (await getLivePosts()).posts;
}
