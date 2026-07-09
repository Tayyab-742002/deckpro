// Fetches published blog posts from Sanity at build time and writes them to
// src/generated/blog-data.json, which the blog pages import statically.
// The site therefore stays fully static: Sanity is only contacted during
// builds (a Sanity publish-webhook -> Netlify build hook makes posts go live).
//
// Runs automatically before `npm run dev` and `npm run build` (pre-scripts).
// If SANITY_PROJECT_ID isn't set yet, writes an empty post list so builds
// keep working before the Sanity project exists.
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";

const OUT_DIR = path.resolve("src/generated");
const OUT_FILE = path.join(OUT_DIR, "blog-data.json");

// Local builds read .env directly (Netlify injects real env vars instead).
if (existsSync(".env")) {
  for (const line of readFileSync(".env", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
}

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";

mkdirSync(OUT_DIR, { recursive: true });

if (!projectId) {
  writeFileSync(OUT_FILE, JSON.stringify({ posts: [] }, null, 2));
  console.log("fetch-blog: SANITY_PROJECT_ID not set — wrote empty blog data");
  process.exit(0);
}

// Image URLs and LQIP placeholders are resolved here so the browser bundle
// needs no Sanity SDK at all.
const query = `*[_type == "post" && defined(slug.current) && defined(publishedAt) && publishedAt < now()] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage{
    "url": asset->url,
    "lqip": asset->metadata.lqip,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height,
    alt
  },
  author->{
    name,
    role,
    bio,
    "imageUrl": image.asset->url
  },
  body[]{
    ...,
    _type == "image" => {
      "url": asset->url,
      "lqip": asset->metadata.lqip,
      alt
    }
  }
}`;

const url = `https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}?query=${encodeURIComponent(query)}&perspective=published`;

const res = await fetch(url);
if (!res.ok) {
  throw new Error(`fetch-blog: Sanity query failed (${res.status}): ${await res.text()}`);
}
const { result } = await res.json();
const posts = result || [];

writeFileSync(OUT_FILE, JSON.stringify({ posts }, null, 2));
console.log(`fetch-blog: wrote ${posts.length} post(s) to src/generated/blog-data.json`);
