'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Apartment } from '@/lib/types';
import ReservationForm from '@/components/ReservationForm';

export default function ApartamentosPage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApt, setSelectedApt] = useState<Apartment | null>(null);

  useEffect(() => {
    async function fetchApartments() {
      const { data, error } = await supabase.from('apartments').select('*');
      if (!error && data) setApartments(data);
      setLoading(false);
    }
    fetchApartments();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12">Nuestros Apartamentos</h1>

      {loading ? (
        <p className="text-center text-gray-500">Cargando...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {apartments.map((apt) => (
            <div key={apt.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="bg-gray-300 h-64"></div>

              <div className="p-6">
                <h2 className="text-2xl font-bold mb-3">{apt.name}</h2>
                <p className="text-gray-600 mb-4">{apt.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Capacidad</p>
                    <p className="font-semibold">{apt.capacity} huéspedes</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dormitorios</p>
                    <p className="font-semibold">{apt.bedrooms}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Amenidades</p>
                  <div className="flex flex-wrap gap-2">
                    {apt.amenities.slice(0, 4).map((amenity) => (
                      <span key={amenity} className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full">
                        {amenity}
                      </span>
                    ))}
                    {apt.amenities.length > 4 && (
                      <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full">
                        +{apt.amenities.length - 4} más
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold text-amber-600">${apt.price_per_night}</span>
                    <span className="text-gray-500 ml-2">/noche</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedApt(apt)}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition"
                >
                  Reservar Ahora
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedApt && <ReservationForm apartment={selectedApt} onClose={() => setSelectedApt(null)} />}

      {/* Cancellation Policy */}
      <section className="mt-16 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Política de Cancelación</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-2 text-lg">Cancelación Flexible</h3>
            <p className="text-gray-600">
              Cancela hasta <strong>14 días antes</strong> del check-in para obtener un <strong>reembolso del 100%</strong>
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-lg">Cancelación Parcial</h3>
            <p className="text-gray-600">
              Cancela <strong>7-13 días antes</strong> del check-in para obtener un <strong>reembolso del 50%</strong>
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-lg">Sin Reembolso</h3>
            <p className="text-gray-600">
              Cancelaciones <strong>menos de 7 días antes</strong> no tienen derecho a reembolso
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
