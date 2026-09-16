import {
  cloudflareDeliveryUrl,
  isCloudflareImagesEnabled,
} from "@/lib/cloudflare-images";

/**
 * Site image catalog.
 * Primary delivery: Cloudflare Images (imagedelivery.net).
 * Backup: git-tracked files under /public/images (Vercel next/image).
 */

export const IMAGE_KEYS = [
  "las-vegas-homes-hero",
  "summerlin",
  "henderson",
  "the-ridges",
  "green-valley",
  "skye-canyon",
  "southern-highlands",
  "centennial-hills",
  "inspirada",
  "mountains-edge",
  "north-las-vegas",
  "active-adult-clubhouse",
  "new-construction",
  "office-lake-mead",
  "consultation-office",
  "buyer-front-door",
  "seller-kitchen",
  "investment-rentals",
  "relocation",
  "market-skyline",
  "first-time-buyer",
  "golf-course",
  "lake-las-vegas",
  "luxury-pool-terrace",
] as const;

export type ImageKey = (typeof IMAGE_KEYS)[number];

export interface SiteImageAsset {
  key: ImageKey;
  /** Git-backed public path (backup + origin upload source). */
  src: string;
  /** Cloudflare Images custom ID (same as git path without leading slash / extension). */
  cloudflareId: string;
  alt: string;
  width: number;
  height: number;
  heading: string;
}

