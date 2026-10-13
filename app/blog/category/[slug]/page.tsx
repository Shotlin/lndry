import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogCta } from "@/components/blog/BlogCta";
import { BlogSearchForm } from "@/components/blog/BlogSearchForm";
import { CategoryNav } from "@/components/blog/CategoryNav";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { getCategoriesWithCounts, getCategoryBySlug, getLivePosts, getSitemapEntries } from "@/lib/blog/repository";
import { absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/blog/site";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { categories } = await getSitemapEntries();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  const { total } = await getLivePosts({ categorySlug: slug });
  const title = `${category.name} | LNDRY Blog`;
  const description = category.description || `Articles about ${category.name.toLowerCase()} from the LNDRY team.`;
  return {
    title,
    description,
    alternates: { canonical: `/blog/category/${slug}` },
    robots: total === 0 ? { index: false, follow: true } : undefined,
    openGraph: { title, description, type: "website", url: absoluteUrl(`/blog/category/${slug}`), siteName: "LNDRY", images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const [category, categories] = await Promise.all([getCategoryBySlug(slug), getCategoriesWithCounts()]);
  if (!category) notFound();
  const { posts } = await getLivePosts({ categorySlug: slug });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${category.name} — LNDRY Blog`,
        url: absoluteUrl(`/blog/category/${slug}`),
        description: category.description ?? undefined,
        isPartOf: { "@id": absoluteUrl("/blog#blog") },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
          { "@type": "ListItem", position: 3, name: category.name, item: absoluteUrl(`/blog/category/${slug}`) },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="bg-gradient-to-b from-lavender-soft/70 to-bg-app pb-10 pt-12 sm:pt-16">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-4 font-body text-sm text-ink-soft">
            <Link href="/blog" className="hover:text-violet">Blog</Link> <span aria-hidden="true">›</span> <span className="font-semibold text-ink">{category.name}</span>
          </nav>
          <SectionEyebrow>Category</SectionEyebrow>
          <h1 className="mt-3 font-display text-hero font-bold text-ink">{category.name}</h1>
          {category.description && <p className="mt-4 max-w-2xl font-body text-body-lg text-ink-soft">{category.description}</p>}
          <div className="mt-8 max-w-2xl"><BlogSearchForm /></div>
          <div className="mt-6"><CategoryNav categories={categories} activeSlug={slug} /></div>
        </Container>
      </section>
      <Container className="pb-20">
        {posts.length === 0 ? (
          <p className="rounded-lg border border-dashed border-hairline bg-white p-12 text-center font-body text-ink-soft">No articles in this category yet — check back soon.</p>
        ) : (
          <>
            <h2 className="sr-only">Articles in {category.name}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <BlogCard key={p.id} post={p} />)}</div>
          </>
        )}
        <div className="mt-16"><BlogCta /></div>
      </Container>
    </>
  );
}
