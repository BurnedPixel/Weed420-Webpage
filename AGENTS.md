# Weed420 EPK - Astro Project

Electronic Press Kit for Weed420, Venezuelan experimental collective (formed 2021). Known for: epic collage, hexd, deconstructed club, cloud rap, reggaetón. "Amor de encava" debuted #2 on RateYourMusic 2025.

## Tech Stack
- **Framework:** Astro + Tailwind CSS
- **Tour Dates:** Google Sheets fetch (client-side or serverless)

## Dev Commands
```bash
npm create astro@latest    # choose "Empty" template
npx astro add tailwind
npm run dev
```

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
  layouts/      # Layout.astro
  pages/        # index.astro
  lib/          # tourdates.js (Google Sheets fetch)
public/images/  # hero, portraits, album art
```

## Google Sheets Integration
Sheet columns: `date`, `venue`, `city`, `ticket_link`. Publish as "Anyone with link can view" → get share URL → use as public fetch.

## Key URLs (verify before use)
- Bandcamp: https://xweed420x.bandcamp.com/
- RateYourMusic: https://rateyourmusic.com/release/album/weed420/amor-de-encava/

## Before Building
- [ ] Confirm Google Sheet share link or create template
- [ ] Collect images: hero (1920x1080), portrait (4:5), 4 album art squares