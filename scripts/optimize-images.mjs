import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imagesDir = 'public/images';

async function optimizeAll() {
  const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.webp') || f.endsWith('.png'));

  console.log(`Checking ${files.length} images...`);

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const originalBuffer = fs.readFileSync(filePath);
    const sizeMB = (originalBuffer.length / (1024 * 1024)).toFixed(2);

    // Only optimize large files (> 350KB)
    if (originalBuffer.length > 350 * 1024) {
      console.log(`Optimizing ${file} (${sizeMB} MB)...`);
      try {
        const metadata = await sharp(originalBuffer).metadata();
        const isLandscape = (metadata.width || 0) > (metadata.height || 0);

        let pipeline = sharp(originalBuffer);
        if (isLandscape) {
          pipeline = pipeline.resize({ width: 1400, withoutEnlargement: true });
        } else {
          pipeline = pipeline.resize({ width: 900, withoutEnlargement: true });
        }

        const optimizedBuffer = await pipeline
          .webp({ quality: 78, effort: 5 })
          .toBuffer();

        fs.writeFileSync(filePath, optimizedBuffer);
        const newSizeKB = (optimizedBuffer.length / 1024).toFixed(1);
        console.log(`✓ ${file}: ${sizeMB} MB -> ${newSizeKB} KB (saved ${(100 - (optimizedBuffer.length / originalBuffer.length) * 100).toFixed(0)}%)`);
      } catch (err) {
        console.error(`Error optimizing ${file}:`, err.message);
      }
    } else {
      console.log(`- ${file} already small: ${(originalBuffer.length / 1024).toFixed(1)} KB`);
    }
  }

  console.log('All image optimization finished successfully!');
}

optimizeAll().catch(console.error);
