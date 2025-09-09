import { ReactNode } from "react";

// // Common types
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode | null;
  path: string;
  color: string;
}
export interface CarFilters {
  category?: string;
  priceRange?: [number, number];
  transmission?: string;
  fuelType?: string;
  seats?: number;
}

export interface HotelFilters {
  rating?: number;
  priceRange?: [number, number];
  amenities?: string[];
  location?: string;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: 'Economy' | 'Compact' | 'SUV' | 'Luxury' | 'Sports';
  pricePerDay: number;
  rating: number;
  image: string;
  images?: string[];
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  features: string[];
  available: boolean;
  location: string;
  description?: string;
  specifications?: {
    engine: string;
    horsepower: string;
    fuelCapacity: string;
    baggage: string;
  };
}

export interface Property {
  id: string;
  title: string;
  type: 'Apartment' | 'House' | 'Villa' | 'Condo' | 'Studio';
  listingType: 'Sale' | 'Rent';
  price: number;
  rating: number;
  location: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  images?: string[];
  features: string[];
  description?: string;
  agent: {
    name: string;
    phone: string;
    email: string;
  };
}

export interface Hotel {
  id: string;
  name: string;
  rating: number;
  location: string;
  address: string;
  pricePerNight: number;
  image: string;
  images?: string[];
  amenities: string[];
  checkIn: string;
  checkOut: string;
  description?: string;
  roomTypes: Array<{
    name: string;
    price: number;
    features: string[];
    maxGuests: number;
  }>;
}

export interface Transfer {
  id: string;
  type: 'Airport Pickup' | 'Airport Dropoff' | 'City Transfer' | 'Intercity Transfer';
  vehicleType: 'Sedan' | 'SUV' | 'Van' | 'Luxury Car' | 'Bus';
  from: string;
  to: string;
  duration: string;
  distance: string;
  price: number;
  maxPassengers: number;
  image: string;
  images?: string[];
  features: string[];
  available: boolean;
  description?: string;
  driver: {
    name: string;
    rating: number;
    experience: string;
  };
}

export interface Tour {
  category:string,
  groupSize: ReactNode;
  schedule: boolean;
  id: string;
  title: string;
  type: 'City Tour' | 'Adventure' | 'Cultural' | 'Nature' | 'Historical' | 'Food & Wine';
  duration: string;
  price: number;
  rating: number;
  location: string;
  maxGroupSize: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  image: string;
  images?: string[];
  highlights: string[];
  included: string[];
  excluded: string[];
  available: boolean;
  description?: string;
  itinerary: Array<{
    time: string;
    activity: string;
    description: string;
  }>;
  guide: {
    name: string;
    rating: number;
    specialties: string[];
  };
}