export const imageCatalog: Record<ImageKey, SiteImageAsset> = {
  "las-vegas-homes-hero": {
    key: "las-vegas-homes-hero",
    src: "/images/hero/las-vegas-homes-hero.webp",
    cloudflareId: "hero/las-vegas-homes-hero",
    alt: "Las Vegas Valley homes with desert landscaping and mountain views at sunset",
    width: 1376,
    height: 768,
    heading: "Las Vegas Homes for Sale",
  },
  summerlin: {
    key: "summerlin",
    src: "/images/neighborhoods/summerlin.webp",
    cloudflareId: "neighborhoods/summerlin",
    alt: "Summerlin Las Vegas homes near Red Rock Canyon trails and desert parks",
    width: 1376,
    height: 768,
    heading: "Summerlin Homes",
  },
  henderson: {
    key: "henderson",
    src: "/images/neighborhoods/henderson.webp",
    cloudflareId: "neighborhoods/henderson",
    alt: "Henderson Nevada residential street with palm trees and mountain backdrop",
    width: 1376,
    height: 768,
    heading: "Henderson Homes",
  },
  "the-ridges": {
    key: "the-ridges",
    src: "/images/neighborhoods/the-ridges.webp",
    cloudflareId: "neighborhoods/the-ridges",
    alt: "Luxury custom estate with infinity pool overlooking the Las Vegas Valley",
    width: 1376,
    height: 768,
    heading: "Luxury Homes in The Ridges",
  },
  "green-valley": {
    key: "green-valley",
    src: "/images/neighborhoods/green-valley.webp",
    cloudflareId: "neighborhoods/green-valley",
    alt: "Green Valley Henderson golf course community with homes along the fairway",
    width: 1376,
    height: 768,
    heading: "Green Valley Homes",
  },
  "skye-canyon": {
    key: "skye-canyon",
    src: "/images/neighborhoods/skye-canyon.webp",
    cloudflareId: "neighborhoods/skye-canyon",
    alt: "Skye Canyon Northwest Las Vegas homes with desert mountain views",
    width: 1376,
    height: 768,
    heading: "Skye Canyon Homes",
  },
  "southern-highlands": {
    key: "southern-highlands",
    src: "/images/neighborhoods/southern-highlands.webp",
    cloudflareId: "neighborhoods/southern-highlands",
    alt: "Southern Highlands Las Vegas golf community and custom homes on a ridge",
    width: 1376,
    height: 768,
    heading: "Southern Highlands Homes",
  },
  "centennial-hills": {
    key: "centennial-hills",
    src: "/images/neighborhoods/centennial-hills.webp",
    cloudflareId: "neighborhoods/centennial-hills",
    alt: "Centennial Hills walking trail with homes and northwest Las Vegas mountains",
    width: 1376,
    height: 768,
    heading: "Centennial Hills Homes",
  },
  inspirada: {
    key: "inspirada",
    src: "/images/neighborhoods/inspirada.webp",
    cloudflareId: "neighborhoods/inspirada",
    alt: "Inspirada Henderson resort-style community pool and modern homes",
    width: 1376,
    height: 768,
    heading: "Inspirada Homes",
  },
  "mountains-edge": {
    key: "mountains-edge",
    src: "/images/neighborhoods/mountains-edge.webp",
    cloudflareId: "neighborhoods/mountains-edge",
    alt: "Mountains Edge Southwest Las Vegas homes beside desert mountain wilderness",
    width: 1376,
    height: 768,
    heading: "Mountains Edge Homes",
  },
  "north-las-vegas": {
    key: "north-las-vegas",
    src: "/images/neighborhoods/north-las-vegas.webp",
    cloudflareId: "neighborhoods/north-las-vegas",
    alt: "North Las Vegas new construction homes with desert mountain backdrop",
    width: 1376,
    height: 768,
    heading: "North Las Vegas Homes",
  },
  "active-adult-clubhouse": {
    key: "active-adult-clubhouse",
    src: "/images/hero/active-adult-clubhouse.webp",
    cloudflareId: "hero/active-adult-clubhouse",
    alt: "55-plus community clubhouse and resort pool in the Las Vegas Valley",
    width: 1376,
    height: 768,
    heading: "55+ Communities",
  },
  "new-construction": {
    key: "new-construction",
    src: "/images/hero/new-construction.webp",
    cloudflareId: "hero/new-construction",
    alt: "Newly completed desert production home in Las Vegas with mountain views",
    width: 1376,
    height: 768,
    heading: "New Construction",
  },
  "office-lake-mead": {
    key: "office-lake-mead",
    src: "/images/office/office-lake-mead.webp",
    cloudflareId: "office/office-lake-mead",
    alt: "Berkshire Hathaway HomeServices Nevada Properties office near Lake Mead Boulevard in Las Vegas",
    width: 1376,
    height: 768,
    heading: "Contact Dr. Jan Duffy",
  },
  "consultation-office": {
    key: "consultation-office",
    src: "/images/office/consultation-office.webp",
    cloudflareId: "office/consultation-office",
    alt: "Real estate consultation table with listing packets in a Las Vegas office",
    width: 1024,
    height: 768,
    heading: "Meet Dr. Jan Duffy",
  },
  "buyer-front-door": {
    key: "buyer-front-door",
    src: "/images/services/buyer-front-door.webp",
    cloudflareId: "services/buyer-front-door",
    alt: "Front door of a Las Vegas desert home with house keys ready for a buyer",
    width: 1376,
    height: 768,
    heading: "Home Buying",
  },
  "seller-kitchen": {
    key: "seller-kitchen",
    src: "/images/services/seller-kitchen.webp",
    cloudflareId: "services/seller-kitchen",
    alt: "Staged luxury kitchen in a Las Vegas home prepared for listing photos",
    width: 1376,
    height: 768,
    heading: "Home Selling",
  },
  "investment-rentals": {
    key: "investment-rentals",
    src: "/images/services/investment-rentals.webp",
    cloudflareId: "services/investment-rentals",
    alt: "Row of well-maintained Las Vegas single-family rental homes",
    width: 1376,
    height: 768,
    heading: "Investment Properties",
  },
  relocation: {
    key: "relocation",
    src: "/images/services/relocation.webp",
    cloudflareId: "services/relocation",
    alt: "Moving truck at a Las Vegas suburban home during a relocation",
    width: 1376,
    height: 768,
    heading: "Relocation to Las Vegas",
  },
  "market-skyline": {
    key: "market-skyline",
    src: "/images/hero/market-skyline.webp",
    cloudflareId: "hero/market-skyline",
    alt: "Las Vegas Valley rooftops at dusk with the Strip skyline on the horizon",
    width: 1376,
    height: 768,
    heading: "Las Vegas Market Report",
  },
  "first-time-buyer": {
    key: "first-time-buyer",
    src: "/images/services/first-time-buyer.webp",
    cloudflareId: "services/first-time-buyer",
    alt: "Approachable single-story Las Vegas home suited for first-time buyers",
    width: 1376,
    height: 768,
    heading: "First-Time Home Buyers",
  },
  "golf-course": {
    key: "golf-course",
    src: "/images/neighborhoods/golf-course.webp",
    cloudflareId: "neighborhoods/golf-course",
    alt: "Championship desert golf course in Las Vegas with mountain views at golden hour",
    width: 1376,
    height: 768,
    heading: "Golf Course Communities",
  },
  "lake-las-vegas": {
    key: "lake-las-vegas",
    src: "/images/neighborhoods/lake-las-vegas.webp",
    cloudflareId: "neighborhoods/lake-las-vegas",
    alt: "Lake Las Vegas waterfront and resort architecture at dusk in Henderson",
    width: 1376,
    height: 768,
    heading: "Lake Las Vegas Homes",
  },
  "luxury-pool-terrace": {
    key: "luxury-pool-terrace",
    src: "/images/neighborhoods/luxury-pool-terrace.webp",
    cloudflareId: "neighborhoods/luxury-pool-terrace",
    alt: "Luxury Las Vegas estate pool terrace at twilight with valley lights on the horizon",
    width: 1376,
    height: 768,
    heading: "Luxury Pool Estates",
  },
};

