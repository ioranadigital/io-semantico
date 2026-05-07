# 🚀 EJECUTA AHORA

## PASO 1: Ejecutar SQL en Supabase (2 min)

1. Abre: https://zvehtloitnuglyjtxwye.supabase.co
2. **SQL Editor** (sidebar izquierda)
3. **New Query**
4. Copia el SQL de `supabase-setup-complete.sql` o usa el SQL corto de abajo
5. **Ejecuta** (Ctrl+Enter o botón azul)
6. Espera a ver "Success" ✅

**SQL (simplificado):**
```sql
CREATE TABLE IF NOT EXISTS apartments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  capacity INT NOT NULL,
  bedrooms INT NOT NULL,
  amenities TEXT[] NOT NULL DEFAULT '{}',
  images TEXT[] NOT NULL DEFAULT '{}',
  location TEXT NOT NULL,
  price_per_night DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  apartment_id UUID NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests_count INT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  payment_method TEXT CHECK (payment_method IN ('stripe', 'paypal', 'transfer')),
  payment_status TEXT CHECK (payment_status IN ('pending', 'confirmed', 'failed')),
  refund_percentage INT,
  special_requests TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  apartment_id UUID NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blocked_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  apartment_id UUID NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  reason TEXT,
  UNIQUE(apartment_id, date)
);

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO apartments (name, description, capacity, bedrooms, amenities, images, location, price_per_night)
VALUES
  ('Lujoso Apartamento con Patio Privado', 'Lujo y confort a 100 metros de la Plaza Mayor. Apartamento de diseño exclusivo que cuenta con patio interior estilo ibicenco con césped, cocina de alta gama y aire acondicionado.', 3, 1, ARRAY['Cocina de alta gama', 'Aire acondicionado', 'Lavadora', 'WiFi', 'Patio privado'], ARRAY['/images/apt1-1.jpg', '/images/apt1-2.jpg'], 'Salamanca, Centro Histórico', 45.00),
  ('Lujoso Apartamento en Centro Histórico', 'Propiedad de diseño exclusivo ubicada a 100 metros de la Plaza Mayor. Ofrece un espacio moderno con cocina de gama alta, climatización completa y baño de autor.', 3, 1, ARRAY['Cocina equipada', 'Aire acondicionado', 'Calefacción', 'Lavadora', 'WiFi'], ARRAY['/images/apt2-1.jpg', '/images/apt2-2.jpg'], 'Salamanca, Centro Histórico', 45.00),
  ('Lujoso Apto. Boutique a 100m Plaza Mayor', 'Lujo y descanso a 100m de la Plaza Mayor con diseño exclusivo, patio interior ibicenco, cocina de alta gama y aire acondicionado.', 3, 1, ARRAY['Cocina de alta gama', 'Aire acondicionado', 'Lavadora', 'WiFi', 'Patio interior'], ARRAY['/images/apt3-1.jpg', '/images/apt3-2.jpg'], 'Salamanca, Centro Histórico', 45.00);

SELECT COUNT(*) as total_apartamentos FROM apartments;
```

---

## PASO 2: Verificar setup (1 min)

Terminal:
```bash
cd E:/git/cl/resogar
node verify-setup.js
```

**Resultado esperado:**
```
✅ Apartamentos encontrados: 3
   1. Lujoso Apartamento con Patio Privado - $45/noche
   2. Lujoso Apartamento en Centro Histórico - $45/noche
   3. Lujoso Apto. Boutique a 100m Plaza Mayor - $45/noche

✨ SETUP COMPLETADO EXITOSAMENTE!
```

---

## PASO 3: Iniciar servidor (1 min)

```bash
npm run dev
```

Ir a: http://localhost:3000

**Resultado esperado:**
- ✅ Home carga sin errores
- ✅ Sección "Nuestros Apartamentos" muestra 3 apartamentos
- ✅ Cada apartamento muestra: nombre, descripción, $45/noche, botón "Ver Detalles"
- ✅ Página `/apartamentos` carga correctamente
- ✅ Formulario de reserva abre en modal al clickear "Reservar"

---

## ✨ LISTO!

Una vez completado TODO, tienes:
- ✅ Proyecto Next.js funcionando
- ✅ Supabase configurado con 3 apartamentos
- ✅ Motor de reservas funcional
- ✅ Panel de admin básico

**Próximo:** Integrar Stripe/PayPal + emails con n8n

