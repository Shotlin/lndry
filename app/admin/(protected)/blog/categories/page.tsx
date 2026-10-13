import { redirect } from "next/navigation";
import { CategoryManager } from "@/components/admin/blog/CategoryManager";
import { getAdminAccess } from "@/lib/auth/require-admin";
import { listAdminCategories } from "@/lib/blog/admin-repository";

export const dynamic = "force-dynamic";
export const metadata = { title: "Blog categories | LNDRY Operations" };

export default async function BlogCategoriesPage() {
  const access = await getAdminAccess();
  if (access.kind !== "authorized") redirect("/admin/login?next=/admin/blog/categories");
  const categories = await listAdminCategories(access.supabase).catch(() => []);

  return (
    <div className="grid gap-7">
      <header>
        <p className="font-body text-sm font-semibold text-violet-deep">Content</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Blog categories</h1>
        <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-ink-soft">
          Categories become their own pages on the website (lndry.in/blog/category/…), which helps Google understand your topics.
        </p>
      </header>
      <CategoryManager initial={categories} />
    </div>
  );
}
