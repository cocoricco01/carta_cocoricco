const https = require('https');
const fs = require('fs');
const path = require('path');

const PRODUCTS_TO_GENERATE = [
  {
    filename: 'fresas-5oz.jpg',
    seed: 105,
    prompt: 'commercial gourmet food photography, 5 oz clear cup of fresh sliced red strawberries with sweet cream layers, whipped chantilly topping, red strawberry drizzle, dark elegant tropical food studio background, bokeh, 8k hyperrealistic product photo, award winning dessert photography'
  },
  {
    filename: 'fresas-8oz.jpg',
    seed: 208,
    prompt: 'commercial food photography, 8 oz medium clear plastic dessert cup filled with layers of juicy red strawberries, rich sweet cream, condensed milk drizzle and strawberry coulis, whipped cream swirls, tropical dark background, 8k realistic'
  },
  {
    filename: 'fresas-10oz.jpg',
    seed: 310,
    prompt: 'gourmet commercial dessert photography, 10 oz large clear cup of fresh strawberries with cream, loaded with rich chocolate fudge drizzle, brownie chunks, chocolate chips and whipped cream, studio lighting, hyperrealistic 8k'
  },
  {
    filename: 'fresas-12oz.jpg',
    seed: 412,
    prompt: 'ultra luxury food photography, 12 oz giant mega cup overflowing with fresh ripe strawberries, thick sweet cream, Nutella drizzle, brownie pieces, chocolate sprinkles and tall chantilly swirl, dark moody studio lighting, 8k commercial dessert photo'
  },
  {
    filename: 'helado-coco-bowl.jpg',
    seed: 512,
    prompt: 'commercial food photography, artisan coconut ice cream served inside a natural hollowed coconut shell bowl, topped with toasted coconut flakes and condensed milk drizzle, dark tropical palm leaves background, dramatic lighting, 8k hyperrealistic'
  },
  {
    filename: 'helado-coco-maracuya-bowl.jpg',
    seed: 612,
    prompt: 'gourmet food photography, artisanal ice cream served inside a natural half coconut bowl, generously bathed with glossy yellow passion fruit pulp with natural passion fruit seeds, dark elegant studio lighting, 8k macro food shot'
  },
  {
    filename: 'helado-copa-artesanal.jpg',
    seed: 708,
    prompt: 'commercial dessert photography, crystal glass sundae cup with two scoops of artisanal gourmet gelato ice cream, one strawberry and one vanilla mango, drizzled with chocolate fudge, crispy waffle wafer on side, elegant dark background, 8k'
  },
  {
    filename: 'paleta-maracuya-clean.jpg',
    seed: 806,
    prompt: 'commercial food photography, gourmet artisan ice pop popsicle of red strawberry and yellow passion fruit, split open showing a rich creamy gooey condensed milk liquid center, dark stone studio backdrop, fresh fruit slices around, 8k food photography'
  },
  {
    filename: 'paleta-fudge-clean.jpg',
    seed: 906,
    prompt: 'commercial food photography, gourmet handmade fruit ice pop popsicle filled with rich dark chocolate fudge liquid center, cocoa powder dusting, dark moody studio background, 8k photorealistic'
  },
  {
    filename: 'paleta-mango-clean.jpg',
    seed: 1006,
    prompt: 'commercial food photography, artisan tropical golden mango ice pop popsicle on wooden stick, natural fruit texture, water droplets, fresh mango slices in background, dark tropical studio lighting, 8k ultra realistic'
  },
  {
    filename: 'paleta-lucuma-clean.jpg',
    seed: 1106,
    prompt: 'commercial food photography, traditional Peruvian lucuma silk creamy gourmet ice pop popsicle on wooden stick, golden silky lucuma fruit color, smooth velvety texture, halved lucuma fruit in background, warm luxury studio lighting, 8k hyperrealistic'
  }
];

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    
    function makeRequest(targetUrl) {
      https.get(targetUrl, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          makeRequest(response.headers.location);
        } else if (response.statusCode === 200) {
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        } else {
          reject(new Error(`Status ${response.statusCode}`));
        }
      }).on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    }

    makeRequest(url);
  });
}

async function run() {
  console.log('--- GENERACIÓN DE IMÁGENES DE ALTA CALIDAD CON INTELIGENCIA ARTIFICIAL ---');
  
  for (const item of PRODUCTS_TO_GENERATE) {
    const targetPath = path.join('public', 'assets', item.filename);
    const encodedPrompt = encodeURIComponent(item.prompt);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=800&nologo=true&seed=${item.seed}&model=flux`;
    
    console.log(`> Generando con IA: ${item.filename}...`);
    try {
      await downloadImage(url, targetPath);
      const stats = fs.statSync(targetPath);
      console.log(`  ✓ Guardado: ${item.filename} (${(stats.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`  ✗ Error generando ${item.filename}:`, err.message);
    }
  }

  console.log('\n¡Todas las imágenes del catálogo han sido generadas profesionalmente con IA!');
}

run();
