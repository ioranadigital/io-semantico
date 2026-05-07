'use client';

import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import { Apartment } from '@/lib/types';

interface ApartmentsMapProps {
  apartments: Apartment[];
}

export default function ApartmentsMap({ apartments }: ApartmentsMapProps) {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  // Coordenadas de Calle Varillas, Salamanca
  const salamancaCenter = { lat: 40.96408, lng: -5.6620174 };

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '0.5rem',
  };

  // Posiciones de apartamentos (Calle Varillas, 17 - mismo edificio)
  const apartmentPositions: { [key: string]: { lat: number; lng: number } } = {
    0: { lat: 40.96408, lng: -5.6620174 }, // Apartamento 1 (1ºC)
    1: { lat: 40.96408, lng: -5.6620174 }, // Apartamento 2 (1ºD)
    2: { lat: 40.96408, lng: -5.6620174 }, // Apartamento 3 (1ºD)
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Ubicación de los Apartamentos</h2>

      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
        <GoogleMap mapContainerStyle={mapContainerStyle} center={salamancaCenter} zoom={16}>
          {apartments.map((apt, index) => (
            <div key={apt.id}>
              <Marker
                position={apartmentPositions[index] || salamancaCenter}
                title={apt.name}
                onClick={() => setSelectedMarker(apt.id)}
              />

              {selectedMarker === apt.id && (
                <InfoWindow
                  position={apartmentPositions[index] || salamancaCenter}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className="p-2">
                    <h3 className="font-bold text-sm">{apt.name}</h3>
                    <p className="text-xs text-gray-600">
                      {apt.capacity} huéspedes • ${apt.price_per_night}/noche
                    </p>
                  </div>
                </InfoWindow>
              )}
            </div>
          ))}
        </GoogleMap>
      </LoadScript>

      <p className="text-sm text-gray-600 mt-4">
        Todos nuestros apartamentos están ubicados en el centro histórico de Salamanca, a 100 metros de la Plaza Mayor
      </p>
    </div>
  );
}
