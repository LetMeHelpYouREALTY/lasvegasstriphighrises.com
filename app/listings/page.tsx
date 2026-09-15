import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import {
  Phone,
  Home,
  MapPin,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  Heart,
  Building2,
  Users,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";
import SectionVisual from "@/components/images/SectionVisual";
import CardVisual from "@/components/images/CardVisual";
import VisitOffice from "@/components/gbp/VisitOffice";

export const metadata: Metadata = {
  title: "Las Vegas Homes for Sale | MLS Property Search | Berkshire Hathaway HomeServices",
  description:
    "Browse all Las Vegas and Henderson homes for sale with live MLS listings. Search by neighborhood, price, and features. Dr. Jan Duffy, Berkshire Hathaway HomeServices. Call (702) 222-1964.",
  keywords: [
    "Las Vegas homes for sale",
    "Henderson real estate",
    "MLS listings Las Vegas",
    "Summerlin homes",
    "houses for sale Las Vegas",
    "Berkshire Hathaway listings",
  ],
};

const listingsSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  name: "Las Vegas MLS Property Listings",
  description: "Live MLS property listings for Las Vegas, Henderson, and Summerlin homes for sale",
  provider: {
    "@type": "RealEstateAgent",
    name: "Dr. Jan Duffy - Berkshire Hathaway HomeServices Nevada Properties",
    telephone: "+17022221964",
  },
  areaServed: [
    { "@type": "City", name: "Las Vegas, NV" },
    { "@type": "City", name: "Henderson, NV" },
    { "@type": "City", name: "Summerlin, NV" },
  ],
};

const popularSearches = [
  { name: "Summerlin Homes", href: "/neighborhoods/summerlin", count: "1,200+" },
  { name: "Henderson Properties", href: "/neighborhoods/henderson", count: "980+" },
  { name: "Green Valley", href: "/neighborhoods/green-valley", count: "450+" },
  { name: "The Ridges Luxury", href: "/neighborhoods/the-ridges", count: "85+" },
  { name: "55+ Communities", href: "/55-plus-communities", count: "320+" },
  { name: "New Construction", href: "/new-construction", count: "600+" },
];

const priceRanges = [
  { range: "Under $400K", description: "Condos, townhomes, and compact lots", count: "Search live MLS" },
  { range: "$400K - $600K", description: "3–4 bedroom homes in established neighborhoods", count: "Search live MLS" },
  { range: "$600K - $1M", description: "Premium locations, larger square footage", count: "Search live MLS" },
  { range: "$1M - $2M", description: "Luxury homes, guard-gated communities", count: "Search live MLS" },
  { range: "$2M+", description: "Custom estates", count: "Search live MLS" },
];

const neighborhoods = [
  {
    name: "Summerlin",
    description: "Master-planned community with Red Rock views, 150+ parks, and trail miles",
  },
  {
    name: "Henderson",
    description: "Nevada's second-largest city with Lake Las Vegas, Green Valley, and master-planned streets",
  },
  {
    name: "Green Valley",
    description: "Established Henderson community with mature landscaping and golf courses",
  },
  {
    name: "Southern Highlands",
    description: "Guard-gated luxury community with championship golf and mountain views",
  },
  {
    name: "North Las Vegas",
    description: "New construction and growing infrastructure",
  },
  {
    name: "Skye Canyon",
    description: "Newer master-planned community with modern amenities and mountain access",
  },
];

