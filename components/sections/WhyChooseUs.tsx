import { Shield, TrendingUp, Users, Award, Clock, Home } from "lucide-react";
import SectionVisual from "@/components/images/SectionVisual";
import CardVisual from "@/components/images/CardVisual";
import type { ImageKey } from "@/lib/images";

const features: Array<{
  icon: typeof Shield;
  title: string;
  description: string;
  imageKey: ImageKey;
}> = [
  {
    icon: Shield,
    title: "Trusted Expertise",
    description: "Serving Las Vegas and Henderson since 2008 with proven results.",
    imageKey: "consultation-office",
  },
  {
    icon: TrendingUp,
    title: "Market Knowledge",
    description: "Local comps, days-on-market, and neighborhood-level pricing context.",
    imageKey: "market-skyline",
  },
  {
    icon: Users,
    title: "Personalized Service",
    description: "Dedicated attention to every client with customized solutions.",
    imageKey: "office-lake-mead",
  },
  {
    icon: Award,
    title: "Proven Results",
    description: "500+ closed transactions and repeat clients across the valley.",
    imageKey: "seller-kitchen",
  },
  {
    icon: Clock,
    title: "Responsive",
    description: "Call (702) 222-1964 — same-day replies during posted office hours.",
    imageKey: "buyer-front-door",
  },
  {
    icon: Home,
    title: "Full Service",
    description: "Search to closing: buyers, sellers, 55+, luxury, and relocation.",
    imageKey: "las-vegas-homes-hero",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Why Choose Us
          </h2>
          <SectionVisual heading="Why Choose Us" className="max-w-3xl mx-auto" />
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Work with Dr. Jan Duffy at Berkshire Hathaway HomeServices Nevada Properties —
            9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group flex flex-col rounded-lg overflow-hidden border border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <CardVisual heading={feature.title} imageKey={feature.imageKey} />
                <div className="flex flex-col items-center text-center p-6">
                  <div className="bg-blue-100 rounded-full p-4 mb-4 -mt-10 relative z-10 border-4 border-white">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
