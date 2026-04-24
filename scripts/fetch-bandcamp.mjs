#!/usr/bin/env node
// scripts/fetch-bandcamp.mjs
// Fetches all releases from weed420's Bandcamp, downloads missing covers,
// and prints release data for discography.ts

import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { writeFileSync } from 'fs';

const BANDCAMP = 'https://xweed420x.bandcamp.com';
const COVER_DIR = 'public/images/albums';
const COVER_SIZE = '16'; // 700px, good balance of quality vs size

async function fetchText(url) {
  const res = await fetch(url);
  return res.text();
}

function extractSlugs(html) {
  const slugs = [...html.matchAll(/\/album\/([a-z0-9-]+)/g)]
    .map(m => m[1])
    .filter((v, i, a) => a.indexOf(v) === i);
  return slugs;
}

function extractTralbumJson(html) {
  const match = html.match(/data-tralbum="({[^"]+})"/);
  if (!match) return null;
  return JSON.parse(match[1].replace(/&quot;/g, '"'));
}

async function getRelease(slug) {
  const url = `${BANDCAMP}/album/${slug}`;
  const html = await fetchText(url);
  const data = extractTralbumJson(html);
  if (!data?.current) return null;

  const c = data.current;
  const releaseDate = c.release_date ? new Date(c.release_date) : null;
  const year = releaseDate ? releaseDate.getFullYear().toString() : '?';
  const artId = c.art_id;
  const coverUrl = artId
    ? `https://f4.bcbits.com/img/a${artId}_${COVER_SIZE}.jpg`
    : null;

  return {
    title: c.title?.replace(/"/g, "'") ?? slug,
    slug,
    year,
    artId,
    coverUrl,
    releaseDate: releaseDate?.toISOString().split('T')[0] ?? '?',
  };
}

async function downloadCover(release) {
  if (!release.coverUrl) return;
  const dest = `${COVER_DIR}/${release.slug}.jpg`;
  if (existsSync(dest)) {
    console.log(`  [skip] ${release.slug}.jpg already exists`);
    return;
  }
  const res = await fetch(release.coverUrl);
  if (!res.ok) {
    console.error(`  [fail] ${release.slug}: HTTP ${res.status}`);
    return;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  mkdirSync(COVER_DIR, { recursive: true });
  writeFileSync(dest, buf);
  console.log(`  [done] ${release.slug}.jpg (${buf.length} bytes)`);
}

async function main() {
  console.log('Fetching Bandcamp music page...');
  const html = await fetchText(`${BANDCAMP}/music`);
  const slugs = extractSlugs(html);
  console.log(`Found ${slugs.length} albums: ${slugs.join(', ')}\n`);

  const releases = [];
  for (const slug of slugs) {
    console.log(`Processing /album/${slug}...`);
    const release = await getRelease(slug);
    if (release) releases.push(release);
  }

  console.log('\n--- Downloading covers ---');
  for (const r of releases) {
    await downloadCover(r);
  }

  console.log('\n--- Release data (paste into discography.ts) ---');
  console.log('// section: album | mixtape | djmix | live | ep | other');
  for (const r of releases) {
    const image = `/images/albums/${r.slug}.jpg`;
    const link = `${BANDCAMP}/album/${r.slug}`;
    console.log(
      `{ title: '${r.title}', year: '${r.year}', section: '???', image: '${image}', link: '${link}' },`
    );
  }
}

main().catch(console.error);
