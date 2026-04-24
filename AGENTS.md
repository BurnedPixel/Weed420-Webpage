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
  * Album Covers: Direct image URLs from Bandcamp CDN.

### Directory Structure
Ensure all new components and logic follow this established structure:
```text
src/
  ├── components/   # Navbar, Hero, AboutPreview, MediaPlatforms, MediaGrid, TourDates, Footer
  ├── layouts/      # Layout.astro
  ├── pages/        # index.astro
  └── styles/       # global.css
```

## 3. Design System
Apply these exact values when constructing or modifying Tailwind classes.
* **Background:** `#0a0a0a` (Near black)
* **Text:** `#f5f5f5` (Off-white)
* **Accent:** `#dc2626` (Deep red)
* **Typography:** Primary `Inter`, Secondary `Montserrat`

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
3. `wrangler pages deploy dist --project-name=weed420-epk`
*Live Production URL:* https://master.weed420-epk.pages.dev

## 5. Standard Operating Procedures (SOPs)

### SOP: Update Tour Dates
When asked to refresh tour dates, fetch the latest JSON payload from Google Sheets:
```bash
curl -s "[https://docs.google.com/spreadsheets/d/10JV33dWWWoVUqHGb5DdUpmmg1TSdHEiccmxEezEZ_ws/gviz/tq?tqx=out:json&sheet=tourdates](https://docs.google.com/spreadsheets/d/10JV33dWWWoVUqHGb5DdUpmmg1TSdHEiccmxEezEZ_ws/gviz/tq?tqx=out:json&sheet=tourdates)"
```

### SOP: Add New Bandcamp Release
When a new release is dropped, follow this exact routine to update the site:
1. Scrape the Bandcamp page for the new album slug, cover URL, and release date:
```bash
for album in $(curl -s "https://xweed420x.bandcamp.com/music" | grep -oP 'album/[a-z0-9-]+' | sort -u); do
  slug=$(echo "$album" | sed 's/album\///')
  url="https://xweed420x.bandcamp.com/$album"
  cover=$(curl -s "$url" | grep -oP 'image" content="https://f4\.bcbits\.com/img/[^"]+' | head -1 | sed 's/"//g' | sed 's/image" content="//')
  year=$(curl -s "$url" | grep -oP 'released [A-Za-z]+ \d+, \d{4}' | head -1 | grep -oP '\d{4}')
  echo "$slug -> $year -> $cover"
done
```
2. Update `src/components/MediaGrid.astro` by injecting the new entry object:
```javascript
{ title: 'Album Name', year: '<YEAR>', featured: false, image: '<SCRAPED_COVER_URL>', link: 'https://xweed420x.bandcamp.com/album/<SLUG>' }
```
3. Run `npm run build` to verify the integration.
4. Commit: `git add -A && git commit -m "[feat] Add new Bandcamp release"`

## 6. Branch & Deployment Context

### Branches
| Branch | Description | URL |
|--------|-------------|-----|
| `master` | Original rigid/blocky design | https://master.weed420-epk.pages.dev |
| `design/organic` | Organic floating design with animations | https://design-organic.weed420-epk.pages.dev |

### Current Discography
- 3 Featured Albums: amor de encava (2025), Estoy viviendo (2026), EVILCHANGA (2024)
- 8 EPs/Singles: RVRT 3, psp, Esto no es un show, malandreo conceptual, Dedicado a [NTS], Fotos varias [NTS], Miren miren guayo... [NTS], lo que puedo hacer para mejorar es hacer plata
 * **Platform URLs:**
   * Bandcamp: `https://xweed420x.bandcamp.com/`
   * Spotify: `https://open.spotify.com/artist/5UM6QbXYllW5ByF0umKJt1`
   * SoundCloud: `https://soundcloud.com/alejania`
   * Apple Music: `https://music.apple.com/us/artist/weed420/1702350628`
   * Deezer: `https://www.deezer.com/artist/225759075`
   * Tidal: `https://tidal.com/artist/41371367`
   * YouTube Music: `https://www.youtube.com/@weedcuatrocientosveinte`
 * **Social URLs:**
   * Instagram: `https://www.instagram.com/weedcuatroscientosveinte/`
   * YouTube: `https://youtube.com/@weedcuatrocientosveinte`