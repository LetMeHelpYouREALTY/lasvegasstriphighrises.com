"use client";

import { useState } from "react";
import Image from "next/image";
import {
  getImageSrc,
  imageCatalog,
  type ImageKey,
  type SiteImageAsset,
} from "@/lib/images";

type SiteImageProps = {
  imageKey: ImageKey;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
};

export function getAsset(imageKey: ImageKey): SiteImageAsset {
  return imageCatalog[imageKey];
}

/**
 * Primary src is Cloudflare Images (imagedelivery.net).
 * Git public path is the backup if hosted Images has not received the file yet.
 */
export default function SiteImage({
  imageKey,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 1200px",
  priority = false,
  fill = false,
}: SiteImageProps) {
  const asset = imageCatalog[imageKey];
  const cloudflareSrc = getImageSrc(asset);
  const gitSrc = asset.src;
  const [src, setSrc] = useState(cloudflareSrc);
  const fromCloudflare = src.startsWith("https://imagedelivery.net/");

  function handleError(): void {
    if (src !== gitSrc) {
      setSrc(gitSrc);
    }
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt ?? asset.alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        unoptimized={fromCloudflare}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt ?? asset.alt}
      width={asset.width}
      height={asset.height}
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={fromCloudflare}
      onError={handleError}
    />
  );
}
