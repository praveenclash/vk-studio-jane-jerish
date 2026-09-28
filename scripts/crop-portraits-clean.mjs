import sharp from 'sharp';

async function cropJerishPerfect() {
  // Crop Jerish from MAD_1822.webp without any sleeve on the left:
  // Image is 3200 x 4800
  await sharp('public/images/MAD_1822.webp')
    .extract({
      left: 1550,
      top: 1150,
      width: 1550,
      height: 1938,
    })
    .resize(1200, 1500)
    .webp({ quality: 92 })
    .toFile('public/images/groom-jerish.webp');

  // Also optimize bride-jane.webp to clean 1200x1500 (4:5 ratio)
  await sharp('public/images/MAD_1748.webp')
    .extract({
      left: 2350,
      top: 950,
      width: 1760,
      height: 2200,
    })
    .resize(1200, 1500)
    .webp({ quality: 92 })
    .toFile('public/images/bride-jane.webp');

  console.log('Successfully saved high-res 4:5 portraits!');
}

cropJerishPerfect().catch(console.error);
