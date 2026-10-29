/**
 * Best-effort client address for throttling. On Vercel `x-real-ip` is set by
 * the platform and cannot be supplied by the caller; otherwise fall back to the
 * left-most `x-forwarded-for` entry. Never used for authorisation.
 */
export function getClientIp(request: Request): string {
  const real = request.headers.get("x-real-ip")?.trim();
  if (real) return real.slice(0, 64);
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (forwarded || "unknown").slice(0, 64);
}
