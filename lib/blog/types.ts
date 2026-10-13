export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
}

export interface BlogCategoryWithCount extends BlogCategory {
  postCount: number;
}

/** Fields shown on listing cards. */
export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  category: { name: string; slug: string } | null;
  tags: string[];
  authorName: string;
  publishedAt: string | null;
  readingMinutes: number;
  viewCount: number;
  isFeatured: boolean;
}

export interface BlogPost extends BlogPostSummary {
  contentHtml: string;
  contentJson: unknown;
  status: "draft" | "published";
  focusKeyword: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  ogImageUrl: string | null;
  noindex: boolean;
  wordCount: number;
  categoryId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3 | 4;
}
