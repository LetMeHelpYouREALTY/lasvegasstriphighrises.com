import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import Link from "next/link";
import { TrendingUp, TrendingDown, Home, Calendar, DollarSign, BarChart, Phone } from "lucide-react";
import type { Metadata } from "next";
import SectionVisual from "@/components/images/SectionVisual";
import CardVisual from "@/components/images/CardVisual";
import VisitOffice from "@/components/gbp/VisitOffice";

export const metadata: Metadata = {
  title: "Las Vegas Real Estate Market Report January 2026 | Berkshire Hathaway HomeServices",
  description:
    "Get the latest Las Vegas real estate market statistics for January 2026. Median prices, days on market, inventory levels, and expert analysis from Berkshire Hathaway HomeServices Nevada Properties.",
  keywords: [
    "Las Vegas real estate market",
    "Las Vegas home prices 2026",
    "Henderson real estate market",
    "Nevada housing market",
    "Berkshire Hathaway market report",
  ],
};

// Report Schema
const reportSchema = {
  "@context": "https://schema.org",
  "@type": "Report",
  name: "Las Vegas Real Estate Market Report - January 2026",
  author: {
    "@type": "RealEstateAgent",
    name: "Dr. Jan Duffy",
    worksFor: "Berkshire Hathaway HomeServices Nevada Properties",
  },
  datePublished: "2026-01-23",
  about: {
    "@type": "Place",
    name: "Las Vegas, Nevada",
  },
};

export default function MarketReportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reportSchema) }}
      />
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Berkshire Hathaway HomeServices Market Intelligence
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Las Vegas Real Estate Market Report
            </h1>
            <SectionVisual heading="Las Vegas Real Estate Market Report" className="max-w-4xl mx-auto my-6" />

            <p className="text-xl text-slate-600">
              January 2026 | Expert analysis from{" "}
              <strong>Berkshire Hathaway HomeServices Nevada Properties</strong>
            </p>
          </div>

          {/* Key Stats Overview */}
          <section className="mb-16 bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Las Vegas Market Snapshot
            </h2>
            <SectionVisual heading="Las Vegas Market Snapshot" className="max-w-3xl mx-auto" />
            <p className="text-slate-300 text-center max-w-3xl mx-auto mb-8">
              Medians, days on market, and inventory change weekly. Search live MLS listings below
              or call (702) 222-1964 for comps on a specific street — we do not publish stale
              averages as if they were current.
            </p>
            <div className="text-center">
              <Link
                href="/listings"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-colors"
              >
                Browse live MLS listings
              </Link>
            </div>
          </section>

          {/* Area Breakdown */}
          <section className="mb-16 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Market Notes by Area
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              Photos match the streets named in each heading. Call for current comps.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { area: "Las Vegas", note: "Valley-wide live MLS — call for a street-level CMA" },
                { area: "Henderson", note: "Lake Las Vegas, Green Valley, and master-planned streets" },
                { area: "Summerlin", note: "150+ parks, Red Rock trail access, master-planned villages" },
                { area: "North Las Vegas", note: "New construction and growing infrastructure" },
                { area: "Southern Highlands", note: "Guard-gated golf community with mountain views" },
                { area: "Luxury Homes", note: "The Ridges, MacDonald Highlands, and custom estates" },
              ].map((item) => (
                <article
                  key={item.area}
                  className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <CardVisual heading={`${item.area} market`} />
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{item.area}</h3>
                    <p className="text-sm text-slate-600 mb-3">{item.note}</p>
                    <p className="text-sm font-medium text-blue-700">Call for current comps</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Expert Analysis */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Expert Market Analysis
            </h2>
            <div className="bg-slate-50 rounded-lg p-8">
              <blockquote className="text-lg text-slate-700 italic mb-6">
                "The Las Vegas market remains strong heading into 2026. We're seeing continued
                demand from California relocators and remote workers, but the days of 20 offers on
                every listing are behind us. Buyers finally have some negotiating power, while
                sellers are still achieving solid appreciation. It's a balanced market that rewards
                proper pricing and preparation."
              </blockquote>
              <cite className="text-slate-900 font-semibold">
                — Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties
              </cite>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                  <Home className="h-5 w-5 text-blue-600 mr-2" />
                  For Buyers
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• More inventory = more choices</li>
                  <li>• Negotiating power is returning</li>
                  <li>• Interest rates stabilizing around 6.5%</li>
                  <li>• New construction offering incentives</li>
                </ul>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  For Sellers
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Still a seller's market (2.1 months inventory)</li>
                  <li>• Proper pricing is crucial</li>
                  <li>• 4.2% appreciation in past year</li>
                  <li>• Well-priced homes sell in under 30 days</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Market Trends */}
          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Key Market Trends to Watch
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">California Migration</h3>
                <p className="text-slate-600 text-sm">
                  Continued influx of California buyers seeking affordability and no state income
                  tax. Summerlin and Henderson remain top destinations.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Home className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">New Construction</h3>
                <p className="text-slate-600 text-sm">
                  Builders offering significant incentives including rate buydowns, closing cost
                  credits, and upgrades. Great time for new home buyers.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <BarChart className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Luxury Strength</h3>
                <p className="text-slate-600 text-sm">
                  The luxury segment remains active in The Ridges and Southern Highlands.
                  Call for current comps on a specific estate — we do not publish stale
                  appreciation percentages.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Market Questions We're Hearing
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Is now a good time to buy in Las Vegas?",
                  a: "Yes. With more inventory, returning negotiating power, and stable interest rates, buyers have more options than they've had in years. Well-priced homes are still moving quickly, but you won't face the bidding wars of 2021-2022.",
                },
                {
                  q: "Should I wait for prices to drop?",
                  a: "Las Vegas prices have historically been resilient. Job growth and California relocation continue to support demand. Waiting can cost more than any short-term dip. Dr. Jan can run current comps for your target streets.",
                },
                {
                  q: "Is this a buyer's or seller's market?",
                  a: "Inventory shifts weekly. Buyers often have more leverage than they did in 2021–2022, while well-priced listings still move. Call for the current month of supply on the neighborhood you care about.",
                },
                {
                  q: "What's happening with interest rates?",
                  a: "Rates have stabilized around 6.5% for conventional loans. Many buyers are using builder incentives or rate buydowns to achieve effective rates in the low 5% range. VA and FHA options remain competitive.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <VisitOffice heading="Review comps at Lake Mead Boulevard" />

          {/* CTA */}
          <section className="text-center bg-blue-600 text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Personalized Market Insights
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Want to know what these numbers mean for your specific neighborhood or situation? Dr.
              Jan Duffy provides free market consultations.
            </p>
            <a
              href="tel:+17022221964"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call (702) 222-1964
            </a>
            <p className="mt-4 text-blue-200 text-sm">
              Berkshire Hathaway HomeServices Nevada Properties
            </p>
          </section>
        </div>

        {/* Last Updated */}
        <div className="text-center text-sm text-slate-500 mt-8">Last Updated: January 2026</div>
      </main>
      <RealScoutListings />
      <Footer />
    </>
  );
}
