import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const PUBLIC_DIR = path.join(process.cwd(), 'public', 'images');
const OUTPUT_PLACEHOLDERS = path.join(PUBLIC_DIR, 'placeholders');

const EXCLUDED_FILE = 'weed420_boursedecommerce©raphaelmassart-2.jpg';

const PLACEHOLDER_WIDTH = 20;
const PLACEHOLDER_QUALITY = 15;

const IMAGE_DIRS = ['carousel', ''];

async function processImage(inputPath, outputDir) {
  const baseName = path.basename(inputPath, path.extname(inputPath));
  const placeholderPath = path.join(outputDir, `${baseName}.lqip.webp`);

  if (fs.existsSync(placeholderPath)) {
    console.log(`  Skipping ${baseName} (placeholder exists)`);
    return baseName;
  }

  try {
    await sharp(inputPath)
      .resize(PLACEHOLDER_WIDTH, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: PLACEHOLDER_QUALITY })
      .toFile(placeholderPath);

    const stats = await fs.promises.stat(placeholderPath);
    console.log(`  Created ${baseName}.lqip.webp (${(stats.size / 1024).toFixed(1)}KB)`);
    return baseName;
  } catch (err) {
    console.error(`  Error processing ${baseName}:`, err.message);
    return null;
  }
}

async function main() {
  console.log('\n🎨 Image Optimization Pipeline\n');

  if (!fs.existsSync(OUTPUT_PLACEHOLDERS)) {
    fs.mkdirSync(OUTPUT_PLACEHOLDERS, { recursive: true });
  }

  let totalProcessed = 0;

  for (const dir of IMAGE_DIRS) {
    const sourceDir = dir ? path.join(PUBLIC_DIR, dir) : PUBLIC_DIR;
    if (!fs.existsSync(sourceDir)) continue;

    const files = fs.readdirSync(sourceDir).filter(f => {
      return f !== EXCLUDED_FILE && (f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));
    });

    if (files.length === 0) continue;

    console.log(`Processing ${files.length} images from images/${dir || 'root'}/...`);

    for (const file of files) {
      const inputPath = path.join(sourceDir, file);
      const baseName = await processImage(inputPath, OUTPUT_PLACEHOLDERS);
      if (baseName) totalProcessed++;
    }
  }

  console.log(`\n✅ Generated ${totalProcessed} LQIP placeholders`);
  console.log('ℹ️ Use ProgressiveImage component with placeholder prop for blur-up effect\n');
}

main();