// Runs after `vite build`: writes a copy of index.html for every public route with that page's
// title, description, canonical, Open Graph/Twitter tags and JSON-LD already in <head>, so crawlers
// and link-preview bots that don't execute JavaScript still see them. Also writes dist/llms.txt.
// Vercel serves these static files before the SPA rewrite, so no routing config is needed.
import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";

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
      `<meta data-rh="true" property="og:image:alt" content="Sharma Electricals Pvt. Ltd. — electrical contractor in Gurugram">`,
      `<meta data-rh="true" name="twitter:card" content="summary_large_image">`,
      `<meta data-rh="true" name="twitter:title" content="${esc(h.title)}">`,
      `<meta data-rh="true" name="twitter:description" content="${esc(h.description)}">`,
      `<meta data-rh="true" name="twitter:image" content="${esc(seo.SHARE_IMAGE)}">`,
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

  fs.writeFileSync("dist/llms.txt", seo.buildLlmsTxt());
} finally {
  await vite.close();
}
