# Agent System Context: Weed420 EPK

## 1. Project Overview
You are tasked with building and maintaining an Electronic Press Kit (EPK) for **Weed420**, a Venezuelan experimental music collective formed in 2021.
* **Aesthetic & Domain:** Experimental, epic collage, hexd, deconstructed club, cloud rap, reggaetón.
* **Site Language:** English-first. All UI copy should be in English.
* **Key Fact:** Their release "Amor de encava" debuted #2 on RateYourMusic in 2025.

## 2. Technical Stack
You must strictly adhere to this stack. Do not introduce new frameworks or CSS libraries without explicit user approval.
* **Core Framework:** Astro
* **Styling:** Tailwind CSS v4 (with `@theme` tokens in global.css)
* **SEO:** `@astrojs/sitemap` (auto-generates `sitemap-index.xml` on build), JSON-LD structured data in Layout.astro
* **Data Strategy:**
  * Tour Dates: Client-side fetch from Google Sheets JSON endpoint.
  * Album Covers: Local images in `public/images/albums/`, sourced from Bandcamp CDN.
  * Discography: Section-based data in `src/data/discography.ts` — each entry has `title`, `year`, `section`, `image`, `link`.
  * Press Quotes: Defined in `src/data/constants.ts` as `PRESS` array. Each entry has `quote`, `source`, `article`, optional `url`, and optional `quoteEn` for bilingual hover translations.
  * Nav Links: `NAV_LINKS` in `constants.ts` (anchor-only internal links: `#bio`, `#press`, `#music`, `#discography`, `#tour`, `#booking`).
  * Streaming Platforms: `PLATFORMS` array in `constants.ts` (used by MediaPlatforms).
  * Social Media: `SOCIALS` array in `constants.ts` (used by Footer, references icons from `icons.ts`).
  * Icons: `iconDefs` in `src/data/icons.ts` — currently `instagram` and `youtube` SVG paths.

### Directory Structure
```
src/
  ├── components/   # Navbar, Hero, AboutPreview, Press, MediaPlatforms, MediaGrid, TourDates, Footer
  ├── data/         # constants.ts, discography.ts, icons.ts
  ├── layouts/      # Layout.astro (shell: <html>, <head> meta, fonts, <slot />)
  ├── pages/        # index.astro (composes all components in order)
  └── styles/       # global.css (Tailwind @theme tokens, keyframes: fadeIn, float)
scripts/
  └── fetch-bandcamp.mjs   # Scrapes Bandcamp for releases & downloads cover art
public/images/
  ├── albums/               # Local album cover images (~25-130KB each)
  ├── carousel/             # 6 images (01-06.jpg) for AboutPreview carousel
  └── caracas-portrait.jpg  # Hero section background image
assets/
  └── carrousel/            # Source-resolution originals — NOT used at runtime
```

## 3. Design System
Apply these exact values when constructing or modifying Tailwind classes.
* **Background:** `#0a0a0a` (Near black, `--color-bg`)
* **Background-Alt:** `#050505` (`--color-bg-alt`, used by Footer)
* **Card Background:** `#1a1a1a` (`--color-bg-card`, used by AboutPreview, MediaGrid)
* **Text:** `#f5f5f5` (Off-white, `--color-text`)
* **Accent:** `#dc2626` (Deep red, `--color-accent`)
* **Typography:** `JetBrains Mono` monospace (Latin subset only, weights 400 + 700, applied via `--font-sans`)
* **Muted variants** are derived via oklch: `--color-text-muted` (60% opacity), `--color-text-dim` (40%), `--color-text-faint` (30%), `--color-accent-muted` (30% opacity), `--color-border` (10%), `--color-border-light` (20%).

## 4. Operational Rules & Workflow

### Development Commands
* `npm run dev` : Start local development server on localhost:4321
* `npm run build` : Compile static output to `dist/`
* `npm run preview` : Preview the compiled production build locally

### Shell Command Prefix
All shell commands must be prefixed with `snip` (e.g. `snip git status`, `snip npm run build`). See §10 for details on how snip works.

### Git Commit Convention
You must commit your work after every logical change. Use: `[<type>] <description>`
Valid Types:
* `[feat]` — For new features or components.
* `[fix]` — For bug fixes.
* `[deploy]` — Reserved for deployment commits.

