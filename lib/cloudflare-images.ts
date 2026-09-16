/**
 * Cloudflare Images (hosted) — primary CDN.
 * Git copies under /public/images remain the origin/backup.
 *
 * Delivery format (Cloudflare Images docs, Sep 2026):
 *   https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT_NAME>
 *
 * Account hash is public (it appears in every image URL).
 * Uploads still need CLOUDFLARE_API_TOKEN (Images:Edit).
 */

export const CLOUDFLARE_IMAGES = {
  accountId: "2cc579c1ec9e426ed585e933ebf4753b",
  accountHash: "byE6BTe9lNqo21V57n4aPQ",
  deliveryHost: "https://imagedelivery.net",
  /** Named variant that ships with hosted Images. Flexible variants are opt-in. */
  defaultVariant: "public",
} as const;

export function cloudflareAccountHash(): string {
  return process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH || CLOUDFLARE_IMAGES.accountHash;
}

/**
 * Hosted Images is on unless explicitly disabled.
 * SiteImage falls back to the git-backed public path if delivery 404s (image not uploaded yet).
 */
export function isCloudflareImagesEnabled(): boolean {
  return process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ENABLED !== "false";
}

export function cloudflareDeliveryUrl(
  imageId: string,
  variant: string = CLOUDFLARE_IMAGES.defaultVariant
): string {
  return `${CLOUDFLARE_IMAGES.deliveryHost}/${cloudflareAccountHash()}/${imageId}/${variant}`;
}

export function assertNeverCloudflare(value: never): never {
  throw new Error(`Unhandled Cloudflare Images value: ${String(value)}`);
}
