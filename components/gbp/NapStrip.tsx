import { MapPin, Phone } from "lucide-react";
import { nap } from "@/lib/nap";

export default function NapStrip() {
  return (
    <div className="bg-slate-900 text-white text-xs md:text-sm">
      <div className="container mx-auto px-4 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <p className="flex items-start sm:items-center gap-2">
          <MapPin className="h-3.5 w-3.5 mt-0.5 sm:mt-0 shrink-0 text-blue-400" aria-hidden="true" />
          <span>
            <span className="font-semibold">{nap.shortName}</span>
            {" · "}
            {nap.brokerage}
            {" · "}
            {nap.addressFull}
          </span>
        </p>
        <a
          href={nap.phoneHref}
          className="inline-flex items-center gap-2 font-semibold hover:text-blue-300 whitespace-nowrap"
        >
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          {nap.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