export default function ListingsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingsSchema) }}
      />
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Berkshire Hathaway HomeServices Nevada Properties
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Las Vegas Homes for Sale
            </h1>
            <SectionVisual heading="Las Vegas Homes for Sale" className="max-w-4xl mx-auto my-6" />

            <p className="text-xl text-slate-600 mb-8">
              Search thousands of Las Vegas, Henderson, and Summerlin properties with live MLS 
              listings updated every 15 minutes. Find your dream home with expert guidance from 
              Dr. Jan Duffy at <strong>Berkshire Hathaway HomeServices</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
              <span className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Live MLS Data</span>
              <span className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Updated Every 15 Min</span>
              <span className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-1" /> 5,000+ Active Listings</span>
            </div>
          </div>

          {/* RealScout Widget - Live MLS Listings */}
          <section className="mb-16">
            <div className="max-w-7xl mx-auto">
              <div
                dangerouslySetInnerHTML={{
                  __html: `<realscout-office-listings 
                    agent-encoded-id="QWdlbnQtMjI1MDUw" 
                    sort-order="NEWEST" 
                    listing-status="For Sale" 
                    property-types=",SFR,MF,TC"
                  ></realscout-office-listings>`,
                }}
              />
            </div>
          </section>

          {/* Popular Searches Section */}
          <section className="mb-16 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Popular Property Searches in Las Vegas
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              Las Vegas offers diverse neighborhoods for every budget and commute. Whether you're 
              seeking guard-gated estates, golf-course lots, or new construction, our MLS search tools help you find 
              square footage and amenities that match. Browse the most popular searches below or use the advanced 
              filters to customize your home search.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {popularSearches.map((search) => (
                <Link
                  key={search.name}
                  href={search.href}
                  className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-lg hover:border-blue-300 transition-all group flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600">
                      {search.name}
                    </h3>
                    <span className="text-sm text-slate-500">{search.count} listings</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600" />
                </Link>
              ))}
            </div>
          </section>

          {/* Price Range Guide */}
          <section className="mb-16 bg-slate-50 rounded-2xl p-8 md:p-12 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Las Vegas Home Price Guide
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              The Las Vegas real estate market offers a wide range of price points across
              Summerlin, Henderson, and the valley. Inventory changes daily. Use the live MLS
              search above or call (702) 222-1964 for comps — we do not publish stale counts
              as if they were current.
            </p>
            <div className="space-y-4">
              {priceRanges.map((price, index) => (
                <div
                  key={price.range}
                  className="bg-white rounded-lg p-4 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between"
                >
                  <div className="flex items-center mb-2 md:mb-0">
                    <DollarSign className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <h3 className="font-bold text-slate-900">{price.range}</h3>
                      <p className="text-sm text-slate-600">{price.description}</p>
                    </div>
                  </div>
                  <span className="text-blue-600 font-semibold">{price.count}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Neighborhood Overview */}
          <section className="mb-16 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Las Vegas Neighborhoods & Communities
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              Each Las Vegas neighborhood offers a unique mix of amenities, from Summerlin trail miles 
              to Henderson's Lake Las Vegas corridor. Understanding commute times, HOA fees, and 
              square-footage ranges is crucial to finding a home that fits. As a Berkshire 
              Hathaway HomeServices agent serving Las Vegas since 2008, Dr. Jan Duffy provides 
              expert guidance on which neighborhoods match your priorities—named schools, 
              commute times, amenities, or investment potential.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {neighborhoods.map((neighborhood) => (
                <Link
                  key={neighborhood.name}
                  href={`/neighborhoods/${neighborhood.name.toLowerCase().replace(/ /g, "-")}`}
                  className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <CardVisual heading={`${neighborhood.name} Homes`} />
                  <div className="p-6">
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{neighborhood.name}</h3>
                  <p className="text-slate-600 text-sm mb-4">{neighborhood.description}</p>
                  <p className="text-sm font-medium text-blue-700">Call for current comps</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/neighborhoods"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
              >
                Explore All Neighborhoods <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </section>

          {/* Why Use an Agent Section */}
          <section className="mb-16 bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Why Work With a Berkshire Hathaway HomeServices Agent
            </h2>
            <p className="text-slate-300 text-center max-w-3xl mx-auto mb-8">
              In today's competitive Las Vegas market, having expert representation can mean the 
              difference between winning your dream home and losing out. Dr. Jan Duffy brings 
              the resources of Berkshire Hathaway HomeServices—the most trusted name in real estate—
              combined with deep local market knowledge from serving Las Vegas since 2008.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2">Off-Market Access</h3>
                <p className="text-slate-400 text-sm">
                  See listings before they hit the MLS through our network of 50,000+ agents
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2">Expert Negotiation</h3>
                <p className="text-slate-400 text-sm">
                  $127M+ in closed transactions means proven negotiation skills on your behalf
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2">Local Expertise</h3>
                <p className="text-slate-400 text-sm">
                  Insider knowledge of neighborhoods, schools, and upcoming developments
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2">Free for Buyers</h3>
                <p className="text-slate-400 text-sm">
                  The seller pays the commission—you get full representation at no cost
                </p>
              </div>
            </div>
          </section>

          {/* Market Stats */}
          <section className="mb-16 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Las Vegas Real Estate Market
            </h2>
            <SectionVisual heading="Las Vegas Real Estate Market" className="max-w-3xl mx-auto" />
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              The Las Vegas housing market changes weekly. Understanding current conditions helps
              buyers time offers and sellers price listings. Call (702) 222-1964 for comps on a
              specific street — we do not publish stale averages as if they were current.
            </p>
            <div className="text-center">
              <a
                href="tel:+17022221964"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-colors"
              >
                Call (702) 222-1964 for current comps
              </a>
            </div>
          </section>

          {/* Home Buying Process */}
          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              The Home Buying Process in Las Vegas
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              Buying a home is one of the most significant financial decisions you'll make. 
              Understanding the process helps reduce stress and ensures you're prepared at each 
              step. Here's what to expect when purchasing a home in Las Vegas with Dr. Jan Duffy 
              and Berkshire Hathaway HomeServices.
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Get Pre-Approved for Financing</h3>
                  <p className="text-slate-600 text-sm">
                    A pre-approval letter shows sellers you're serious and gives you a clear budget. 
                    Dr. Jan can connect you with trusted local lenders offering competitive rates. 
                    This typically takes 1-3 days with proper documentation.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Define Your Priorities & Search</h3>
                  <p className="text-slate-600 text-sm">
                    Location, size, features, and budget all factor into your search. Dr. Jan helps 
                    you identify which Las Vegas neighborhoods match your lifestyle while setting 
                    up automated MLS alerts so you never miss a new listing.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Tour Properties & Make an Offer</h3>
                  <p className="text-slate-600 text-sm">
                    Visit homes that meet your criteria, either in person or virtually. When you 
                    find "the one," Dr. Jan helps you craft a competitive offer with the right 
                    price, contingencies, and terms to win in today's market.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Due Diligence & Inspections</h3>
                  <p className="text-slate-600 text-sm">
                    Once under contract, you'll have time for home inspections, appraisals, and 
                    final financing approval. Dr. Jan coordinates with all parties and helps you 
                    negotiate repairs or credits if issues arise.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Close & Get Your Keys</h3>
                  <p className="text-slate-600 text-sm">
                    The closing process typically takes 30-45 days from offer acceptance. You'll 
                    sign final documents, transfer funds, and receive the keys to your new Las Vegas 
                    home. Dr. Jan remains available for any questions even after closing.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions About Las Vegas Real Estate
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-bold text-slate-900 mb-2">
                  How competitive is the Las Vegas housing market in 2026?
                </h3>
                <p className="text-slate-600">
                  The Las Vegas market is moderately competitive. Well-priced homes in Summerlin and
                  Henderson often receive multiple offers in the first week. Having a
                  pre-approval and an experienced agent gives you a significant advantage. Call
                  for current inventory, not a stale month-of-supply figure.
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-bold text-slate-900 mb-2">
                  What's the best time of year to buy a home in Las Vegas?
                </h3>
                <p className="text-slate-600">
                  Las Vegas has a year-round real estate market, but inventory typically peaks in 
                  spring (March-May) while competition is lowest in winter (November-January). The 
                  best time depends on your priorities: more selection in spring, potentially better 
                  deals in winter.
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-bold text-slate-900 mb-2">
                  How much do I need for a down payment in Las Vegas?
                </h3>
                <p className="text-slate-600">
                  Down payment requirements vary by loan type: FHA loans require 3.5%, conventional 
                  loans typically 3-20%, VA loans 0% for eligible veterans. Nevada also offers down 
                  payment assistance programs for first-time buyers. Dr. Jan can connect you with 
                  lenders who specialize in various loan programs.
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-bold text-slate-900 mb-2">
                  Are Las Vegas HOA fees expensive?
                </h3>
                <p className="text-slate-600">
                  HOA fees in Las Vegas range from $25/month for basic community maintenance to 
                  $400+/month for guard-gated luxury communities with extensive amenities. Most 
                  standard neighborhoods fall between $50-$150/month. Dr. Jan always reviews HOA 
                  documents to ensure you understand what's included and any special assessments.
                </p>
              </div>
            </div>
          </section>

          <VisitOffice heading="Tour listings from the Lake Mead Boulevard office" />

          {/* CTA */}
          <section className="text-center bg-blue-600 text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Las Vegas Home?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Contact Dr. Jan Duffy for personalized guidance, off-market listings, and expert 
              representation backed by Berkshire Hathaway HomeServices. Free buyer consultations 
              available—the seller pays the commission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+17022221964"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call (702) 222-1964
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-blue-500 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-400 transition-colors"
              >
                Schedule Consultation
              </Link>
            </div>
            <p className="mt-4 text-blue-200 text-sm">
              Berkshire Hathaway HomeServices Nevada Properties
            </p>
          </section>
        </div>

        {/* Last Updated */}
        <div className="text-center text-sm text-slate-500 mt-8">Last Updated: January 2026</div>
      </main>
      <Footer />
    </>
  );
}
