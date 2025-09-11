// data/sampleData.ts
import { Car, Property, Hotel, Transfer, Tour, Service } from '../types';

export const services: Service[] = [
  {
    id: 'cars',
    title: 'Car Rentals',
    description: 'Rent premium vehicles for your journey',
    icon: null, // We'll handle this in the component
    path: '/cars',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'properties',
    title: 'Real Estate',
    description: 'Find your perfect property',
    icon: null,
    path: '/properties',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'hotels',
    title: 'Hotels',
    description: 'Book comfortable accommodations',
    icon: null,
    path: '/hotels',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'transfers',
    title: 'Airport Transfers',
    description: 'Reliable airport transportation',
    icon: null,
    path: '/transfers',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'tours',
    title: 'Tours',
    description: 'Discover amazing experiences',
    icon: null,
    path: '/tours',
    color: 'from-indigo-500 to-purple-500'
  }
];

export const sampleCars: Car[] = [
  {
    id: '1',
    brand: 'BMW',
    model: 'X5',
    year: 2023,
    category: 'Luxury',
    pricePerDay: 150,
    rating: 4.8,
    image: '/images/cars/1.jpeg',
    images: ['/images/cars/1.jpeg', '/images/cars/interior/1.jpg, /images/cars/interior/1.jpg,/images/cars/interior/2.jpeg '],
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    features: ['GPS Navigation', 'Bluetooth', 'Leather Seats', 'Sunroof', 'Premium Audio'],
    available: true,
    location: 'Downtown',
    description: 'Experience luxury with this premium BMW X5. Perfect for business trips or special occasions.',
    specifications: {
      engine: '3.0L Twin Turbo',
      horsepower: '335 HP',
      fuelCapacity: '83L',
      baggage: '650L'
    }
  },
  {
    id: '2',
    brand: 'Toyota',
    model: 'Camry',
    year: 2023,
    category: 'Economy',
    pricePerDay: 45,
    rating: 4.5,
    image: '/images/cars/2.jpg',
    images: ['/images/cars/1.jpeg', '/images/cars/interior/1.jpg, /images/cars/interior/2.jpeg,/images/cars/interior/2.jpeg '],
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    features: ['GPS Navigation', 'Bluetooth', 'Backup Camera', 'USB Ports'],
    available: true,
    location: 'Airport',
    description: 'Reliable and fuel-efficient Toyota Camry. Perfect for city driving and long trips.'
  },
  {
    id: '3',
    brand: 'Mercedes',
    model: 'C-Class',
    year: 2023,
    category: 'Luxury',
    pricePerDay: 120,
    rating: 4.9,
    image: '/images/cars/3.jpg',
    images: ['/images/cars/1.jpeg', '/images/cars/interior/3.jpg, /images/cars/interior/3.webp,/images/cars/interior/4.webp '],
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    features: ['GPS Navigation', 'Leather Seats', 'Premium Audio', 'Climate Control'],
    available: true,
    location: 'City Center'
  },
  {
    id: '4',
    brand: 'Honda',
    model: 'CR-V',
    year: 2023,
    category: 'SUV',
    pricePerDay: 75,
    rating: 4.6,
    image: '/images/cars/4.jpg',
    images: ['/images/cars/4.jpg', '/images/cars/interior/4.jpg, /images/cars/interior/4.webp,/images/cars/interior/4.webp '],
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    features: ['GPS Navigation', 'Bluetooth', '7 Seats', 'All-Wheel Drive'],
    available: true,
    location: 'Suburbs'
  },
  {
    id: '5',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2023,
    category: 'Sports',
    pricePerDay: 95,
    rating: 4.7,
    image: '/images/cars/5.jpeg',
    images: ['/images/cars/5.jpeg', '/images/cars/interior/5.webp'],
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Electric',
    features: ['Autopilot', 'Premium Audio', 'Glass Roof', 'Supercharger Access'],
    available: true,
    location: 'Tech District'
  }
];

