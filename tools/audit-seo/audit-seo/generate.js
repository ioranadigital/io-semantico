import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const [,, dataFile] = process.argv;

if (!dataFile) {
  console.error('Uso: node generate.js <ruta-al-json>');
  console.error('Ejemplo: node generate.js data/ejemplo-cliente.json');
  process.exit(1);
}

const dataPath = resolve(dataFile);
if (!existsSync(dataPath)) {
  console.error(`No se encontró el archivo: ${dataPath}`);
  process.exit(1);
}

const data = JSON.parse(readFileSync(dataPath, 'utf8'));
const templatePath = join(__dirname, 'templates', 'informe-seo.md');
let template = readFileSync(templatePath, 'utf8');

for (const [key, value] of Object.entries(data)) {
  template = template.replaceAll(`{{${key}}}`, value);
}

const slug = data.cliente_nombre
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const outputDir = join(__dirname, 'informes', slug);
mkdirSync(outputDir, { recursive: true });

const outputFile = join(outputDir, `${data.fecha}-informe.md`);
writeFileSync(outputFile, template, 'utf8');

console.log(`Informe generado: ${outputFile}`);
