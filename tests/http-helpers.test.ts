import { describe, expect, it, afterEach } from "vitest";
import { createRateLimiter } from "@/lib/http/rate-limit";
import { BodyTooLargeError, readJsonBody } from "@/lib/http/read-body";
import { getClientIp } from "@/lib/http/client-ip";
import { isSameOriginRequest } from "@/lib/http/security";

describe("rate limiter", () => {
  it("allows up to the limit then blocks, per key", () => {
    const rl = createRateLimiter({ limit: 3, windowMs: 1000 });
    const t = 1_000;
    expect([1, 2, 3].map(() => rl.hit("a", t).allowed)).toEqual([true, true, true]);
    expect(rl.hit("a", t).allowed).toBe(false);
    expect(rl.hit("b", t).allowed).toBe(true);
  });

  it("resets after the window and reports Retry-After", () => {
    const rl = createRateLimiter({ limit: 1, windowMs: 10_000 });
    rl.hit("a", 0);
    const blocked = rl.hit("a", 4_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBe(6);
    expect(rl.hit("a", 10_001).allowed).toBe(true);
  });

  it("bounds memory under a flood of distinct keys", () => {
    const rl = createRateLimiter({ limit: 1, windowMs: 60_000, maxKeys: 50 });
    for (let i = 0; i < 5_000; i++) rl.hit(`ip-${i}`, 1);
    // No throw, and a fresh key still works: the map did not grow unbounded.
    expect(rl.hit("fresh", 2).allowed).toBe(true);
  });
});

describe("readJsonBody", () => {
  const post = (body: BodyInit, headers: Record<string, string> = {}) =>
    new Request("https://lndry.in/api/x", { method: "POST", body, headers });

  it("parses a normal body", async () => {
    await expect(readJsonBody(post('{"a":1}'), 100)).resolves.toEqual({ a: 1 });
  });

  it("rejects an oversize body even when Content-Length is absent or lies", async () => {
    const big = JSON.stringify({ pad: "x".repeat(500) });
    await expect(readJsonBody(post(big, { "content-length": "10" }), 100)).rejects.toBeInstanceOf(BodyTooLargeError);
    const stream = new ReadableStream({
      start(c) {
        c.enqueue(new TextEncoder().encode('{"pad":"' + "x".repeat(400)));
        c.enqueue(new TextEncoder().encode('"}'));
        c.close();
      },
    });
    const chunked = new Request("https://lndry.in/api/x", {
      method: "POST",
      body: stream,
      // @ts-expect-error duplex is required by undici for streamed bodies
      duplex: "half",
    });
    await expect(readJsonBody(chunked, 100)).rejects.toBeInstanceOf(BodyTooLargeError);
  });

  it("rejects declared oversize early", async () => {
    await expect(readJsonBody(post("{}", { "content-length": "999999" }), 100)).rejects.toBeInstanceOf(BodyTooLargeError);
  });

  it("throws a SyntaxError on invalid JSON", async () => {
    await expect(readJsonBody(post("{nope"), 100)).rejects.toBeInstanceOf(SyntaxError);
  });
});

describe("getClientIp", () => {
  it("prefers the platform-set x-real-ip over a spoofable x-forwarded-for", () => {
    const req = new Request("https://lndry.in", { headers: { "x-real-ip": "1.2.3.4", "x-forwarded-for": "9.9.9.9" } });
    expect(getClientIp(req)).toBe("1.2.3.4");
  });
  it("falls back to the first forwarded hop, then unknown", () => {
    expect(getClientIp(new Request("https://lndry.in", { headers: { "x-forwarded-for": "5.5.5.5, 6.6.6.6" } }))).toBe("5.5.5.5");
    expect(getClientIp(new Request("https://lndry.in"))).toBe("unknown");
  });
});

describe("isSameOriginRequest", () => {
  const original = process.env.NEXT_PUBLIC_SITE_URL;
  afterEach(() => {
    if (original === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = original;
  });
  const req = (headers: Record<string, string>) => new Request("https://lndry.in/api/vendor-leads", { method: "POST", headers });

  it("accepts same origin and requests without an Origin header", () => {
    expect(isSameOriginRequest(req({ origin: "https://lndry.in" }))).toBe(true);
    expect(isSameOriginRequest(req({}))).toBe(true);
  });
  it("rejects a foreign origin and Sec-Fetch-Site: cross-site", () => {
    expect(isSameOriginRequest(req({ origin: "https://evil.example" }))).toBe(false);
    expect(isSameOriginRequest(req({ origin: "https://lndry.in", "sec-fetch-site": "cross-site" }))).toBe(false);
  });
  it("rejects look-alike origins", () => {
    expect(isSameOriginRequest(req({ origin: "https://lndry.in.evil.example" }))).toBe(false);
    expect(isSameOriginRequest(req({ origin: "http://lndry.in" }))).toBe(false);
  });
  it("also accepts the configured canonical site URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://www.lndry.in/";
    expect(isSameOriginRequest(req({ origin: "https://www.lndry.in" }))).toBe(true);
  });
});
