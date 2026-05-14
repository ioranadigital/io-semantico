'use client';

import { useState } from 'react';
import { apartments } from '@/data/apartments';

export default function FeaturedApartments() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section id="apartamentos-destacados" className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-fluid">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-4">
            Apartamentos <span className="font-semibold">Destacados</span>
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl">
            Selección premium de nuestras suites boutique más exclusivas
          </p>
        </div>

        {/* Grid de apartamentos */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {apartments.map((apt) => (
            <div
              key={apt.id}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-2xl bg-white"
            >
              {/* Imagen principal */}
              <div className="relative h-72 overflow-hidden bg-gray-100">
                <img
                  src={apt.image}
                  alt={apt.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Rating badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg">
                  <span className="text-amber-400 font-bold text-sm">{apt.rating}★</span>
                  <span className="text-gray-600 text-xs font-medium">({apt.reviews})</span>
                </div>

                {/* Location badge */}
                <div className="absolute top-4 left-4 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-semibold shadow-lg">
                  {apt.zoneDisplay}
                </div>
              </div>

              {/* Contenido */}
              <div className="p-8">
                {/* Nombre */}
                <h3 className="text-2xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {apt.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 font-light">{apt.location}</p>

                {/* Descripción */}
                <p className="text-gray-700 text-sm mb-6 leading-relaxed font-light line-clamp-2">
                  {apt.description}
                </p>

                {/* Info rápida */}
                <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{apt.guests}</div>
                    <p className="text-xs text-gray-600">Huéspedes</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{apt.bedrooms}</div>
                    <p className="text-xs text-gray-600">Dormitorios</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{apt.bathrooms}</div>
                    <p className="text-xs text-gray-600">Baños</p>
                  </div>
                </div>

                {/* Amenidades destacadas */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Comodidades</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {apt.amenities.slice(0, 4).map((amenity, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">✓</span>
                        <span className="text-xs text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                  {apt.amenities.length > 4 && (
                    <button
                      onClick={() => setExpandedId(expandedId === apt.id ? null : apt.id)}
                      className="text-xs text-blue-600 font-semibold mt-2 hover:text-blue-700"
                    >
                      {expandedId === apt.id ? '- Ver menos' : '+ Ver todas las comodidades'}
                    </button>
                  )}
                </div>

                {/* Comodidades expandidas */}
                {expandedId === apt.id && (
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <div className="grid grid-cols-2 gap-2">
                      {apt.amenities.slice(4).map((amenity, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">✓</span>
                          <span className="text-xs text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Precio y CTA */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-widest font-semibold mb-1">Desde</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-3xl font-bold text-gray-900">€{apt.price}</p>
                      <p className="text-gray-600 text-sm">/noche</p>
                    </div>
                  </div>
                  <a
                    href={`/apartamentos/${apt.zone}/${apt.subzone}/${apt.slug}`}
                    className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all text-sm whitespace-nowrap"
                  >
                    Ver Detalles →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-12 border-t border-gray-200">
          <p className="text-gray-600 mb-4 font-light">¿Buscas algo más específico?</p>
          <button className="px-8 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
            Explorar Todas las Suites
          </button>
        </div>
      </div>
    </section>
  );
}
