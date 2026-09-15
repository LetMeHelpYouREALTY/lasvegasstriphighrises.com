import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { nap } from "@/lib/nap";
import { IMAGE_KEYS, imageCatalog, imageForHeading } from "@/lib/images";

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
    expect(imageForHeading("MacDonald Highlands").key).toBe("luxury-pool-terrace");
    expect(imageForHeading("California Relocators").key).toBe("relocation");
    expect(imageForHeading("Downsizing").key).toBe("first-time-buyer");
    expect(imageForHeading("Divorce & Probate").key).toBe("consultation-office");
    expect(imageForHeading("Lock-and-Leave Condos").key).toBe("investment-rentals");
  });
});
