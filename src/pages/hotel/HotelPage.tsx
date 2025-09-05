/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
// import  { useState, useMemo } from 'react';



// import { Star, MapPin, Filter, SortDesc, Calendar, Wifi, Car, Coffee, Dumbbell } from 'lucide-react';
// import type { Hotel, HotelFilters } from '../../types';
// import { sampleHotels } from '../../data/sampleData';

// const HotelsPage: React.FC = () => {
//   const [filters, setFilters] = useState<HotelFilters>({});
//   const [sortBy, setSortBy] = useState<'price' | 'rating'>('price');
//   const [showFilters, setShowFilters] = useState(false);
//   const [checkIn, setCheckIn] = useState('');
//   const [checkOut, setCheckOut] = useState('');
//   const [guests, setGuests] = useState(1);

//   // Filter and sort hotels
//   const filteredHotels = useMemo(() => {
//     let filtered = sampleHotels.filter(hotel => {
//       if (filters.rating && hotel.rating < filters.rating) return false;
//       if (filters.location && !hotel.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
//       if (filters.priceRange) {
//         const [min, max] = filters.priceRange;
//         if (hotel.pricePerNight < min || hotel.pricePerNight > max) return false;
//       }
//       if (filters.amenities && filters.amenities.length > 0) {
//         const hasAllAmenities = filters.amenities.every(amenity => 
//           hotel.amenities.some(hotelAmenity => 
//             hotelAmenity.toLowerCase().includes(amenity.toLowerCase())
//           )
//         );
//         if (!hasAllAmenities) return false;
//       }
//       return true;
//     });

//     // Sort hotels
//     filtered.sort((a, b) => {
//       switch (sortBy) {
//         case 'price':
//           return a.pricePerNight - b.pricePerNight;
//         case 'rating':
//           return b.rating - a.rating;
//         default:
//           return 0;
//       }
//     });

//     return filtered;
//   }, [filters, sortBy]);

//   const resetFilters = () => {
//     setFilters({});
//   };

//   const getAmenityIcon = (amenity: string) => {
//     const lowerAmenity = amenity.toLowerCase();
//     if (lowerAmenity.includes('wifi')) return <Wifi className="w-4 h-4" />;
//     if (lowerAmenity.includes('parking')) return <Car className="w-4 h-4" />;
//     if (lowerAmenity.includes('breakfast')) return <Coffee className="w-4 h-4" />;
//     if (lowerAmenity.includes('gym') || lowerAmenity.includes('fitness')) return <Dumbbell className="w-4 h-4" />;
//     return <Star className="w-4 h-4" />;
//   };

//   const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => (
//     <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
//       <div className="relative overflow-hidden">
//         <img 
//           src={hotel.image} 
//           alt={hotel.name} 
//           className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
//         />
//         <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 shadow-lg">
//           <div className="flex items-center">
//             {[...Array(hotel.rating)].map((_, i) => (
//               <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
//             ))}
//             <span className="ml-1 text-xs font-semibold text-gray-700">{hotel.rating}</span>
//           </div>
//         </div>
//         <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
//           {hotel.location}
//         </div>
//       </div>
      
//       <div className="p-6">
//         <div className="mb-4">
//           <h3 className="text-xl font-bold text-gray-900 mb-2">
//             {hotel.name}
//           </h3>
//           <div className="flex items-center text-gray-600 mb-2">
//             <MapPin className="w-4 h-4 mr-1" />
//             <span className="text-sm">{hotel.location}</span>
//           </div>
//           <div className="flex items-center text-gray-600 text-sm">
//             <Calendar className="w-4 h-4 mr-1" />
//             Check-in: {hotel.checkIn} | Check-out: {hotel.checkOut}
//           </div>
//         </div>

//         <div className="mb-6">
//           <h4 className="text-sm font-semibold text-gray-700 mb-2">Amenities</h4>
//           <div className="flex flex-wrap gap-2">
//             {hotel.amenities.slice(0, 4).map((amenity, index) => (
//               <div 
//                 key={index} 
//                 className="flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
//               >
//                 {getAmenityIcon(amenity)}
//                 <span className="ml-1">{amenity}</span>
//               </div>
//             ))}
//             {hotel.amenities.length > 4 && (
//               <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
//                 +{hotel.amenities.length - 4} more
//               </span>
//             )}
//           </div>
//         </div>
        
//         <div className="flex justify-between items-center">
//           <div>
//             <span className="text-3xl font-bold text-purple-600">
//               ${hotel.pricePerNight}
//             </span>
//             <span className="text-gray-600 ml-1">/night</span>
//           </div>
//           <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
//             Book Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Hotels</h1>
//           <p className="text-xl text-gray-600">
//             Book comfortable accommodations for your perfect stay
//           </p>
//         </div>

