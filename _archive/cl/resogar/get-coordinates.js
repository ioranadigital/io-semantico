const https = require('https');

const addresses = [
  {
    name: "Lujoso Apartamento Boutique",
    address: "Calle Varillas, 19 1ºD, Salamanca, España"
  },
  {
    name: "Apartamento de Lujo en el Centro Histórico",
    address: "Calle Varillas, 17 1º D, Salamanca, España"
  },
  {
    name: "Lujo en el Centro, Apartamentos Varillas",
    address: "Calle Varillas, 17, Salamanca, España"
  }
];

function geocode(address) {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?address=${encodedAddress}&format=json`;

    https.get(url, {
      headers: { 'User-Agent': 'Resogar-App' },
      timeout: 5000
    }, (response) => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        try {
          const results = JSON.parse(data);
          if (results.length > 0) {
            const { lat, lon } = results[0];
            resolve({ lat: parseFloat(lat), lng: parseFloat(lon) });
          } else {
            reject(new Error('No results found'));
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('🗺️  Geocodificando direcciones...\n');

  const results = [];

  for (let i = 0; i < addresses.length; i++) {
    try {
      console.log(`⏳ ${addresses[i].name}...`);
      const coords = await geocode(addresses[i].address);
      results.push({
        index: i,
        name: addresses[i].name,
        address: addresses[i].address,
        lat: coords.lat,
        lng: coords.lng
      });
      console.log(`  ✅ lat: ${coords.lat}, lng: ${coords.lng}\n`);
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}\n`);
    }
  }

  // Generar código TypeScript
  console.log('\n=== COPIA ESTO EN ApartmentsMap.tsx (línea 24) ===\n');

  console.log('const apartmentPositions: { [key: string]: { lat: number; lng: number } } = {');
  results.forEach(result => {
    console.log(`  ${result.index}: { lat: ${result.lat}, lng: ${result.lng} }, // ${result.name}`);
  });
  console.log('};');

  // Centro del mapa (promedio)
  if (results.length === 3) {
    const centerLat = (results[0].lat + results[1].lat + results[2].lat) / 3;
    const centerLng = (results[0].lng + results[1].lng + results[2].lng) / 3;

    console.log('\n=== COPIA ESTO EN ApartmentsMap.tsx (línea 15) ===\n');
    console.log(`const salamancaCenter = { lat: ${centerLat}, lng: ${centerLng} };`);
  }
}

main().catch(console.error);
