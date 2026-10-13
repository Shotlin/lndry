import { adminJson } from "@/lib/http/security";
import { guardAdminWrite, isUniqueViolation, revalidateBlog } from "@/lib/blog/admin-api";
import { blogCategoryInputSchema } from "@/lib/blog/schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const guard = await guardAdminWrite(request);
  if ("response" in guard) return guard.response;

  const parsed = blogCategoryInputSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return adminJson({ error: "Please check the category.", fieldErrors: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const { data, error } = await guard.access.supabase
    .from("blog_categories")
    .insert({
      name: parsed.data.name,
      slug: parsed.data.slug,
      description: parsed.data.description,
      sort_order: parsed.data.sortOrder,
    })
    .select("id, name, slug")
    .single();

  if (isUniqueViolation(error)) {
    return adminJson({ error: "A category with that URL already exists.", fieldErrors: { slug: ["Already in use"] } }, { status: 409 });
  }
  if (error || !data) return adminJson({ error: "We could not save this category." }, { status: 500 });

  revalidateBlog();
  return adminJson({ category: data }, { status: 201 });
}
