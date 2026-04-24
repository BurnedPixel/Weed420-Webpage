export const SITE = {
  name: 'weed420',
  contactEmail: 'booking@weed420.com',
  googleSheetBaseUrl: 'https://docs.google.com/spreadsheets/d/10JV33dWWWoVUqHGb5DdUpmmg1TSdHEiccmxEezEZ_ws',
} as const;

export const PLATFORMS = [
  { name: 'Bandcamp', url: 'https://xweed420x.bandcamp.com/', icon: 'bandcamp' as const },
  { name: 'Spotify', url: 'https://open.spotify.com/artist/5UM6QbXYllW5ByF0umKJt1', icon: 'spotify' as const },
  { name: 'SoundCloud', url: 'https://soundcloud.com/weed420', icon: 'soundcloud' as const },
];

export const SOCIALS = [
  { name: 'Instagram', url: 'https://instagram.com/weed420', icon: 'instagram' as const },
  { name: 'YouTube', url: 'https://youtube.com/@weed420', icon: 'youtube' as const },
];

export const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#bio', label: 'Bio' },
  { href: '#music', label: 'Music' },
  { href: '#discography', label: 'Releases' },
  { href: '#tour', label: 'Tour' },
  { href: '#booking', label: 'Booking' },
];
