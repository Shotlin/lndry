export const SITE_URL = "https://lndry.in";
export const DEFAULT_OG_IMAGE = "/brand/website-finishing/og/home-og-1200x630.png";

export const absoluteUrl = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);
