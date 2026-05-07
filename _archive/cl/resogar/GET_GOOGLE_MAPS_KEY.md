# Obtener Google Maps API Key en 2 minutos

## Paso 1: Crear/Usar Google Cloud Project

1. Ve a: https://console.cloud.google.com/
2. Si no tienes cuenta: Crear una (es gratis)
3. Crear nuevo proyecto: "resogar"

## Paso 2: Habilitar API

1. **Search bar** → Busca "Maps JavaScript API"
2. Click en "Google Maps JavaScript API"
3. Botón **ENABLE** (azul)
4. Espera 30 segundos

## Paso 3: Crear API Key

1. Ir a **Credentials** (izquierda)
2. **+ CREATE CREDENTIALS** → **API Key**
3. Copiar la key (ej: `AIzaSy...`)

## Paso 4: Configurar para localhost (Recomendado)

1. En Credentials, click en tu API Key
2. **Application restrictions:**
   - Tipo: "HTTP referrers (web sites)"
   - URLs: Agregar estas dos:
     - `http://localhost:3000/*`
     - `http://127.0.0.1:3000/*`
3. **API restrictions:**
   - "Google Maps JavaScript API"
4. **SAVE**

Listo. Tu key es válida solo en localhost (segura).

## Paso 5: Pegar en .env.local

Tu `.env.local` debería verse:

```env
NEXT_PUBLIC_SUPABASE_URL=https://zvehtloitnuglyjtxwye.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy_tuapikeyrealaqui
```

---

## ⚠️ IMPORTANTE

- **Nunca** commits tu API Key al git
- `.env.local` ya está en `.gitignore` ✅
- Antes de deploy, crear key con dominio real

## Costo

✅ Primeros $200/mes gratis
- La mayoría de proyectos pequeños: gratis
- Si pasas $200: se detiene (no se cobra sin tu consentimiento)

---

**Tiempo total:** 2 minutos

¿Ya tienes la key? Pégamela aquí 👇
