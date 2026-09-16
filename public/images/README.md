# Image Assets

Primary delivery is **Cloudflare hosted Images**:

`https://imagedelivery.net/byE6BTe9lNqo21V57n4aPQ/<image_id>/public`

Git copies in this folder are the origin/backup. `SiteImage` requests Cloudflare first and
falls back to these files if the hosted image is not uploaded yet.

Upload git backups to hosted Images (needs `CLOUDFLARE_API_TOKEN` with Images:Edit):

```bash
npm run cloudflare:images
```

Account ID: `2cc579c1ec9e426ed585e933ebf4753b`
Custom IDs match paths here without `/images/` or extension (e.g. `hero/las-vegas-homes-hero`).

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

`lib/images.ts` maps H1/H2/H3 text (Summerlin, Henderson, 55+, golf, Lake Las Vegas,
new construction, contact, etc.) to these files via `imageForHeading()`. `SectionVisual`,
`CardVisual`, and `PageHero` use that map so every heading has a relevant photograph instead
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
