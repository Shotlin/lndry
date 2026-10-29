/**
 * Small in-memory fixed-window limiter.
 *
 * This is deliberately best-effort: on serverless hosting each warm instance
 * keeps its own counters, so it blunts a single noisy client or a naive bot but
 * is not a distributed guarantee. Durable duplicate suppression for the lead
 * form lives in the database check (see the vendor-leads route); put an edge
 * rate-limit rule (Vercel Firewall / Cloudflare) in front for hard limits.
 */
type Bucket = { count: number; resetAt: number };

export interface RateLimiter {
  hit(key: string, now?: number): { allowed: boolean; retryAfterSeconds: number };
}

export function createRateLimiter(options: { limit: number; windowMs: number; maxKeys?: number }): RateLimiter {
  const buckets = new Map<string, Bucket>();
  const maxKeys = options.maxKeys ?? 5_000;

  function sweep(now: number) {
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
    // Hard cap so a flood of distinct keys cannot grow memory without bound.
    while (buckets.size >= maxKeys) {
      const oldest = buckets.keys().next().value;
      if (oldest === undefined) break;
      buckets.delete(oldest);
    }
  }

  return {
    hit(key, now = Date.now()) {
      let bucket = buckets.get(key);
      if (!bucket || bucket.resetAt <= now) {
        if (buckets.size >= maxKeys) sweep(now);
        bucket = { count: 0, resetAt: now + options.windowMs };
        buckets.set(key, bucket);
      }
      bucket.count += 1;
      return {
        allowed: bucket.count <= options.limit,
        retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
      };
    },
  };
}