### Deployment Protocol
**CRITICAL:** Only deploy when explicitly instructed by the user.
When authorized, execute:
1. `npm run build`
2. `git add -A && git commit -m "[deploy] <message>"`
3. `wrangler pages deploy dist --project-name=weed420 --branch=master`
4. Clean up old deployments: `wrangler pages deployment delete <id> --project-name=weed420 --force`
*Live Production URL:* https://weed420.pages.dev (custom domain: https://weed420x.com)

## 5. Standard Operating Procedures (SOPs)

### SOP: Fetch Latest Tour Dates from Google Sheets
The TourDates component fetches data client-side at runtime. To verify:
```bash
curl -s "https://docs.google.com/spreadsheets/d/10JV33dWWWoVUqHGb5DdUpmmg1TSdHEiccmxEezEZ_ws/gviz/tq?tqx=out:json&sheet=tourdates"
```
Endpoint URL is in `src/data/constants.ts` as `SITE.googleSheetBaseUrl`.

**Sheet Column Layout:**
| Col | Field | Description |
|-----|-------|-------------|
| A | date | Date string ("APR 25 2026") |
| B | venue | Venue name |
| C | city | City name |
| D | link | Ticket/event URL (optional) |
| E | hidden | Set to "yes" to hide the row |

Rows where column E equals "yes" are filtered out client-side. Dates from past years are also excluded.

### SOP: Scrape Bandcamp for New Releases & Cover Art
```bash
node scripts/fetch-bandcamp.mjs
```
1. Fetches `https://xweed420x.bandcamp.com/music` to find all album slugs
2. For each album, extracts title, release date, and cover art ID from embedded `data-tralbum` JSON
3. Downloads cover images (700px) to `public/images/albums/<slug>.jpg`
4. Skips already-downloaded covers
5. Prints discography entries for manual insertion

### SOP: Add a New Release to Discography
1. Run `node scripts/fetch-bandcamp.mjs` to get release data and cover art.
2. Add an entry to the `releases` array in `src/data/discography.ts`:
```typescript
{ title: 'Title', year: 'YYYY', section: '<section>', image: '/images/albums/<slug>.jpg', link: 'https://xweed420x.bandcamp.com/album/<slug>' }
```
3. Valid sections: `album` | `mixtape` | `djmix` | `live` | `ep` | `other`
4. Within each section, entries are sorted chronologically. Insert in correct position.

### SOP: Optimize Album Cover Images
When covers are too large, resize from the `public/images/albums` directory:
```bash
for img in *.jpg; do
  convert "$img" -resize 500x500\> -quality 75 -strip "$img"
done
```
Target: 500px max dimension, JPEG quality 75, stripped metadata. Images should be 25-135KB each.

## 6. Discography Structure
Releases are organized into sections, each sorted chronologically:

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
| Branch           | Description                             | URL                                          |
| ---------------- | --------------------------------------- | -------------------------------------------- |
| `master`         | Production (Cloudflare Pages)           | https://weed420.pages.dev                    |
| `master`         | Production (Custom Domain)              | https://weed420x.com                        |


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

## 9. Component Reference & Page Flow

### Page Assembly (index.astro)
Components are composed in this order inside `<Layout>`:
```
Navbar → main → Hero → AboutPreview → Press → MediaPlatforms → MediaGrid → TourDates → Footer
```
Each section has an `id` used for anchor navigation and fade-in animation delay staggering (`global.css` lines 45-51).

### 404 Page (`src/pages/404.astro`)
Custom 404 page matching the site design with a "Back home" link. All text must be in English to match the rest of the site.

### Navbar (`src/components/Navbar.astro`)
- **Purpose:** Fixed top navigation bar (z-50). Transparent by default, adds `bg-bg/95` backdrop after scrolling past 50px.
- **Content:** "weed420" brand link (left), nav links from `NAV_LINKS` (right, desktop-only), hamburger menu button (mobile).
- **JS behavior:**
  - Scroll listener toggles `bg-bg/95` on the nav element when `scrollY > 50`.
  - Click handler on `#menu-toggle` toggles `hidden` class on `#mobile-menu`.
- **Data:** Imports `NAV_LINKS` from `constants.ts` — anchor links to section IDs (`#bio`, `#press`, etc.).
- **Note:** The brand "weed420" text is always visible. There is no scroll-hide behavior.

