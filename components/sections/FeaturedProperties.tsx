import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CardVisual from "@/components/images/CardVisual";
import SectionVisual from "@/components/images/SectionVisual";
import type { ImageKey } from "@/lib/images";

const neighborhoods: Array<{
  name: string;
  href: string;
  description: string;
  imageKey: ImageKey;
}> = [
  {
    name: "Summerlin Homes",
    href: "/neighborhoods/summerlin",
    description: "Master-planned villages, 150+ parks, and Red Rock Canyon trail access.",
    imageKey: "summerlin",
  },
  {
    name: "Henderson Homes",
    href: "/neighborhoods/henderson",
    description: "Lake Las Vegas, Green Valley, and master-planned streets with mountain views.",
    imageKey: "henderson",
  },
  {
    name: "Green Valley Homes",
    href: "/neighborhoods/green-valley",
    description: "Golf-course lots, mature landscaping, and The District shopping.",
    imageKey: "green-valley",
  },
];

export default function FeaturedProperties() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Featured Las Vegas Neighborhoods
            </h2>
            <SectionVisual heading="Featured Las Vegas Neighborhoods" className="max-w-xl" />
            <p className="text-slate-600 text-lg">
              Browse live MLS listings after you pick a community. Photos match the streets and
              amenities named in each heading.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link href="/listings">View Live Listings</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {neighborhoods.map((neighborhood) => (
            <Link
              key={neighborhood.href}
              href={neighborhood.href}
              className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <CardVisual heading={neighborhood.name} imageKey={neighborhood.imageKey} />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{neighborhood.name}</h3>
                <p className="text-slate-600 mb-4">{neighborhood.description}</p>
                <span className="inline-flex items-center text-blue-600 font-semibold">
                  Explore {neighborhood.name.replace(" Homes", "")}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
