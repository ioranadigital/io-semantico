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

-- Create policies for authenticated users (admin)
CREATE POLICY "Authenticated users can read apartments" ON apartments FOR SELECT USING (TRUE);
CREATE POLICY "Authenticated users can read reservations" ON reservations FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can create reservations" ON reservations FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Authenticated users can read reviews" ON reviews FOR SELECT USING (TRUE);
CREATE POLICY "Authenticated users can create reviews" ON reviews FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Authenticated users can read blocked_dates" ON blocked_dates FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage blocked_dates" ON blocked_dates FOR ALL USING (auth.role() = 'authenticated');
