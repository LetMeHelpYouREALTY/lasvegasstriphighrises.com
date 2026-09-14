# Image Assets

Primary delivery is **Cloudflare Images** (`imagedelivery.net`) when
`NEXT_PUBLIC_CLOUDFLARE_IMAGES_ENABLED=true`. Git copies in this folder are the
backup/origin used by Vercel `next/image` until that flag is on.

Upload to Cloudflare:

```bash
npm run cloudflare:images
```

Requires `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` (Images:Edit).

## Folder Structure

```
images/
├── hero/           # Homepage + service heroes (16:9 WebP)
├── neighborhoods/  # Area photos matched to H1/H2 copy
├── services/       # Buyer, seller, investment, relocation
├── office/         # Lake Mead office + consultation table
├── _source/        # PNG originals (git backup of generated art)
├── agent/          # Reserved for a verified Dr. Jan Duffy photo
├── properties/     # Listing photos (MLS)
├── testimonials/   # Do not use stock headshots as clients
└── logos/          # Brand assets
```

## Heading mapping

`lib/images.ts` maps H1/H2/H3 text (Summerlin, Henderson, 55+, new construction,
contact, etc.) to these files via `imageForHeading()`. `SectionVisual` and
`PageHero` use that map so every page heading has a relevant photograph instead
of Unsplash placeholders.

## Specs

| Folder | Size | Format | Notes |
|--------|------|--------|-------|
| hero/ | 1376x768 | WebP | 16:9, <200KB |
| neighborhoods/ | 1376x768 | WebP | Location-specific, no people |
| office/ | 16:9 or 4:3 | WebP | No fake agent likeness |
| _source/ | PNG | Git backup of generated masters |

Do not generate or label a stock portrait as Dr. Jan Duffy. Use a verified
headshot in `agent/` when one is supplied.
