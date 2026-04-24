# Weed420 EPK - Astro Project

**Version:** 1.1.0 | **Last Updated:** 2026-04-24

Electronic Press Kit for Weed420, Venezuelan experimental collective (formed 2021). Known for: epic collage, hexd, deconstructed club, cloud rap, reggaetón. "Amor de encava" debuted #2 on RateYourMusic 2025.

## Tech Stack
- **Framework:** Astro + Tailwind CSS
- **Tour Dates:** Google Sheets fetch (client-side)
- **Album Covers:** Bandcamp CDN (direct URL)

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
  layouts/      # Layout.astro
  pages/       # index.astro
  styles/      # global.css
```

## Deployment (Cloudflare Pages)
```bash
npm run build
git add -A && git commit -m "[deploy] Your message"
wrangler pages deploy dist --project-name=weed420-epk
```

**Live URL:** https://master.weed420-epk.pages.dev

## Refresh Routine (for updates)

### 1. Update Tour Dates from Google Sheets
```bash
curl -s "https://docs.google.com/spreadsheets/d/10JV33dWWWoVUqHGb5DdUpmmg1TSdHEiccmxEezEZ_ws/gviz/tq?tqx=out:json&sheet=tourdates"
```

### 2. Check for New Bandcamp Releases
```bash
# Find new album slugs and scrape cover URLs
for album in $(curl -s "https://xweed420x.bandcamp.com/music" | grep -oP 'album/[a-z0-9-]+' | sort -u); do
  slug=$(echo "$album" | sed 's/album\///')
  url="https://xweed420x.bandcamp.com/$album"
  cover=$(curl -s "$url" | grep -oP 'image" content="https://f4\.bcbits\.com/img/[^"]+' | head -1 | sed 's/"//g' | sed 's/image" content="//')
  echo "$slug -> $cover"
done
```

### 3. Add New Album to MediaGrid
In `src/components/MediaGrid.astro`, add entry:
```javascript
{ title: 'Album Name', year: 'year', featured: false, image: 'https://f4.bcbits.com/img/COVER_ID_10.jpg', link: 'https://xweed420x.bandcamp.com/album/slug' },
```

### 4. Then build and deploy
```bash
npm run build
git add -A && git commit -m "[feat] Add new Bandcamp release"
# Deploy when ready
```

## Key URLs
| Platform | URL |
|----------|-----|
| Bandcamp | https://xweed420x.bandcamp.com/ |
| Spotify | https://open.spotify.com/artist/5UM6QbXYllW5ByF0umKJt1 |
| RateYourMusic | https://rateyourmusic.com/release/album/weed420/amor-de-encava/ |

## Commit Convention
Format: `[<type>] <description>`

Types:
- `[fix]` - Bug fixes
- `[feat]` - New features
- `[deploy]` - Deployment

## Development Workflow

1. **Always commit after every change** - Run `git add -A && git commit -m "message"` after each edit
2. **Only deploy when explicitly requested** - Wait for user to say "deploy" or similar before running wrangler

## Pending Tasks
- [ ] Verify social media links in Footer.astro