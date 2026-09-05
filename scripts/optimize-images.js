const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  const rootDir = path.resolve(__dirname, '..');
  const publicDir = path.join(rootDir, 'public');
  const videosDir = path.join(publicDir, 'videos');

  console.log('[IMAGES] Starting image optimization with sharp...');

  // 1. Convert video posters (spec-01-poster & spec-02-poster) to WebP and optimized PNG
  for (const name of ['spec-01-poster', 'spec-02-poster']) {
    const pngPath = path.join(videosDir, `${name}.png`);
    const webpPath = path.join(videosDir, `${name}.webp`);

    if (fs.existsSync(pngPath)) {
      const origSize = fs.statSync(pngPath).size / 1024;
      
      // Generate WebP
      await sharp(pngPath)
        .webp({ quality: 82, effort: 6 })
        .toFile(webpPath);
      const webpSize = fs.statSync(webpPath).size / 1024;

      // Also optimize PNG fallback
      const optimizedPngBuffer = await sharp(pngPath)
        .png({ compressionLevel: 9, effort: 7, palette: true, quality: 85 })
        .toBuffer();
      fs.writeFileSync(pngPath, optimizedPngBuffer);
      const newPngSize = fs.statSync(pngPath).size / 1024;

      console.log(`[POSTER] ${name}: ${origSize.toFixed(1)} KB -> WebP: ${webpSize.toFixed(1)} KB (Saved ${(100 - (webpSize/origSize)*100).toFixed(1)}%), PNG: ${newPngSize.toFixed(1)} KB`);
    }
  }

  // 2. Optimize logo.png
  const logoPath = path.join(publicDir, 'logo.png');
  const logoWebp = path.join(publicDir, 'logo.webp');
  if (fs.existsSync(logoPath)) {
    const origSize = fs.statSync(logoPath).size / 1024;
    await sharp(logoPath)
      .webp({ quality: 90, effort: 6 })
      .toFile(logoWebp);
    const optimizedLogo = await sharp(logoPath)
      .png({ compressionLevel: 9, effort: 7 })
      .toBuffer();
    fs.writeFileSync(logoPath, optimizedLogo);
    const newSize = fs.statSync(logoPath).size / 1024;
    const webpSize = fs.statSync(logoWebp).size / 1024;
    console.log(`[LOGO] logo.png: ${origSize.toFixed(1)} KB -> PNG: ${newSize.toFixed(1)} KB, WebP: ${webpSize.toFixed(1)} KB`);
  }

  // 3. Optimize og-image.png
  const ogPath = path.join(publicDir, 'og-image.png');
  if (fs.existsSync(ogPath)) {
    const origSize = fs.statSync(ogPath).size / 1024;
    const optimizedOg = await sharp(ogPath)
      .png({ compressionLevel: 9, effort: 7 })
      .toBuffer();
    fs.writeFileSync(ogPath, optimizedOg);
    const newSize = fs.statSync(ogPath).size / 1024;
    console.log(`[OG-IMAGE] og-image.png: ${origSize.toFixed(1)} KB -> PNG: ${newSize.toFixed(1)} KB`);
  }

  // 4. Optimize apple-touch-icon.png
  const appleIconPath = path.join(publicDir, 'apple-touch-icon.png');
  if (fs.existsSync(appleIconPath)) {
    const origSize = fs.statSync(appleIconPath).size / 1024;
    const optimizedIcon = await sharp(appleIconPath)
      .png({ compressionLevel: 9, effort: 7 })
      .toBuffer();
    fs.writeFileSync(appleIconPath, optimizedIcon);
    const newSize = fs.statSync(appleIconPath).size / 1024;
    console.log(`[APPLE-TOUCH-ICON] apple-touch-icon.png: ${origSize.toFixed(1)} KB -> PNG: ${newSize.toFixed(1)} KB`);
  }

  console.log('[IMAGES] Optimization finished.');
}

run().catch(err => {
  console.error('[IMAGES ERROR]', err);
  process.exit(1);
});
