import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { nap } from "@/lib/nap";
import { IMAGE_KEYS, imageCatalog, imageForHeading, getImageSrc } from "@/lib/images";
import { CLOUDFLARE_IMAGES, cloudflareDeliveryUrl } from "@/lib/cloudflare-images";

describe("GBP NAP source of truth", () => {
  it("uses the client CTA phone on visible NAP fields", () => {
    expect(nap.phoneDisplay).toBe("(702) 222-1964");
    expect(nap.phoneTel).toBe("+17022221964");
    expect(nap.streetAddress).toBe("9406 W Lake Mead Blvd, Suite 100");
    expect(nap.addressLocality).toBe("Las Vegas");
    expect(nap.postalCode).toBe("89134");
  });

  it("keeps the Follow Up Boss line off consumer CTAs", () => {
    expect(nap.officePhoneDisplay).toBe("(702) 500-1942");
    expect(nap.phoneDisplay).not.toBe(nap.officePhoneDisplay);
  });
});

describe("heading image catalog", () => {
  it("has a catalog entry and git-backed file for every key", () => {
    for (const key of IMAGE_KEYS) {
      const asset = imageCatalog[key];
      expect(asset.key).toBe(key);
      const disk = join(process.cwd(), "public", asset.src.replace(/^\//, ""));
      expect(existsSync(disk), `missing ${asset.src}`).toBe(true);
    }
  });

  it("maps H1/H2 copy to the right neighborhood or service photo", () => {
    expect(imageForHeading("Berkshire Hathaway HomeServices Summerlin").key).toBe("summerlin");
    expect(imageForHeading("Contact Dr. Jan Duffy").key).toBe("office-lake-mead");
    expect(imageForHeading("55+ Communities in Las Vegas").key).toBe("active-adult-clubhouse");
    expect(imageForHeading("First-Time Home Buyers").key).toBe("first-time-buyer");
    expect(imageForHeading("Golf Course Communities").key).toBe("golf-course");
    expect(imageForHeading("Del Webb at Lake Las Vegas").key).toBe("lake-las-vegas");
    expect(imageForHeading("Luxury Pool Estates").key).toBe("luxury-pool-terrace");
    expect(imageForHeading("MacDonald Highlands").key).toBe("macdonald-highlands");
    expect(imageForHeading("California Relocators").key).toBe("relocation");
    expect(imageForHeading("Downsizing").key).toBe("downsizing-patio");
    expect(imageForHeading("Divorce & Probate").key).toBe("divorce-probate-desk");
    expect(imageForHeading("Lock-and-Leave Condos").key).toBe("lock-and-leave-condo");
    expect(imageForHeading("Your First Home in Las Vegas Starts Here").key).toBe("first-time-buyer");
    expect(imageForHeading("Why Choose Berkshire Hathaway HomeServices?").key).toBe("why-bhhs-office");
    expect(imageForHeading("Ready for Your Next Chapter?").key).toBe("move-up-home");
    expect(imageForHeading("Difficult Situations, Expert Guidance").key).toBe("divorce-probate-desk");
    expect(imageForHeading("Frequently Asked Questions").key).toBe("faq-consultation");
    expect(imageForHeading("What's Your Las Vegas Home Worth?").key).toBe("home-valuation-cma");
    expect(imageForHeading("Las Vegas Real Estate Services").key).toBe("real-estate-services");
    expect(imageForHeading("Las Vegas Luxury Real Estate").key).toBe("luxury-pool-terrace");
    expect(imageForHeading("New Opportunity? We Handle Your Sale.").key).toBe("seller-sold-home");
    expect(imageForHeading("Sun City Anthem").key).toBe("anthem-henderson");
    expect(imageForHeading("Guard-Gated Communities").key).toBe("guard-gated-entry");
    expect(imageForHeading("Dr. Jan Duffy").key).toBe("office-lake-mead");
  });
});

describe("Cloudflare hosted Images delivery", () => {
  it("uses the account hash and custom ID in the imagedelivery.net URL", () => {
    expect(CLOUDFLARE_IMAGES.accountHash).toBe("byE6BTe9lNqo21V57n4aPQ");
    expect(CLOUDFLARE_IMAGES.accountId).toBe("2cc579c1ec9e426ed585e933ebf4753b");
    expect(cloudflareDeliveryUrl("hero/las-vegas-homes-hero")).toBe(
      "https://imagedelivery.net/byE6BTe9lNqo21V57n4aPQ/hero/las-vegas-homes-hero/public"
    );
  });

  it("points catalog assets at hosted Images by default", () => {
    const asset = imageCatalog["las-vegas-homes-hero"];
    expect(getImageSrc(asset)).toBe(
      "https://imagedelivery.net/byE6BTe9lNqo21V57n4aPQ/hero/las-vegas-homes-hero/public"
    );
    expect(asset.src).toBe("/images/hero/las-vegas-homes-hero.webp");
  });
});
