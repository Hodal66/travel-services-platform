import type { Car, Property, Hotel, Transfer, Tour, Service } from '../types';
import { Car as CarIcon, Home, Hotel as HotelIcon, Plane, MapPin } from 'lucide-react';
import React from 'react';

// Services Configuration
export const services: Service[] = [
  {
    id: 'cars',
    title: 'Car Rentals',
    description: 'Rent premium vehicles for your journey',
    icon: React.createElement(CarIcon, { className: 'w-8 h-8' }),
    path: '/cars',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'properties',
    title: 'Real Estate',
    description: 'Find your perfect property',
    icon: React.createElement(Home, { className: 'w-8 h-8' }),
    path: '/properties',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'hotels',
    title: 'Hotels',
    description: 'Book comfortable accommodations',
    icon: React.createElement(HotelIcon, { className: 'w-8 h-8' }),
    path: '/hotels',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'transfers',
    title: 'Airport Transfers',
    description: 'Reliable airport transportation',
    icon: React.createElement(Plane, { className: 'w-8 h-8' }),
    path: '/transfers',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'tours',
    title: 'Tours',
    description: 'Discover amazing experiences',
    icon: React.createElement(MapPin, { className: 'w-8 h-8' }),
    path: '/tours',
    color: 'from-indigo-500 to-purple-500'
  }
];

// Car Rentals Sample Data
export const sampleCars: Car[] = [
  {
    id: 'car-1',
    brand: 'Toyota',
    model: 'Camry',
    year: 2023,
    category: 'Economy',
    pricePerDay: 45,
    features: ['Air Conditioning', 'GPS Navigation', 'Bluetooth', 'USB Ports'],
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&h=300&fit=crop',
    rating: 4.5,
    available: true,
    location: 'Downtown'
  },
  {
    id: 'car-2',
    brand: 'BMW',
    model: 'X5',
    year: 2024,
    category: 'Luxury SUV',
    pricePerDay: 120,
    features: ['Leather Seats', 'Panoramic Sunroof', 'Premium Audio', 'Heated Seats'],
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    seats: 7,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop',
    rating: 4.8,
    available: true,
    location: 'Airport'
  },
  {
    id: 'car-3',
    brand: 'Ford',
    model: 'Focus',
    year: 2022,
    category: 'Compact',
    pricePerDay: 35,
    features: ['Air Conditioning', 'USB Ports', 'Compact Design'],
    transmission: 'Manual',
    fuelType: 'Petrol',
    seats: 5,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=300&fit=crop',
    rating: 4.2,
    available: true,
    location: 'City Center'
  },
  {
    id: 'car-4',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2024,
    category: 'Luxury',
    pricePerDay: 95,
    features: ['Autopilot', 'Premium Interior', 'Supercharging', 'Over-the-air Updates'],
    transmission: 'Automatic',
    fuelType: 'Electric',
    seats: 5,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500&h=300&fit=crop',
    rating: 4.9,
    available: true,
    location: 'Tech District'
  },
  {
    id: 'car-5',
    brand: 'Honda',
    model: 'CR-V',
    year: 2023,
    category: 'SUV',
    pricePerDay: 65,
    features: ['All-Wheel Drive', 'Honda Sensing Safety Suite', 'Apple CarPlay', 'Android Auto'],
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    seats: 5,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop',
    rating: 4.6,
    available: true,
    location: 'Suburban'
  },
  {
    id: 'car-6',
    brand: 'Mercedes',
    model: 'E-Class',
    year: 2024,
    category: 'Luxury',
    pricePerDay: 110,
    features: ['Premium Sound', 'Massage Seats', 'Ambient Lighting', 'Driver Assistance'],
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    seats: 5,
    image: 'https://images.unsplash.com/photo-1563720223420-8c1e76c8dc6b?w=500&h=300&fit=crop',
    rating: 4.7,
    available: true,
    location: 'Luxury District'
  }
];

