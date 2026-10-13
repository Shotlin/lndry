import { adminJson } from "@/lib/http/security";
import { guardAdminWrite, isUniqueViolation, revalidateBlog } from "@/lib/blog/admin-api";
import { blogCategoryInputSchema, uuidSchema } from "@/lib/blog/schema";

export const runtime = "nodejs";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await guardAdminWrite(request);
  if ("response" in guard) return guard.response;

  const id = uuidSchema.safeParse((await params).id);
  if (!id.success) return adminJson({ error: "This category could not be found." }, { status: 404 });

  const parsed = blogCategoryInputSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return adminJson({ error: "Please check the category.", fieldErrors: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const { data, error } = await guard.access.supabase
    .from("blog_categories")
    .update({
      name: parsed.data.name,
      slug: parsed.data.slug,
      description: parsed.data.description,
      sort_order: parsed.data.sortOrder,
    })
    .eq("id", id.data)
    .select("id, name, slug")
    .maybeSingle();

  if (isUniqueViolation(error)) {
    return adminJson({ error: "A category with that URL already exists.", fieldErrors: { slug: ["Already in use"] } }, { status: 409 });
  }
  if (error) return adminJson({ error: "We could not save this category." }, { status: 500 });
  if (!data) return adminJson({ error: "This category could not be found." }, { status: 404 });

  revalidateBlog();
  return adminJson({ category: data });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await guardAdminWrite(request, { json: false });
  if ("response" in guard) return guard.response;

  const id = uuidSchema.safeParse((await params).id);
  if (!id.success) return adminJson({ error: "This category could not be found." }, { status: 404 });

  // Posts keep existing (category becomes "none") — the foreign key is ON DELETE SET NULL.
  const { error } = await guard.access.supabase.from("blog_categories").delete().eq("id", id.data);
  if (error) return adminJson({ error: "We could not delete this category." }, { status: 500 });

  revalidateBlog();
  return adminJson({ ok: true });
}
