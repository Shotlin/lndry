import type { Metadata } from "next";
import { BlogIndexView } from "@/components/blog/BlogIndexView";
import { absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/blog/site";

export const revalidate = 300;

const title = "LNDRY Blog | Laundry, Dry Cleaning & Garment Care Tips in Pune";
const description =
  "Expert laundry tips, dry-cleaning guides, stain-removal how-tos and fabric-care advice from LNDRY — Pune's laundry pickup and delivery marketplace.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/feed.xml" } },
  openGraph: { title, description, type: "website", url: absoluteUrl("/blog"), siteName: "LNDRY", locale: "en_IN", images: [DEFAULT_OG_IMAGE] },
  twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": absoluteUrl("/blog#blog"),
      url: absoluteUrl("/blog"),
      name: "LNDRY Blog",
      description,
      inLanguage: "en-IN",
      publisher: { "@id": absoluteUrl("/#organization") },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      ],
    },
  ],
};

export default function BlogHomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <BlogIndexView page={1} />
    </>
  );
}
