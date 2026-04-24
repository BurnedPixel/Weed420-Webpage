export interface Release {
  title: string;
  year: string;
  featured: boolean;
  image: string;
  link: string;
}

export const releases: Release[] = [
  { title: 'amor de encava', year: '2025', featured: true, image: 'https://f4.bcbits.com/img/a3738143786_10.jpg', link: 'https://xweed420x.bandcamp.com/album/amor-de-encava' },
  { title: 'Estoy viviendo', year: '2026', featured: true, image: 'https://f4.bcbits.com/img/a0393875533_10.jpg', link: 'https://xweed420x.bandcamp.com/album/estoy-viviendo' },
  { title: 'EVILCHANGA', year: '2024', featured: true, image: 'https://f4.bcbits.com/img/a1504100412_10.jpg', link: 'https://xweed420x.bandcamp.com/album/evilchanga' },
  { title: 'RVRT 3', year: '2023', featured: false, image: 'https://f4.bcbits.com/img/a2313237300_10.jpg', link: 'https://xweed420x.bandcamp.com/album/rvrt-3' },
  { title: 'psp', year: '2025', featured: false, image: 'https://f4.bcbits.com/img/a3607935047_10.jpg', link: 'https://xweed420x.bandcamp.com/album/psp' },
  { title: 'Esto no es un show', year: '2025', featured: false, image: 'https://f4.bcbits.com/img/a3358853056_10.jpg', link: 'https://xweed420x.bandcamp.com/album/esto-no-es-un-show' },
  { title: 'malandreo conceptual', year: '2024', featured: false, image: 'https://f4.bcbits.com/img/a1564477606_10.jpg', link: 'https://xweed420x.bandcamp.com/album/malandreo-conceptual' },
  { title: 'Dedicado a [NTS]', year: '2025', featured: false, image: 'https://f4.bcbits.com/img/a1697042337_10.jpg', link: 'https://xweed420x.bandcamp.com/album/dedicado-a-nts' },
  { title: 'Fotos varias [NTS]', year: '2025', featured: false, image: 'https://f4.bcbits.com/img/a0081488326_10.jpg', link: 'https://xweed420x.bandcamp.com/album/fotos-varias-nts' },
  { title: 'Miren miren guayo... [NTS]', year: '2025', featured: false, image: 'https://f4.bcbits.com/img/a1354823548_10.jpg', link: 'https://xweed420x.bandcamp.com/album/miren-miren-guayo-nts' },
  { title: 'lo que puedo hacer para mejorar es hacer plata', year: '2025', featured: false, image: 'https://f4.bcbits.com/img/a4270762328_10.jpg', link: 'https://xweed420x.bandcamp.com/album/lo-que-puedo-hacer-para-mejorar-es-hacer-plata' },
];

export const featured = releases.filter(r => r.featured);
export const secondary = releases.filter(r => !r.featured);