//         {/* Booking Search */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
//               <input
//                 type="date"
//                 value={checkIn}
//                 onChange={(e) => setCheckIn(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
//               <input
//                 type="date"
//                 value={checkOut}
//                 onChange={(e) => setCheckOut(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
//               <select
//                 value={guests}
//                 onChange={(e) => setGuests(Number(e.target.value))}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               >
//                 <option value="1">1 Guest</option>
//                 <option value="2">2 Guests</option>
//                 <option value="3">3 Guests</option>
//                 <option value="4">4 Guests</option>
//                 <option value="5">5+ Guests</option>
//               </select>
//             </div>
//             <div className="flex items-end">
//               <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors font-medium">
//                 Search Hotels
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Filters and Sort */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//             <div className="flex flex-wrap items-center gap-4">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//               >
//                 <Filter className="w-4 h-4 mr-2" />
//                 Filters
//               </button>

//               {/* Quick Filters */}
//               <select
//                 value={filters.rating || ''}
//                 onChange={(e) => setFilters({...filters, rating: Number(e.target.value) || undefined})}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               >
//                 <option value="">Any Rating</option>
//                 <option value="3">3+ Stars</option>
//                 <option value="4">4+ Stars</option>
//                 <option value="5">5 Stars</option>
//               </select>

//               <input
//                 type="text"
//                 placeholder="Location"
//                 value={filters.location || ''}
//                 onChange={(e) => setFilters({...filters, location: e.target.value || undefined})}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />

//               <button
//                 onClick={resetFilters}
//                 className="px-4 py-2 text-purple-600 hover:text-purple-800 transition-colors"
//               >
//                 Clear All
//               </button>
//             </div>

//             <div className="flex items-center gap-4">
//               <span className="text-gray-600">Sort by:</span>
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value as 'price' | 'rating')}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               >
//                 <option value="price">Price: Low to High</option>
//                 <option value="rating">Highest Rated</option>
//               </select>
//             </div>
//           </div>

//           {/* Advanced Filters Panel */}
//           {showFilters && (
//             <div className="mt-6 pt-6 border-t border-gray-200">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Price Range (per night)
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="number"
//                       placeholder="Min"
//                       onChange={(e) => setFilters({
//                         ...filters, 
//                         priceRange: [Number(e.target.value) || 0, filters.priceRange?.[1] || 1000]
//                       })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                     <span className="text-gray-500">to</span>
//                     <input
//                       type="number"
//                       placeholder="Max"
//                       onChange={(e) => setFilters({
//                         ...filters, 
//                         priceRange: [filters.priceRange?.[0] || 0, Number(e.target.value) || 1000]
//                       })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Required Amenities
//                   </label>
//                   <div className="grid grid-cols-2 gap-2">
//                     {['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Parking'].map((amenity) => (
//                       <label key={amenity} className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={filters.amenities?.includes(amenity) || false}
//                           onChange={(e) => {
//                             const currentAmenities = filters.amenities || [];
//                             if (e.target.checked) {
//                               setFilters({
//                                 ...filters,
//                                 amenities: [...currentAmenities, amenity]
//                               });
//                             } else {
//                               setFilters({
//                                 ...filters,
//                                 amenities: currentAmenities.filter(a => a !== amenity)
//                               });
//                             }
//                           }}
//                           className="mr-2 text-purple-600 focus:ring-purple-500"
//                         />
//                         <span className="text-sm text-gray-700">{amenity}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Results Header */}
//         <div className="flex justify-between items-center mb-6">
//           <p className="text-gray-600">
//             Showing {filteredHotels.length} of {sampleHotels.length} hotels
//           </p>
//           <div className="flex items-center gap-2 text-gray-600">
//             <SortDesc className="w-4 h-4" />
//             <span className="text-sm">Sorted by {sortBy}</span>
//           </div>
//         </div>

//         {/* Hotels Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredHotels.map((hotel) => (
//             <HotelCard key={hotel.id} hotel={hotel} />
//           ))}
//         </div>

//         {/* No Results */}
//         {filteredHotels.length === 0 && (
//           <div className="text-center py-16">
//             <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Filter className="w-12 h-12 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">No hotels found</h3>
//             <p className="text-gray-600 mb-4">
//               Try adjusting your filters to see more results
//             </p>
//             <button
//               onClick={resetFilters}
//               className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
//             >
//               Clear Filters
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


// export default HotelsPage;


import React, { useState, useMemo } from 'react';
import { Star, MapPin, Filter, SortDesc, Calendar, Wifi, Car, Coffee, Dumbbell } from 'lucide-react';
import type { Hotel, HotelFilters } from '../../types';
import { sampleHotels } from '../../data/sampleData';
import { Link } from 'react-router-dom';

interface HotelsPageProps {
  onHotelDetail?: (hotel: Hotel) => void;
}

