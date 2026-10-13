import { notFound, redirect } from "next/navigation";
import { BlogEditor } from "@/components/admin/blog/BlogEditor";
import { getAdminAccess } from "@/lib/auth/require-admin";
import { getAdminPost, listAdminCategories } from "@/lib/blog/admin-repository";
import { uuidSchema } from "@/lib/blog/schema";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit blog post | LNDRY Operations" };

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const [access, { id }] = await Promise.all([getAdminAccess(), params]);
  if (access.kind !== "authorized") redirect("/admin/login?next=/admin/blog");
  if (!uuidSchema.safeParse(id).success) notFound();

  const [post, categories] = await Promise.all([
    getAdminPost(access.supabase, id).catch(() => null),
    listAdminCategories(access.supabase).catch(() => []),
  ]);
  if (!post) notFound();

  // key forces a clean editor if the user navigates between two posts.
  return <BlogEditor key={post.id} post={post} categories={categories} />;
}
