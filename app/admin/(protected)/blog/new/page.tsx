import { redirect } from "next/navigation";
import { BlogEditor } from "@/components/admin/blog/BlogEditor";
import { getAdminAccess } from "@/lib/auth/require-admin";
import { listAdminCategories } from "@/lib/blog/admin-repository";

export const dynamic = "force-dynamic";
export const metadata = { title: "New blog post | LNDRY Operations" };

export default async function NewBlogPostPage() {
  const access = await getAdminAccess();
  if (access.kind !== "authorized") redirect("/admin/login?next=/admin/blog/new");
  const categories = await listAdminCategories(access.supabase).catch(() => []);
  return <BlogEditor post={null} categories={categories} />;
}
