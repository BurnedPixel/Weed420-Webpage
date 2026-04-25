# Agent System Context: Weed420 EPK

## 1. Project Overview
You are tasked with building and maintaining an Electronic Press Kit (EPK) for **Weed420**, a Venezuelan experimental music collective formed in 2021. 
* **Aesthetic & Domain:** Experimental, epic collage, hexd, deconstructed club, cloud rap, reggaetón.
* **Key Fact:** Their release "Amor de encava" debuted #2 on RateYourMusic in 2025. 

## 2. Technical Stack & Architecture
You must strictly adhere to the following stack. Do not introduce new frameworks or CSS libraries without explicit user approval.
* **Core Framework:** Astro
* **Styling:** Tailwind CSS
* **Data Strategy:**
  * Tour Dates: Client-side fetch from Google Sheets JSON endpoint.
  * Album Covers: Local images in `public/images/albums/`, sourced from Bandcamp CDN.
  * Discography: Section-based data in `src/data/discography.ts`.
  * Press Quotes: Defined in `src/data/constants.ts` as `PRESS` array. Each entry has `quote`, `source`, `article`, optional `url`, and optional `quoteEn` for bilingual hover translations.

### Directory Structure
Ensure all new components and logic follow this established structure:
```text
src/
  ├── components/   # Navbar, Hero, AboutPreview, Press, MediaPlatforms, MediaGrid, TourDates, Footer
  ├── data/         # constants.ts, discography.ts
  ├── layouts/      # Layout.astro
  ├── pages/        # index.astro
  └── styles/       # global.css (Tailwind @theme tokens: --color-bg, --color-accent, --font-sans, etc.)
scripts/
  ├── fetch-bandcamp.mjs   # Scrapes Bandcamp for releases & downloads cover art
  └── fix-img-sizes.sh     # Resizes album covers to consistent 500px JPEG quality 75
public/images/
  ├── albums/               # All local album cover images (~25-130KB each)
  ├── carousel/             # 7 images (01-07.jpg) for AboutPreview carousel (~14-42KB each)
  └── caracas-portrait.jpg  # Hero section background image
```

## 3. Design System
Apply these exact values when constructing or modifying Tailwind classes.
* **Background:** `#0a0a0a` (Near black)
* **Text:** `#f5f5f5` (Off-white)
* **Accent:** `#dc2626` (Deep red)
* **Typography:** `JetBrains Mono` monospace (applied via `--font-sans`)

## 4. Operational Rules & Workflow

### Development Commands
Execute these commands via terminal when required:
* `npm run dev` : Start local development server on localhost:4321
* `npm run build` : Compile static output to `dist/`
* `npm run preview` : Preview the compiled production build locally

### Git Commit Convention
You must commit your work after every logical change. Use the following format strictly: `[<type>] <description>`
Valid Types:
* `[feat]` - For new features or components.
* `[fix]` - For bug fixes.
* `[deploy]` - Reserved for deployment commits.

### Deployment Protocol
**CRITICAL:** Only deploy when explicitly instructed by the user (e.g., "deploy the site").
When authorized, execute the following sequence:
1. `npm run build`
2. `git add -A && git commit -m "[deploy] <Your specific deployment message>"`
3. `wrangler pages deploy dist --project-name=weed420 --branch=master`
4. Clean up old deployments with `wrangler pages deployment delete <id> --project-name=weed420 --force`
*Live Production URL:* https://weed420.pages.dev

## 5. Standard Operating Procedures (SOPs)

### SOP: Fetch Latest Tour Dates from Google Sheets
The TourDates component fetches data client-side at runtime. To verify the endpoint is working:
```bash
curl -s "https://docs.google.com/spreadsheets/d/10JV33dWWWoVUqHGb5DdUpmmg1TSdHEiccmxEezEZ_ws/gviz/tq?tqx=out:json&sheet=tourdates"
```
The sheets endpoint URL is configured in `src/data/constants.ts` as `SITE.googleSheetBaseUrl`.

**Sheet Column Layout:**
| Col | Field | Description |
|-----|-------|-------------|
| A | date | Date string (e.g., "APR 25 2026") |
| B | venue | Venue name |
| C | city | City name |
| D | link | Ticket/event URL (optional) |
| E | hidden | Set to "yes" to hide the row from display |

