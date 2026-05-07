# 🚀 START HERE — Configurar Supabase en 5 min

## TL;DR

1. **Supabase:** https://supabase.com → New Project → `resogar-prod`
2. **SQL Editor:** Copiar/pegar `supabase-setup-complete.sql` y ejecutar
3. **Credenciales:** Settings → API → copiar URL + Anon Key
4. **`.env.local`:** Pegar credenciales
5. **Terminal:** `npm run dev` → Ir a http://localhost:3000

**Resultado esperado:** 3 apartamentos en la página Home.

---

## Instrucciones Detalladas

### PASO 1: Crear proyecto (2 min)

- Ir a https://supabase.com
- "New Project"
- Nombre: `resogar-prod`
- Database Password: Guardar (será la única vez que lo veas)
- Region: Elige la más cercana a España (Frankfurt o Portugal)
- Click "Create new project"
- **Espera 2-3 minutos mientras Supabase inicializa**

### PASO 2: Ejecutar SQL (1 min)

- Una vez cargado Supabase dashboard
- Sidebar izquierda → "SQL Editor"
- "New Query"
- Copiar TODO de: `supabase-setup-complete.sql` (está en este repo)
- Pegar en el editor
- Ejecutar (Ctrl+Enter o botón azul "Run")
- Esperar confirmación: "Apartamentos creados: 3"

### PASO 3: Obtener credenciales (1 min)

- En Supabase dashboard (arriba a la izquierda)
- Click en **Settings** (⚙️)
- Click en **API** en sidebar
- Copiar estos dos valores:
  - `Project URL` (ej: https://xxxxx.supabase.co)
  - `Anon public` (key largo que empieza con eyJ...)

### PASO 4: Configurar .env.local (1 min)

- Abrir: `E:/git/cl/resogar/.env.local`
- Reemplazar ESTOS dos valores:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- Guardar archivo

⚠️ **NO tocar Stripe, lo hacemos después**

### PASO 5: Iniciar dev server (1 min)

```bash
cd E:/git/cl/resogar
npm run dev
```

Ir a: http://localhost:3000

**¿Ves 3 apartamentos en la página?** → ✅ ¡LISTO!

---

## 🆘 Troubleshooting

### "No veo apartamentos en la página"
- Abre F12 (Developer Tools)
- Pestaña "Console"
- ¿Hay errores rojos? Copiar y compartir

### ".env.local no se aplica"
- Reinicia `npm run dev`
- Cierra el navegador completamente
- Limpia cache: Ctrl+Shift+Delete

### "Error de conexión a Supabase"
- Verifica que los valores de .env.local no tienen espacios extra
- Verifica que la URL es exacta (sin slash al final)

### "Supabase tarda mucho en cargar"
- Es normal, primera vez tarda 3-5 minutos
- Si después de 10 min sigue, crear nuevo proyecto

---

## 📚 Documentos de Referencia

- `SUPABASE_CONFIG_GUIDE.md` — Guía detallada
- `SETUP_CHECKLIST.md` — Checklist paso a paso
- `supabase-setup-complete.sql` — Script SQL listo

---

## ✨ Próximo Paso

Una vez que veas los apartamentos cargando:

**Fase 2:** Pagos + Emails
- Integrar Stripe/PayPal
- Setup n8n para emails automáticos
- Autenticación de admin

¿Listo? Avísame cuando tengas los apartamentos cargados 👍
