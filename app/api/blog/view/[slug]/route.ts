const API_BASE = (process.env.LNDRY_API_URL ?? process.env.LNDRY_PARTNER_LEAD_API_URL ?? "https://api.lndry.in/api/v1").replace(/\/+$/, "");

/** Forwards a blog page view to the LNDRY backend (keeps the backend's CORS list limited to the dashboard). */
export async function POST(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    await fetch(`${API_BASE}/blog/posts/${encodeURIComponent(slug)}/view`, {
      method: "POST",
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    // A missed view is not worth an error.
  }
  return new Response(null, { status: 204 });
}
