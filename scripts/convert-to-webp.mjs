import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Raster images used on the site — convert to WebP alongside originals. */
const targets = [path.join(root, "public", "media")];

const skipNames = new Set([
  "logo-icon.png",
  "the-plugin-logo.png",
  "the-plugin-logo-cropped.png",
  "logo.png",
  "logo-backup.png",
  "_wordmark_test.png",
  "IMG_0171.PNG",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "the plugin (1).png",
  "the plugin co logo.png",
  "the plugin.png",
  "the pluginfav.jpeg",
  "the pluginfav2.jpeg",
]);

async function convertFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const base = path.basename(filePath);
  if (skipNames.has(base)) return;

  // Only convert raster assets under public/media
  if (!filePath.includes(`${path.sep}media${path.sep}`)) return;

  const outPath = filePath.replace(/\.(jpe?g|png)$/i, ".webp");
  if (fs.existsSync(outPath)) {
    const srcStat = fs.statSync(filePath);
    const outStat = fs.statSync(outPath);
    if (outStat.mtimeMs >= srcStat.mtimeMs) return;
  }

  await sharp(filePath).webp({ quality: 82, effort: 4 }).toFile(outPath);
  console.log(`webp: ${path.relative(root, outPath)}`);
}

async function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "logos") continue;
      await walk(full);
      continue;
    }
    await convertFile(full);
  }
}

for (const dir of targets) {
  await walk(dir);
}
