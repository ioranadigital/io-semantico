const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const PROJECT_URL = 'https://zvehtloitnuglyjtxwye.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZWh0bG9pdG51Z2x5anR4d3llIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTA3NjgyNCwiZXhwIjoyMDkwNjUyODI0fQ.5qoJbZfeY7o4W5nnIWKRKSPHstjuEmRuYbTnt_74xtY';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZWh0bG9pdG51Z2x5anR4d3llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNzY4MjQsImV4cCI6MjA5MDY1MjgyNH0.GX6YTzPVsUpigT-DDC2FVA4D4o70qILUUt5pqjZ6pWI';

async function setupSupabase() {
  console.log('🚀 Iniciando setup de Supabase...\n');

  const supabase = createClient(PROJECT_URL, SERVICE_KEY);

  try {
    // 1. Crear tabla apartments
    console.log('📦 Creando tabla apartments...');
    await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });
    console.log('✅ Tabla apartments creada\n');

    // 2. Crear tabla reservations
    console.log('📦 Creando tabla reservations...');
    await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });
    console.log('✅ Tabla reservations creada\n');

    // 3. Crear tabla reviews
    console.log('📦 Creando tabla reviews...');
    await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });
    console.log('✅ Tabla reviews creada\n');

    // 4. Crear tabla blocked_dates
    console.log('📦 Creando tabla blocked_dates...');
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS blocked_dates (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          apartment_id UUID NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
          date DATE NOT NULL,
          reason TEXT,
          UNIQUE(apartment_id, date)
        );
      `
    });
    console.log('✅ Tabla blocked_dates creada\n');

    // 5. Crear tabla users
    console.log('📦 Creando tabla users...');
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `
    });
    console.log('✅ Tabla users creada\n');

    // 6. Insertar seed data
    console.log('🌱 Insertando apartamentos...');
    const { data, error } = await supabase.from('apartments').insert([
      {
        name: 'Lujoso Apartamento con Patio Privado',
        description: 'Lujo y confort a 100 metros de la Plaza Mayor. Apartamento de diseño exclusivo que cuenta con patio interior estilo ibicenco con césped, cocina de alta gama y aire acondicionado.',
        capacity: 3,
        bedrooms: 1,
        amenities: ['Cocina de alta gama', 'Aire acondicionado', 'Lavadora', 'WiFi', 'Patio privado', 'Ascensor', 'Calefacción', 'Secadora'],
        images: ['/images/apt1-1.jpg', '/images/apt1-2.jpg', '/images/apt1-3.jpg'],
        location: 'Salamanca, Centro Histórico',
        price_per_night: 45.00
      },
      {
        name: 'Lujoso Apartamento en Centro Histórico',
        description: 'Propiedad de diseño exclusivo ubicada a 100 metros de la Plaza Mayor. Ofrece un espacio moderno con cocina de gama alta, climatización completa y baño de autor.',
        capacity: 3,
        bedrooms: 1,
        amenities: ['Cocina equipada', 'Aire acondicionado', 'Calefacción', 'Lavadora', 'Estacionamiento', 'WiFi', 'Baño diseño', 'Ascensor'],
        images: ['/images/apt2-1.jpg', '/images/apt2-2.jpg', '/images/apt2-3.jpg'],
        location: 'Salamanca, Centro Histórico',
        price_per_night: 45.00
      },
      {
        name: 'Lujoso Apto. Boutique a 100m Plaza Mayor',
        description: 'Lujo y descanso a 100m de la Plaza Mayor con diseño exclusivo, patio interior ibicenco con césped, cocina de alta gama y aire acondicionado.',
        capacity: 3,
        bedrooms: 1,
        amenities: ['Cocina de alta gama', 'Aire acondicionado', 'Lavadora', 'WiFi', 'Patio interior', 'Ascensor', 'Calefacción', 'Secadora'],
        images: ['/images/apt3-1.jpg', '/images/apt3-2.jpg', '/images/apt3-3.jpg'],
        location: 'Salamanca, Centro Histórico',
        price_per_night: 45.00
      }
    ]);

    if (error) {
      console.error('❌ Error insertando apartamentos:', error.message);
    } else {
      console.log('✅ 3 apartamentos insertados\n');
    }

    console.log('✨ Setup completado exitosamente!\n');
    console.log('📋 Credenciales:\n');
    console.log(`NEXT_PUBLIC_SUPABASE_URL=${PROJECT_URL}`);
    console.log(`NEXT_PUBLIC_SUPABASE_ANON_KEY=${ANON_KEY}\n`);

  } catch (err) {
    console.error('❌ Error durante setup:', err.message);
    process.exit(1);
  }
}

setupSupabase();
