/* eslint-disable @typescript-eslint/no-explicit-any */
// Common types
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

// Car Rental Types
export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: 'Economy' | 'Compact' | 'Luxury' | 'SUV' | 'Luxury SUV' | 'Minivan';
  pricePerDay: number;
  features: string[];
  transmission: 'Manual' | 'Automatic';
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  seats: number;
  image: string;
  rating: number;
  available: boolean;
  location?: string;
}

export interface CarFilters {
  category?: string;
  priceRange?: [number, number];
  transmission?: string;
  fuelType?: string;
  seats?: number;
}

// Real Estate Types
export interface Property {
  id: string;
  title: string;
  type: 'Apartment' | 'House' | 'Villa' | 'Condo' | 'Studio' | 'Townhouse';
  listingType: 'Sale' | 'Rent';
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  features: string[];
  image: string;
  description?: string;
  rating: number;
  available: boolean;
}

export interface PropertyFilters {
  type?: string;
  listingType?: string;
  priceRange?: [number, number];
  bedrooms?: number;
  bathrooms?: number;
  location?: string;
}

// Hotel Types
export interface Hotel {
  id: string;
  name: string;
  rating: number;
  location: string;
  pricePerNight: number;
  amenities: string[];
  image: string;
  description?: string;
  checkIn: string;
  checkOut: string;
  roomTypes?: RoomType[];
  available: boolean;
}

export interface RoomType {
  id: string;
  name: string;
  capacity: number;
  price: number;
  features: string[];
}

export interface HotelFilters {
  rating?: number;
  priceRange?: [number, number];
  amenities?: string[];
  location?: string;
}

// Transfer Types
export interface Transfer {
  id: string;
  vehicleType: 'Airport Sedan' | 'Luxury SUV' | 'Minivan' | 'Economy Car' | 'Bus Transfer';
  capacity: number;
  pricePerKm: number;
  basePrice: number;
  features: string[];
  duration: string;
  image: string;
  rating: number;
  available: boolean;
  pickup?: string;
  destination?: string;
}

export interface TransferFilters {
  vehicleType?: string;
  capacity?: number;
  priceRange?: [number, number];
}

// Tour Types
export interface Tour {
  id: string;
  title: string;
  category: 'Cultural' | 'Adventure' | 'Nature' | 'City' | 'Food';
  duration: string;
  price: number;
  groupSize: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  highlights: string[];
  included?: string[];
  image: string;
  description?: string;
  schedule?: string[];
  rating: number;
  available: boolean;
}

export interface TourFilters {
  category?: string;
  difficulty?: string;
  priceRange?: [number, number];
  duration?: string;
}

// Booking Types
export interface BookingDetails {
  id: string;
  serviceType: 'car' | 'property' | 'hotel' | 'transfer' | 'tour';
  serviceId: string;
  userId: string;
  startDate: Date;
  endDate?: Date;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

// Common Component Props
export interface ServiceCardProps {
  title: string;
  price: number;
  image: string;
  rating: number;
  onBook: () => void;
  children?: React.ReactNode;
}

export interface FilterProps {
  onFilter: (filters: any) => void;
  resetFilters: () => void;
}

// Navigation Types
export type PageType = 'home' | 'cars' | 'properties' | 'hotels' | 'transfers' | 'tours';