# Google Maps Setup

## Obtener API Key

1. Ir a https://console.cloud.google.com
2. Crear nuevo proyecto (o usar existente)
3. **Habilitarr APIs:**
   - Google Maps JavaScript API
   - Maps Embedding API
   - Google Maps Platform
4. **Crear credenciales:**
   - Ir a **Credentials** → **Create Credentials** → **API Key**
   - Copiar la API Key

## Restringir la API Key (Recomendado)

1. En Credentials, click en tu API Key
2. **Application restrictions:**
   - Seleccionar "HTTP referrers"
   - Agregar: `http://localhost:3000/*` y `https://tudominio.com/*`
3. **API restrictions:**
   - Seleccionar "Google Maps JavaScript API"
   - Guardar

## Configurar en la aplicación

1. Abrir `components/ApartmentsMap.tsx`
2. Encontrar línea: `googleMapsApiKey="AIzaSyDummyKeyForNow"`
3. Reemplazar con tu API Key:
   ```typescript
   googleMapsApiKey="tu_api_key_aqui"
   ```

O, mejor aún, agregar a `.env.local`:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
```

Luego actualizar el componente:
```typescript
googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
```

## Costo

- **Free tier:** $200/mes de crédito gratuito
- Más de $200: se te cobrará
- **Recomendación:** Configurar límites de cuota en Cloud Console

## Status

⏳ **En desarrollo:** Usando placeholder API Key
✅ **Listo:** Una vez configures tu API Key real, el mapa funcionará completamente
