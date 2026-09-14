import GbpActions from "@/components/gbp/GbpActions";
import GoogleMapEmbed from "@/components/gbp/GoogleMapEmbed";
import SectionVisual from "@/components/images/SectionVisual";
import { nap } from "@/lib/nap";

type VisitOfficeProps = {
  heading?: string;
};

/**
 * GBP engagement block: hours that match the profile, map pin, Call / Directions / Reviews.
 */
export default function VisitOffice({ heading = "Visit Dr. Jan Duffy" }: VisitOfficeProps) {
  return (
    <section className="max-w-4xl mx-auto my-12">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{heading}</h2>
      <SectionVisual heading={heading} className="max-w-4xl" />
      <p className="text-slate-800 font-medium mb-1">{nap.businessName}</p>
      <p className="text-slate-700 mb-1">{nap.addressFull}</p>
      <p className="text-slate-600 text-sm mb-4">
        {nap.hours.weekday}
        <br />
        {nap.hours.saturday}
        <br />
        {nap.hours.sunday}
      </p>
      <GoogleMapEmbed height={320} />
      <GbpActions className="mt-4" />
    </section>
  );
}
