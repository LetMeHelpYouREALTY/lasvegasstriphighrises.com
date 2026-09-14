/**
 * Cloudflare Image Loader for Next.js.
 * When Cloudflare Images is enabled, rewrite to imagedelivery.net.
 * Otherwise return the git-backed public path unchanged so Vercel Image Optimization works.
 */

export default function cloudflareImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const useCloudflareImages = process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ENABLED === "true";
  const accountHash = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH;

  if (useCloudflareImages && accountHash) {
    const imagePath = src.startsWith("/") ? src.slice(1) : src;
    const id = imagePath.replace(/\.(webp|jpg|jpeg|png|avif)$/i, "").replace(/^images\//, "");
    const q = quality || 85;
    return `https://imagedelivery.net/${accountHash}/${id}/w=${width},q=${q},fit=cover,format=auto`;
  }

  return src;
}
