// Canonical origin used for canonical URLs, sitemap and social tags.
// Override with VITE_SITE_URL (e.g. for a preview build); no trailing slash.
export const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) || "https://sharmaelectricals.co"
).replace(/\/$/, "");

export const SITE_NAME = "Sharma Electricals Pvt. Ltd.";
