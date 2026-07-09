// Prerenders every route to static HTML after the client + SSR builds,
// injecting per-route SEO meta (title, description, canonical, Open Graph)
// and emitting sitemap.xml plus a real 404 page.
// Run via `npm run build` (see package.json). Netlify serves
// dist/<route>/index.html for pretty URLs (trailing-slash canonical form);
// unknown paths fall back to dist/404.html with a real 404 status.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ORIGIN = "https://www.deckpromarine.com.au";

const ROUTES = [
  {
    path: "/",
    title: "Deckpro Marine Flooring WA | Custom EVA Foam Flooring",
    description:
      "Perth's premium custom EVA foam flooring for boats, campervans, motorhomes and 4x4 vehicles. Precision 3D scanned, custom designed and expertly fitted on-site across WA.",
  },
  {
    path: "/marine-flooring",
    title: "Custom Boat Flooring Perth | Marine EVA Foam Decking — Deckpro",
    description:
      "Custom EVA foam boat flooring, precision scanned and professionally fitted at your marina or driveway anywhere in Perth WA. Non-slip, UV stable, marine grade. Quotes within 48 hours.",
  },
  {
    path: "/campers",
    title: "Campervan & 4x4 Flooring Perth | Custom EVA Foam — Deckpro",
    description:
      "Durable custom EVA foam flooring for campervans, motorhomes, caravans and 4x4 vehicles. Precision scanned, custom designed and fitted on-site across Perth and WA.",
  },
  {
    path: "/3d-scanning",
    title: "Precision 3D Scanning Perth | Boats, Vehicles & Parts — Deckpro",
    description:
      "Sub-millimetre 3D scanning for boat decks, vehicle interiors and custom parts. CAD-ready digital templates delivered in your preferred format, anywhere in Perth WA.",
  },
  {
    path: "/contact",
    title: "Get a Quote | Deckpro Marine Flooring WA",
    description:
      "Tell us about your boat, camper or 4x4 flooring project. Upload photos and dimensions and receive an accurate quote within 48 hours. Fully mobile service across WA.",
  },
  {
    path: "/warranty",
    title: "Warranty | Deckpro Marine Flooring WA",
    description:
      "Warranty information for Deckpro Marine Flooring custom EVA foam flooring installations across Western Australia.",
  },
];

const NOT_FOUND = {
  // Any unmatched path renders the router's catch-all NotFound page.
  path: "/__not-found__",
  title: "Page Not Found | Deckpro Marine Flooring WA",
  description: "The page you are looking for does not exist.",
};

const template = readFileSync("dist/index.html", "utf8");
if (!template.includes("<!--app-html-->")) {
  throw new Error("dist/index.html is missing the <!--app-html--> marker");
}

const { render } = await import(pathToFileURL(path.resolve("dist-ssr/entry-server.js")).href);

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Canonical URL for a route: origin + trailing-slash path (Netlify's served form). */
const canonicalUrl = (routePath) =>
  routePath === "/" ? `${ORIGIN}/` : `${ORIGIN}${routePath}/`;

function buildPage(route, appHtml, { indexable = true } = {}) {
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);

  let html = template
    .replace("<!--app-html-->", appHtml)
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/s,
      `$1${description}$2`
    )
    .replace(
      /(<meta property="og:title" content=")[^"]*(")/,
      `$1${title}$2`
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/s,
      `$1${description}$2`
    );

  const extraTags = indexable
    ? `<link rel="canonical" href="${canonicalUrl(route.path)}" />\n    <meta property="og:url" content="${canonicalUrl(route.path)}" />\n  </head>`
    : `<meta name="robots" content="noindex" />\n  </head>`;
  html = html.replace("</head>", extraTags);

  // The hero-image preload only helps the homepage; on other routes the
  // prerendered <img> tags make the browser discover each page's own images.
  if (route.path !== "/") {
    html = html.replace(/<link\s[^>]*rel="preload"[^>]*hero-image[^>]*\/>\s*/s, "");
  }

  return html;
}

for (const route of ROUTES) {
  const appHtml = await render(route.path);
  const html = buildPage(route, appHtml);
  const outDir = route.path === "/" ? "dist" : path.join("dist", route.path.slice(1));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, "index.html"), html);
  console.log(`prerendered ${route.path} (${(Buffer.byteLength(appHtml) / 1024).toFixed(1)} KiB of markup)`);
}

// Real 404 page: Netlify's fallback (see public/_redirects) serves this with
// an actual 404 status instead of soft-404ing the homepage at every bad URL.
const notFoundHtml = buildPage(NOT_FOUND, await render(NOT_FOUND.path), { indexable: false });
writeFileSync(path.join("dist", "404.html"), notFoundHtml);
console.log("prerendered /404.html");

// sitemap.xml — lastmod is the build date: every deploy regenerates each page.
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((r) => `  <url>\n    <loc>${canonicalUrl(r.path)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join("\n")}
</urlset>
`;
writeFileSync(path.join("dist", "sitemap.xml"), sitemap);
console.log(`wrote sitemap.xml (${ROUTES.length} URLs)`);

rmSync("dist-ssr", { recursive: true, force: true });