Rows where column E equals "yes" are filtered out client-side. Rows with dates from past years are also excluded. The component logs fetch errors to the browser console.

### SOP: Scrape Bandcamp for New Releases & Cover Art
Run the automated fetch script to discover all releases, download cover art, and print discography entries:
```bash
node scripts/fetch-bandcamp.mjs
```
This script:
1. Fetches `https://xweed420x.bandcamp.com/music` to find all album slugs
2. For each album, extracts title, release date, and cover art ID from the embedded `data-tralbum` JSON
3. Downloads cover images (700px) to `public/images/albums/<slug>.jpg`
4. Skips already-downloaded covers
5. Prints release entries for manual insertion into `src/data/discography.ts`

After running, manually add new entries to `src/data/discography.ts` with the appropriate `section` value.

### SOP: Add a New Release to Discography
1. Run `node scripts/fetch-bandcamp.mjs` to get the new release data and cover art.
2. Add an entry to the `releases` array in `src/data/discography.ts`:
```typescript
{ title: 'Album Title', year: 'YYYY', section: '<section>', image: '/images/albums/<slug>.jpg', link: 'https://xweed420x.bandcamp.com/album/<slug>' }
```
3. Valid section values: `album` | `mixtape` | `djmix` | `live` | `ep` | `other`
4. Entries within each section are sorted chronologically. Insert the new entry in the correct position.

### SOP: Optimize Album Cover Images
When cover images are too large, resize them to match the established standard:
```bash
cd public/images/albums
for img in *.jpg; do
  convert "$img" -resize 500x500\> -quality 75 -strip "$img"
done
```
Target: 500px max dimension, JPEG quality 75, stripped metadata. Images should be 25-135KB each.

## 6. Discography Structure

The discography is organized into sections, each sorted chronologically:

### Album
| Title | Year | Slug |
|-------|------|------|
| amor de encava | 2025 | amor-de-encava |

### Mixtapes
| Title | Year | Slug |
|-------|------|------|
| malandreo conceptual | 2024 | malandreo-conceptual |
| "Estoy viviendo" | 2026 | estoy-viviendo |

### DJ Mixes
| Title | Year | Slug |
|-------|------|------|
| RVRT 3 | 2023 | rvrt-3 |
| Miren miren guayo... [NTS] | 2025 | miren-miren-guayo-nts |
| Fotos varias [NTS] | 2025 | fotos-varias-nts |
| Dedicado a [NTS] | 2025 | dedicado-a-nts |

### Live
| Title | Year | Slug |
|-------|------|------|
| Esto no es un show | 2025 | esto-no-es-un-show |

### EP
| Title | Year | Slug |
|-------|------|------|
| EVILCHANGA | 2024 | evilchanga |

### Other Artists
| Title | Year | Slug |
|-------|------|------|
| la malasangrura (2023) | 2024 | la-malasangrura-2023 |
| lo que puedo hacer para mejorar es hacer plata | 2025 | lo-que-puedo-hacer-para-mejorar-es-hacer-plata |
| psp | 2025 | psp |

## 7. Branch & Deployment Context

### Branches
| Branch | Description | URL |
|--------|-------------|-----|
| `master` | Production | https://weed420.pages.dev |
| `design/organic` | Organic floating design with animations | https://design-organic.weed420-epk.pages.dev |

## 8. Platform & Social URLs

### Streaming Platforms
| Platform | URL |
|----------|-----|
| Bandcamp | `https://xweed420x.bandcamp.com/` |
| Spotify | `https://open.spotify.com/artist/5UM6QbXYllW5ByF0umKJt1` |
| SoundCloud | `https://soundcloud.com/alejania` |
| Apple Music | `https://music.apple.com/us/artist/weed420/1702350628` |
| Deezer | `https://www.deezer.com/artist/225759075` |
| Tidal | `https://tidal.com/artist/41371367` |
| YouTube Music | `https://www.youtube.com/@weedcuatrocientosveinte` |

### Social Media
| Platform | URL |
|----------|-----|
| Instagram | `https://www.instagram.com/weedcuatroscientosveinte/` |
| YouTube | `https://youtube.com/@weedcuatrocientosveinte` |
