# 🚀 GUÍA DE INSTALACIÓN — Pack Pymes · Iorana Digital
# Fecha: 2026 · Stack: Next.js + Tailwind + Supabase + n8n

---

## 📁 PASO 1 — COLOCAR LOS ARCHIVOS

Copia cada archivo en su ubicación exacta dentro de tu proyecto:

```
tu-proyecto/
├── app/
│   └── servicios/
│       └── pymes/
│           └── page.tsx          ← pega el contenido de PymesLanding-integration.tsx
├── components/
│   ├── PymesSection.tsx          ← copia tal cual
│   ├── PymesTrustBar.tsx         ← copia tal cual
│   ├── PymesProcess.tsx          ← copia tal cual
│   ├── PymesCases.tsx            ← copia tal cual
│   └── PymesAuthority.tsx        ← copia tal cual
└── supabase/
    └── migrations/
        └── 20260101_leads_pymes.sql  ← copia leads_pymes.sql aquí
```

### Opción B — Insertar en la Home (Index.tsx) en lugar de página nueva

Si prefieres que la sección aparezca en la home en vez de `/servicios/pymes`,
abre `app/Index.tsx` y añade esto entre `<ServicesSection />` y `<Metodologia />`:

```tsx
// Imports nuevos (añadir al inicio del archivo junto al resto)
import PymesSection   from "@/components/PymesSection";
import PymesTrustBar  from "@/components/PymesTrustBar";
import PymesProcess   from "@/components/PymesProcess";
import PymesCases     from "@/components/PymesCases";
import PymesAuthority from "@/components/PymesAuthority";

// En el JSX, dentro de <main>:
<div id="pymes">
  <PymesSection />
  <PymesTrustBar />
  <PymesProcess />
  <PymesCases />
  <PymesAuthority />
</div>
```

---

## 📦 PASO 2 — VERIFICAR DEPENDENCIAS

Estas librerías ya deberían estar en tu proyecto. Compruébalo con:

```bash
cat package.json | grep -E "framer-motion|lucide-react|next|tailwindcss"
```

Si falta alguna, instálala:

```bash
# framer-motion (usada en PymesCases)
npm install framer-motion

# lucide-react (iconos en PymesCases)
npm install lucide-react
```

---

## 🗄️ PASO 3 — CONFIGURAR SUPABASE

### 3a. Ejecutar el SQL

1. Ve a tu proyecto en https://supabase.com/dashboard
2. Menú lateral → **SQL Editor**
3. Crea una nueva query → pega el contenido de `leads_pymes.sql`
4. Haz clic en **Run**

Verás creadas:
- Tabla `leads_pymes` con RLS activado
- Función `anonimizar_lead()` (derecho al olvido RGPD)
- Trigger `on_new_lead_pyme` (notifica a n8n)
- Vista `resumen_leads_pymes` (dashboard)

### 3b. Variables de entorno

Abre tu archivo `.env.local` y asegúrate de tener:

```env
NEXT_PUBLIC_SUPABASE_URL=https://XXXXXXXX.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

Encuéntralos en Supabase → **Settings → API**.

### 3c. Conectar el formulario con Supabase

En `PymesSection.tsx` localiza la función `handleSubmit` y reemplázala:

```tsx
// Instala el cliente si no lo tienes:
// npm install @supabase/supabase-js

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const { error } = await supabase.from("leads_pymes").insert([
    {
      nombre:              formData.nombre,
      email:               formData.email,
      telefono:            formData.telefono || null,
      subproducto:         formData.subproducto,
      mensaje:             formData.mensaje || null,
      fuente:              "web-pymes",
      consentimiento_rgpd: true,
    },
  ]);
  if (!error) setSubmitted(true);
  else console.error("Error al guardar lead:", error.message);
};
```

---

## 🤖 PASO 4 — CONFIGURAR EL WEBHOOK N8N

### 4a. Crear el workflow en n8n

1. Abre tu instancia de n8n (Hetzner VPS o cloud)
2. **Nuevo workflow → Add node → Webhook**
3. Configura el nodo Webhook:
   - **HTTP Method:** POST
   - **Path:** `/leads-pymes`
   - **Response Mode:** Immediately
4. Copia la URL que genera n8n (ej: `https://tu-n8n.com/webhook/leads-pymes`)

### 4b. Actualizar la URL en el SQL

