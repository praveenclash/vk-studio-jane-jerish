import sharp from 'sharp';

async function cropJerishTests() {
  // Test 1: Jerish from MAD_1748.webp (white shirt, matching Jane's photo)
  await sharp('public/images/MAD_1748.webp')
    .extract({
      left: 700,
      top: 900,
      width: 1760,
      height: 2200,
    })
    .webp({ quality: 90 })
    .toFile('public/images/groom-jerish-white.webp');

  // Test 2: Jerish from MAD_1822.webp (navy blue shirt, pine woods)
  await sharp('public/images/MAD_1822.webp')
    .extract({
      left: 1400,
      top: 1400,
      width: 1600,
      height: 2000,
    })
    .webp({ quality: 90 })
    .toFile('public/images/groom-jerish-navy.webp');

  console.log('Saved test crops');
}

cropJerishTests().catch(console.error);
