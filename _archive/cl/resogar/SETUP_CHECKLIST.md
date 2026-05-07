# ✅ Setup Checklist — Resogar

## 🚀 PASO 1: Crear Proyecto Supabase

- [ ] Ir a https://supabase.com
- [ ] Clickear "New Project"
- [ ] Llenar:
  - [ ] Name: `resogar-prod`
  - [ ] Database Password: Guardar en lugar seguro
  - [ ] Region: Europa (Frankfurt recomendado)
- [ ] Crear proyecto (esperar 2-3 minutos)

**Status:** ⏳ En progreso / ✅ Completado

---

## 📋 PASO 2: Ejecutar SQL Setup + Seed

1. En Supabase dashboard → **SQL Editor**
2. Crear nuevo query
3. Copiar TODO el contenido de: `supabase-setup-complete.sql`
4. Ejecutar (Ctrl+Enter o botón "Run")
5. Esperar resultado

**Expected output:**
```
✓ Success
Apartamentos creados: 3
```

- [ ] SQL ejecutado exitosamente
- [ ] 3 apartamentos creados
- [ ] 5 tablas creadas (apartments, reservations, reviews, blocked_dates, users)

**Status:** ⏳ En progreso / ✅ Completado

---

## 🔑 PASO 3: Obtener Credenciales

En Supabase dashboard:

1. Clickear **Settings** (rueda de engranaje abajo a la izquierda)
2. Ir a **API** en sidebar
3. Copiar valores:

```
NEXT_PUBLIC_SUPABASE_URL = [AQUI_VA_PROJECT_URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY = [AQUI_VA_ANON_KEY]
```

- [ ] Project URL copiado
- [ ] Anon Key copiado (es largo, empieza con "eyJ...")

**Status:** ⏳ En progreso / ✅ Completado

---

## ⚙️ PASO 4: Actualizar .env.local

Archivo: `E:/git/cl/resogar/.env.local`

Reemplazar con tus credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
```

⚠️ **Dejar Stripe vacío por ahora (Fase 2)**

- [ ] Supabase URL pegado
- [ ] Supabase Anon Key pegado
- [ ] Archivo guardado

**Status:** ⏳ En progreso / ✅ Completado

---

## 🧪 PASO 5: Verificar Conexión

Terminal:
```bash
cd E:/git/cl/resogar
npm run dev
```

Ir a: http://localhost:3000

**Verificar:**
- [ ] La página carga sin errores
- [ ] Home muestra 3 apartamentos en "Nuestros Apartamentos"
- [ ] Cada apartamento muestra: nombre, descripción, precio ($45/noche), botón "Ver Detalles"
- [ ] Página `/apartamentos` carga correctamente
- [ ] Formulario de reserva abre en modal

**Status:** ⏳ En progreso / ✅ Completado

---

## 🔐 PASO 6: Verificar RLS en Supabase (Opcional)

En Supabase:
1. Ir a **Authentication > Policies**
2. Verificar que cada tabla tiene políticas activas
3. Público puede leer apartments
4. Cualquiera puede crear reservations

- [ ] RLS habilitado
- [ ] Políticas creadas

**Status:** ⏳ En progreso / ✅ Completado

---

## ✨ LISTO!

Una vez completado TODO:

```
[ ] Supabase proyecto creado
[ ] SQL ejecutado
[ ] 3 apartamentos en BD
[ ] Credenciales en .env.local
[ ] npm run dev funciona
[ ] Home muestra apartamentos
[ ] No hay errores en console
```

**Siguiente fase:** Integración de pagos + emails con n8n

---

**Tiempo estimado:** 15-20 minutos

**Problemas?**
- Revisar `SUPABASE_CONFIG_GUIDE.md`
- Revisar console del navegador (F12) para errores
- Verificar que .env.local está guardado (sin espacios extras)
