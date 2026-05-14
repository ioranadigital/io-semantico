'use client';

import { useState } from 'react';
import PhotoGalleryModal from './PhotoGalleryModal';
import { Apartment } from '@/data/apartments';

interface ApartmentDetailClientProps {
  apartment: Apartment;
}

export default function ApartmentDetailClient({ apartment }: ApartmentDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <main className="pt-20">
      {/* Galería de imágenes - Mosaico */}
      <section className="relative bg-gray-100 pt-20">
        <div className="container-fluid pb-8">
          <div className="grid grid-cols-4 gap-2 h-96">
            {/* Imagen principal - Grande */}
            <div
              className="col-span-2 row-span-2 relative rounded-xl overflow-hidden group cursor-pointer"
              onClick={() => setGalleryOpen(true)}
            >
              <img
                src={apartment.images[0]}
                alt={apartment.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
            </div>

            {/* Pequeñas imágenes - 2x2 grid */}
            {apartment.images.slice(1, 5).map((img, idx) => (
              <div
                key={idx}
                className="relative rounded-lg overflow-hidden group cursor-pointer"
                onClick={() => setGalleryOpen(true)}
              >
                <img
                  src={img}
                  alt={`Foto ${idx + 2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>

                {/* Ver todas en última imagen */}
                {idx === 3 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white font-semibold text-lg">+ {apartment.images.length - 1}</p>
                      <p className="text-white/80 text-xs mt-1">Ver todas</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Rating badge */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">{apartment.rating}★</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Excepcional</p>
                  <p className="text-xs text-gray-600">{apartment.reviews} reseñas</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setGalleryOpen(true)}
              className="text-blue-600 font-semibold text-sm hover:text-blue-700 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Ver todas las fotos ({apartment.images.length})
            </button>
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section className="bg-white">
        <div className="container-fluid py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Información principal */}
            <div className="lg:col-span-2">
              {/* Encabezado */}
              <div className="mb-12">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">{apartment.zoneDisplay}</p>
                    <h1 className="text-4xl md:text-5xl font-light text-gray-900">
                      {apartment.name}
                    </h1>
                  </div>
                </div>

                <p className="text-xl text-gray-700 font-light leading-relaxed">
                  {apartment.location}
                </p>
              </div>

              {/* Info rápida */}
              <div className="grid grid-cols-4 gap-6 py-8 border-t border-b border-gray-200 mb-12">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{apartment.guests}</p>
                  <p className="text-sm text-gray-600 mt-1">Huéspedes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{apartment.bedrooms}</p>
                  <p className="text-sm text-gray-600 mt-1">Dormitorios</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{apartment.bathrooms}</p>
                  <p className="text-sm text-gray-600 mt-1">Baños</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">4.9★</p>
                  <p className="text-sm text-gray-600 mt-1">Puntuación</p>
                </div>
              </div>

              {/* Descripción */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Acerca del lugar</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line font-light">
                  {apartment.fullDescription}
                </p>
              </div>

              {/* Amenidades */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">Comodidades</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {apartment.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-blue-600 text-2xl mt-1">✓</span>
                      <span className="text-gray-700 font-light">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reglas */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Reglas de la casa</h2>
                <ul className="space-y-3">
                  {apartment.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-gray-400 mt-1">•</span>
                      <span className="text-gray-700 font-light">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reseñas */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">Reseñas de huéspedes</h2>
                <div className="space-y-6">
                  {apartment.reviews_list.map((review, idx) => (
                    <div key={idx} className="border-b border-gray-200 pb-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.author}</h4>
                          <p className="text-sm text-gray-600">{review.date}</p>
                        </div>
                        <div className="flex gap-1">
                          {Array(review.rating)
                            .fill(0)
                            .map((_, i) => (
                              <span key={i} className="text-amber-400">★</span>
                            ))}
                        </div>
                      </div>
                      <p className="text-gray-700 font-light leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Formulario de reserva */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-gray-50 rounded-2xl p-8 border border-gray-200">
                {/* Precio */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-gray-900">€{apartment.price}</span>
                    <span className="text-gray-600">/noche</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">★ {apartment.rating}</span>
                    <span className="text-gray-600">({apartment.reviews} reseñas)</span>
                  </div>
                </div>

                {/* Formulario */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Llegada
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Salida
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Huéspedes
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600">
                      {Array.from({ length: apartment.guests }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <a href="/checkout" className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all mb-4 text-center">
                  Reservar Ahora
                </a>

                <p className="text-xs text-gray-600 text-center">
                  Todavía no se ha realizado ningún cargo
                </p>

                {/* Detalles de precio */}
                <div className="mt-8 pt-6 border-t border-gray-300 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">€{apartment.price} × 3 noches</span>
                    <span className="text-gray-900 font-medium">€{apartment.price * 3}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tarifa de servicio</span>
                    <span className="text-gray-900 font-medium">€75</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-300 font-semibold">
                    <span>Total</span>
                    <span className="text-gray-900">€{apartment.price * 3 + 75}</span>
                  </div>
                </div>

                {/* Info adicional */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg text-xs text-blue-700">
                  ✓ Cancelación gratuita hasta 7 días antes
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PhotoGalleryModal
        images={apartment.images}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        apartmentName={apartment.name}
      />
    </main>
  );
}
