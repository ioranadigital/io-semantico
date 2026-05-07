'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Apartment } from '@/lib/types';
import ApartmentsMap from '@/components/ApartmentsMap';

export default function Home() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);

  // Imágenes de stock distribuidas por apartamento
  const apartmentImages: { [key: string]: string } = {
    0: '/img/unsplash_1.jpg',
    1: '/img/unsplash_2.jpg',
    2: '/img/unsplash_3.jpg',
  };

  useEffect(() => {
    async function fetchApartments() {
      const { data, error } = await supabase.from('apartments').select('*');
      if (!error && data) setApartments(data);
      setLoading(false);
    }
    fetchApartments();
  }, []);

  return (
    <div>
      {/* Hero Section with Plaza Mayor Image */}
      <section
        className="relative bg-cover bg-center py-32 text-center"
        style={{
          backgroundImage: 'url(/img/plazamayor.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Lujo y Confort en Salamanca
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Apartamentos de diseño exclusivo a 100 metros de la Plaza Mayor
          </p>
          <Link
            href="/apartamentos"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Ver Apartamentos
          </Link>
        </div>
      </section>

      {/* Featured Apartments */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Nuestros Apartamentos</h2>

        {loading ? (
          <p className="text-center text-gray-500">Cargando apartamentos...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {apartments.map((apt, index) => (
              <div key={apt.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <img
                  src={apartmentImages[index] || '/img/unsplash_1.jpg'}
                  alt={apt.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{apt.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{apt.description}</p>

                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>👥 {apt.capacity} huéspedes</span>
                    <span>🛏️ {apt.bedrooms} dorm.</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-600">${apt.price_per_night}</span>
                    <span className="text-sm text-gray-500">/noche</span>
                  </div>

                  <Link
                    href={`/apartamentos/${apt.id}`}
                    className="block mt-4 bg-amber-600 hover:bg-amber-700 text-white text-center py-2 rounded-lg transition"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16 mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">¿Por qué elegirnos?</h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="font-bold mb-2">Reserva Directa</h3>
              <p className="text-gray-600 text-sm">Sin comisiones, solo reservas directas</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-bold mb-2">Pagos Seguros</h3>
              <p className="text-gray-600 text-sm">Stripe, PayPal o transferencia bancaria</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="font-bold mb-2">Centro Histórico</h3>
              <p className="text-gray-600 text-sm">A 100 metros de la Plaza Mayor</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="font-bold mb-2">Reseñas Reales</h3>
              <p className="text-gray-600 text-sm">Valoraciones verificadas de clientes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa */}
      {!loading && apartments.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <ApartmentsMap apartments={apartments} />
        </section>
      )}

      {/* CTA Final */}
      <section className="bg-amber-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para tu próxima escapada?</h2>
        <p className="mb-8 text-lg">Reserva hoy y disfruta de lujo en Salamanca</p>
        <Link
          href="/apartamentos"
          className="inline-block bg-white text-amber-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Reservar Ahora
        </Link>
      </section>
    </div>
  );
}