const HotelsPage: React.FC<HotelsPageProps> = () => {
  const [filters, setFilters] = useState<HotelFilters>({});
  const [sortBy, setSortBy] = useState<'price' | 'rating'>('price');
  const [showFilters, setShowFilters] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  // Filter and sort hotels
  const filteredHotels = useMemo(() => {
    let filtered = sampleHotels.filter(hotel => {
      if (filters.rating && hotel.rating < filters.rating) return false;
      if (filters.location && !hotel.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (hotel.pricePerNight < min || hotel.pricePerNight > max) return false;
      }
      if (filters.amenities && filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity => 
          hotel.amenities.some(hotelAmenity => 
            hotelAmenity.toLowerCase().includes(amenity.toLowerCase())
          )
        );
        if (!hasAllAmenities) return false;
      }
      return true;
    });

    // Sort hotels
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.pricePerNight - b.pricePerNight;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, sortBy]);

  const resetFilters = () => {
    setFilters({});
  };

  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes('wifi')) return <Wifi className="w-4 h-4" />;
    if (lowerAmenity.includes('parking')) return <Car className="w-4 h-4" />;
    if (lowerAmenity.includes('breakfast')) return <Coffee className="w-4 h-4" />;
    if (lowerAmenity.includes('gym') || lowerAmenity.includes('fitness')) return <Dumbbell className="w-4 h-4" />;
    return <Star className="w-4 h-4" />;
  };

  const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 shadow-lg">
          <div className="flex items-center">
            {[...Array(Math.floor(hotel.rating))].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
            ))}
            <span className="ml-1 text-xs font-semibold text-gray-700">{hotel.rating}</span>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          <MapPin className="w-3 h-3 inline mr-1" />
          {hotel.location}
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {hotel.name}
          </h3>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <Calendar className="w-4 h-4 mr-1" />
            Check-in: {hotel.checkIn} | Check-out: {hotel.checkOut}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Popular Amenities</h4>
          <div className="grid grid-cols-2 gap-2">
            {hotel.amenities.slice(0, 4).map((amenity, index) => (
              <div 
                key={index} 
                className="flex items-center text-xs text-gray-600"
              >
                {getAmenityIcon(amenity)}
                <span className="ml-1">{amenity}</span>
              </div>
            ))}
          </div>
          {hotel.amenities.length > 4 && (
            <p className="text-xs text-gray-500 mt-2">
              +{hotel.amenities.length - 4} more amenities
            </p>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold text-purple-600">
              ${hotel.pricePerNight}
            </span>
            <span className="text-gray-600 ml-1">/night</span>
          </div>
          <div className="flex gap-2">
            <Link 
              to={`/hotels/${hotel.id}`}
              className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg font-medium transition-colors hover:bg-purple-50"
            >
              View Details
            </Link>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hotels</h1>
          <p className="text-xl text-gray-600">
            Book comfortable accommodations for your perfect stay
          </p>
        </div>

        {/* Booking Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5+ Guests</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors font-medium">
                Search Hotels
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>

              {/* Quick Filters */}
              <select
                value={filters.rating || ''}
                onChange={(e) => setFilters({...filters, rating: Number(e.target.value) || undefined})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Any Rating</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="5">5 Stars</option>
              </select>

              <input
                type="text"
                placeholder="Location"
                value={filters.location || ''}
                onChange={(e) => setFilters({...filters, location: e.target.value || undefined})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <button
                onClick={resetFilters}
                className="px-4 py-2 text-purple-600 hover:text-purple-800 transition-colors"
              >
                Clear All
              </button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'price' | 'rating')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="price">Price: Low to High</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (per night)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      onChange={(e) => setFilters({
                        ...filters, 
                        priceRange: [Number(e.target.value) || 0, filters.priceRange?.[1] || 1000]
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      onChange={(e) => setFilters({
                        ...filters, 
                        priceRange: [filters.priceRange?.[0] || 0, Number(e.target.value) || 1000]
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Amenities
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Parking'].map((amenity) => (
                      <label key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.amenities?.includes(amenity) || false}
                          onChange={(e) => {
                            const currentAmenities = filters.amenities || [];
                            if (e.target.checked) {
                              setFilters({
                                ...filters,
                                amenities: [...currentAmenities, amenity]
                              });
                            } else {
                              setFilters({
                                ...filters,
                                amenities: currentAmenities.filter(a => a !== amenity)
                              });
                            }
                          }}
                          className="mr-2 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredHotels.length} of {sampleHotels.length} hotels
          </p>
          <div className="flex items-center gap-2 text-gray-600">
            <SortDesc className="w-4 h-4" />
            <span className="text-sm">Sorted by {sortBy}</span>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>

        {/* No Results */}
        {filteredHotels.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hotels found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters to see more results
            </p>
            <button
              onClick={resetFilters}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default HotelsPage;