// Real Estate Sample Data
export const sampleProperties: Property[] = [
  {
    id: 'prop-1',
    title: 'Downtown Luxury Apartment',
    type: 'Apartment',
    listingType: 'Sale',
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    location: 'Downtown',
    features: ['City View', 'Balcony', 'Modern Kitchen', 'Parking'],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop',
    rating: 4.7,
    available: true,
    description: 'Stunning downtown apartment with panoramic city views and modern amenities.'
  },
  {
    id: 'prop-2',
    title: 'Suburban Family House',
    type: 'House',
    listingType: 'Rent',
    price: 2500,
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    location: 'Suburbia',
    features: ['Garden', 'Garage', 'Fireplace', 'Updated Kitchen'],
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=300&fit=crop',
    rating: 4.8,
    available: true,
    description: 'Spacious family home in quiet suburban neighborhood with excellent schools nearby.'
  },
  {
    id: 'prop-3',
    title: 'Oceanview Villa',
    type: 'Villa',
    listingType: 'Sale',
    price: 1200000,
    bedrooms: 5,
    bathrooms: 4,
    area: 3500,
    location: 'Coastal Area',
    features: ['Ocean View', 'Private Pool', 'Chef Kitchen', 'Wine Cellar'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop',
    rating: 4.9,
    available: true,
    description: 'Breathtaking oceanfront villa with private beach access and luxury amenities.'
  },
  {
    id: 'prop-4',
    title: 'City Center Studio',
    type: 'Studio',
    listingType: 'Rent',
    price: 1200,
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    location: 'City Center',
    features: ['Modern Design', 'High Ceilings', 'Close to Transit'],
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop',
    rating: 4.3,
    available: true,
    description: 'Stylish studio apartment in the heart of the city with easy access to everything.'
  },
  {
    id: 'prop-5',
    title: 'Modern Townhouse',
    type: 'Townhouse',
    listingType: 'Sale',
    price: 650000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    location: 'Midtown',
    features: ['Rooftop Deck', 'Smart Home', 'Attached Garage', 'Energy Efficient'],
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&h=300&fit=crop',
    rating: 4.5,
    available: true,
    description: 'Contemporary townhouse with smart home features and rooftop entertainment space.'
  },
  {
    id: 'prop-6',
    title: 'Penthouse Suite',
    type: 'Condo',
    listingType: 'Sale',
    price: 850000,
    bedrooms: 3,
    bathrooms: 3,
    area: 2000,
    location: 'Financial District',
    features: ['Panoramic Views', 'Concierge Service', 'Gym Access', 'Valet Parking'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=300&fit=crop',
    rating: 4.8,
    available: true,
    description: 'Exclusive penthouse with 360-degree city views and premium building amenities.'
  }
];

// Hotels Sample Data
export const sampleHotels: Hotel[] = [
  {
    id: 'hotel-1',
    name: 'Grand Plaza Hotel',
    rating: 5,
    location: 'City Center',
    pricePerNight: 250,
    amenities: ['Outdoor Pool', 'Full-Service Spa', 'Fine Dining Restaurant', 'Fitness Center', 'Concierge'],
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&h=300&fit=crop',
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    available: true,
    description: 'Luxury hotel in the heart of the city with world-class amenities and service.'
  },
  {
    id: 'hotel-2',
    name: 'Budget Inn Express',
    rating: 3,
    location: 'Airport Area',
    pricePerNight: 75,
    amenities: ['Free WiFi', 'Free Parking', 'Continental Breakfast', '24/7 Front Desk'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
    checkIn: '2:00 PM',
    checkOut: '10:00 AM',
    available: true,
    description: 'Comfortable and affordable accommodation near the airport with essential amenities.'
  },
  {
    id: 'hotel-3',
    name: 'Boutique Beach Resort',
    rating: 4,
    location: 'Beach Front',
    pricePerNight: 180,
    amenities: ['Private Beach Access', 'Infinity Pool', 'Beach Bar', 'Water Sports', 'Spa Services'],
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&h=300&fit=crop',
    checkIn: '4:00 PM',
    checkOut: '12:00 PM',
    available: true,
    description: 'Intimate beachfront resort with personalized service and stunning ocean views.'
  },
  {
    id: 'hotel-4',
    name: 'Executive Business Hotel',
    rating: 4,
    location: 'Business District',
    pricePerNight: 140,
    amenities: ['Conference Rooms', 'Business Center', 'Executive Lounge', 'Gym', 'Restaurant'],
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&h=300&fit=crop',
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    available: true,
    description: 'Modern business hotel designed for corporate travelers and meetings.'
  },
  {
    id: 'hotel-5',
    name: 'Family Fun Lodge',
    rating: 3,
    location: 'Suburban',
    pricePerNight: 95,
    amenities: ['Kids Pool', 'Playground', 'Family Rooms', 'Game Room', 'Free Breakfast'],
    image: 'https://images.unsplash.com/photo-1587985064135-0366536eab42?w=500&h=300&fit=crop',
    checkIn: '2:00 PM',
    checkOut: '10:00 AM',
    available: true,
    description: 'Family-friendly hotel with activities and amenities for guests of all ages.'
  },
  {
    id: 'hotel-6',
    name: 'Historic Boutique Inn',
    rating: 4,
    location: 'Old Town',
    pricePerNight: 160,
    amenities: ['Historic Architecture', 'Rooftop Terrace', 'Artisan Restaurant', 'Wine Bar'],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=300&fit=crop',
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    available: true,
    description: 'Charming historic inn blending old-world elegance with modern comfort.'
  }
];

// Airport Transfers Sample Data
export const sampleTransfers: Transfer[] = [
  {
    id: 'transfer-1',
    vehicleType: 'Airport Sedan',
    capacity: 4,
    pricePerKm: 2.5,
    basePrice: 15,
    features: ['Air Conditioning', 'WiFi', 'Complimentary Water', 'Phone Charger'],
    duration: '30-45 min',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&h=300&fit=crop',
    rating: 4.6,
    available: true
  },
  {
    id: 'transfer-2',
    vehicleType: 'Luxury SUV',
    capacity: 6,
    pricePerKm: 4.0,
    basePrice: 25,
    features: ['Premium Leather', 'Entertainment System', 'Refreshments', 'Professional Chauffeur'],
    duration: '25-40 min',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&h=300&fit=crop',
    rating: 4.8,
    available: true
  },
  {
    id: 'transfer-3',
    vehicleType: 'Minivan',
    capacity: 8,
    pricePerKm: 3.0,
    basePrice: 20,
    features: ['Extra Luggage Space', 'Family Friendly', 'AC', 'USB Charging Ports'],
    duration: '35-50 min',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=300&fit=crop',
    rating: 4.4,
    available: true
  },
  {
    id: 'transfer-4',
    vehicleType: 'Economy Car',
    capacity: 4,
    pricePerKm: 2.0,
    basePrice: 10,
    features: ['Budget Friendly', 'GPS Navigation', 'AC'],
    duration: '30-45 min',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=500&h=300&fit=crop',
    rating: 4.2,
    available: true
  },
  {
    id: 'transfer-5',
    vehicleType: 'Bus Transfer',
    capacity: 20,
    pricePerKm: 1.5,
    basePrice: 50,
    features: ['WiFi', 'AC', 'Large Luggage Compartment', 'Comfortable Seating'],
    duration: '45-60 min',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=500&h=300&fit=crop',
    rating: 4.3,
    available: true
  },
  {
    id: 'transfer-6',
     vehicleType: 'Bus Transfer',
    capacity: 12,
    pricePerKm: 3.5,
    basePrice: 30,
    features: ['Executive Seating', 'Conference Setup', 'WiFi', 'Refreshments'],
    duration: '30-45 min',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bac6dd5d85?w=500&h=300&fit=crop',
    rating: 4.5,
    available: true
  }
];

// Tours Sample Data
export const sampleTours: Tour[] = [
  {
    id: 'tour-1',
    title: 'Historic City Walking Tour',
    category: 'Cultural',
    duration: '3 hours',
    price: 35,
    groupSize: 15,
    difficulty: 'Easy',
    highlights: ['Historic Cathedral', 'Old Market Square', 'Local Museum', 'Traditional Architecture'],
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73837?w=500&h=300&fit=crop',
    rating: 4.7,
    available: true,
    description: 'Explore the rich history of our city with an expert local guide.',
    schedule: ['9:00 AM - Meet at City Hall', '9:30 AM - Cathedral Visit', '11:00 AM - Market Tour', '12:00 PM - Museum & End']
  },
  {
    id: 'tour-2',
    title: 'Mountain Adventure Trek',
    category: 'Adventure',
    duration: 'Full day',
    price: 120,
    groupSize: 10,
    difficulty: 'Challenging',
    highlights: ['Summit Views', 'Wildlife Spotting', 'Photography Opportunities', 'Alpine Lakes'],
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=300&fit=crop',
    rating: 4.9,
    available: true,
    description: 'Challenging mountain trek with breathtaking views and wildlife encounters.',
    schedule: ['7:00 AM - Departure', '8:30 AM - Trail Start', '12:00 PM - Summit Lunch', '4:00 PM - Return']
  },
  {
    id: 'tour-3',
    title: 'Culinary Food Tour',
    category: 'Food',
    duration: '4 hours',
    price: 85,
    groupSize: 12,
    difficulty: 'Easy',
    highlights: ['Local Specialties', 'Wine Tasting', 'Cooking Demonstration', 'Market Visit'],
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=300&fit=crop',
    rating: 4.8,
    available: true,
    description: 'Taste your way through the city with local chefs and food experts.',
    schedule: ['2:00 PM - Food Market', '3:00 PM - Restaurant Visits', '4:30 PM - Cooking Class', '6:00 PM - Wine Tasting']
  },
  {
    id: 'tour-4',
    title: 'Historical Sites Discovery',
    category: 'Cultural',
    duration: 'Half day',
    price: 65,
    groupSize: 20,
    difficulty: 'Moderate',
    highlights: ['Ancient Ruins', 'Historical Monuments', 'Guided Stories', 'Photo Opportunities'],
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=500&h=300&fit=crop',
    rating: 4.6,
    available: true,
    description: 'Journey through time visiting the most significant historical sites.',
    schedule: ['1:00 PM - Ancient Ruins', '2:30 PM - Monument Plaza', '3:30 PM - Heritage Museum', '5:00 PM - End']
  },
  {
    id: 'tour-5',
    title: 'Nature Safari Experience',
    category: 'Nature',
    duration: '2 days',
    price: 300,
    groupSize: 8,
    difficulty: 'Moderate',
    highlights: ['Wildlife Viewing', 'Night Safari', 'Professional Guide', 'Photography Workshop'],
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&h=300&fit=crop',
    rating: 4.9,
    available: true,
    description: 'Immersive wildlife experience with expert naturalist guides.',
    schedule: ['Day 1: Morning Safari, Afternoon Photography', 'Day 2: Dawn Safari, Nature Walk, Return']
  },
  {
    id: 'tour-6',
    title: 'Sunset Harbor Cruise',
    category: 'Nature',
    duration: '2.5 hours',
    price: 55,
    groupSize: 25,
    difficulty: 'Easy',
    highlights: ['Sunset Views', 'Harbor Sights', 'Refreshments', 'Live Commentary'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop',
    rating: 4.5,
    available: true,
    description: 'Relaxing cruise through the harbor with stunning sunset views.',
    schedule: ['6:00 PM - Boarding', '6:30 PM - Departure', '7:30 PM - Sunset Views', '8:30 PM - Return to Dock']
  }
];