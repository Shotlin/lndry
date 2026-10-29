import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ListTree } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogCta } from "@/components/blog/BlogCta";
import { BlogImage } from "@/components/blog/BlogImage";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { TrendingPosts } from "@/components/blog/TrendingPosts";
import { ViewTracker } from "@/components/blog/ViewTracker";
import { Container } from "@/components/ui/Container";
import { getPostBySlug, getRelatedPosts, getSitemapEntries, getTrendingPosts } from "@/lib/blog/repository";
import { absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/blog/site";
import { sanitizePostHtml } from "@/lib/blog/sanitize";
import { extractToc, formatBlogDate, makeExcerpt, stripHtml } from "@/lib/blog/text";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { posts } = await getSitemapEntries();
  return posts.slice(0, 100).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found | LNDRY", robots: { index: false, follow: false } };

  const title = (post.metaTitle || post.title).trim();
  const description = (post.metaDescription || post.excerpt || makeExcerpt(stripHtml(post.contentHtml), 155)).trim();
  const image = post.ogImageUrl || post.coverImageUrl || DEFAULT_OG_IMAGE;
  const fullTitle = /lndry/i.test(title) ? title : `${title} | LNDRY`;

  return {
    title: fullTitle,
    description,
    keywords: [post.focusKeyword, ...post.tags].filter((k): k is string => Boolean(k)),
    authors: [{ name: post.authorName }],
    alternates: { canonical: post.canonicalUrl || `/blog/${post.slug}` },
    robots: post.noindex ? { index: false, follow: true } : { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      title: fullTitle,
      description,
      type: "article",
      url: absoluteUrl(`/blog/${post.slug}`),
      siteName: "LNDRY",
      locale: "en_IN",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: [post.authorName],
      section: post.category?.name,
      tags: post.tags,
      images: [{ url: image, alt: post.coverImageAlt || post.title }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [related, trending] = await Promise.all([getRelatedPosts(post, 3), getTrendingPosts(4)]);
  const toc = extractToc(post.contentHtml);
  const url = absoluteUrl(`/blog/${post.slug}`);
  const description = post.metaDescription || post.excerpt || makeExcerpt(stripHtml(post.contentHtml), 155);
  const image = post.ogImageUrl || post.coverImageUrl;
  // An auto-generated summary just repeats the opening paragraph, so don't print it twice.
  const bodyText = stripHtml(post.contentHtml);
  const summaryRepeatsBody = Boolean(post.excerpt) && bodyText.startsWith((post.excerpt as string).replace(/…$/, "").slice(0, 60));
  const isOrg = post.authorName.trim().toLowerCase() === "lndry team";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title.slice(0, 110),
        description,
        image: image ? [image] : [absoluteUrl(DEFAULT_OG_IMAGE)],
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: isOrg ? { "@type": "Organization", name: "LNDRY", url: absoluteUrl("/") } : { "@type": "Person", name: post.authorName },
        publisher: { "@id": absoluteUrl("/#organization") },
        mainEntityOfPage: { "@type": "WebPage", "@id": post.canonicalUrl || url },
        isPartOf: { "@id": absoluteUrl("/blog#blog") },
        articleSection: post.category?.name,
        keywords: [post.focusKeyword, ...post.tags].filter(Boolean).join(", ") || undefined,
        wordCount: post.wordCount,
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
          ...(post.category
            ? [{ "@type": "ListItem", position: 3, name: post.category.name, item: absoluteUrl(`/blog/category/${post.category.slug}`) }]
            : []),
          { "@type": "ListItem", position: post.category ? 4 : 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ViewTracker slug={post.slug} />

      <article>
        <header className="bg-gradient-to-b from-lavender-soft/70 to-bg-app pb-8 pt-10 sm:pt-14">
          <Container className="max-w-[1100px]">
            <nav aria-label="Breadcrumb" className="mb-5 font-body text-sm text-ink-soft">
              <ol className="flex flex-wrap items-center gap-x-2">
                <li><Link href="/blog" className="hover:text-violet">Blog</Link></li>
                {post.category && (
                  <>
                    <li aria-hidden="true">›</li>
                    <li><Link href={`/blog/category/${post.category.slug}`} className="hover:text-violet">{post.category.name}</Link></li>
                  </>
                )}
              </ol>
            </nav>
            <h1 className="max-w-4xl font-display text-headline font-bold text-ink sm:text-[2.6rem] sm:leading-[1.1]">{post.title}</h1>
            {post.excerpt && !summaryRepeatsBody && <p className="mt-5 max-w-3xl font-body text-body-lg text-ink-soft">{post.excerpt}</p>}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-body text-sm text-ink-soft">
              <span className="font-semibold text-ink">{post.authorName}</span>
              <time dateTime={post.publishedAt ?? undefined}>{formatBlogDate(post.publishedAt)}</time>
              {post.updatedAt && post.publishedAt && new Date(post.updatedAt).getTime() - new Date(post.publishedAt).getTime() > 86_400_000 && (
                <span>Updated <time dateTime={post.updatedAt}>{formatBlogDate(post.updatedAt)}</time></span>
              )}
              <span className="inline-flex items-center gap-1"><Clock size={14} aria-hidden="true" />{post.readingMinutes} min read</span>
            </div>
          </Container>
        </header>

        <Container className="max-w-[1100px] pb-16">
          {post.coverImageUrl && (
            <div className="relative -mt-0 mb-10 aspect-[1200/630] w-full overflow-hidden rounded-xl bg-lavender-soft shadow-elevated">
              <BlogImage src={post.coverImageUrl} alt={post.coverImageAlt || post.title} sizes="(min-width: 1100px) 1100px, 100vw" priority />
            </div>
          )}

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0">
              {toc.length >= 3 && (
                <details className="mb-8 rounded-lg border border-hairline bg-white p-5 lg:hidden">
                  <summary className="flex cursor-pointer items-center gap-2 font-display text-base font-semibold text-ink"><ListTree size={16} aria-hidden="true" /> In this article</summary>
                  <ol className="mt-3 grid gap-2 font-body text-sm">
                    {toc.map((item) => (
                      <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 14}px` }}><a href={`#${item.id}`} className="text-ink-soft hover:text-violet">{item.text}</a></li>
                    ))}
                  </ol>
                </details>
              )}

              <div className="blog-prose" dangerouslySetInnerHTML={{ __html: sanitizePostHtml(post.contentHtml) }} />

              {post.tags.length > 0 && (
                <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tags">
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <Link href={`/blog/search?q=${encodeURIComponent(tag)}`} className="inline-flex h-9 items-center rounded-full border border-hairline bg-white px-4 font-body text-sm font-medium text-ink-soft hover:border-violet hover:text-violet">#{tag}</Link>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 border-t border-hairline pt-8"><ShareLinks url={url} title={post.title} /></div>
            </div>

            <aside className="grid content-start gap-6 lg:sticky lg:top-28 lg:self-start">
              {toc.length >= 3 && (
                <nav aria-label="Table of contents" className="hidden rounded-lg border border-hairline bg-white p-6 lg:block">
                  <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink"><ListTree size={17} aria-hidden="true" /> In this article</h2>
                  <ol className="mt-4 grid gap-2.5 font-body text-sm">
                    {toc.map((item) => (
                      <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 14}px` }}><a href={`#${item.id}`} className="leading-snug text-ink-soft hover:text-violet">{item.text}</a></li>
                    ))}
                  </ol>
                </nav>
              )}
              <TrendingPosts posts={trending.filter((t) => t.id !== post.id).slice(0, 4)} />
            </aside>
          </div>
        </Container>
      </article>

      <Container className="pb-20">
        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mb-16">
            <h2 id="related-heading" className="mb-6 font-display text-2xl font-semibold text-ink">Keep reading</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((p) => <BlogCard key={p.id} post={p} />)}</div>
          </section>
        )}
        <BlogCta />
      </Container>
    </>
  );
}