### Hero (`src/components/Hero.astro`)
- **Purpose:** Full-screen hero section (`#home`, `h-screen`) with parallax background and scaling title.
- **Visual:** Background image (`caracas-portrait.jpg`) at 40% opacity with gradient overlays. "weed420" h1 centered with `mix-blend-difference`.
- **JS behavior:** Scroll-driven animation using `requestAnimationFrame` with a `ticking` guard:
  - `--parallax` CSS variable drives background `translateY` at 30% rate.
  - `--scale` CSS variable scales the h1 from 1x to 1.5x over one viewport scroll.
  - Scroll-hint arrow fades out (`opacity: 1 - progress * 1.5`).
- **No data imports** — all content is hardcoded.

### AboutPreview (`src/components/AboutPreview.astro`)
- **Purpose:** Biography section (`#bio`) with a carousel of 7 images.
- **Content:** Two-column layout (text left, carousel right on desktop). Descriptive paragraph about the collective.
- **JS behavior:** IIFE carousel cycling through 6 images (`/images/carousel/01.jpg` to `06.jpg`) every 6 seconds with fade transitions.
- **Data:** Carousel image paths are hardcoded in the component's frontmatter.

### Press (`src/components/Press.astro`)
- **Purpose:** Press quotes section (`#press`).
- **Content:** Grid of cards, each containing a Spanish quote with the source/outlet name below.
- **Bilingual system:** Each card is a `group`. The Spanish `quote` is visible by default. The English `quoteEn` (if present) appears on hover via `group-hover:opacity-100`. A "EN" badge is shown when a translation exists (`quoteEn` truthy check).
- **Empty state:** Shows "No press quotes available" when `PRESS` array is empty.
- **Data:** Imports `PRESS` from `constants.ts`.

### MediaPlatforms (`src/components/MediaPlatforms.astro`)
- **Purpose:** Streaming platform links section (`#music`).
- **Content:** Grid of clickable cards linking to external streaming services.
- **Icons:** SVG icons are imported inline as raw strings (e.g., `import bandcampSvg from '../assets/icons/bandcamp.svg?raw'`), then mapped to platform identifiers via a local `svgMap` object. The mapping is by `platform.name`, not `platform.icon`.
- **Data:** Imports `PLATFORMS` from `constants.ts`.

### MediaGrid (`src/components/MediaGrid.astro`)
- **Purpose:** Discography section (`#discography`).
- **Content:** Sections (Albums, Mixtapes, DJ Mixes, Live, EPs, Other) each with a grid of album cover cards linking to Bandcamp.
- **Animation:** Album cover cards have a `float` keyframe animation with staggered delays (`animation-delay-0`, `animation-delay-[2000ms]`, `animation-delay-[4000ms]`) — currently 3 delay slots for up to 3 albums per section.
- **Data:** Imports section arrays (`albums`, `mixtapes`, `djmixes`, `live`, `eps`, `others`) from `discography.ts`. Each release has: `title`, `year`, `image`, `link`, `section`.

### TourDates (`src/components/TourDates.astro`)
- **Purpose:** Tour dates section (`#tour`).
- **Content:** Initially empty container. All tour date rows are fetched and rendered client-side.
- **Data fetching:** Fetches from Google Sheets JSON endpoint (`SITE.googleSheetBaseUrl` in `constants.ts`). Parses the Google Visualization JSON format.
- **Filtering:** Excludes rows where hidden column = "yes" and dates from past years.
- **Empty state:** Shows "No upcoming dates" with placeholder text.
- **Error handling:** Logs fetch errors to console, shows "No upcoming dates" on failure.
- **Security:** Uses a `sanitize` function to strip HTML tags from external cell data before rendering.

### Footer (`src/components/Footer.astro`)
- **Purpose:** Contact/booking footer (`#booking`).
- **Content:** Contact email link, social media icon links (Instagram, YouTube), copyright line.
- **Icons:** Renders SVG icons using `iconDefs` from `icons.ts` — only `instagram` and `youtube` are defined and used (matching the `SOCIALS` array in `constants.ts`).
- **Data:** Imports `SOCIALS` (for social links) and `SITE` (for `contactEmail`) from `constants.ts`.

