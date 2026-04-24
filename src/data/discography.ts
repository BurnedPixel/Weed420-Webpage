export type ReleaseSection = 'album' | 'mixtape' | 'djmix' | 'live' | 'ep' | 'other';

export interface Release {
  title: string;
  year: string;
  section: ReleaseSection;
  image: string;
  link: string;
}

const releases: Release[] = [
  { title: 'amor de encava', year: '2025', section: 'album', image: '/images/albums/amor-de-encava.jpg', link: 'https://xweed420x.bandcamp.com/album/amor-de-encava' },
  { title: 'malandreo conceptual', year: '2024', section: 'mixtape', image: '/images/albums/malandreo-conceptual.jpg', link: 'https://xweed420x.bandcamp.com/album/malandreo-conceptual' },
  { title: '"Estoy viviendo"', year: '2026', section: 'mixtape', image: '/images/albums/estoy-viviendo.jpg', link: 'https://xweed420x.bandcamp.com/album/estoy-viviendo' },
  { title: 'RVRT 3', year: '2023', section: 'djmix', image: '/images/albums/rvrt-3.jpg', link: 'https://xweed420x.bandcamp.com/album/rvrt-3' },
  { title: 'Miren miren guayo... [NTS]', year: '2025', section: 'djmix', image: '/images/albums/miren-miren-guayo-nts.jpg', link: 'https://xweed420x.bandcamp.com/album/miren-miren-guayo-nts' },
  { title: 'Fotos varias [NTS]', year: '2025', section: 'djmix', image: '/images/albums/fotos-varias-nts.jpg', link: 'https://xweed420x.bandcamp.com/album/fotos-varias-nts' },
  { title: 'Dedicado a [NTS]', year: '2025', section: 'djmix', image: '/images/albums/dedicado-a-nts.jpg', link: 'https://xweed420x.bandcamp.com/album/dedicado-a-nts' },
  { title: 'Esto no es un show', year: '2025', section: 'live', image: '/images/albums/esto-no-es-un-show.jpg', link: 'https://xweed420x.bandcamp.com/album/esto-no-es-un-show' },
  { title: 'EVILCHANGA', year: '2024', section: 'ep', image: '/images/albums/evilchanga.jpg', link: 'https://xweed420x.bandcamp.com/album/evilchanga' },
  { title: 'la malasangrura (2023)', year: '2024', section: 'other', image: '/images/albums/la-malasangrura-2023.jpg', link: 'https://xweed420x.bandcamp.com/album/la-malasangrura-2023' },
  { title: 'lo que puedo hacer para mejorar es hacer plata', year: '2025', section: 'other', image: '/images/albums/lo-que-puedo-hacer.jpg', link: 'https://xweed420x.bandcamp.com/album/lo-que-puedo-hacer-para-mejorar-es-hacer-plata' },
  { title: 'psp', year: '2025', section: 'other', image: '/images/albums/psp.jpg', link: 'https://xweed420x.bandcamp.com/album/psp' },
];

export const bySection = (section: ReleaseSection) => releases.filter(r => r.section === section);

export const albums = bySection('album');
export const mixtapes = bySection('mixtape');
export const djmixes = bySection('djmix');
export const live = bySection('live');
export const eps = bySection('ep');
export const others = bySection('other');
