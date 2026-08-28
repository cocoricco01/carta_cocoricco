const sharp = require('sharp');

async function processAll() {
  console.log('Ajustando recortes de precisión para los 4 vasitos de fresas...');

  // 1. Fresas 5 oz (Mini vaso con chispas de colores en la parte inferior derecha)
  await sharp('public/assets/banner-fresas.jpg')
    .extract({ left: 415, top: 700, width: 95, height: 120 })
    .resize(600, 600, { fit: 'cover' })
    .modulate({ brightness: 1.08, saturation: 1.25 })
    .sharpen()
    .toFile('public/assets/fresas-5oz.jpg');
  console.log('✓ 5oz recortado con precisión');

  // 2. Fresas 8 oz (Vaso con fresas rojas en la parte superior derecha)
  await sharp('public/assets/banner-fresas.jpg')
    .extract({ left: 515, top: 300, width: 100, height: 200 })
    .resize(600, 600, { fit: 'cover' })
    .modulate({ brightness: 1.05, saturation: 1.2 })
    .sharpen()
    .toFile('public/assets/fresas-8oz.jpg');
  console.log('✓ 8oz recortado con precisión');

  // 3. Fresas 10 oz (Vaso con abundante crema chantilly en la parte superior izquierda)
  await sharp('public/assets/banner-fresas.jpg')
    .extract({ left: 310, top: 280, width: 140, height: 230 })
    .resize(600, 600, { fit: 'cover' })
    .modulate({ brightness: 1.06, saturation: 1.2 })
    .sharpen()
    .toFile('public/assets/fresas-10oz.jpg');
  console.log('✓ 10oz recortado con precisión');

  // 4. Fresas 12 oz (Vaso supremo con chocolate y toppings en la parte inferior izquierda)
  await sharp('public/assets/banner-fresas.jpg')
    .extract({ left: 320, top: 640, width: 95, height: 140 })
    .resize(600, 600, { fit: 'cover' })
    .modulate({ brightness: 1.08, saturation: 1.25 })
    .sharpen()
    .toFile('public/assets/fresas-12oz.jpg');
  console.log('✓ 12oz recortado con precisión');

  console.log('¡Recortes de vasitos completados con éxito!');
}

processAll().catch(console.error);
