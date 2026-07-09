// Prerenders every route to static HTML after the client + SSR builds.
// Run via `npm run build` (see package.json). Netlify serves
// dist/<route>/index.html for pretty URLs; unknown paths still fall
// back to the SPA via public/_redirects.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROUTES = ["/", "/marine-flooring", "/campers", "/3d-scanning", "/contact", "/warranty"];

const template = readFileSync("dist/index.html", "utf8");
if (!template.includes("<!--app-html-->")) {
  throw new Error("dist/index.html is missing the <!--app-html--> marker");
}

const { render } = await import(pathToFileURL(path.resolve("dist-ssr/entry-server.js")).href);

for (const route of ROUTES) {
  const appHtml = await render(route);
  let html = template.replace("<!--app-html-->", appHtml);

  // The hero-image preload only helps the homepage; on other routes the
  // prerendered <img> tags make the browser discover each page's own images.
  if (route !== "/") {
    html = html.replace(/<link\s[^>]*rel="preload"[^>]*hero-image[^>]*\/>\s*/s, "");
  }

  const outDir = route === "/" ? "dist" : path.join("dist", route.slice(1));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, "index.html"), html);

  const kb = (Buffer.byteLength(appHtml) / 1024).toFixed(1);
  console.log(`prerendered ${route} (${kb} KiB of markup)`);
}

rmSync("dist-ssr", { recursive: true, force: true });
