// One-off migration: uploads the site's bundled media (src/assets) to Cloudinary
// and writes scripts/cloudinary-manifest.json mapping local path -> Cloudinary public_id.
//
// Usage: node --env-file=.env scripts/cloudinary-migrate.mjs

import { v2 as cloudinary } from "cloudinary";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSETS_DIR = path.join(ROOT, "src/assets");

const PRESET_NAME = "deckpro_site_media";
const CLOUD_FOLDER = "deckpro/site-assets";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Only the files actually referenced in components/pages (see grep audit) —
// intentionally excludes dead assets (unused hero variants, logo.png, unused gallery overflow).
const FILES = [
  "services/camper/camperAnd4x4.png",
  "services/camper/CamperAnd4x4-featured-card.png",
  ...Array.from({ length: 7 }, (_, i) => `services/marine/${i + 1}.jpg`),
  "services/scanning/scanning.jpg",
  "services/scanning/marine-template.jpg",
  ...Array.from({ length: 12 }, (_, i) => `gallery/project-one/${i + 1}.jpg`),
  ...Array.from({ length: 11 }, (_, i) => `gallery/project-two/${i + 1}.jpg`),
  ...Array.from({ length: 15 }, (_, i) => `gallery/project-three/${i + 1}.jpg`),
  "hero-image.jpg",
  "howItWorks/scanning.jpg",
  "howItWorks/design.jpg",
  "howItWorks/manufacturing.jpg",
  "howItWorks/expert-fitting.jpg",
  "servicesOverview/marine-floring.png",
  "servicesOverview/marine-flooring-featured-card.png",
  "servicesOverview/3DScanning.png",
  "servicesOverview/3dScanning-feature-card.png",
  "servicesOverview/camperAnd4x4.png",
  "servicesOverview/CamperAnd4x4-featured-card.png",
  "whychoosus/scanning.jpg",
  "whychoosus/custom-design.jpg",
  "whychoosus/professional-fitting.jpg",
  "before-after/project1/before.jpg",
  "before-after/project1/after.jpg",
  "before-after/project2/before.jpg",
  "before-after/project2/after.jpg",
  "before-after/project3/before.jpg",
  "before-after/project3/after.jpg",
  "featured-videos/1.mp4",
  "featured-videos/2.mp4",
  "featured-videos/3.mp4",
];

async function ensurePreset() {
  try {
    await cloudinary.api.upload_preset(PRESET_NAME);
    console.log(`Preset "${PRESET_NAME}" already exists — reusing it.`);
  } catch (err) {
    if (err?.error?.http_code !== 404) throw err;
    await cloudinary.api.create_upload_preset({
      name: PRESET_NAME,
      unsigned: false,
      folder: CLOUD_FOLDER,
      overwrite: true,
      unique_filename: false,
      use_filename: false,
    });
    console.log(`Created new upload preset "${PRESET_NAME}".`);
  }
}

function publicIdFor(relPath) {
  const noExt = relPath.replace(/\.[^./]+$/, "");
  return noExt.replace(/\s+/g, "-");
}

async function uploadAll() {
  const manifest = {};
  let done = 0;

  for (const relPath of FILES) {
    const absPath = path.join(ASSETS_DIR, relPath);
    const publicId = publicIdFor(relPath);
    const resourceType = relPath.endsWith(".mp4") ? "video" : "image";

    try {
      const result = await cloudinary.uploader.upload(absPath, {
        public_id: publicId,
        folder: CLOUD_FOLDER,
        resource_type: resourceType,
        upload_preset: PRESET_NAME,
        overwrite: true,
      });

      manifest[relPath] = {
        publicId: result.public_id,
        resourceType: result.resource_type,
        format: result.format,
        width: result.width,
        height: result.height,
      };

      done += 1;
      console.log(`[${done}/${FILES.length}] ${relPath} -> ${result.public_id}`);
    } catch (err) {
      console.error(`FAILED: ${relPath}`, err.message || err);
      throw err;
    }
  }

  writeFileSync(
    path.join(__dirname, "cloudinary-manifest.json"),
    JSON.stringify(manifest, null, 2)
  );
  console.log(`\nWrote manifest with ${Object.keys(manifest).length} entries.`);
}

await ensurePreset();
await uploadAll();