const HEADING_IMAGE_MAP: Array<{ pattern: RegExp; key: ImageKey }> = [
  { pattern: /lake las vegas|del webb/i, key: "lake-las-vegas" },
  { pattern: /golf|siena|sun city anthem/i, key: "golf-course" },
  { pattern: /summerlin/i, key: "summerlin" },
  { pattern: /ridges/i, key: "the-ridges" },
  { pattern: /green valley/i, key: "green-valley" },
  { pattern: /skye canyon/i, key: "skye-canyon" },
  { pattern: /southern highlands/i, key: "southern-highlands" },
  { pattern: /centennial/i, key: "centennial-hills" },
  { pattern: /inspirada/i, key: "inspirada" },
  { pattern: /mountains.?edge|mountain.?s edge/i, key: "mountains-edge" },
  { pattern: /north las vegas|aliante/i, key: "north-las-vegas" },
  { pattern: /henderson/i, key: "henderson" },
  { pattern: /55\+|sun city|trilogy|solera|heritage|active adult/i, key: "active-adult-clubhouse" },
  { pattern: /new construction|builder/i, key: "new-construction" },
  { pattern: /macdonald|ascaya|summit club/i, key: "luxury-pool-terrace" },
  { pattern: /luxury|\$1m|estate|pool terrace/i, key: "luxury-pool-terrace" },
  { pattern: /invest|rental|cap rate|1031|condo|lock-and-leave/i, key: "investment-rentals" },
  { pattern: /relocat|moving|california/i, key: "relocation" },
  { pattern: /first.?time|first time|single-story|downsiz/i, key: "first-time-buyer" },
  { pattern: /divorce|probate/i, key: "consultation-office" },
  { pattern: /sell|listing|worth/i, key: "seller-kitchen" },
  { pattern: /buy|buyer representation/i, key: "buyer-front-door" },
  { pattern: /market|insight|report|update/i, key: "market-skyline" },
  { pattern: /contact|office|hours|get in touch/i, key: "office-lake-mead" },
  { pattern: /about|meet|why work|why berkshire|consultation/i, key: "consultation-office" },
];

export function imageForHeading(heading: string): SiteImageAsset {
  for (const entry of HEADING_IMAGE_MAP) {
    if (entry.pattern.test(heading)) {
      return imageCatalog[entry.key];
    }
  }
  return imageCatalog["las-vegas-homes-hero"];
}

export function getImageSrc(asset: SiteImageAsset): string {
  if (isCloudflareImagesEnabled()) {
    return cloudflareDeliveryUrl(asset.cloudflareId);
  }
  return asset.src;
}

export function assertNeverImage(key: never): never {
  throw new Error(`Unhandled image key: ${String(key)}`);
}
