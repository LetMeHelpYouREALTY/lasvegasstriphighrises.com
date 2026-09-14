import { nap } from "@/lib/nap";

type GoogleMapEmbedProps = {
  height?: number;
  title?: string;
};

export default function GoogleMapEmbed({
  height = 280,
  title = `${nap.brokerage} office map`,
}: GoogleMapEmbedProps) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md border border-slate-200">
      <iframe
        src={nap.googleEmbed}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        className="w-full"
      />
    </div>
  );
}
