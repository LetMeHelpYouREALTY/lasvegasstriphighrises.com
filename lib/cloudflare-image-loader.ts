/**
 * Cloudflare Image Loader for Next.js (Cloudflare Pages builds).
 * Hosted Images delivery: https://imagedelivery.net/<hash>/<id>/public
 * Uses the named `public` variant (flexible variants are opt-in in the dashboard).
 * Git-backed public paths are returned unchanged when Images is disabled.
 */

import { cloudflareDeliveryUrl, isCloudflareImagesEnabled } from "./cloudflare-images";

export default function cloudflareImageLoader({
  src,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (!isCloudflareImagesEnabled()) {
    return src;
  }

  if (src.startsWith("https://imagedelivery.net/")) {
    return src;
  }

  const imagePath = src.startsWith("/") ? src.slice(1) : src;
  const id = imagePath.replace(/\.(webp|jpg|jpeg|png|avif)$/i, "").replace(/^images\//, "");
  return cloudflareDeliveryUrl(id);
}
