export interface Release {
  title: string;
  year: string;
  featured: boolean;
  image: string;
  link: string;
}

const releases: Release[] = [
  { title: 'amor de encava', year: '2025', featured: true, image: '/images/albums/amor-de-encava.jpg', link: 'https://xweed420x.bandcamp.com/album/amor-de-encava' },
  { title: 'Estoy viviendo', year: '2026', featured: true, image: '/images/albums/estoy-viviendo.jpg', link: 'https://xweed420x.bandcamp.com/album/estoy-viviendo' },
  { title: 'EVILCHANGA', year: '2024', featured: true, image: '/images/albums/evilchanga.jpg', link: 'https://xweed420x.bandcamp.com/album/evilchanga' },
  { title: 'RVRT 3', year: '2023', featured: false, image: '/images/albums/rvrt-3.jpg', link: 'https://xweed420x.bandcamp.com/album/rvrt-3' },
  { title: 'psp', year: '2025', featured: false, image: '/images/albums/psp.jpg', link: 'https://xweed420x.bandcamp.com/album/psp' },
  { title: 'Esto no es un show', year: '2025', featured: false, image: '/images/albums/esto-no-es-un-show.jpg', link: 'https://xweed420x.bandcamp.com/album/esto-no-es-un-show' },
  { title: 'malandreo conceptual', year: '2024', featured: false, image: '/images/albums/malandreo-conceptual.jpg', link: 'https://xweed420x.bandcamp.com/album/malandreo-conceptual' },
  { title: 'Dedicado a [NTS]', year: '2025', featured: false, image: '/images/albums/dedicado-a-nts.jpg', link: 'https://xweed420x.bandcamp.com/album/dedicado-a-nts' },
  { title: 'Fotos varias [NTS]', year: '2025', featured: false, image: '/images/albums/fotos-varias-nts.jpg', link: 'https://xweed420x.bandcamp.com/album/fotos-varias-nts' },
  { title: 'Miren miren guayo... [NTS]', year: '2025', featured: false, image: '/images/albums/miren-miren-guayo-nts.jpg', link: 'https://xweed420x.bandcamp.com/album/miren-miren-guayo-nts' },
  { title: 'lo que puedo hacer para mejorar es hacer plata', year: '2025', featured: false, image: '/images/albums/lo-que-puedo-hacer.jpg', link: 'https://xweed420x.bandcamp.com/album/lo-que-puedo-hacer-para-mejorar-es-hacer-plata' },
];

export const featured = releases.filter(r => r.featured);
export const secondary = releases.filter(r => !r.featured);