Vuelve al SQL Editor de Supabase y ejecuta:

```sql
-- Reemplaza la URL del webhook con la tuya real
CREATE OR REPLACE FUNCTION public.notificar_lead_n8n()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  webhook_url text := 'https://TU-N8N-REAL.com/webhook/leads-pymes';
  -- ... resto igual que en leads_pymes.sql
$$;
```

### 4c. Acciones sugeridas en el workflow n8n

Después del nodo Webhook, añade en cadena:

```
Webhook → 
  ├── Gmail: Notificación al equipo Iorana
  ├── WhatsApp Business: Mensaje al consultor asignado  
  └── (opcional) Airtable / Notion: Registro en CRM
```

---

## 🖼️ PASO 5 — ASSETS Y PERSONALIZACIÓN

### Logos en PymesTrustBar

Busca en el componente los bloques `div` con letras (G, S, N...) y sustitúyelos por imágenes reales:

```tsx
// Antes (placeholder):
<div style={{ background: `${item.color}18`, color: item.color }}>
  {item.icon}
</div>

// Después (logo real):
<img
  src={`/logos/${item.id}.svg`}   // ej: /logos/google-partner.svg
  alt={item.label}
  width={36}
  height={36}
  className="opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
/>
```

Guarda los logos SVG en `public/logos/`.

### Foto OG (redes sociales)

Crea una imagen `1200×630 px` y guárdala en:
```
public/og/pymes-pack.jpg
```

---

## 🔍 PASO 6 — SCHEMA Y METADATOS

Los schemas JSON-LD del archivo `pymes-metadata-schema.ts` ya están integrados
dentro de `PymesSection.tsx`. Si usas la ruta `/servicios/pymes/page.tsx`,
añade también el export `metadata` de ese archivo para activar el SEO completo.

Verifica que funciona con:
- **Google Rich Results Test:** https://search.google.com/test/rich-results
  → Pega la URL de tu página una vez desplegada
- **Schema Validator:** https://validator.schema.org
  → Pega el JSON-LD directamente

---

## ✅ PASO 7 — CHECKLIST FINAL ANTES DE PUBLICAR

```
□ Archivos .tsx copiados en /components
□ SQL ejecutado en Supabase sin errores
□ Variables NEXT_PUBLIC_SUPABASE_URL y ANON_KEY en .env.local
□ handleSubmit conectado a Supabase (Paso 3c)
□ URL del webhook n8n actualizada en el SQL (Paso 4b)
□ npm run build → sin errores TypeScript
□ Logos reales en /public/logos/ (o dejar placeholders temporalmente)
□ Imagen OG en /public/og/pymes-pack.jpg
□ Verificar Rich Results con Google
□ Comprobar en móvil (timeline vertical en PymesProcess)
□ Revisar formulario: envío → fila en tabla leads_pymes de Supabase
□ Revisar formulario: envío → notificación WhatsApp/Email vía n8n
```

---

## 🗑️ DESACTIVAR SECCIONES (fácil)

Para quitar cualquier bloque simplemente comenta su línea en `PymesLanding-integration.tsx`:

```tsx
<PymesSection />      {/* ← SIEMPRE activo (Hero + Subproductos + FAQ + Form) */}
{/* <PymesTrustBar /> */}    {/* ← Comentado = desactivado */}
<PymesProcess />
{/* <PymesCases /> */}       {/* ← Comentado = desactivado */}
<PymesAuthority />
```

---

## 🆘 PROBLEMAS FRECUENTES

| Síntoma | Causa probable | Solución |
|---|---|---|
| Error: `Module not found: framer-motion` | Librería no instalada | `npm install framer-motion` |
| Formulario no guarda en Supabase | RLS bloqueando | Verifica política `INSERT` para `anon` en Supabase → Auth → Policies |
| Webhook n8n no recibe datos | URL incorrecta en SQL | Re-ejecuta el `CREATE OR REPLACE FUNCTION` con la URL correcta |
| TypeScript error en `supabase.from()` | Tipos no generados | `npx supabase gen types typescript --project-id TU_ID > types/supabase.ts` |
| Marquee no se mueve | JS desactivado en preview | Funciona en producción; en Lovable.dev preview puede ser limitado |
| Build falla en Vercel | `.env.local` no subido | Añade las variables en Vercel → Settings → Environment Variables |
