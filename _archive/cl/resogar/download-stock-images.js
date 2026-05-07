const https = require('https');
const fs = require('fs');
const path = require('path');

const IMG_DIR = path.join(__dirname, 'img');
const REPORT_FILE = path.join(__dirname, 'image-download-report.txt');

// URLs de imágenes de stock de Unsplash (uso libre)
const STOCK_IMAGES = [
  // Apartment interiors - living room
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1484154218962-a1dbb652214e?w=800&h=600&fit=crop',

  // Bedrooms
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1540932239986-a128078baf37?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',

  // Kitchens
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556437370-69b3ee5fbba9?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556518776-a94fcdd36f85?w=800&h=600&fit=crop',

  // Bathrooms
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop',

  // Exterior/Views
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1512207736139-aeb6a65eee65?w=800&h=600&fit=crop'
];

let report = '=== REPORTE DE DESCARGA DE IMÁGENES DE STOCK ===\n\n';
let downloadedCount = 0;
let failedCount = 0;

// Crear carpeta img si no existe
if (!fs.existsSync(IMG_DIR)) {
  fs.mkdirSync(IMG_DIR, { recursive: true });
  console.log(`✅ Carpeta creada: ${IMG_DIR}`);
}

function downloadFile(url, filename, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, { timeout: 5000 }, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      let data = Buffer.alloc(0);

      response.on('data', (chunk) => {
        data = Buffer.concat([data, chunk]);
      });

      response.on('end', () => {
        const sizeKb = (data.length / 1024).toFixed(2);

        if (data.length < 10 * 1024) {
          reject(new Error(`Archivo muy pequeño: ${sizeKb}kb`));
        } else {
          fs.writeFileSync(filepath, data);
          resolve({ size: sizeKb, filename });
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('🚀 Descargando imágenes de stock...\n');

  for (let i = 0; i < STOCK_IMAGES.length; i++) {
    try {
      const url = STOCK_IMAGES[i];
      const filename = `unsplash_${i + 1}.jpg`;
      const filepath = path.join(IMG_DIR, filename);

      await downloadFile(url, filename, filepath);
      downloadedCount++;
      console.log(`✅ ${filename} descargada`);

    } catch (error) {
      failedCount++;
      console.error(`❌ Error en imagen ${i + 1}: ${error.message}`);
    }
  }

  // Generar reporte
  report += `📍 Unsplash (Stock Images)\n`;
  report += `   Imágenes descargadas: ${downloadedCount}\n`;
  report += `   Errores: ${failedCount}\n\n`;
  report += `${'='.repeat(50)}\n`;
  report += `TOTAL: ${downloadedCount} imágenes\n`;
  report += `Directorio: ${IMG_DIR}\n`;
  report += `Fecha: ${new Date().toLocaleString()}\n`;

  fs.writeFileSync(REPORT_FILE, report);
  console.log(`\n✅ Reporte guardado: ${REPORT_FILE}`);
  console.log(report);
}

main().catch(console.error);
