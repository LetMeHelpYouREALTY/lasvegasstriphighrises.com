import SiteImage from "@/components/images/SiteImage";
import { imageForHeading, type ImageKey } from "@/lib/images";

type SectionVisualProps = {
  heading: string;
  imageKey?: ImageKey;
  className?: string;
};

/**
 * Photograph paired with an H2/H3 so every major section has a relevant visual
 * instead of a blank or stock placeholder.
 */
export default function SectionVisual({ heading, imageKey, className = "" }: SectionVisualProps) {
  const asset = imageKey ? undefined : imageForHeading(heading);
  const key = imageKey ?? asset!.key;

  return (
    <figure className={`relative rounded-xl overflow-hidden shadow-sm aspect-[16/9] bg-slate-100 mb-6 ${className}`}>
      <SiteImage
        imageKey={key}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 800px"
        alt={asset?.alt}
      />
      <figcaption className="sr-only">{heading}</figcaption>
    </figure>
  );
}
