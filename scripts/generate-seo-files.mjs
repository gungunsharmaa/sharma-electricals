// Runs before every build: writes public/sitemap.xml and public/robots.txt for the configured domain.
import fs from "node:fs";

const site = (process.env.VITE_SITE_URL || "https://sharma-electricals-mu.vercel.app").replace(/\/$/, "");
const pages = [
  { path: "", priority: "1.0" },
  { path: "/about", priority: "0.8" },
  { path: "/services", priority: "0.9" },
  { path: "/work", priority: "0.8" },
  { path: "/contact", priority: "0.8" },
];
const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${site}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: /blog

Sitemap: ${site}/sitemap.xml
`;

fs.writeFileSync("public/sitemap.xml", sitemap);
fs.writeFileSync("public/robots.txt", robots);
console.log(`SEO files generated for ${site}`);
