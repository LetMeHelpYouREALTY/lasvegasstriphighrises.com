import { Phone, MapPin, Star, Clock } from "lucide-react";
import { nap } from "@/lib/nap";

type GbpActionsProps = {
  compact?: boolean;
  className?: string;
};

export default function GbpActions({ compact = false, className = "" }: GbpActionsProps) {
  const btn =
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2";
  const size = compact ? "px-3 py-2 text-sm" : "px-4 py-3 text-sm md:text-base";

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={nap.phoneHref} className={`${btn} ${size} bg-blue-600 text-white hover:bg-blue-700`}>
        <Phone className="h-4 w-4" aria-hidden="true" />
        Call {nap.phoneDisplay}
      </a>
      <a
        href={nap.googleDirections}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btn} ${size} bg-slate-900 text-white hover:bg-slate-800`}
      >
        <MapPin className="h-4 w-4" aria-hidden="true" />
        Directions
      </a>
      <a
        href={nap.googleReviews}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btn} ${size} bg-white text-slate-900 border border-slate-200 hover:bg-slate-50`}
      >
        <Star className="h-4 w-4 text-yellow-500" aria-hidden="true" />
        Google Reviews
      </a>
      {!compact && (
        <span className={`${btn} ${size} bg-slate-50 text-slate-700 border border-slate-200`}>
          <Clock className="h-4 w-4" aria-hidden="true" />
          {nap.hours.summary}
        </span>
      )}
    </div>
  );
}
