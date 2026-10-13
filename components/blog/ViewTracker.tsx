"use client";

import { useEffect } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

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
      try {
        void createBrowserSupabaseClient().rpc("record_blog_view", { p_slug: slug }).then(() => undefined, () => undefined);
      } catch {
        // Supabase not configured in this environment.
      }
    }, 3000); // ignore instant bounces and most bots
    return () => window.clearTimeout(timer);
  }, [slug]);

  return null;
}
