import { adminJson } from "@/lib/http/security";
import { buildPostRow, guardAdminWrite, isUniqueViolation, revalidateBlog } from "@/lib/blog/admin-api";
import { blogPostInputSchema } from "@/lib/blog/schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const guard = await guardAdminWrite(request);
  if ("response" in guard) return guard.response;

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

  const { data, error } = await guard.access.supabase
    .from("blog_posts")
    .insert(buildPostRow(parsed.data))
    .select("id, slug, status, published_at, updated_at")
    .single();

  if (isUniqueViolation(error)) {
    return adminJson({ error: "That URL is already used by another post.", fieldErrors: { slug: ["Already in use"] } }, { status: 409 });
  }
  if (error || !data) {
    return adminJson({ error: "We could not save this post. Please try again." }, { status: 500 });
  }

  revalidateBlog(data.slug);
  return adminJson({ post: data }, { status: 201 });
}
