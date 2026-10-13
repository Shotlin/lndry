import { z } from "zod";

const httpsUrl = z
  .string()
  .trim()
  .max(500)
  .refine((v) => /^https:\/\/[^\s]+$/.test(v), "Must be an https:// link");

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .nullish()
    .transform((v) => (v ? v : null));

const optionalUrl = z
  .union([httpsUrl, z.literal(""), z.null()])
  .optional()
  .transform((v) => (v ? v : null));

export const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, "URL slug is too short")
  .max(120)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers and single hyphens");

export const blogPostInputSchema = z.object({
  title: z.string().trim().min(3, "Add a title").max(160),
  slug: slugSchema,
  excerpt: optionalText(400),
  contentHtml: z.string().max(400_000),
  contentJson: z.unknown().optional(),
  coverImageUrl: optionalUrl,
  coverImageAlt: optionalText(200),
  categoryId: z.string().uuid().nullish().transform((v) => v ?? null),
  tags: z
    .array(z.string().trim().toLowerCase().min(1).max(40))
    .max(12)
    .transform((tags) => [...new Set(tags)]),
  authorName: z.string().trim().min(2).max(80).default("LNDRY Team"),
  status: z.enum(["draft", "published"]),
  publishedAt: z.string().datetime({ offset: true }).nullish().transform((v) => v ?? null),
  isFeatured: z.boolean().default(false),
  focusKeyword: optionalText(80),
  metaTitle: optionalText(120),
  metaDescription: optionalText(320),
  canonicalUrl: optionalUrl,
  ogImageUrl: optionalUrl,
  noindex: z.boolean().default(false),
});

export type BlogPostInput = z.infer<typeof blogPostInputSchema>;

export const blogCategoryInputSchema = z.object({
  name: z.string().trim().min(2).max(60),
  slug: slugSchema.max(80),
  description: optionalText(300),
  sortOrder: z.number().int().min(0).max(1000).default(0),
});

export const uuidSchema = z.string().uuid();