export const sampleProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    type: 'Apartment',
    listingType: 'Rent',
    price: 2500,
    rating: 4.8,
    location: 'Downtown',
    address: '123 Main Street, Downtown',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    image: '/images/properties/apartment-1.jpg',
    images: ['/images/properties/apartment-1-1.jpg', '/images/properties/apartment-1-2.jpg'],
    features: ['Balcony', 'Gym', 'Pool', 'Parking', 'Pet Friendly'],
    description: 'Beautiful modern apartment in the heart of downtown with stunning city views.',
    agent: {
      name: 'Sarah Johnson',
      phone: '+1-555-0123',
      email: 'sarah@realestate.com'
    }
  },
  {
    id: '2',
    title: 'Luxury Family Villa',
    type: 'Villa',
    listingType: 'Sale',
    price: 850000,
    rating: 4.9,
    location: 'Suburbs',
    address: '456 Oak Avenue, Westfield',
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    image: '/images/properties/villa-1.jpg',
    features: ['Garden', 'Pool', 'Garage', 'Fireplace', 'Study Room'],
    description: 'Stunning luxury villa with spacious rooms and beautiful landscaped gardens.',
    agent: {
      name: 'Michael Brown',
      phone: '+1-555-0456',
      email: 'michael@luxuryrealty.com'
    }
  },
  {
    id: '3',
    title: 'Cozy Studio Loft',
    type: 'Studio',
    listingType: 'Rent',
    price: 1200,
    rating: 4.4,
    location: 'Arts District',
    address: '789 Creative Lane, Arts District',
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    image: '/images/properties/studio-1.jpg',
    features: ['High Ceilings', 'Exposed Brick', 'Modern Kitchen', 'Hardwood Floors'],
    agent: {
      name: 'Emma Davis',
      phone: '+1-555-0789',
      email: 'emma@artsliving.com'
    }
  },
  {
    id: '4',
    title: 'Executive Penthouse',
    type: 'Apartment',
    listingType: 'Sale',
    price: 1200000,
    rating: 5.0,
    location: 'Financial District',
    address: '321 Skyline Tower, Financial District',
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    image: '/images/properties/penthouse-1.jpg',
    features: ['City Views', 'Balcony', 'Concierge', 'Gym', 'Rooftop Access'],
    agent: {
      name: 'Robert Wilson',
      phone: '+1-555-0321',
      email: 'robert@eliterealty.com'
    }
  },
  {
    id: '5',
    title: 'Charming Townhouse',
    type: 'House',
    listingType: 'Rent',
    price: 3200,
    rating: 4.7,
    location: 'Historic District',
    address: '654 Heritage Street, Historic District',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    image: '/images/properties/townhouse-1.jpg',
    features: ['Historic Character', 'Garden', 'Fireplace', 'Updated Kitchen'],
    agent: {
      name: 'Lisa Anderson',
      phone: '+1-555-0654',
      email: 'lisa@heritagehomes.com'
    }
  }
];

