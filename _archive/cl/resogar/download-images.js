const playwright = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const URLs = [
  'https://resogar.holidayfuture.com/listings/494123',
  'https://resogar.holidayfuture.com/listings/494124',
  'https://resogar.holidayfuture.com/listings/494325'
];

const IMG_DIR = path.join(__dirname, 'img');
const REPORT_FILE = path.join(__dirname, 'image-download-report.txt');
const MIN_SIZE_KB = 10;
const ALLOWED_FORMATS = ['.webp', '.png', '.jpg', '.jpeg'];

let report = '=== REPORTE DE DESCARGA DE IMÁGENES ===\n\n';
let totalImages = 0;

// Crear carpeta img si no existe
if (!fs.existsSync(IMG_DIR)) {
  fs.mkdirSync(IMG_DIR, { recursive: true });
  console.log(`✅ Carpeta creada: ${IMG_DIR}`);
}

// Descargar archivo
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 5000
    }, (response) => {
      let data = Buffer.alloc(0);

      response.on('data', (chunk) => {
        data = Buffer.concat([data, chunk]);
      });

      response.on('end', () => {
        const sizeKb = data.length / 1024;

        // Filtrar por tamaño
        if (sizeKb < MIN_SIZE_KB) {
          reject({ reason: `Archivo muy pequeño (${sizeKb.toFixed(2)}kb < ${MIN_SIZE_KB}kb)` });
        } else {
          fs.writeFileSync(filePath, data);
          resolve({ size: sizeKb.toFixed(2), bytes: data.length });
        }
      });
    }).on('error', reject);
  });
}

// Extraer nombre base de URL sin query params
function getImageName(url) {
  try {
    const parsed = new URL(url);
    let filename = parsed.pathname.split('/').pop() || 'image';

    // Limpiar query params
    if (filename.includes('?')) {
      filename = filename.split('?')[0];
    }

    // Si no tiene extensión o es data URL, generar nombre
    if (!filename.includes('.') || url.startsWith('data:')) {
      return null;
    }

    return filename;
  } catch {
    return null;
  }
}

async function processUrl(url) {
  console.log(`\n📍 Procesando: ${url}`);

  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();

  let imageUrls = new Set();
  let imagesFound = 0;
  let imagesDownloaded = 0;
  let domainName = new URL(url).hostname.replace(/\./g, '_');

  try {
    // Navegar y esperar carga
    await page.goto(url, { waitUntil: 'networkidle' });
    console.log('⏳ Página cargada');

    // Esperar 2 segundos para lazy loading
    await page.waitForTimeout(2000);

    // Extraer todas las imágenes posibles
    const allImages = await page.evaluate(() => {
      const urls = new Set();

      // IMG tags: src, data-src, srcset
      document.querySelectorAll('img').forEach(el => {
        if (el.src) urls.add(el.src);
        if (el.dataset.src) urls.add(el.dataset.src);
        if (el.srcset) {
          el.srcset.split(',').forEach(src => {
            urls.add(src.trim().split(' ')[0]);
          });
        }
      });

      // PICTURE sources
      document.querySelectorAll('picture source').forEach(el => {
        if (el.srcset) {
          el.srcset.split(',').forEach(src => {
            urls.add(src.trim().split(' ')[0]);
          });
        }
      });

      // Background images en CSS
      document.querySelectorAll('[style*="background-image"]').forEach(el => {
        const style = el.getAttribute('style');
        const match = style.match(/url\(['"]?([^'")\]]+)['"]?\)/);
        if (match) urls.add(match[1]);
      });

      // Atributos data-* con URLs
      document.querySelectorAll('[data-image], [data-src], [data-background]').forEach(el => {
        const dataImage = el.dataset.image || el.dataset.src || el.dataset.background;
        if (dataImage && (dataImage.includes('http') || dataImage.startsWith('/'))) {
          urls.add(dataImage);
        }
      });

      return Array.from(urls);
    });

    allImages.forEach(url => {
      if (url && url.trim()) {
        imageUrls.add(url);
      }
    });

    imagesFound = imageUrls.size;
    console.log(`🖼️  Imágenes encontradas: ${imagesFound}`);

    // Descargar imágenes
    let counter = 0;
    for (const imgUrl of imageUrls) {
      if (!imgUrl || !imgUrl.trim()) continue;

      try {
        // Resolver URL relativa
        let fullUrl = imgUrl.trim();
        if (fullUrl.startsWith('/')) {
          const baseUrl = new URL(url);
          fullUrl = `${baseUrl.protocol}//${baseUrl.host}${fullUrl}`;
        } else if (!fullUrl.startsWith('http')) {
          // URLs relativas sin /
          const baseUrl = new URL(url);
          fullUrl = `${baseUrl.protocol}//${baseUrl.host}/${fullUrl}`;
        }

        const imageName = getImageName(fullUrl);
        if (!imageName) continue;

        const ext = path.extname(imageName).toLowerCase();

        // Filtrar por formato
        if (!ALLOWED_FORMATS.includes(ext)) {
          continue;
        }

        counter++;
        const filename = `${domainName}_${counter}_${imageName}`;
        const filePath = path.join(IMG_DIR, filename);

        const result = await downloadFile(fullUrl, filePath);
        imagesDownloaded++;

        console.log(`  ✅ ${filename} (${result.size}kb)`);

      } catch (error) {
        // Log silencioso para errores
      }
    }

  } catch (error) {
    console.error(`❌ Error en ${url}:`, error.message);
  } finally {
    await browser.close();
  }

  report += `\n📍 ${url}\n`;
  report += `   Imágenes encontradas: ${imagesFound}\n`;
  report += `   Imágenes descargadas: ${imagesDownloaded}\n`;

  totalImages += imagesDownloaded;
  return imagesDownloaded;
}

async function main() {
  console.log('🚀 Iniciando descarga de imágenes...\n');
  console.log(`Criterios:\n  - Formatos: ${ALLOWED_FORMATS.join(', ')}\n  - Tamaño mínimo: ${MIN_SIZE_KB}kb\n`);

  for (const url of URLs) {
    try {
      await processUrl(url);
    } catch (error) {
      console.error(`Error fatal en ${url}:`, error);
    }
  }

  // Generar reporte
  report += `\n${'='.repeat(40)}\n`;
  report += `TOTAL IMÁGENES DESCARGADAS: ${totalImages}\n`;
  report += `Directorio: ${IMG_DIR}\n`;
  report += `Fecha: ${new Date().toLocaleString()}\n`;

  fs.writeFileSync(REPORT_FILE, report);
  console.log(`\n✅ Reporte guardado: ${REPORT_FILE}`);
  console.log(report);
}

main().catch(console.error);
