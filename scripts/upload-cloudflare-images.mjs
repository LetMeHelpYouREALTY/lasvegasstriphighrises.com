#!/usr/bin/env node
/**
 * Upload git-backed images in public/images to Cloudflare hosted Images.
 * Custom IDs match lib/images.ts cloudflareId values (e.g. hero/las-vegas-homes-hero).
 *
 * Per Cloudflare Images docs (Sep 2026):
 *   POST https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1
 *   form id=<custom path> + file=<bytes>
 *
 * Required:
 *   CLOUDFLARE_API_TOKEN   (Account.Cloudflare Images:Edit)
 * Optional:
 *   CLOUDFLARE_ACCOUNT_ID  (defaults to the heyberkshire Images account)
 *
 * Usage: node scripts/upload-cloudflare-images.mjs
 */

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative, basename, extname } from "node:path";

const ACCOUNT_ID =
  process.env.CLOUDFLARE_ACCOUNT_ID || "2cc579c1ec9e426ed585e933ebf4753b";
const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ROOT = join(process.cwd(), "public/images");
const SKIP_DIRS = new Set(["_source", "testimonials", "logos", "properties", "agent"]);

const MIME = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

function walk(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      out.push(...walk(full));
    } else if (/\.(webp|jpg|jpeg|png)$/i.test(entry.name) && entry.name !== ".gitkeep") {
      out.push(full);
    }
  }
  return out;
}

async function upload(filePath) {
  const rel = relative(ROOT, filePath).replace(/\\/g, "/");
  const id = rel.replace(/\.(webp|jpg|jpeg|png)$/i, "");
  const ext = extname(filePath).toLowerCase();
  const type = MIME[ext] || "application/octet-stream";
  const bytes = readFileSync(filePath);
  const blob = new Blob([bytes], { type });
  const form = new FormData();
  form.set("id", id);
  form.set("file", blob, basename(filePath));
  form.set("requireSignedURLs", "false");

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}` },
      body: form,
    }
  );
  const json = await res.json();
  if (!json.success) {
    const already = JSON.stringify(json.errors || []).includes("Duplicate");
    if (already) {
      console.log(`exists  ${id}`);
      return;
    }
    throw new Error(`${id}: ${JSON.stringify(json.errors || json)}`);
  }
  const variant = json.result?.variants?.[0];
  console.log(`uploaded ${id}${variant ? ` -> ${variant}` : ""}`);
}

async function main() {
  if (!TOKEN) {
    console.log("Skipping Cloudflare upload — CLOUDFLARE_API_TOKEN not set.");
    console.log("Git backup is in public/images. Set an Images:Edit token and re-run:");
    console.log("  CLOUDFLARE_API_TOKEN=... npm run cloudflare:images");
    process.exit(0);
  }
  const files = walk(ROOT);
  console.log(`Uploading ${files.length} git-backed images to account ${ACCOUNT_ID}`);
  for (const file of files) {
    await upload(file);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