export const sampleHotels: Hotel[] = [
  {
    id: '1',
    name: 'Grand Plaza Hotel',
    rating: 4.8,
    location: 'Downtown',
    address: '100 Grand Avenue, Downtown',
    pricePerNight: 180,
    image: '/images/hotels/1.jpg',
    images: ['/images/hotels/1.jpg', '/images/hotels/3.jpeg','/images/hotels/4.jpeg','/images/hotels/5.jpg','/images/hotels/6.jpg,'],
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Room Service'],
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    description: 'Luxury hotel in the heart of downtown with world-class amenities and service.',
    roomTypes: [
      { name: 'Standard Room', price: 180, features: ['City View', 'King Bed', 'Work Desk'], maxGuests: 2 },
      { name: 'Deluxe Suite', price: 280, features: ['City View', 'Separate Living Area', 'Mini Bar'], maxGuests: 4 }
    ]
  },
  {
    id: '2',
    name: 'Oceanview Resort',
    rating: 4.9,
    location: 'Beachfront',
    address: '200 Ocean Drive, Beachfront',
    pricePerNight: 250,
    image: '/images/hotels/2.webp',
    images: ['/images/hotels/1.jpg', '/images/hotels/3.jpeg','/images/hotels/4.jpeg','/images/hotels/5.jpg','/images/hotels/6.jpg,'],
    amenities: ['Beach Access', 'Pool', 'Spa', 'Water Sports', 'Restaurant', 'Bar'],
    checkIn: '4:00 PM',
    checkOut: '12:00 PM',
    description: 'Beautiful beachfront resort with stunning ocean views and luxury amenities.',
    roomTypes: [
      { name: 'Ocean View Room', price: 250, features: ['Ocean View', 'Balcony', 'King Bed'], maxGuests: 2 },
      { name: 'Beach Villa', price: 450, features: ['Private Beach', 'Jacuzzi', 'Kitchen'], maxGuests: 6 }
    ]
  },
  {
    id: '3',
    name: 'Business Center Inn',
    rating: 4.5,
    location: 'Business District',
    address: '300 Corporate Plaza, Business District',
    pricePerNight: 120,
    image: '/images/hotels/3.jpeg',
    images: ['/images/hotels/1.jpg', '/images/hotels/3.jpeg','/images/hotels/4.jpeg','/images/hotels/5.jpg','/images/hotels/6.jpg,'],
    amenities: ['Free WiFi', 'Business Center', 'Meeting Rooms', 'Gym', 'Restaurant'],
    checkIn: '2:00 PM',
    checkOut: '11:00 AM',
    roomTypes: [
      { name: 'Business Room', price: 120, features: ['Work Desk', 'Ergonomic Chair', 'High-speed Internet'], maxGuests: 2 }
    ]
  },
  {
    id: '4',
    name: 'Mountain Lodge',
    rating: 4.7,
    location: 'Mountains',
    address: '400 Alpine Way, Mountain View',
    pricePerNight: 160,
    image: '/images/hotels/4.jpeg',
    images: ['/images/hotels/1.jpg', '/images/hotels/3.jpeg','/images/hotels/4.jpeg','/images/hotels/5.jpg','/images/hotels/6.jpg,'],
    amenities: ['Fireplace', 'Hot Tub', 'Hiking Trails', 'Restaurant', 'Spa'],
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    roomTypes: [
      { name: 'Mountain View Room', price: 160, features: ['Mountain View', 'Fireplace', 'Rustic Decor'], maxGuests: 2 }
    ]
  },
  {
    id: '5',
    name: 'Airport Express Hotel',
    rating: 4.3,
    location: 'Airport',
    address: '500 Airport Boulevard, Airport',
    pricePerNight: 95,
    image: '/images/hotels/6.jpeg',
    images: ['/images/hotels/1.jpg', '/images/hotels/3.jpeg','/images/hotels/4.jpeg','/images/hotels/5.jpg','/images/hotels/6.jpg,'],
    amenities: ['Free Shuttle', 'Free WiFi', '24/7 Check-in', 'Breakfast', 'Gym'],
    checkIn: '24/7',
    checkOut: '12:00 PM',
    roomTypes: [
      { name: 'Express Room', price: 95, features: ['Comfortable Bed', 'Work Area', 'Soundproof'], maxGuests: 2 }
    ]
  }
];

