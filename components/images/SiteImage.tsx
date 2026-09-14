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

export default function SiteImage({
  imageKey,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 1200px",
  priority = false,
  fill = false,
}: SiteImageProps) {
  const asset = imageCatalog[imageKey];
  const src = getImageSrc(asset);

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt ?? asset.alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
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
    />
  );
}
