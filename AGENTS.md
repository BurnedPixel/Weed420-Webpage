# Weed420 EPK - Astro Project

**Version:** 1.0.0 | **Last Updated:** 2026-04-24

Electronic Press Kit for Weed420, Venezuelan experimental collective (formed 2021). Known for: epic collage, hexd, deconstructed club, cloud rap, reggaetón. "Amor de encava" debuted #2 on RateYourMusic 2025.

## Tech Stack
- **Framework:** Astro + Tailwind CSS
- **Tour Dates:** Google Sheets fetch (client-side)
- **Hosting:** Cloudflare Pages

## Dev Commands
| Command | Description |
|---------|-----------|
| `npm run dev` | Start dev server (localhost:4321) |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Preview production build |

## Design System
| Element | Value |
|---------|-------|
| Background | `#0a0a0a` (near black) |
| Text | `#f5f5f5` (off-white) |
| Accent | `#dc2626` (deep red) |
| Font | Inter / Montserrat |

## Architecture
```
src/
  components/   # Navbar, Hero, AboutPreview, MediaPlatforms, MediaGrid, TourDates, Footer
  layouts/     # Layout.astro
  pages/      # index.astro
  styles/     # global.css
public/images/
  caracas-portrait.jpg   # Hero background
  hero1-4.jpg            # MediaGrid placeholders
  albums/                # Album covers (future)
```

## Deployment (Cloudflare Pages)
```bash
# Deploy ONLY when explicitly directed by user
wrangler pages deploy dist --project-name=weed420-epk
```

> **Important:** Do NOT auto-deploy after every change. Only deploy when user explicitly requests it.

**Live URL:** https://master.weed420-epk.pages.dev

## Image Guidelines
- Max file size: 25MB (Cloudflare limit)
- Hero: 1920x1080, optimized
- Album art: 600x600 square
- Place in `public/images/albums/` for discography

## Google Sheets (Tour Dates)
Sheet columns: `date`, `venue`, `city`, `ticket_link`, `is_past`

Date formats accepted:
- `APR 08 2025` (single)
- `APR 08-13 2025` (range)

**Sheet URL:** Configured in `src/components/TourDates.astro` (line 2)

## Key URLs
| Platform | URL |
|----------|-----|
| Bandcamp | https://xweed420x.bandcamp.com/ |
| RateYourMusic | https://rateyourmusic.com/release/album/weed420/amor-de-encava/ |

## Commit Convention
Format: `[<type>] <description>`

Types:
- `[fix]` - Bug fixes
- `[feat]` - New features
- `[deploy]` - Deployment
- `[assets]` - Image updates

Example: `[deploy] Fix navbar scroll transition`

## Pending Tasks
- [ ] Add album covers to `public/images/albums/`
- [ ] Verify streaming links

## Upcoming Tour Dates (2025-2026)
| Date | Venue | City |
|------|-------|------|
| OCT 03 2025 | Out.Fest | Barreiro PT |
| OCT 09-11 2025 | Unsound | Polonia PL |
| OCT 29-31 2025 | C2C | Torino IT |
| NOV 01 2025 | Le Guess Who | Utrecht NL |
| NOV 04-08 2025 | Le Guess Who | Utrecht NL |
| NOV 06 2025 | MIRA Festival | Barcelona ES |
| NOV 11 2025 | ALICE | Copenhagen DK |