export const sampleTransfers: Transfer[] = [
  {
    id: '1',
    type: 'Airport Pickup',
    vehicleType: 'Luxury Car',
    from: 'International Airport',
    to: 'Downtown Hotels',
    duration: '45 minutes',
    distance: '25 km',
    price: 60,
    maxPassengers: 3,
    image: '/images/transfers/luxury-sedan.jpg',
    features: ['WiFi', 'Water Bottles', 'Phone Charger', 'Professional Driver'],
    available: true,
    description: 'Comfortable luxury transfer from airport to your destination.',
    driver: {
      name: 'James Smith',
      rating: 4.9,
      experience: '8 years'
    }
  },
  {
    id: '2',
    type: 'City Transfer',
    vehicleType: 'SUV',
    from: 'Hotel District',
    to: 'Shopping Mall',
    duration: '20 minutes',
    distance: '12 km',
    price: 35,
    maxPassengers: 6,
    image: '/images/transfers/suv.jpg',
    features: ['Air Conditioning', 'Spacious Interior', 'Bluetooth Audio'],
    available: true,
    driver: {
      name: 'Maria Garcia',
      rating: 4.8,
      experience: '5 years'
    }
  },
  {
    id: '3',
    type: 'Intercity Transfer',
    vehicleType: 'Van',
    from: 'City Center',
    to: 'Neighboring City',
    duration: '2 hours',
    distance: '120 km',
    price: 150,
    maxPassengers: 8,
    image: '/images/transfers/van.jpg',
    features: ['Comfortable Seating', 'Entertainment System', 'Refreshments'],
    available: true,
    driver: {
      name: 'David Johnson',
      rating: 4.7,
      experience: '10 years'
    }
  },
  {
    id: '4',
    type: 'Airport Dropoff',
    vehicleType: 'Sedan',
    from: 'City Hotels',
    to: 'International Airport',
    duration: '40 minutes',
    distance: '22 km',
    price: 45,
    maxPassengers: 4,
    image: '/images/transfers/sedan.jpg',
    features: ['On-time Guarantee', 'Flight Monitoring', 'Professional Service'],
    available: true,
    driver: {
      name: 'Lisa Brown',
      rating: 4.6,
      experience: '6 years'
    }
  },
  {
    id: '5',
    type: 'City Transfer',
    vehicleType: 'Bus',
    from: 'Convention Center',
    to: 'Tourist District',
    duration: '35 minutes',
    distance: '18 km',
    price: 25,
    maxPassengers: 20,
    image: '/images/transfers/bus.jpg',
    features: ['Group Friendly', 'Tour Guide', 'Sightseeing Route'],
    available: true,
    driver: {
      name: 'Carlos Rodriguez',
      rating: 4.5,
      experience: '7 years'
    }
  }
];

