"use client";

import { useEffect } from "react";

/** Counts one view per browser session. Feeds the "Trending" ranking. Never blocks or breaks the page. */
export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `lndry-blog-view:${slug}`;
    const timer = window.setTimeout(() => {
      try {
        if (sessionStorage.getItem(key)) return;
        sessionStorage.setItem(key, "1"); // mark only when we actually send, so a cancelled timer never loses a view
      } catch {
        // Private mode: still count once per page load.
      }
      // Goes through the website's own route, which forwards to the backend.
      fetch(`/api/blog/view/${encodeURIComponent(slug)}`, { method: "POST", keepalive: true }).catch(() => undefined);
    }, 3000); // ignore instant bounces and most bots
    return () => window.clearTimeout(timer);
  }, [slug]);

  return null;
}
