// Apartment
export interface Apartment {
  id: string;
  name: string;
  description: string;
  capacity: number;
  bedrooms: number;
  amenities: string[];
  images: string[];
  location: string;
  price_per_night: number;
  created_at: string;
}

// Reservation
export interface Reservation {
  id: string;
  apartment_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string; // ISO date
  check_out: string; // ISO date
  guests_count: number;
  total_price: number;
  payment_method: 'stripe' | 'paypal' | 'transfer';
  payment_status: 'pending' | 'confirmed' | 'failed';
  refund_percentage: number | null;
  special_requests: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

// Review
export interface Review {
  id: string;
  reservation_id: string;
  apartment_id: string;
  guest_name: string;
  rating: number; // 1-5
  comment: string;
  approved: boolean;
  created_at: string;
}

// Blocked dates
export interface BlockedDate {
  id: string;
  apartment_id: string;
  date: string; // ISO date
  reason: string;
}

// User (admin/owner)
export interface User {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
}
