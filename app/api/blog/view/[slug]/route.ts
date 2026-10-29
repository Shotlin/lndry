import { createRateLimiter } from "@/lib/http/rate-limit";
import { getClientIp } from "@/lib/http/client-ip";
import { isSameOriginRequest } from "@/lib/http/security";

const API_BASE = (process.env.LNDRY_API_URL ?? process.env.LNDRY_PARTNER_LEAD_API_URL ?? "https://api.lndry.in/api/v1").replace(/\/+$/, "");

// Slugs are lower-case words joined by hyphens; anything else is never forwarded.
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const viewLimiter = createRateLimiter({ limit: 60, windowMs: 60 * 1000 });

/** Forwards a blog page view to the LNDRY backend (keeps the backend's CORS list limited to the dashboard). */
export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug.length > 120 || !SLUG_PATTERN.test(slug) || !isSameOriginRequest(request)) {
    return new Response(null, { status: 204 });
  }
  // Over the limit the view is silently dropped: the caller learns nothing and
  // the shared backend/IP budget is not spent on page-view noise.
  if (!viewLimiter.hit(getClientIp(request)).allowed) {
    return new Response(null, { status: 204 });
  }
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
