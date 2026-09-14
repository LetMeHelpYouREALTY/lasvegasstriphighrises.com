import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import { nap } from "@/lib/nap";
import GbpActions from "@/components/gbp/GbpActions";
import GoogleMapEmbed from "@/components/gbp/GoogleMapEmbed";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <h3 className="font-bold text-xl mb-4">{nap.brokerage}</h3>
            <p className="text-slate-300 mb-4 text-sm">
              {nap.shortName}, {nap.jobTitle} — Las Vegas, Henderson, and Summerlin real estate.
              License {nap.license}.
            </p>
            <div className="flex space-x-4">
              <a
                href={nap.socialProfiles[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={nap.socialProfiles[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={nap.socialProfiles[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/listings" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Homes for Sale
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Las Vegas Neighborhoods
                </Link>
              </li>
              <li>
                <Link href="/google-business" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Google Business Profile
                </Link>
              </li>
              <li>
                <Link href="/market-report" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Market Report
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-white transition-colors text-sm">
                  About Dr. Jan Duffy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Real Estate Services</h3>
            <ul className="space-y-2">
              {[
                ["/buyers", "Home Buying in Las Vegas"],
                ["/buyers/california-relocator", "California Relocators"],
                ["/sellers", "Home Selling"],
                ["/luxury-homes", "Luxury Homes"],
                ["/55-plus-communities", "55+ Communities"],
                ["/new-construction", "New Construction"],
                ["/home-valuation", "Free Home Valuation"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-slate-300 hover:text-white transition-colors text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Visit the Office</h3>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0 mt-0.5" />
                <address className="not-italic text-slate-300 text-sm">
                  {nap.shortName}
                  <br />
                  {nap.brokerage}
                  <br />
                  {nap.streetAddress}
                  <br />
                  {nap.addressLocality}, {nap.addressRegion} {nap.postalCode}
                </address>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0" />
                <a href={nap.phoneHref} className="text-slate-300 hover:text-white transition-colors text-sm">
                  {nap.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0" />
                <a href={nap.emailHref} className="text-slate-300 hover:text-white transition-colors text-sm">
                  {nap.email}
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">
                  {nap.hours.weekday}
                  <br />
                  {nap.hours.saturday}
                  <br />
                  {nap.hours.sunday}
                </span>
              </li>
            </ul>
            <GoogleMapEmbed height={180} />
          </div>
        </div>

        <div className="mt-10">
          <GbpActions className="justify-center" />
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm text-center md:text-left">
              © {currentYear} {nap.brokerage}. All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/faq" className="text-slate-400 hover:text-white transition-colors">
                FAQ
              </Link>
              <Link href="/google-business" className="text-slate-400 hover:text-white transition-colors">
                Google Profile
              </Link>
              <Link href="/sitemap.xml" className="text-slate-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-4 text-center">
            {nap.shortName}, {nap.jobTitle} | License {nap.license} | {nap.brokerage} | {nap.addressFull} | {nap.phoneDisplay}
          </p>
          <p className="text-slate-600 text-xs mt-2 text-center max-w-3xl mx-auto">
            Equal Housing Opportunity. Information is deemed reliable but not guaranteed. Equal
            Housing Lender. We describe homes by size, amenities, and commute — never by who lives nearby.
          </p>
        </div>
      </div>
    </footer>
  );
}
