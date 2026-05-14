export interface Apartment {
  id: number;
  slug: string;
  name: string;
  zone: string;
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
    slug: 'pradillo-premium-ii',
    name: 'Lujoso Apartamento en Centro Histórico',
    zone: 'chamartin',
    zoneDisplay: 'Chamartín',
    location: 'Salamanca, a 100m de la Plaza Mayor, Madrid',
    price: 185,
    rating: 4.65,
    reviews: 3,
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    image: 'https://via.placeholder.com/1200x700?text=Apartamento+Centro',
    images: [
      'https://via.placeholder.com/1200x700?text=Centro+1',
      'https://via.placeholder.com/1200x700?text=Centro+2',
      'https://via.placeholder.com/1200x700?text=Centro+3',
      'https://via.placeholder.com/1200x700?text=Centro+4',
      'https://via.placeholder.com/1200x700?text=Centro+5',
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
    slug: 'recoletos-elegance',
    name: 'Lujoso Apto. Boutique a 100m Plaza Mayor',
    zone: 'salamanca',
    zoneDisplay: 'Salamanca',
    location: 'Salamanca, a 100m de la Plaza Mayor, Madrid',
    price: 195,
    rating: 5.0,
    reviews: 1,
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    image: 'https://via.placeholder.com/1200x700?text=Boutique+Plaza+Mayor',
    images: [
      'https://via.placeholder.com/1200x700?text=Boutique+1',
      'https://via.placeholder.com/1200x700?text=Boutique+2',
      'https://via.placeholder.com/1200x700?text=Boutique+3',
      'https://via.placeholder.com/1200x700?text=Boutique+4',
      'https://via.placeholder.com/1200x700?text=Boutique+5',
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
    slug: 'vista-real-penthouse',
    name: 'Lujoso Apartamento con Patio Privado',
    zone: 'centro-historico',
    zoneDisplay: 'Centro Histórico',
    location: 'Salamanca, a 100m de la Plaza Mayor, Madrid',
    price: 215,
    rating: 5.0,
    reviews: 8,
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    image: 'https://via.placeholder.com/1200x700?text=Patio+Privado',
    images: [
      'https://via.placeholder.com/1200x700?text=Patio+1',
      'https://via.placeholder.com/1200x700?text=Patio+2',
      'https://via.placeholder.com/1200x700?text=Patio+3',
      'https://via.placeholder.com/1200x700?text=Patio+4',
      'https://via.placeholder.com/1200x700?text=Patio+5',
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

export function getApartmentBySlug(zone: string, slug: string): Apartment | undefined {
  return apartments.find(apt => apt.zone === zone && apt.slug === slug);
}

export function getApartmentsByZone(zone: string): Apartment[] {
  return apartments.filter(apt => apt.zone === zone);
}