export const sampleTours: Tour[] = [
  {
    id: '1',
    title: 'Historic City Walking Tour',
    type: 'Historical',
    duration: '3 hours',
    price: 45,
    rating: 4.8,
    location: 'Old Town',
    maxGroupSize: 15,
    difficulty: 'Easy',
    image: '/images/tours/6.jpg',
    highlights: ['Ancient Architecture', 'Historic Monuments', 'Local Stories', 'Photo Opportunities'],
    included: ['Professional Guide', 'Walking Tour', 'Historical Information'],
    excluded: ['Food & Drinks', 'Transportation', 'Entrance Fees'],
    available: true,
    description: 'Discover the rich history of our city through this engaging walking tour.',
    itinerary: [
      { time: '9:00 AM', activity: 'Meeting Point', description: 'Meet at the main square' },
      { time: '9:15 AM', activity: 'Historic District', description: 'Explore ancient buildings' },
      { time: '11:00 AM', activity: 'Monument Visit', description: 'Learn about local heroes' }
    ],
    guide: {
      name: 'Professor Williams',
      rating: 4.9,
      specialties: ['Local History', 'Architecture', 'Storytelling']
    },
    category:'categoy A',
    groupSize: undefined,
    schedule: false
  },
  {
    id: '2',
    title: 'Historic City Walking Tour',
    type: 'Historical',
    duration: '3 hours',
    price: 45,
    rating: 4.8,
    location: 'Old Town',
    maxGroupSize: 15,
    difficulty: 'Easy',
    image: '/images/tours/2.jpeg',
    highlights: ['Ancient Architecture', 'Historic Monuments', 'Local Stories', 'Photo Opportunities'],
    included: ['Professional Guide', 'Walking Tour', 'Historical Information'],
    excluded: ['Food & Drinks', 'Transportation', 'Entrance Fees'],
    available: true,
    description: 'Discover the rich history of our city through this engaging walking tour.',
    itinerary: [
      { time: '9:00 AM', activity: 'Meeting Point', description: 'Meet at the main square' },
      { time: '9:15 AM', activity: 'Historic District', description: 'Explore ancient buildings' },
      { time: '11:00 AM', activity: 'Monument Visit', description: 'Learn about local heroes' }
    ],
    guide: {
      name: 'Professor Williams',
      rating: 4.9,
      specialties: ['Local History', 'Architecture', 'Storytelling']
    },
    category:'categoy A',
    groupSize: undefined,
    schedule: false
  },
  {
    id: '3',
    title: 'Cultural Food & Wine Experience',
    type: 'Food & Wine',
    duration: '4 hours',
    price: 75,
    rating: 4.9,
    location: 'Cultural Quarter',
    maxGroupSize: 12,
    difficulty: 'Easy',
    image: '/images/tours/3.jpeg',
    highlights: ['Local Cuisine', 'Wine Tasting', 'Cooking Demo', 'Cultural Stories'],
    included: ['Food Tastings', 'Wine Samples', 'Recipe Cards', 'Expert Guide'],
    excluded: ['Additional Drinks', 'Full Meals', 'Transportation'],
    available: true,
    itinerary: [
      { time: '2:00 PM', activity: 'Market Visit', description: 'Explore local ingredients' },
      { time: '3:00 PM', activity: 'Cooking Class', description: 'Learn traditional recipes' },
      { time: '5:00 PM', activity: 'Wine Tasting', description: 'Sample regional wines' }
    ],
    guide: {
      name: 'Chef Isabella',
      rating: 5.0,
      specialties: ['Local Cuisine', 'Wine Pairing', 'Cultural History']
    },
    category:'categoy A',
    groupSize: undefined,
    schedule: false
  },
  {
    id: '4',
    title: 'Nature Photography Safari',
    type: 'Nature',
    duration: '5 hours',
    price: 95,
    rating: 4.6,
    location: 'National Park',
    maxGroupSize: 8,
    difficulty: 'Moderate',
    image: '/images/tours/4.jpg',
    highlights: ['Wildlife Photography', 'Scenic Landscapes', 'Expert Tips', 'Rare Species'],
    included: ['Photography Guide', 'Equipment Rental', 'Photo Editing Tips'],
    excluded: ['Camera Equipment', 'Lunch', 'Park Entry Fee'],
    available: true,
    itinerary: [
      { time: '6:00 AM', activity: 'Park Entrance', description: 'Early morning wildlife activity' },
      { time: '8:00 AM', activity: 'Wildlife Spotting', description: 'Photograph native animals' },
      { time: '10:00 AM', activity: 'Landscape Session', description: 'Capture scenic vistas' }
    ],
    guide: {
      name: 'Tom Photographer',
      rating: 4.7,
      specialties: ['Wildlife Photography', 'Nature Conservation', 'Camera Techniques']
    },
    category:'categoy A',
    groupSize: undefined,
    schedule: false
  },
  {
    id: '5',
    title: 'City Highlights Bus Tour',
    type: 'City Tour',
    duration: '2 hours',
    price: 35,
    rating: 4.4,
    location: 'City Center',
    maxGroupSize: 25,
    difficulty: 'Easy',
    image: '/images/tours/5.jpg',
    highlights: ['Major Landmarks', 'Hop-on Hop-off', 'Audio Guide', 'City Overview'],
    included: ['Bus Transportation', 'Audio Commentary', 'Route Map'],
    excluded: ['Entrance Fees', 'Food & Drinks', 'Personal Guide'],
    available: true,
    itinerary: [
      { time: '10:00 AM', activity: 'City Center', description: 'Start from main plaza' },
      { time: '10:30 AM', activity: 'Museums District', description: 'Drive through cultural area' },
      { time: '11:30 AM', activity: 'Waterfront', description: 'Scenic coastal views' }
    ],
    guide: {
      name: 'City Tours Inc.',
      rating: 4.2,
      specialties: ['City Knowledge', 'Tourist Services', 'Multi-language']
    },
    category:'categoy A',
    groupSize: undefined,
    schedule: false
  }
];