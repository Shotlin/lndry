import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BlogIndexView } from "@/components/blog/BlogIndexView";
import { BLOG_PAGE_SIZE, getLivePosts } from "@/lib/blog/repository";

export const revalidate = 300;

type Props = { params: Promise<{ page: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  const n = Number(page);
  return {
    title: `LNDRY Blog — Page ${n} | Laundry & Garment Care Articles`,
    description: `Page ${n} of the LNDRY blog: laundry tips, dry-cleaning guides and fabric-care advice.`,
    alternates: { canonical: `/blog/page/${n}` },
  };
}

export default async function BlogPaginatedPage({ params }: Props) {
  const { page } = await params;
  if (!/^\d{1,4}$/.test(page)) notFound();
  const n = Number(page);
  if (n === 1) redirect("/blog");
  const { total } = await getLivePosts({ page: n });
  if (n < 1 || n > Math.max(1, Math.ceil(total / BLOG_PAGE_SIZE))) notFound();
  return <BlogIndexView page={n} />;
}
