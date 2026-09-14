/**
 * Canonical NAP + GBP identity for heyberkshire.com.
 * Every visible phone, address, hour, and LocalBusiness field should import from here
 * so the website and Google Business Profile stay identical.
 *
 * CTA phone is (702) 222-1964 per site operating instructions.
 * (702) 500-1942 remains the professional / Follow Up Boss line — never use it on client CTAs.
 */

export const nap = {
  businessName:
    "Dr. Jan Duffy - Berkshire Hathaway HomeServices Nevada Properties",
  shortName: "Dr. Jan Duffy",
  brokerage: "Berkshire Hathaway HomeServices Nevada Properties",
  license: "S.0197614.LLC",
  jobTitle: "REALTOR®",

  streetAddress: "9406 W Lake Mead Blvd, Suite 100",
  addressLocality: "Las Vegas",
  addressRegion: "NV",
  postalCode: "89134",
  addressCountry: "US",
  addressFull: "9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134",
  addressOneLine: "9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134",

  /** Client-facing CTA — must match Google Business Profile listing phone. */
  phoneDisplay: "(702) 222-1964",
  phoneTel: "+17022221964",
  phoneHref: "tel:+17022221964",
  phoneE164: "+1-702-222-1964",

  /** Professional / CRM line — not a consumer CTA. */
  officePhoneDisplay: "(702) 500-1942",
  officePhoneTel: "+17025001942",

  email: "homes@heyberkshire.com",
  emailHref: "mailto:homes@heyberkshire.com",

  url: "https://heyberkshire.com",
  googleMapsSearch:
    "https://www.google.com/maps/search/?api=1&query=Dr+Jan+Duffy+Berkshire+Hathaway+HomeServices+Nevada+Properties+9406+W+Lake+Mead+Blvd+Las+Vegas+NV+89134",
  googleDirections:
    "https://www.google.com/maps/dir/?api=1&destination=9406+W+Lake+Mead+Blvd+Suite+100,+Las+Vegas,+NV+89134",
  googleEmbed:
    "https://maps.google.com/maps?q=9406+W+Lake+Mead+Blvd+Suite+100,+Las+Vegas,+NV+89134&t=&z=15&ie=UTF8&iwloc=&output=embed",
  googleReviews:
    "https://www.google.com/maps/search/?api=1&query=Dr+Jan+Duffy+Berkshire+Hathaway+HomeServices+Nevada+Properties+reviews+Las+Vegas",

  geo: {
    latitude: 36.1941,
    longitude: -115.2678,
  },

  hours: {
    weekday: "Monday – Friday: 9:00 AM – 6:00 PM",
    saturday: "Saturday: 10:00 AM – 4:00 PM",
    sunday: "Sunday: By Appointment",
    summary: "Mon–Fri 9am–6pm, Sat 10am–4pm, Sun by appointment",
  },

  openingHoursSpecification: [
    { dayOfWeek: "Monday", opens: "09:00", closes: "18:00" },
    { dayOfWeek: "Tuesday", opens: "09:00", closes: "18:00" },
    { dayOfWeek: "Wednesday", opens: "09:00", closes: "18:00" },
    { dayOfWeek: "Thursday", opens: "09:00", closes: "18:00" },
    { dayOfWeek: "Friday", opens: "09:00", closes: "18:00" },
    { dayOfWeek: "Saturday", opens: "10:00", closes: "16:00" },
  ] as const,

  serviceAreas: [
    "Las Vegas, NV",
    "Summerlin, NV",
    "Henderson, NV",
    "North Las Vegas, NV",
    "Clark County, NV",
  ],

  socialProfiles: [
    "https://www.facebook.com/drjanduffy",
    "https://www.instagram.com/drjanduffy",
    "https://www.linkedin.com/in/drjanduffy",
    "https://www.youtube.com/@drjanduffy",
  ],

  rating: {
    value: "4.9",
    count: "200",
  },
} as const;

export type Nap = typeof nap;
