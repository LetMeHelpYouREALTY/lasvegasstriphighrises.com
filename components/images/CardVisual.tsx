import SiteImage from "@/components/images/SiteImage";
import { imageForHeading, type ImageKey } from "@/lib/images";

type CardVisualProps = {
  heading: string;
  imageKey?: ImageKey;
  className?: string;
};

/**
 * Compact photograph for H2/H3 cards (neighborhood, service, community grids).
 */
export default function CardVisual({ heading, imageKey, className = "" }: CardVisualProps) {
  const mapped = imageForHeading(heading);
  const key = imageKey ?? mapped.key;

  return (
    <div className={`relative aspect-[16/9] w-full overflow-hidden bg-slate-200 ${className}`}>
      <SiteImage
        imageKey={key}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 480px"
        alt={mapped.alt}
      />
    </div>
  );
}
