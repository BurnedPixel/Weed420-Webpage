# SITE CONTENT TEMPLATE - Weed420 EPK

> Fill in the values below to finalize the site. Code blocks show which files to update.

---

## Artist Information

```javascript
// src/components/Hero.astro (line 10-18)
// Title: "weed" + "420" styled separately

// src/components/AboutPreview.astro (line 19-24)
// Bio short/long paragraphs
```

| Field | Value |
|-------|-------|
| Artist Name | weed420 |
| Formed | 2021 |
| Origin | Venezuela |
| Genres | epic collage, hexd, deconstructed club, cloud rap, reggaetón |
| Key Achievement | #2 RateYourMusic 2025 (Amor de encava) |

---

## External Links

| Platform   | URL                                                    | Update In                             |
| ---------- | ------------------------------------------------------ | ------------------------------------- |
| Bandcamp   | https://xweed420x.bandcamp.com/                        | `src/components/MediaPlatforms.astro` |
| Spotify    | https://open.spotify.com/artist/5UM6QbXYllW5ByF0umKJt1 | `src/components/MediaPlatforms.astro` |
| SoundCloud | https://soundcloud.com/weed420                         | `src/components/MediaPlatforms.astro` |
| Instagram  | https://www.instagram.com/weedcuatroscientosveinte/    | `src/components/Footer.astro`         |
| YouTube    | https://youtube.com/@weedcuatrocientosveinte           | `src/components/Footer.astro`         |

**MediaGrid album links:**
- `src/components/MediaGrid.astro` - Links to Bandcamp pages

---

## Contact Information

```javascript
// src/components/Footer.astro (line 6)
const contactEmail = 'booking@YOUR_DOMAIN.com';
```

| Field | Value |
|-------|-------|
| Booking | booking@YOUR_DOMAIN.com |
| Press | press@YOUR_DOMAIN.com |
| Management | mgmt@YOUR_DOMAIN.com |

---

## Images Required

Place in `public/images/`:

| File | Description | Used In |
|------|------------|--------|
| `caracas-portrait.jpg` | Hero background (1920x1080, optimized) | Hero |
| `albums/amor-de-encava.jpg` | Album art 2025 (600x600) | MediaGrid |
| `albums/evilchanga.jpg` | Album art 2024 (600x600) | MediaGrid |
| `albums/la-malasangrura.jpg` | Album art 2023 (600x600) | MediaGrid |
| `albums/rvrt-3.jpg` | Album art 2023 (600x600) | MediaGrid |

**Image specs:**
- Max size: 25MB per file (Cloudflare Pages limit)
- Recommended: <5MB each
- Formats: JPG, PNG, WebP

---

## Tour Dates (Google Sheets)

```csv
// Google Sheet columns: date, venue, city
// date format: "OCT 03 2025" or "OCT 03-05 2025" for ranges
```

**Sheet URL:** Configured in `src/components/TourDates.astro` (line 2)

**Deploy local to test:**
```bash
npm run dev
```

**Deploy to production:**
```bash
wrangler pages deploy dist --project-name=weed420-epk
```

---

## Checklist

- [ ] Update Social Media links in Footer.astro
- [ ] Update email in Footer.astro  
- [ ] Add album covers to public/images/albums/
- [ ] Verify all external links work
- [ ] Test on localhost:4321
- [ ] Deploy to production

---

*Last Updated: 2026-04-24*