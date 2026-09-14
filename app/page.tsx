import Navbar from "@/components/layouts/Navbar";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ReviewsSection from "@/components/sections/ReviewsSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/layouts/Footer";
import PageHero from "@/components/images/PageHero";
import SectionVisual from "@/components/images/SectionVisual";
import GbpActions from "@/components/gbp/GbpActions";
import Link from "next/link";
import { Home as HomeIcon, TrendingUp, Shield, Users } from "lucide-react";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { nap } from "@/lib/nap";
import { imageForHeading } from "@/lib/images";
import { generateFAQSchema } from "@/lib/gbp-schema";
import { gbpFAQs } from "@/lib/gbp-schema";
import SchemaScript from "@/components/SchemaScript";

export default async function Home() {
  const config = await getPageDomainConfig();
  const heroImage = imageForHeading(config.neighborhood).key;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: nap.businessName,
    url: `https://${config.domain !== "default" ? config.domain : "heyberkshire.com"}`,
    telephone: nap.phoneTel,
    email: nap.email,
    image: `${nap.url}/images/hero/las-vegas-homes-hero.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: nap.streetAddress,
      addressLocality: nap.addressLocality,
      addressRegion: nap.addressRegion,
      postalCode: nap.postalCode,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: nap.geo.latitude,
      longitude: nap.geo.longitude,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: nap.rating.value,
      reviewCount: nap.rating.count,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <SchemaScript schema={generateFAQSchema(gbpFAQs)} id="home-faq" />
      <Navbar />
      <main>
        <PageHero
          overlay
          title={config.heroHeadline}
          subtitle={config.heroSubheadline}
          badge={config.ctaBadge}
          imageKey={heroImage}
        >
          <div className="mb-8 flex justify-center">
            <div
              dangerouslySetInnerHTML={{
                __html: `<realscout-simple-search agent-encoded-id="${config.realscoutAgentId}"></realscout-simple-search>`,
              }}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm mb-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">500+</span>
              <span>Clients Helped</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">Since 2008</span>
              <span>Las Vegas Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">4.9★</span>
              <span>Client Rating</span>
            </div>
          </div>
        </PageHero>

        {/* Value Proposition */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Work With Dr. Jan Duffy?
              </h2>
              <SectionVisual heading="Why Work With Dr. Jan Duffy?" className="max-w-3xl mx-auto" />
              <p className="text-lg text-slate-600">
                Berkshire Hathaway HomeServices Nevada Properties — the most trusted name in Las Vegas real estate.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                { icon: Shield, title: "Trusted Brand", desc: "Backed by Warren Buffett's Berkshire Hathaway — unmatched integrity" },
                { icon: Users, title: "50K+ Network", desc: "Global referral network for seamless moves to or from any market" },
                { icon: TrendingUp, title: "$127M+ Sold", desc: "Proven results across every Las Vegas neighborhood since 2008" },
                { icon: HomeIcon, title: "Full Service", desc: "Buying, selling, 55+, luxury, investment — one expert handles it all" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center p-6">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Market Stats */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">
                {config.neighborhood} Real Estate Market
              </h2>
              <SectionVisual heading={`${config.neighborhood} Real Estate Market`} className="max-w-3xl mx-auto mb-6" />
              <p className="text-slate-300 max-w-2xl mx-auto">
                Sale prices, days on market, and inventory change weekly. Search live MLS listings
                below or call {nap.phoneDisplay} for comps on a specific street — we do not publish
                stale averages as if they were current.
              </p>
            </div>
            <div className="text-center">
              <Link href="/market-report" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-colors">
                Market notes
              </Link>
            </div>
          </div>
        </section>

        <FeaturedProperties />
        <RealScoutListings />
        <WhyChooseUs />
        <ReviewsSection />
        <FAQSection />

        {/* Domain-Specific CTA */}
        <section className="py-16 md:py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {config.ctaHeadline}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {config.ctaSubheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GbpActions className="justify-center" />
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
              >
                Send a Message
              </Link>
            </div>
            <p className="mt-6 text-blue-200 text-sm">
              {nap.shortName} | License {nap.license} | {nap.brokerage} | {nap.addressFull}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
