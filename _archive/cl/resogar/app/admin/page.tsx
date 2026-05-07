'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Apartment, Reservation } from '@/lib/types';

export default function AdminPage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedApt, setSelectedApt] = useState<string>('');
  const [blockedDate, setBlockedDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [blockedReason, setBlockedReason] = useState('');

  useEffect(() => {
    async function fetchData() {
      const { data: apts } = await supabase.from('apartments').select('*');
      const { data: res } = await supabase.from('reservations').select('*').order('check_in', { ascending: false });

      if (apts) {
        setApartments(apts);
        setSelectedApt(apts[0]?.id || '');
      }
      if (res) setReservations(res);
      setLoading(false);
    }

    fetchData();
  }, []);

  const handleBlockDate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApt || !blockedDate) return;

    const { error } = await supabase.from('blocked_dates').insert({
      apartment_id: selectedApt,
      date: blockedDate,
      reason: blockedReason || 'Bloqueado por propietario',
    });

    if (!error) {
      alert('Fecha bloqueada correctamente');
      setBlockedDate('');
      setBlockedReason('');
    } else {
      alert(`Error: ${error.message}`);
    }
  };

  const handleUnblockDate = async (dateId: string) => {
    const { error } = await supabase.from('blocked_dates').delete().eq('id', dateId);
    if (!error) {
      alert('Fecha desbloqueada');
    }
  };

  const selectedAptName = apartments.find((a) => a.id === selectedApt)?.name || 'Selecciona un apartamento';

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Panel de Admin</h1>

      {loading ? (
        <p className="text-center text-gray-500">Cargando...</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Reservations */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Reservas</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {reservations.length === 0 ? (
                <p className="text-gray-500">No hay reservas aún</p>
              ) : (
                reservations.map((res) => (
                  <div key={res.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-amber-400 transition">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{res.guest_name}</h3>
                        <p className="text-sm text-gray-500">{res.guest_email}</p>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        res.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        res.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {res.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-gray-500">Fechas</p>
                        <p className="font-semibold">{res.check_in} → {res.check_out}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Pago</p>
                        <p className={`font-semibold ${res.payment_status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {res.payment_status}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-amber-600 font-bold">${res.total_price}</span>
                      <span className="text-gray-500">{res.guests_count} huéspedes</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right: Block Dates */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Bloquear Fechas</h2>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Apartamento</label>
                <select
                  value={selectedApt}
                  onChange={(e) => setSelectedApt(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  {apartments.map((apt) => (
                    <option key={apt.id} value={apt.id}>
                      {apt.name}
                    </option>
                  ))}
                </select>
              </div>

              <form onSubmit={handleBlockDate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Fecha</label>
                  <input
                    type="date"
                    value={blockedDate}
                    onChange={(e) => setBlockedDate(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Motivo (opcional)</label>
                  <input
                    type="text"
                    value={blockedReason}
                    onChange={(e) => setBlockedReason(e.target.value)}
                    placeholder="Mantenimiento, limpieza, etc."
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-lg transition"
                >
                  Bloquear Fecha
                </button>
              </form>
            </div>

            <div className="mt-8">
              <h3 className="font-bold mb-2 text-sm">Próximas fechas bloqueadas</h3>
              <p className="text-xs text-gray-500 mb-2">({selectedAptName})</p>
              <div className="text-center py-4 text-gray-400 text-sm">
                [Integración con tabla blocked_dates en progreso]
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Important Note */}
      <div className="mt-12 bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Nota de Seguridad:</strong> Este es un panel de admin básico. En producción, implementar autenticación con Supabase Auth y permisos RLS adecuados.
        </p>
      </div>
    </div>
  );
}
