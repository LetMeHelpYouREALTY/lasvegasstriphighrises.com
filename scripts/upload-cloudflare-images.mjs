#!/usr/bin/env node
/**
 * Upload git-backed images in public/images to Cloudflare Images.
 * Custom IDs match lib/images.ts cloudflareId values.
 *
 * Required env:
 *   CLOUDFLARE_ACCOUNT_ID
 *   CLOUDFLARE_API_TOKEN   (Account.Cloudflare Images:Edit)
 *
 * Usage: node scripts/upload-cloudflare-images.mjs
 */

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative, basename } from "node:path";

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ROOT = join(process.cwd(), "public/images");
const SKIP_DIRS = new Set(["_source", "testimonials", "logos", "properties", "agent"]);

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
  const bytes = readFileSync(filePath);
  const blob = new Blob([bytes], { type: "image/webp" });
  const form = new FormData();
  form.set("id", id);
  form.set("file", blob, basename(filePath));

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
  console.log(`uploaded ${id}`);
}

async function main() {
  if (!ACCOUNT_ID || !TOKEN) {
    console.log("Skipping Cloudflare upload — CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_API_TOKEN not set.");
    console.log("Git backup is in public/images. Set env vars and re-run to push to imagedelivery.net.");
    process.exit(0);
  }
  const files = walk(ROOT);
  for (const file of files) {
    await upload(file);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
