const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://zvehtloitnuglyjtxwye.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZWh0bG9pdG51Z2x5anR4d3llIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTA3NjgyNCwiZXhwIjoyMDkwNjUyODI0fQ.5qoJbZfeY7o4W5nnIWKRKSPHstjuEmRuYbTnt_74xtY',
  { auth: { persistSession: false } }
);

async function verify() {
  console.log('🔍 Verificando Supabase setup...\n');

  try {
    // Verificar apartamentos
    const { data: apartments, error: aptError } = await supabase
      .from('apartments')
      .select('*');

    if (aptError) {
      console.error('❌ Error al leer apartamentos:', aptError.message);
      return;
    }

    console.log(`✅ Apartamentos encontrados: ${apartments.length}`);
    apartments.forEach((apt, i) => {
      console.log(`   ${i + 1}. ${apt.name} - $${apt.price_per_night}/noche`);
    });

    if (apartments.length === 3) {
      console.log('\n✨ SETUP COMPLETADO EXITOSAMENTE!\n');
      console.log('Próximo paso:');
      console.log('  npm run dev');
      console.log('  Ir a http://localhost:3000');
    } else {
      console.log(`\n⚠️  Se esperaban 3 apartamentos, encontrados ${apartments.length}`);
    }
  } catch (err) {
    console.error('❌ Error de conexión:', err.message);
    console.log('\n💡 Solución: Verifica que .env.local tenga las credenciales correctas');
  }
}

verify();
