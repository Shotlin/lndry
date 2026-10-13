import "server-only";

import { revalidatePath } from "next/cache";
import { getAdminAccess } from "@/lib/auth/require-admin";
import { adminJson, isSameOriginRequest } from "@/lib/http/security";
import { sanitizeBlogHtml } from "./html";
import type { BlogPostInput } from "./schema";
import { countWords, makeExcerpt, readingMinutes, stripHtml } from "./text";

/** Same checks as the vendor-lead routes: same-origin, JSON, signed-in active admin. */
export async function guardAdminWrite(request: Request, options: { json?: boolean } = { json: true }) {
  if (!isSameOriginRequest(request)) {
    return { response: adminJson({ error: "This request could not be verified." }, { status: 403 }) } as const;
  }
  if (options.json !== false && !request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return { response: adminJson({ error: "Please submit valid data." }, { status: 415 }) } as const;
  }
  const access = await getAdminAccess();
  if (access.kind === "missing-configuration") {
    return { response: adminJson({ error: "Admin access is not configured." }, { status: 503 }) } as const;
  }
  if (access.kind === "anonymous") {
    return { response: adminJson({ error: "Sign in is required." }, { status: 401 }) } as const;
  }
  if (access.kind === "forbidden") {
    return { response: adminJson({ error: "You do not have permission to manage the blog." }, { status: 403 }) } as const;
  }
  return { access } as const;
}

/** Turns validated editor input into the database row, deriving everything that must not be trusted from the browser. */
export function buildPostRow(input: BlogPostInput) {
  const contentHtml = sanitizeBlogHtml(input.contentHtml);
  const text = stripHtml(contentHtml);
  const words = countWords(text);
  const publishing = input.status === "published";
  return {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt ?? (text ? makeExcerpt(text, 160) : null),
    content_html: contentHtml,
    content_json: input.contentJson ?? null,
    cover_image_url: input.coverImageUrl,
    cover_image_alt: input.coverImageAlt,
    category_id: input.categoryId,
    tags: input.tags,
    author_name: input.authorName,
    status: input.status,
    // A published post with no date goes live now (the database trigger also guarantees this).
    published_at: publishing ? (input.publishedAt ?? new Date().toISOString()) : input.publishedAt,
    is_featured: input.isFeatured,
    focus_keyword: input.focusKeyword,
    meta_title: input.metaTitle,
    meta_description: input.metaDescription,
    canonical_url: input.canonicalUrl,
    og_image_url: input.ogImageUrl,
    noindex: input.noindex,
    word_count: words,
    reading_minutes: readingMinutes(words),
  };
}

export function revalidateBlog(slug?: string) {
  revalidatePath("/blog", "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath("/blog/feed.xml");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export function isUniqueViolation(error: { code?: string } | null) {
  return error?.code === "23505";
}
