# Guía Configuración Supabase — cl-resogar

## PASO 1: Crear Proyecto en Supabase

1. Ir a https://supabase.com
2. Clickear **"New Project"**
3. Llenar:
   - Name: `resogar-prod`
   - Database Password: Guardar en lugar seguro
   - Region: Europa (Frankfurt o Portugal más cercano)
4. Crear proyecto (espera 2-3 min)

---

## PASO 2: Ejecutar SQL de Setup

1. En el dashboard de Supabase, ir a **SQL Editor**
2. Clickear **"New Query"**
3. Copiar TODO el contenido de `SUPABASE_SETUP.sql` de este proyecto
4. Ejecutar (Ctrl+Enter)
5. Esperar a que complete (debería ver 5 tablas creadas)

---

## PASO 3: Seed Data — Agregar los 3 Apartamentos

1. En Supabase SQL Editor, crear NUEVO query
2. Copiar y ejecutar TODO esto:

```sql
INSERT INTO apartments (name, description, capacity, bedrooms, amenities, images, location, price_per_night)
VALUES
  (
    'Lujoso Apartamento con Patio Privado',
    'Lujo y confort a 100 metros de la Plaza Mayor. Apartamento de diseño exclusivo que cuenta con patio interior estilo ibicenco con césped, cocina de alta gama y aire acondicionado. Orientado a familias y parejas que buscan estilo y descanso.',
    3,
    1,
    ARRAY['Cocina de alta gama', 'Aire acondicionado', 'Lavadora', 'WiFi', 'Patio privado', 'Ascensor', 'Calefacción', 'Secadora'],
    ARRAY['/images/apt1-1.jpg', '/images/apt1-2.jpg', '/images/apt1-3.jpg'],
    'Salamanca, Centro Histórico',
    45.00
  ),
  (
    'Lujoso Apartamento en Centro Histórico',
    'Propiedad de diseño exclusivo ubicada a 100 metros de la Plaza Mayor. Ofrece un espacio moderno con cocina de gama alta, climatización completa y baño de autor, dirigido a familias y parejas que valoran el estilo.',
    3,
    1,
    ARRAY['Cocina equipada', 'Aire acondicionado', 'Calefacción', 'Lavadora', 'Estacionamiento', 'WiFi', 'Baño diseño', 'Ascensor'],
    ARRAY['/images/apt2-1.jpg', '/images/apt2-2.jpg', '/images/apt2-3.jpg'],
    'Salamanca, Centro Histórico',
    45.00
  ),
  (
    'Lujoso Apto. Boutique a 100m Plaza Mayor',
    'Lujo y descanso a 100m de la Plaza Mayor con diseño exclusivo, patio interior ibicenco con césped, cocina de alta gama y aire acondicionado.',
    3,
    1,
    ARRAY['Cocina de alta gama', 'Aire acondicionado', 'Lavadora', 'WiFi', 'Patio interior', 'Ascensor', 'Calefacción', 'Secadora'],
    ARRAY['/images/apt3-1.jpg', '/images/apt3-2.jpg', '/images/apt3-3.jpg'],
    'Salamanca, Centro Histórico',
    45.00
  );
```

**Resultado esperado:** "Successfully inserted 3 rows into apartments"

---

## PASO 4: Obtener Credenciales

1. En Supabase dashboard, ir a **Project Settings** (rueda de engranaje)
2. Ir a **API** en la sidebar
3. Copiar:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon (public)** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## PASO 5: Configurar .env.local

1. Abrir archivo: `E:/git/cl/resogar/.env.local`
2. Reemplazar valores con tus credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tuproyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxx
```

(Dejar Stripe vacío por ahora, lo configuraremos en Fase 2)

---

## PASO 6: Verificar Conexión

1. Terminal: `cd E:/git/cl/resogar`
2. Ejecutar: `npm run dev`
3. Ir a http://localhost:3000
4. Debe cargar y mostrar los 3 apartamentos en el Home

Si ves los apartamentos → ✅ Supabase está correctamente configurado

---

## ⚠️ Verificaciones de Seguridad

Antes de pasar a Fase 2:

- [ ] Ir a **Authentication > Policies** en Supabase
- [ ] Verificar que RLS está habilitado en todas las tablas
- [ ] Revisar permisos en **Row Level Security**

Por ahora esto está en "public" (leer es gratis). La autenticación llega en Fase 2.

---

## Siguiente Paso

Una vez confirmado que los apartamentos cargan:

1. Integración de Stripe/PayPal para pagos
2. Setup de n8n para emails automáticos
3. Implementar autenticación de admin

¡Avísame cuando esté listo!
