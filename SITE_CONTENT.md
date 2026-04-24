---
tags: [epk, documentation]
---

# Weed420 EPK - Site Content Guide

> This file documents all content needed to finalize the website. Replace placeholders with real assets.

---

## 1. Artist Identity

| Field | Value |
|-------|-------|
| Name | weed420 |
| Formed | 2021 |
| Origin | Venezuela |
| Genres | epic collage, hexd, deconstructed club, cloud rap, reggaetón |
| Key Achievement | #2 RateYourMusic Top Albums 2025 |

---

## 2. Media Assets Needed

### Hero Background
- **File:** `public/images/hero.jpg`
- **Specs:** 1920x1080px, dark/moody
- **Current:** Unsplash placeholder

### Artist Portrait
- **File:** `public/images/portrait.jpg`
- **Specs:** 4:5 aspect ratio, 800x1000px
- **Current:** Unsplash placeholder

### Album Art (4 releases)
| Release | File | Link |
|---------|------|------|
| Amor de encava (2025) | `public/images/amor-de-encava.jpg` | https://xweed420x.bandcamp.com/album/amor-de-encava |
| EVILCHANGA (2024) | `public/images/evilchanga.jpg` | https://xweed420x.bandcamp.com/album/evilchanga |
| la malasangrura (2023) | `public/images/la-malasangrura.jpg` | https://xweed420x.bandcamp.com/album/la-malasangrura |
| RVRT 3 (2023) | `public/images/rvrt-3.jpg` | https://xweed420x.bandcamp.com/album/rvrt-3 |

---

## 3. External Links

### Streaming Platforms
| Platform | URL |
|----------|-----|
| Bandcamp | https://xweed420x.bandcamp.com/ |
| Spotify | https://open.spotify.com/artist/YOUR_SPOTIFY_ID |
| SoundCloud | https://soundcloud.com/weed420 |
| Apple Music | YOUR_APPLE_MUSIC_LINK |

### Social Media
| Platform | URL |
|----------|-----|
| Instagram | https://instagram.com/YOUR_HANDLE |
| Twitter/X | https://twitter.com/YOUR_HANDLE |
| YouTube | https://youtube.com/@YOUR_CHANNEL |

### RateYourMusic
- https://rateyourmusic.com/release/album/weed420/amor-de-encava/

---

## 4. Tour Dates (Google Sheets)

**Sheet Structure:**
| Column | Example |
|--------|---------|
| date | MAR 15, 2026 |
| venue | Club XYZ |
| city | Caracas, VE |
| ticket_link | https://example.com/tickets |

**Instructions:**
1. Create Google Sheet with columns: `date`, `venue`, `city`, `ticket_link`
2. Rename tab to `tourdates`
3. Share as "Anyone with link can view"
4. Copy URL to `src/components/TourDates.astro` line 3

---

## 5. Booking & Contact

| Field | Value |
|-------|-------|
| Email | booking@weed420.com |
| Management | YOUR_MANAGEMENT_EMAIL |
| Press | YOUR_PRESS_EMAIL |

**Files to update:** `src/components/Footer.astro` (line 6)

---

## 6. About Text Templates

### Short Bio (50 words)
```
Weed420 is a Venezuelan experimental collective formed in 2021. 
They blend epic collage, hexd, deconstructed club, cloud rap, and 
reggaetón into dense audio experiences. Their debut album "Amor de 
encava" debuted #2 on RateYourMusic's Top Albums of 2025.
```

### Medium Bio (150 words)
```
Weed420 is a Venezuelan experimental electronic music collective 
formed in 2021. They produce epic collage, hexd, deconstructed 
club, cloud rap, and reggaetón—drawing from the sound of 
Venezuelan public transport "encavas" and internet culture.

Their debut album "Amor de encava" (2025) debuted at #2 on 
RateYourMusic's Top Albums of 2025. Previous releases include 
EVILCHANGA (2024), la malasangrura (2023), and RVRT 3 (2023).

The collective emerged from artists sharing heavily processed 
remixes of Venezuelan trap and urban music through digital 
platforms. Their sound blends noise, salsa, trap, and soundscape 
into a moving audio experience reflecting younger generations 
in Venezuela.
```

### Full Press Kit Bio
> [Request from PR/management]

---

## 7. Video Content

| Title | Platform | URL |
|-------|----------|-----|
| Music Video 1 | YouTube | YOUR_LINK |
| Live Session | YouTube | YOUR_LINK |
| Interview | YouTube | YOUR_LINK |

---

## 8. Checklist

- [ ] Hero image (1920x1080)
- [ ] Portrait image (800x1000, 4:5)
- [ ] 4 album cover images (square, 600x600)
- [ ] Update Bandcamp/Spotify/SoundCloud links
- [ ] Update social media links
- [ ] Configure Google Sheet for tour dates
- [ ] Update booking email
- [ ] Test all links
- [ ] Verify mobile responsive

---

## 9. Component Reference

| Component | File | Placeholder Tag |
|-----------|------|----------------|
| Navbar | `src/components/Navbar.astro` | - |
| Hero | `src/components/Hero.astro` | Unsplash image |
| About | `src/components/AboutPreview.astro` | Unsplash portrait |
| Media Platforms | `src/components/MediaPlatforms.astro` | hardcoded URLs |
| Media Grid | `src/components/MediaGrid.astro` | Unsplash images |
| Tour Dates | `src/components/TourDates.astro` | placeholder message |
| Footer | `src/components/Footer.astro` | placeholder email |

---

*Last updated: 2026-04-24*