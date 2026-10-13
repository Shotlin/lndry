import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/blog/repository";
import { SITE_URL } from "@/lib/blog/site";
import { locationPages } from "@/lib/data/site";

export const revalidate = 3600;

const STATIC_PAGES: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
  { path: "/marketplace", priority: 0.7, changeFrequency: "monthly" },
  { path: "/stores", priority: 0.7, changeFrequency: "weekly" },
  { path: "/partners", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/refund-cancellation-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/delivery-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/account-deletion", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts, categories } = await getSitemapEntries();
  const newest = posts[0]?.updated_at ? new Date(posts[0].updated_at) : undefined;

  return [
    ...STATIC_PAGES.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...locationPages.map((page) => ({
      url: `${SITE_URL}/${page.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/blog`, lastModified: newest, changeFrequency: "daily", priority: 0.8 },
    ...categories.map((category) => ({
      url: `${SITE_URL}/blog/category/${category.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(post.cover_image_url ? { images: [post.cover_image_url] } : {}),
    })),
  ];
}
