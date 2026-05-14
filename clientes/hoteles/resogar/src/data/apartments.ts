export interface Apartment {
  id: number;
  slug: string;
  name: string;
  zone: string;
  subzone: string;
  zoneDisplay: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  images: string[];
  description: string;
  fullDescription: string;
  amenities: string[];
  highlights: string[];
  rules: string[];
  reviews_list: {
    author: string;
    rating: number;
    date: string;
    text: string;
  }[];
}

export const apartments: Apartment[] = [
  {
    id: 1,
    slug: 'lujo-premium-resogar',
    name: 'Lujoso Apartamento Premium-Resogar',
    zone: 'salamanca',
    subzone: 'plazamayor',
    zoneDisplay: 'Salamanca',
    location: 'Salamanca, a 100m de la Plaza Mayor, Madrid',
    price: 185,
    rating: 4.65,
    reviews: 3,
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
      'https://images.unsplash.com/photo-1540932239986-310128078ceb?w=1200&q=80',
      'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=1200&q=80',
      'https://images.unsplash.com/photo-1585399363032-4b94589a269b?w=1200&q=80',
      'https://images.unsplash.com/photo-1567225557594-837266d8c92c?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&q=80',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80',
    ],
    description: 'Lujo y descanso a 100m de la Plaza Mayor. Estrena este exclusivo apartamento de diseño, ideal para familias y parejas que buscan estilo y confort.',
    fullDescription: `Lujo y descanso a 100m de la Plaza Mayor. Estrena este exclusivo apartamento de diseño, ideal para familias y parejas que buscan estilo y confort.

Este lujoso apartamento boutique combina el diseño contemporáneo con las comodidades de primera clase. Ubicado en plena Salamanca, a apenas 100 metros de la histórica Plaza Mayor, se encuentra en el corazón cultural de Madrid.

El apartamento cuenta con un dormitorio amplio y luminoso, baño completamente equipado, y una cocina de alta gama. Cada detalle ha sido cuidadosamente seleccionado para garantizar su máximo confort durante su estancia.

Nuestro equipo está disponible para ayudarle con cualquier necesidad.`,
    amenities: [
      'Cocina de Alta Gama',
      'Aire Acondicionado y Calefacción',
      'Lavadora',
      'Internet WiFi',
      'Estacionamiento en la Calle',
      'Apto para Niños',
      'Ascensor',
      'Diseño Moderno',
      'Materiales de Calidad'
    ],
    highlights: [
      'A 100m de la Plaza Mayor',
      'Diseño exclusivo y moderno',
      'Ubicación en Salamanca',
      'Ideal para familias'
    ],
    rules: [
      'Check-in: 16:00 | Check-out: 11:00',
      'No se permiten mascotas',
      'No se permite fumar en el interior',
      'Máximo de huéspedes: 3',
      'Cancelación 100% hasta 14 días antes',
      'Cancelación 50% hasta 7 días antes'
    ],
    reviews_list: [
      {
        author: 'Huésped Verificado',
        rating: 5,
        date: 'Hace 1 mes',
        text: 'Ubicación inmejorable y decoración bonita, moderna con materiales de calidad. Muy recomendado.'
      },
      {
        author: 'María López',
        rating: 5,
        date: 'Hace 2 meses',
        text: 'El apartamento es perfecto para una estancia en Madrid. Muy bien ubicado y con todas las comodidades.'
      },
      {
        author: 'Carlos Fernández',
        rating: 4,
        date: 'Hace 3 meses',
        text: 'Excelente ubicación, aunque es pequeño pero está muy bien aprovechado.'
      }
    ]
  },
  {
    id: 2,
    slug: 'lujo-boutique-resogar',
    name: 'Lujoso Apartamento Boutique-Resogar',
    zone: 'salamanca',
    subzone: 'plazamayor',
    zoneDisplay: 'Salamanca',
    location: 'Salamanca, a 100m de la Plaza Mayor, Madrid',
    price: 195,
    rating: 5.0,
    reviews: 1,
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
      'https://images.unsplash.com/photo-1583847268991-d6dc95dbab0a?w=1200&q=80',
      'https://images.unsplash.com/photo-1598928335949-0d38fc1bc21f?w=1200&q=80',
      'https://images.unsplash.com/photo-1540932239986-310128078ceb?w=1200&q=80',
      'https://images.unsplash.com/photo-1634184055320-be50a8f33b1d?w=1200&q=80',
      'https://images.unsplash.com/photo-1593696170562-7f4b341d4dda?w=1200&q=80',
      'https://images.unsplash.com/photo-1611925591563-430f63602d4a?w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      'https://images.unsplash.com/photo-1599696556253-c72a6ec1e5e7?w=1200&q=80',
    ],
    description: 'Apartamento boutique de diseño exclusivo con patio interior estilo ibicenco. Lujo y descanso a 100m de la Plaza Mayor.',
    fullDescription: `Lujoso Apto. Boutique a 100m Plaza Mayor. Lujo y descanso a 100m de la Plaza Mayor. Estrena este exclusivo apartamento de diseño, ideal para familias y parejas que buscan estilo y confort.

El anuncio destaca un espacio de diseño exclusivo. Incluye un patio interior estilo ibicenco con césped, cocina de alta gama y aire acondicionado. Este apartamento boutique combina la elegancia contemporánea con el confort de lujo.

Ubicado en plena Salamanca, a apenas 100 metros de la histórica Plaza Mayor, se encuentra en el corazón de Madrid. Cada detalle ha sido cuidadosamente seleccionado para garantizar una experiencia excepcional.

Perfecto para parejas o familias pequeñas que buscan lo mejor de Madrid.`,
    amenities: [
      'Cocina de Alta Gama',
      'Aire Acondicionado',
      'Lavadora',
      'Internet WiFi',
      'Ascensor',
      'Patio Interior Privado',
      'Diseño Moderno',
      'Materiales de Calidad Premium',
      'Apto para Niños'
    ],
    highlights: [
      'Patio interior estilo ibicenco',
      'A 100m de la Plaza Mayor',
      'Diseño exclusivo boutique',
      'Ubicación privilegiada'
    ],
    rules: [
      'Check-in: 16:00 | Check-out: 11:00',
      'No se permiten mascotas',
      'No se permite fumar en el interior',
      'Máximo de huéspedes: 3',
      'Cancelación 100% hasta 14 días antes',
      'Cancelación 50% hasta 7 días antes'
    ],
    reviews_list: [
      {
        author: 'Huésped Internacional',
        rating: 5,
        date: 'Hace 1 mes',
        text: 'Ubicación inmejorable, decoración bonita y moderna con materiales de excelente calidad. Altamente recomendado.'
      },
      {
        author: 'Ana Martínez',
        rating: 5,
        date: 'Hace 2 meses',
        text: 'El patio interior es hermoso, muy bien decorado. Una joya en el corazón de Madrid.'
      },
      {
        author: 'Fernando García',
        rating: 5,
        date: 'Hace 3 meses',
        text: 'Perfecto para una escapada romántica. Muy elegante y cómodo.'
      }
    ]
  },
  {
    id: 3,
    slug: 'lujo-con-patio-privado-resogar',
    name: 'Lujoso Apartamento con Patio Privado-Resogar',
    zone: 'salamanca',
    subzone: 'plazamayor',
    zoneDisplay: 'Salamanca',
    location: 'Salamanca, a 100m de la Plaza Mayor, Madrid',
    price: 215,
    rating: 5.0,
    reviews: 8,
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    image: 'https://images.unsplash.com/photo-1540932239986-310128078ceb?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1540932239986-310128078ceb?w=1200&q=80',
      'https://images.unsplash.com/photo-1604100356244-403189c92e3d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1522909101259-8b5b19b1dcff?w=1200&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80',
      'https://images.unsplash.com/photo-1597696058674-85e7872e5dfb?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1595576142039-4396a3a27b51?w=1200&q=80',
      'https://images.unsplash.com/photo-1611971489207-0a5c5e13aaaa?w=1200&q=80',
    ],
    description: 'Lujoso apartamento con patio privado estilo ibicenco. Lujo y descanso a 100m de la Plaza Mayor.',
    fullDescription: `Lujoso Apartamento con Patio Privado. Lujo y descanso a 100m de la Plaza Mayor. Estrena este exclusivo apartamento de diseño, ideal para familias y parejas que buscan estilo y confort.

Este apartamento de lujo cuenta con un patio interior privado estilo ibicenco con césped, cocina de alta gama, aire acondicionado y diseño moderno. Ubicado en plena Salamanca, a apenas 100 metros de la histórica Plaza Mayor, se encuentra en el corazón de Madrid.

El espacio combina la elegancia contemporánea con el confort de lujo. Cada detalle ha sido cuidadosamente seleccionado para garantizar una experiencia excepcional durante su estancia.

Ideal para parejas o familias pequeñas que desean lo mejor de Madrid con todos los servicios disponibles.`,
    amenities: [
      'Cocina Equipada de Alta Gama',
      'Aire Acondicionado',
      'Lavadora',
      'Apto para Niños',
      'Internet Inalámbrico',
      'Patio Privado Estilo Ibicenco',
      'Diseño Moderno',
      'Materiales Premium',
      'Ascensor',
      'Decoración de Calidad'
    ],
    highlights: [
      'Patio privado con césped',
      'A 100m de la Plaza Mayor',
      'Diseño lujoso y moderno',
      'Ubicación en Salamanca'
    ],
    rules: [
      'Check-in: 16:00 | Check-out: 11:00',
      'No se permiten mascotas',
      'No se permite fumar en el interior',
      'Máximo de huéspedes: 3',
      'Cancelación 100% hasta 14 días antes',
      'Cancelación 50% hasta 7 días antes'
    ],
    reviews_list: [
      {
        author: 'Pareja Joven',
        rating: 5,
        date: 'Hace 1 semana',
        text: 'El patio privado es espectacular, perfectamente diseñado. Una experiencia de lujo incomparable.'
      },
      {
        author: 'María González',
        rating: 5,
        date: 'Hace 2 semanas',
        text: 'Ubicación perfecta y decoración hermosa. Volvería sin dudarlo.'
      },
      {
        author: 'Antonio López',
        rating: 5,
        date: 'Hace 1 mes',
        text: 'Un lujo a 100m de la Plaza Mayor. No se puede pedir más por esta ubicación.'
      }
    ]
  }
];

export function getApartmentBySlug(zone: string, subzone: string, slug: string): Apartment | undefined {
  return apartments.find(apt => apt.zone === zone && apt.subzone === subzone && apt.slug === slug);
}

export function getApartmentsByZone(zone: string): Apartment[] {
  return apartments.filter(apt => apt.zone === zone);
}

export function getApartmentsBySubzone(zone: string, subzone: string): Apartment[] {
  return apartments.filter(apt => apt.zone === zone && apt.subzone === subzone);
}
