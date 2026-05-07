'use client';

import { useState, useEffect } from 'react';
import { Apartment } from '@/lib/types';
import { supabase } from '@/lib/supabase';

interface ReservationFormProps {
  apartment: Apartment;
  onClose: () => void;
}

export default function ReservationForm({ apartment, onClose }: ReservationFormProps) {
  const [loading, setLoading] = useState(false);
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    check_in: '',
    check_out: '',
    guests_count: 1,
    payment_method: 'stripe' as const,
    special_requests: '',
  });

  // Ocultar navbar y body scroll (solo en cliente)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    const header = document.querySelector('header');
    if (header) header.style.display = 'none';

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      const header = document.querySelector('header');
      if (header) header.style.display = 'block';
    };
  }, []);

  // Calcular noches y precio
  useEffect(() => {
    if (formData.check_in && formData.check_out) {
      const checkIn = new Date(formData.check_in);
      const checkOut = new Date(formData.check_out);
      const calc_nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      setNights(calc_nights > 0 ? calc_nights : 0);
      setTotalPrice(calc_nights > 0 ? calc_nights * apartment.price_per_night : 0);
    }
  }, [formData.check_in, formData.check_out, apartment.price_per_night]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('reservations').insert({
      apartment_id: apartment.id,
      ...formData,
      total_price: totalPrice,
      payment_status: 'pending',
      status: 'pending',
    });

    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      alert('Reserva creada. Próximo paso: completar pago.');
      onClose();
    }

    setLoading(false);
  };

  // Galería de imágenes locales
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

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-screen overflow-y-auto">

        {/* Header con flecha atrás */}
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="text-2xl hover:text-gray-600 transition"
              title="Volver"
            >
              ←
            </button>
            <h1 className="text-3xl font-bold">Finalizar tu reserva</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 p-8">

          {/* Columna izquierda: Galería y resumen */}
          <div className="space-y-6">

            {/* Galería principal */}
            <div className="space-y-3">
              <img
                src={images[0]}
                alt="Principal"
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="grid grid-cols-3 gap-2">
                {images.slice(1).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Galería ${idx + 2}`}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                  />
                ))}
              </div>
            </div>

            {/* Resumen del apartamento */}
            <div className="border-t pt-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{apartment.name}</h2>
                  <p className="text-gray-600 flex items-center gap-2">
                    📍 Salamanca, Centro Histórico
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-amber-600">${apartment.price_per_night}</div>
                  <p className="text-gray-600">/noche</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                <span className="text-yellow-400 text-lg">⭐ 4.9</span>
                <span className="text-gray-600">(128 reseñas)</span>
              </div>

              {/* Características */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-gray-600 text-sm">Huéspedes</p>
                  <p className="font-semibold text-lg">{apartment.capacity}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Dormitorios</p>
                  <p className="font-semibold text-lg">{apartment.bedrooms}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Baños</p>
                  <p className="font-semibold text-lg">1</p>
                </div>
              </div>

              {/* Amenidades */}
              <div className="mb-6">
                <h3 className="font-bold mb-3">Lo que ofrece este lugar</h3>
                <div className="grid grid-cols-2 gap-3">
                  {apartment.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-sm">
                      <span className="text-green-600">✓</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Descripción */}
              <div>
                <p className="text-gray-700">{apartment.description}</p>
              </div>
            </div>

            {/* Política de cancelación */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-bold mb-3">Política de cancelación flexible</h3>
              <ul className="text-sm space-y-2 text-gray-700">
                <li><strong>Hasta 14 días antes:</strong> Reembolso 100%</li>
                <li><strong>7-13 días antes:</strong> Reembolso 50%</li>
                <li><strong>Menos de 7 días:</strong> Sin reembolso</li>
              </ul>
            </div>
          </div>

          {/* Columna derecha: Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Fechas */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Fechas</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Check-in</label>
                  <input
                    type="date"
                    name="check_in"
                    required
                    value={formData.check_in}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Check-out</label>
                  <input
                    type="date"
                    name="check_out"
                    required
                    value={formData.check_out}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
              {nights > 0 && (
                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  {nights} noche{nights > 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Huéspedes */}
            <div>
              <label className="block text-sm font-medium mb-2">Número de huéspedes</label>
              <input
                type="number"
                name="guests_count"
                min="1"
                max={apartment.capacity}
                value={formData.guests_count}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Datos personales */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Datos del huésped</h3>
              <input
                type="text"
                name="guest_name"
                placeholder="Nombre completo"
                required
                value={formData.guest_name}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <input
                type="email"
                name="guest_email"
                placeholder="Email"
                required
                value={formData.guest_email}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <input
                type="tel"
                name="guest_phone"
                placeholder="Teléfono"
                required
                value={formData.guest_phone}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Método de pago */}
            <div>
              <label className="block text-sm font-medium mb-2">Método de pago</label>
              <select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="stripe">💳 Tarjeta de crédito (Stripe)</option>
                <option value="paypal">🅿️ PayPal</option>
                <option value="transfer">🏦 Transferencia bancaria</option>
              </select>
            </div>

            {/* Solicitudes especiales */}
            <div>
              <label className="block text-sm font-medium mb-2">Solicitudes especiales (opcional)</label>
              <textarea
                name="special_requests"
                placeholder="Ej: Cuna para bebé, alergias, etc."
                value={formData.special_requests}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 w-full h-20 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Desglose de precios */}
            {nights > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="font-bold mb-3">Desglose de precios</h3>
                <div className="space-y-2 text-sm mb-3 pb-3 border-b">
                  <div className="flex justify-between">
                    <span>${apartment.price_per_night} × {nights} noche{nights > 1 ? 's' : ''}</span>
                    <span>${nights * apartment.price_per_night}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impuestos y tasas</span>
                    <span>${Math.round(totalPrice * 0.1)}</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-amber-600">${totalPrice + Math.round(totalPrice * 0.1)}</span>
                </div>
              </div>
            )}

            {/* Botón enviar */}
            <button
              type="submit"
              disabled={loading || nights <= 0}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition text-lg"
            >
              {loading ? '⏳ Procesando...' : `Confirmar reserva ${totalPrice > 0 ? `(${totalPrice + Math.round(totalPrice * 0.1)}$)` : ''}`}
            </button>

            <p className="text-xs text-gray-600 text-center">
              Al hacer clic, aceptas nuestros términos y condiciones
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
