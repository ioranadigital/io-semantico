-- ==========================================
-- RESOGAR — Setup Completo + Seed Data
-- Copiar y ejecutar TODO en Supabase SQL Editor
-- ==========================================

-- Create apartments table
CREATE TABLE apartments (
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

-- Create reservations table
CREATE TABLE reservations (
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

-- Create reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  apartment_id UUID NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create blocked_dates table
CREATE TABLE blocked_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  apartment_id UUID NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  reason TEXT,
  UNIQUE(apartment_id, date)
);

-- Create users table for admin
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE apartments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for public (anyone can read apartments)
CREATE POLICY "Public can read apartments" ON apartments FOR SELECT USING (TRUE);

-- Policies for authenticated users
CREATE POLICY "Authenticated can read reservations" ON reservations FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Anyone can create reservations" ON reservations FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public can read reviews" ON reviews FOR SELECT USING (approved = TRUE);
CREATE POLICY "Anyone can create reviews" ON reviews FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Authenticated can read blocked_dates" ON blocked_dates FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage blocked_dates" ON blocked_dates FOR ALL USING (auth.role() = 'authenticated');

-- ==========================================
-- SEED DATA — 3 Apartamentos
-- ==========================================

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

-- Verificar
SELECT COUNT(*) as "Apartamentos creados" FROM apartments;
