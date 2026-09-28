import sharp from 'sharp';

async function cropPortraits() {
  // Jane (The Bride) from MAD_1748.webp (4800 x 3200)
  // Jane is on the right side. Let's inspect where she is.
  // We want a 4:5 ratio portrait crop (e.g. 1600 x 2000 or 1800 x 2250)
  // In MAD_1748, Jane is around x: 2300 to 4200, y: 800 to 3200.
  await sharp('public/images/MAD_1748.webp')
    .extract({
      left: 2350,
      top: 1000,
      width: 1760,
      height: 2200,
    })
    .webp({ quality: 90 })
    .toFile('public/images/bride-jane.webp');

  console.log('Saved bride-jane.webp');

  // Jerish (The Groom) from MAD_1664.webp (4640 x 6960)
  // Jerish's head and shoulders are around x: 2100 to 3900, y: 1300 to 3600
  // Or let's see if 1800 x 2250 centered on Jerish works:
  await sharp('public/images/MAD_1664.webp')
    .extract({
      left: 2000,
      top: 1350,
      width: 2000,
      height: 2500,
    })
    .webp({ quality: 90 })
    .toFile('public/images/groom-jerish.webp');

  console.log('Saved groom-jerish.webp');
}

cropPortraits().catch(console.error);
