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

// Design-preview mock, shown ONLY when `--mock-if-empty` is passed (the `dev`
// script) AND there are no real posts. The production build (`prebuild`)
// never passes the flag, so this can never reach the live site.
const useMockIfEmpty = process.argv.includes("--mock-if-empty");

const MOCK_POSTS = [
  {
    title: "How to Clean and Maintain EVA Foam Boat Flooring",
    slug: "mock-post-design-preview",
    excerpt:
      "Keep your custom EVA foam deck looking brand new for years — the simple wash-down routine we recommend after every trip, straight from the Deckpro workshop.",
    publishedAt: "2026-07-01T08:00:00Z",
    mainImage: {
      url: "https://images.unsplash.com/photo-1540946485063-a40da27545f8",
      lqip: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=32&blur=50&q=20",
      alt: "Boat deck with custom EVA foam flooring on clear water",
      width: 1760,
      height: 1173,
    },
    author: {
      name: "Sean Mitchell",
      role: "Founder, Deckpro Marine Flooring WA",
      bio: "Sean scans, designs and fits custom EVA foam flooring for boats, campers and 4x4s across Western Australia.",
    },
    body: [
      { _type: "block", _key: "b1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s1", marks: [], text: "One of the biggest reasons boat owners choose EVA foam over carpet or teak is how little work it takes to keep clean. No oiling, no sanding, no mould-prone fibres — just a quick rinse and you're done. Here's the routine we recommend to every customer after an install." }] },
      { _type: "block", _key: "b2", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s2", marks: [], text: "After every trip: the two-minute rinse" }] },
      { _type: "block", _key: "b3", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s3", marks: [], text: "Salt is the main enemy of any deck surface. Before you put the boat away, hose the flooring down with fresh water. That's genuinely all most trips need — closed-cell EVA doesn't absorb water, so there's nothing to dry out or ventilate." }] },
      { _type: "block", _key: "b4", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s4", marks: [], text: "Monthly: soap and a soft brush" }] },
      { _type: "block", _key: "b5", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s5", marks: [], text: "For sunscreen, fish blood, and general grime, mix a little mild dish soap into warm water and work it in with a soft-bristle deck brush. Rinse thoroughly. Avoid solvent-based cleaners and pressure washers on high settings — they can lift the texture over time." }] },
      { _type: "image", _key: "b6", url: "https://images.unsplash.com/photo-1733128666089-e313cc0113ef", lqip: "https://images.unsplash.com/photo-1733128666089-e313cc0113ef?w=32&blur=50&q=20", alt: "Open ocean water in Western Australia" },
      { _type: "block", _key: "b7", style: "blockquote", markDefs: [], children: [{ _type: "span", _key: "s7", marks: [], text: "A deck we fitted five years ago still looks new — the owner's secret is nothing more than a freshwater rinse after every run." }] },
      { _type: "block", _key: "b8", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s8", marks: [], text: "What to avoid" }] },
      { _type: "block", _key: "b9", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s9", marks: [], text: "Sharp-edged gear dropped point-first, solvent cleaners, and dragging heavy items with small contact points. EVA foam is tough underfoot, but like any surface it appreciates a little care with concentrated loads." }] },
      { _type: "block", _key: "b10", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s10", marks: [], text: "Questions about caring for your specific floor? Get in touch — we're always happy to help, whether we fitted your deck or not." }] },
    ],
  },
];

mkdirSync(OUT_DIR, { recursive: true });

if (!projectId) {
  const posts = useMockIfEmpty ? MOCK_POSTS : [];
  writeFileSync(OUT_FILE, JSON.stringify({ posts }, null, 2));
  console.log(
    posts.length
      ? "fetch-blog: SANITY_PROJECT_ID not set — wrote MOCK post for design preview (dev only)"
      : "fetch-blog: SANITY_PROJECT_ID not set — wrote empty blog data"
  );
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
let posts = result || [];

if (posts.length === 0 && useMockIfEmpty) {
  posts = MOCK_POSTS;
  console.log("fetch-blog: no published posts yet — using MOCK post for design preview (dev only)");
}

writeFileSync(OUT_FILE, JSON.stringify({ posts }, null, 2));
console.log(`fetch-blog: wrote ${posts.length} post(s) to src/generated/blog-data.json`);
