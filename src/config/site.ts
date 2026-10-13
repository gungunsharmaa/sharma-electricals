// Canonical origin used for canonical URLs, sitemap and social tags.
// Set VITE_SITE_URL in Vercel once a custom domain is connected; no trailing slash.
export const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) || "https://sharma-electricals-mu.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Sharma Electricals Pvt. Ltd.";
