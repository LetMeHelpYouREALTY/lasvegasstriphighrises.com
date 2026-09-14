import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import SectionVisual from "@/components/images/SectionVisual";
import GbpActions from "@/components/gbp/GbpActions";
import { nap } from "@/lib/nap";

export const metadata: Metadata = {
  title: "Search Live Las Vegas Listings | Dr. Jan Duffy",
  description:
    "Search live MLS listings for Las Vegas, Henderson, and Summerlin with Dr. Jan Duffy at Berkshire Hathaway HomeServices Nevada Properties. Call (702) 222-1964.",
  robots: { index: false, follow: true },
};

type PropertyPageProps = {
  params: Promise<{ id: string }>;
};

/**
 * Individual listing IDs are served by RealScout MLS, not a static fake property.
 * This route sends homebuyers to live search + GBP actions instead of invented prices.
 */
export default async function PropertyPage({ params }: PropertyPageProps) {
  await params;

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Search Live Las Vegas Listings
          </h1>
          <SectionVisual heading="Las Vegas Homes for Sale" />
          <p className="text-slate-700 mb-6">
            MLS details change throughout the day. Use the live search on this site or call{" "}
            {nap.shortName} at {nap.phoneDisplay} for the current status of any address.
          </p>
          <GbpActions className="justify-center mb-8" />
          <Link
            href="/listings"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
          >
            Open live MLS search
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
