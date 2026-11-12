// Runs after `vite build`: writes a copy of index.html for every public route with that page's
// title, description, canonical, Open Graph/Twitter tags and JSON-LD already in <head>, so crawlers
// and link-preview bots that don't execute JavaScript still see them. Also writes dist/llms.txt.
// Vercel serves these static files before the SPA rewrite, so no routing config is needed.
import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";

// Hashed file names of the responsive hero image, so the home page can preload the right size early.
const heroPreload = () => {
  const files = fs.readdirSync("dist/assets");
  const pick = (w) => files.find((f) => new RegExp(`^hero-electrical-${w}-.*\\.jpg$`).test(f));
  const sizes = [640, 800, 1024, 1600];
  const names = sizes.map(pick);
  if (names.some((n) => !n)) return "";
  return `<link data-rh="true" rel="preload" as="image" imagesrcset="${names.map((n, i) => `/assets/${n} ${sizes[i]}w`).join(", ")}" imagesizes="100vw" fetchpriority="high">`;
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const vite = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
try {
  const seo = await vite.ssrLoadModule("/src/lib/seo.ts");
  const { SITE_NAME } = await vite.ssrLoadModule("/src/config/site.ts");

  const template = fs.readFileSync("dist/index.html", "utf8");
  // Drop the generic defaults from index.html; each page gets its own.
  const base = template
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, "")
    .replace(/<meta\s+property="og:[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:[^>]*>\s*/gi, "");

  for (const route of seo.prerenderPaths) {
    const h = seo.getHead(route);
    const tags = [
      `<title data-rh="true">${esc(h.title)}</title>`,
      `<meta data-rh="true" name="description" content="${esc(h.description)}">`,
      `<link data-rh="true" rel="canonical" href="${esc(h.canonical)}">`,
      `<meta data-rh="true" name="robots" content="${esc(h.robots)}">`,
      `<meta data-rh="true" property="og:type" content="website">`,
      `<meta data-rh="true" property="og:site_name" content="${esc(SITE_NAME)}">`,
      `<meta data-rh="true" property="og:locale" content="en_IN">`,
      `<meta data-rh="true" property="og:title" content="${esc(h.title)}">`,
      `<meta data-rh="true" property="og:description" content="${esc(h.description)}">`,
      `<meta data-rh="true" property="og:url" content="${esc(h.canonical)}">`,
      `<meta data-rh="true" property="og:image" content="${esc(seo.SHARE_IMAGE)}">`,
      `<meta data-rh="true" property="og:image:width" content="1200">`,
      `<meta data-rh="true" property="og:image:height" content="630">`,
      `<meta data-rh="true" property="og:image:alt" content="Sharma Electricals — electrical contractor in Gurugram">`,
      `<meta data-rh="true" name="twitter:card" content="summary_large_image">`,
      `<meta data-rh="true" name="twitter:title" content="${esc(h.title)}">`,
      `<meta data-rh="true" name="twitter:description" content="${esc(h.description)}">`,
      `<meta data-rh="true" name="twitter:image" content="${esc(seo.SHARE_IMAGE)}">`,
      route === "/" ? heroPreload() : "",
      h.jsonLd
        ? `<script data-rh="true" type="application/ld+json">${JSON.stringify(h.jsonLd).replace(/</g, "\\u003c")}</script>`
        : "",
    ]
      .filter(Boolean)
      .join("\n    ");

    const html = base.replace("</head>", `    ${tags}\n  </head>`);
    const out = route === "/" ? "dist/index.html" : path.join("dist", route, "index.html");
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
    console.log(`prerendered head: ${route}`);
  }

  // Vercel serves dist/404.html, with a real 404 status, for any URL that matches no file or rewrite.
  // The SPA boots on it and its catch-all route renders the "Page not found" view.
  const notFound = base.replace(
    "</head>",
    `    <title>Page not found | ${esc(SITE_NAME)}</title>\n    <meta name="robots" content="noindex, nofollow">\n  </head>`
  );
  fs.writeFileSync("dist/404.html", notFound);
  console.log("wrote 404.html");

  fs.writeFileSync("dist/llms.txt", seo.buildLlmsTxt());
} finally {
  await vite.close();
}
