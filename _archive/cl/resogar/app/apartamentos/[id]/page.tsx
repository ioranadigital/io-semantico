'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Apartment } from '@/lib/types';
import ReservationForm from '@/components/ReservationForm';

export default function ApartmentDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  // Imágenes de stock
  const images = [
    '/img/unsplash_1.jpg',
    '/img/unsplash_2.jpg',
    '/img/unsplash_3.jpg',
    '/img/unsplash_5.jpg',
    '/img/unsplash_7.jpg',
    '/img/unsplash_8.jpg',
    '/img/unsplash_9.jpg',
    '/img/unsplash_12.jpg',
    '/img/unsplash_13.jpg',
    '/img/unsplash_14.jpg',
    '/img/unsplash_15.jpg',
  ];

  useEffect(() => {
    async function fetchApartment() {
      if (!id) return;

      const { data, error } = await supabase
        .from('apartments')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        setApartment(null);
      } else {
        setApartment(data);
      }
      setLoading(false);
    }

    fetchApartment();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-center text-gray-500">Cargando apartamento...</p>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Apartamento no encontrado</h1>
        <p className="text-gray-600 mb-8">Lo sentimos, no pudimos encontrar este apartamento.</p>
        <Link
          href="/apartamentos"
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg"
        >
          Volver a apartamentos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-gray-600">
        <Link href="/apartamentos" className="hover:text-amber-600">
          Apartamentos
        </Link>
        {' > '}
        <span className="text-gray-900">{apartment.name}</span>
      </div>

      {/* Header */}
      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        {/* Galería de imágenes */}
        <div>
          <div className="bg-gray-200 rounded-lg overflow-hidden mb-4">
            <img
              src={images[mainImageIndex]}
              alt="Apartamento"
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImageIndex(i)}
                className={`rounded overflow-hidden transition ${
                  mainImageIndex === i ? 'ring-2 ring-amber-600' : ''
                }`}
              >
                <img src={img} alt={`Miniatura ${i}`} className="w-full h-20 object-cover hover:opacity-80" />
              </button>
            ))}
          </div>
        </div>

        {/* Información */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{apartment.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-amber-600">${apartment.price_per_night}</span>
            <span className="text-gray-500">/noche</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <p className="text-sm text-gray-500">Capacidad</p>
              <p className="text-xl font-semibold">{apartment.capacity} huéspedes</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Dormitorios</p>
              <p className="text-xl font-semibold">{apartment.bedrooms}</p>
            </div>
          </div>

          <p className="text-gray-700 mb-8 leading-relaxed">{apartment.description}</p>

          <button
            onClick={() => setShowReservationForm(true)}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-lg text-lg transition mb-4"
          >
            Reservar Ahora
          </button>

          <p className="text-xs text-gray-500 text-center">
            Cancelación flexible: 14+ días = 100% reembolso
          </p>
        </div>
      </div>

      {/* Amenidades */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Amenidades</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {apartment.amenities.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
            >
              <span className="text-2xl">✓</span>
              <span className="text-gray-700">{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ubicación */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Ubicación</h2>
        <div className="bg-gray-100 rounded-lg p-6">
          <p className="text-gray-700 mb-4">{apartment.location}</p>
          <p className="text-sm text-gray-600">
            Centro histórico de Salamanca, a 100 metros de la Plaza Mayor
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-amber-50 border-l-4 border-amber-600 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">¿Listo para reservar?</h2>
        <button
          onClick={() => setShowReservationForm(true)}
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3 rounded-lg transition"
        >
          Reservar Ahora
        </button>
      </div>

      {/* Modal de reserva */}
      {showReservationForm && apartment && (
        <ReservationForm
          apartment={apartment}
          onClose={() => setShowReservationForm(false)}
        />
      )}
    </div>
  );
}
