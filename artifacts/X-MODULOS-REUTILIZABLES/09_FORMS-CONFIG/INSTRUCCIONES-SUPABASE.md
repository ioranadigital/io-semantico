# 🗄️ INSTRUCCIONES — Conectar formularios a Supabase
# Iorana Digital · 2026

---

## PASO 1 — Instalar el paquete Supabase

```bash
npm install @supabase/supabase-js
```

---

## PASO 2 — Crear el proyecto en Supabase

1. Ve a https://supabase.com y crea una cuenta si no tienes
2. Crea un nuevo proyecto (elige servidor en Europa — Frankfurt)
3. Espera ~2 minutos a que el proyecto arranque

---

## PASO 3 — Obtener las credenciales

1. En tu proyecto Supabase: **Settings → API**
2. Copia los valores de:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## PASO 4 — Configurar .env.local

Crea el archivo `.env.local` en la raíz de tu proyecto (junto a `package.json`):

```
NEXT_PUBLIC_SUPABASE_URL=https://XXXXXXXXXXXXXXXX.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ Nunca subas `.env.local` a Git — ya está en `.gitignore` por defecto en Next.js.

---

## PASO 5 — Ejecutar el SQL en Supabase

1. En Supabase: **SQL Editor → New query**
2. Pega el contenido de `supabase_leads.sql`
3. Haz clic en **Run**

Verás creados:
- Tabla `leads` con RLS activado
- Políticas: insert anónimo + select/update autenticado
- Vista `resumen_leads` para dashboard
- Función `anonimizar_lead()` para RGPD

---

## PASO 6 — Copiar los archivos al proyecto

| Archivo descargado | Destino en tu proyecto |
|---|---|
| `supabaseClient.ts` | `lib/supabaseClient.ts` ← CREAR carpeta lib/ si no existe |
| `ServiceContactForm.tsx` | `components/ServiceContactForm.tsx` ← NUEVO |
| `ServicePageTemplate-supabase.tsx` | `components/ServicePageTemplate.tsx` ← REEMPLAZAR |
| `PymesContactForm-supabase.tsx` | `components/PymesContactForm.tsx` ← REEMPLAZAR |
| `ContactSection-supabase.tsx` | `components/ContactSection.tsx` ← REEMPLAZAR |

### PymesSection — cambio quirúrgico

Abre `components/PymesSection.tsx` y haz 2 cambios:

**1. Añade el import** (junto al resto de imports al inicio):
```tsx
import { supabase } from "@/lib/supabaseClient";
```

**2. Reemplaza el handleSubmit** con el contenido de `PymesSection-supabase.tsx`

---

## PASO 7 — Reiniciar el servidor

```bash
# Ctrl+C para parar
npm run dev
```

⚠️ Next.js solo lee `.env.local` al arrancar — siempre reinicia tras añadir variables.

---

## PASO 8 — Verificar que funciona

1. Rellena y envía un formulario en local
2. Ve a Supabase → **Table Editor → leads**
3. Deberías ver una fila nueva con `fuente` = 'servicios' / 'pymes' / 'home'

---

## PASO 9 — Deploy en Vercel

Las variables de entorno NO se suben con el código. Añádelas en Vercel:

1. Vercel Dashboard → tu proyecto → **Settings → Environment Variables**
2. Añade las dos variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Marca los entornos: Production + Preview + Development
4. Haz redeploy: `git push` o **Deployments → Redeploy**

---

## Cómo ver los leads recibidos

### Opción A — Supabase Dashboard
Supabase → Table Editor → tabla `leads`

### Opción B — Vista resumen por fuente
Supabase → SQL Editor:
```sql
select * from resumen_leads;
```

### Opción C — Leads de hoy
```sql
select nombre, email, servicio, fuente, created_at
from leads
where created_at > now() - interval '24 hours'
order by created_at desc;
```

---

## ❓ Problemas frecuentes

| Síntoma | Causa | Solución |
|---|---|---|
| Error "supabaseUrl is required" | `.env.local` no existe o variables vacías | Crear el archivo y reiniciar servidor |
| El formulario no guarda | RLS bloqueando | Verificar política `insert_publico` en Supabase → Auth → Policies |
| Variables undefined en Vercel | No configuradas en Vercel | Añadirlas en Settings → Environment Variables |
| TypeScript error en `supabase.from()` | Tipos no generados | No es bloqueante — funciona igualmente |
