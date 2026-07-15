import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/supabase/config";

export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");

  if (fetchSite === "cross-site") {
    return false;
  }

  if (!origin) {
    return true;
  }

  const allowedOrigins = new Set<string>();
  const configuredSiteUrl = getSiteUrl();

  try {
    allowedOrigins.add(new URL(request.url).origin);
  } catch {
    return false;
  }

  if (configuredSiteUrl) {
    try {
      allowedOrigins.add(new URL(configuredSiteUrl).origin);
    } catch {
      // An invalid optional site URL should not turn into an implicit bypass.
    }
  }

  return allowedOrigins.has(origin);
}

export function jsonNoStore(body: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store, max-age=0");
  headers.set("Pragma", "no-cache");
  headers.set("X-Content-Type-Options", "nosniff");

  return NextResponse.json(body, { ...init, headers });
}

export function adminJson(body: unknown, init: ResponseInit = {}) {
  const response = jsonNoStore(body, init);
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}
