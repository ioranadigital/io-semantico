# Guía de Setup — cl-cl-resogar

## 1. Supabase Setup

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Ir a **SQL Editor** → Crear nuevo query
3. Copiar contenido de `SUPABASE_SETUP.sql` y ejecutar
4. Copiar credenciales:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL` en `.env.local`
   - Anon Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY` en `.env.local`

## 2. Seed Data — Crear los 3 apartamentos

En Supabase SQL Editor, ejecutar:

```sql
INSERT INTO apartments (name, description, capacity, bedrooms, amenities, images, location, price_per_night)
VALUES
  (
    'Lujoso Apartamento con Patio Privado',
    'Lujo y confort a 100 metros de la Plaza Mayor. Apartamento de diseño exclusivo con patio interior ibicenco, cocina de alta gama y aire acondicionado.',
    3,
    1,
    ARRAY['Cocina', 'Aire acondicionado', 'Lavadora', 'WiFi', 'Patio privado', 'Ascensor'],
    ARRAY['/images/apt1-1.jpg', '/images/apt1-2.jpg'],
    'Salamanca, Centro',
    45.00
  ),
  (
    'Lujoso Apartamento en Centro Histórico',
    'Propiedad de diseño exclusivo a 100 metros de Plaza Mayor. Espacio moderno con cocina de gama alta, climatización y baño de diseño.',
    3,
    1,
    ARRAY['Cocina', 'Aire acondicionado', 'Calefacción', 'Lavadora', 'WiFi', 'Baño diseño'],
    ARRAY['/images/apt2-1.jpg', '/images/apt2-2.jpg'],
    'Salamanca, Centro',
    45.00
  ),
  (
    'Lujoso Apto. Boutique a 100m Plaza Mayor',
    'Lujo y descanso a 100m de la Plaza Mayor con diseño exclusivo, patio interior ibicenco, cocina de alta gama y aire acondicionado.',
    3,
    1,
    ARRAY['Cocina', 'Aire acondicionado', 'Lavadora', 'WiFi', 'Patio interior', 'Ascensor'],
    ARRAY['/images/apt3-1.jpg', '/images/apt3-2.jpg'],
    'Salamanca, Centro',
    45.00
  );
```

## 3. Stripe Setup

1. Crear cuenta en [stripe.com](https://stripe.com)
2. Ir a **Developers** → **API Keys**
3. Copiar credenciales:
   - Publishable Key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret Key → `STRIPE_SECRET_KEY`

## 4. Iniciar servidor de desarrollo

```bash
cd E:/git/cl/resogar
npm run dev
```

Acceder a `http://localhost:3000`

## 5. Variables de entorno necesarias

Completar `.env.local` con:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`

## 6. N8n Setup (automatización)

Configurar en n8n:
- Trigger: Nueva reserva confirmada en Supabase
- Acciones:
  - Enviar email confirmación al cliente
  - Enviar email al propietario
  - Crear recordatorio de invitación a reseña (7 días post checkout)
