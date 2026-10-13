import { adminJson } from "@/lib/http/security";
import { buildPostRow, guardAdminWrite, isUniqueViolation, revalidateBlog } from "@/lib/blog/admin-api";
import { blogPostInputSchema, uuidSchema } from "@/lib/blog/schema";

export const runtime = "nodejs";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await guardAdminWrite(request);
  if ("response" in guard) return guard.response;

  const id = uuidSchema.safeParse((await params).id);
  if (!id.success) return adminJson({ error: "This post could not be found." }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return adminJson({ error: "Please check the post and try again." }, { status: 400 });
  }

  const parsed = blogPostInputSchema.safeParse(body);
  if (!parsed.success) {
    return adminJson(
      { error: "Please check the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { data: previous } = await guard.access.supabase.from("blog_posts").select("slug").eq("id", id.data).maybeSingle();

  const { data, error } = await guard.access.supabase
    .from("blog_posts")
    .update(buildPostRow(parsed.data))
    .eq("id", id.data)
    .select("id, slug, status, published_at, updated_at")
    .maybeSingle();

  if (isUniqueViolation(error)) {
    return adminJson({ error: "That URL is already used by another post.", fieldErrors: { slug: ["Already in use"] } }, { status: 409 });
  }
  if (error) return adminJson({ error: "We could not save this post. Please try again." }, { status: 500 });
  if (!data) return adminJson({ error: "This post could not be found." }, { status: 404 });

  if (previous?.slug && previous.slug !== data.slug) revalidateBlog(previous.slug);
  revalidateBlog(data.slug);
  return adminJson({ post: data });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await guardAdminWrite(request, { json: false });
  if ("response" in guard) return guard.response;

  const id = uuidSchema.safeParse((await params).id);
  if (!id.success) return adminJson({ error: "This post could not be found." }, { status: 404 });

  const { data, error } = await guard.access.supabase
    .from("blog_posts")
    .delete()
    .eq("id", id.data)
    .select("slug")
    .maybeSingle();

  if (error) return adminJson({ error: "We could not delete this post. Please try again." }, { status: 500 });
  if (!data) return adminJson({ error: "This post could not be found." }, { status: 404 });

  revalidateBlog(data.slug);
  return adminJson({ ok: true });
}
