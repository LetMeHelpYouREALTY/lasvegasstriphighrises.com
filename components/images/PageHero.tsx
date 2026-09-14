import type { ReactNode } from "react";
import SiteImage from "@/components/images/SiteImage";
import GbpActions from "@/components/gbp/GbpActions";
import type { ImageKey } from "@/lib/images";
import { imageForHeading } from "@/lib/images";

type PageHeroProps = {
  title: string;
  subtitle?: ReactNode;
  badge?: string;
  imageKey?: ImageKey;
  overlay?: boolean;
  actions?: boolean;
  children?: ReactNode;
  priority?: boolean;
};

export default function PageHero({
  title,
  subtitle,
  badge = "Berkshire Hathaway HomeServices Nevada Properties",
  imageKey,
  overlay = false,
  actions = true,
  children,
  priority = true,
}: PageHeroProps) {
  const key = imageKey ?? imageForHeading(title).key;

  if (overlay) {
    return (
      <section className="relative bg-slate-900 text-white pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <SiteImage
            imageKey={key}
            fill
            priority={priority}
            className="object-cover opacity-40"
            sizes="100vw"
            alt={imageForHeading(title).alt}
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          {badge && (
            <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-6">
              {badge}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">{subtitle}</p>
          )}
          {children}
          {actions && <GbpActions className="justify-center mt-8" />}
        </div>
      </section>
    );
  }

  return (
    <header className="max-w-5xl mx-auto mb-12">
      <div className="relative rounded-2xl overflow-hidden shadow-md mb-8 aspect-[16/9] bg-slate-200">
        <SiteImage
          imageKey={key}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1024px"
        />
      </div>
      <div className="text-center">
        {badge && (
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            {badge}
          </div>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">{title}</h1>
        {subtitle && <div className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">{subtitle}</div>}
        {children}
        {actions && <GbpActions className="justify-center" />}
      </div>
    </header>
  );
}
