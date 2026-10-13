import type { BlogCategory, BlogPost, BlogPostSummary } from "./types";

export const SUMMARY_COLUMNS =
  "id, title, slug, excerpt, cover_image_url, cover_image_alt, tags, author_name, published_at, reading_minutes, view_count, is_featured, blog_categories(name, slug)";

export const FULL_COLUMNS = `${SUMMARY_COLUMNS}, content_html, content_json, status, focus_keyword, meta_title, meta_description, canonical_url, og_image_url, noindex, word_count, category_id, created_at, updated_at`;

export function toSummary(row: any): BlogPostSummary {
  const category = Array.isArray(row.blog_categories) ? row.blog_categories[0] : row.blog_categories;
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt ?? null,
    coverImageUrl: row.cover_image_url ?? null,
    coverImageAlt: row.cover_image_alt ?? null,
    category: category ? { name: category.name, slug: category.slug } : null,
    tags: row.tags ?? [],
    authorName: row.author_name,
    publishedAt: row.published_at ?? null,
    readingMinutes: row.reading_minutes ?? 1,
    viewCount: Number(row.view_count ?? 0),
    isFeatured: Boolean(row.is_featured),
  };
}

export function toPost(row: any): BlogPost {
  return {
    ...toSummary(row),
    contentHtml: row.content_html ?? "",
    contentJson: row.content_json ?? null,
    status: row.status,
    focusKeyword: row.focus_keyword ?? null,
    metaTitle: row.meta_title ?? null,
    metaDescription: row.meta_description ?? null,
    canonicalUrl: row.canonical_url ?? null,
    ogImageUrl: row.og_image_url ?? null,
    noindex: Boolean(row.noindex),
    wordCount: row.word_count ?? 0,
    categoryId: row.category_id ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toCategory(row: any): BlogCategory {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? null,
    sortOrder: row.sort_order ?? 0,
  };
}