### Layout (`src/layouts/Layout.astro`)
- **Purpose:** HTML shell wrapping all pages.
- **Content:** `<head>` with charset, viewport, favicon, description meta, theme-color, title, canonical URL, robots `index,follow`. Loads `JetBrains Mono` via `@fontsource` imports in global.css. Preloads the hero background image. Applies global CSS (`global.css`).
- **SEO:** Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale`, `og:site_name`), Twitter Card (`summary_large_image`), JSON-LD `MusicGroup` structured data with `sameAs` links to all platforms and socials, `amor de encava` album subject.
- **OG Image:** Uses `/images/albums/amor-de-encava.jpg` for social sharing previews.
- **Props:** Accepts optional `title` and `description` with defaults (`weed420 — Official Site | Venezuelan Experimental Music Collective`).
- **Data:** Imports `SITE`, `PLATFORMS`, `SOCIALS` from `constants.ts`.

### Data Files Summary
| File | Exports | Used By |
|------|---------|---------|
| `constants.ts` | `SITE`, `PLATFORMS`, `SOCIALS`, `PRESS`, `NAV_LINKS` | Navbar, Press, MediaPlatforms, TourDates, Footer, Layout |
| `discography.ts` | `albums`, `mixtapes`, `djmixes`, `live`, `eps`, `others`, `Release`, `ReleaseSection` | MediaGrid |
| `icons.ts` | `iconDefs`, `IconName`, `IconDef` | Footer |

## 10. snip — Token-Saving CLI Proxy

`snip` is a CLI proxy that intercepts shell commands and condenses verbose
output to save context tokens. Always prefix shell commands with it:

```bash
snip git status
snip npm run build
snip wrangler pages deploy ...
```

### How It Works
- **Filter matches:** ~126 built-in YAML filters (git, npm, cargo, go, etc.).
  Output is condensed (e.g. `git status` → `"0 changes:"`).
- **No filter:** Prints `snip: no filter for "<cmd>", passing through` and
  passes raw output through unchanged. **This is not an error** — the command
  still executes and exit codes are preserved.
- **Piped commands** (e.g. `snip find ... | wc -l`) — the pipe is handled by
  the shell, not by snip.

### Behavior Reference
| Command | What to expect |
|---------|---------------|
| `snip git status` | Condensed summary like `"0 changes:"` or `"N changes:\n M file.ts"` |
| `snip git add -A && git commit ...` | Only final commit status shown |
| `snip npm run build` | `"ok"` on success |
| `snip npm run dev` | No filter → raw output |
| `snip wrangler pages deploy` | No filter → raw output passes through |
| `snip find ... \| wc -l` | snip handles `find`, shell handles pipe |

### Troubleshooting
- `"no filter for X, passing through"` — harmless stderr. Just proceed.
- To see what filters are available: `snip discover`
- Custom filters live at `~/.config/snip/filters/` (YAML files).
- More info: https://github.com/edouard-claude/snip

## 11. SEO & Performance Compliance

The site must comply with Google PageSpeed Insights and search-engine best
practices for Google Search approval.

### Requirements
- **Performance:** All `<img>` tags must have explicit `width` and `height`
  attributes to prevent Cumulative Layout Shift (CLS). Hero image uses
  `fetchpriority="high"`, all other images `loading="lazy"`. Fonts must be
  self-hosted (`@fontsource`), never loaded from Google Fonts CDN.
- **SEO:** Every page needs a unique `<title>` and `<meta name="description">`
  (≤160 chars). The `<html>` `lang` attribute must match the page's primary
  language. Canonical URL, `robots: index, follow`, Open Graph and Twitter
  Card tags, and JSON-LD structured data are required. `sitemap-index.xml`
  auto-generated on every build via `@astrojs/sitemap`.
- **Accessibility:** All images have descriptive `alt` text (empty `alt=""`
  only for decorative images). Color contrast meets WCAG AA (4.5:1 text,
  3:1 large text). Semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`).
  All interactive elements must be keyboard-navigable.
- **Mobile:** Responsive design tested at 320px–1024px. Touch targets ≥48×48px.
  No horizontal overflow at any viewport width.

### Verification
- Run PageSpeed Insights at user request: https://pagespeed.web.dev/
- Validate structured data: https://search.google.com/test/rich-results
- Use Lighthouse in Chrome DevTools during development
