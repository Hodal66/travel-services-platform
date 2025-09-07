// // /* eslint-disable prefer-const */
// // import React, { useState, useMemo } from 'react';
// // import { Star, Users, Clock, MapPin, Plane, Filter, SortDesc, ArrowRight } from 'lucide-react';
// // import type { Transfer, TransferFilters } from '../../types';
// // import { sampleTransfers } from '../../data/sampleData';

// // const TransfersPage: React.FC = () => {
// //   const [filters, setFilters] = useState<TransferFilters>({});
// //   const [sortBy, setSortBy] = useState<'price' | 'rating' | 'capacity'>('price');
// //   const [showFilters, setShowFilters] = useState(false);
// //   const [pickup, setPickup] = useState('');
// //   const [destination, setDestination] = useState('');
// //   const [transferDate, setTransferDate] = useState('');
// //   const [transferTime, setTransferTime] = useState('');
// //   const [passengers, setPassengers] = useState(1);

// //   // Filter and sort transfers
// //   const filteredTransfers = useMemo(() => {
// //     let filtered = sampleTransfers.filter(transfer => {
// //       if (filters.vehicleType && transfer.vehicleType !== filters.vehicleType) return false;
// //       if (filters.capacity && transfer.capacity < filters.capacity) return false;
// //       if (filters.priceRange) {
// //         const estimatedPrice = transfer.basePrice + (transfer.pricePerKm * 20); // Assume 20km average
// //         const [min, max] = filters.priceRange;
// //         if (estimatedPrice < min || estimatedPrice > max) return false;
// //       }
// //       return true;
// //     });

// //     // Sort transfers
// //     filtered.sort((a, b) => {
// //       switch (sortBy) {
// //         case 'price':
// //           return (a.basePrice + a.pricePerKm * 20) - (b.basePrice + b.pricePerKm * 20);
// //         case 'rating':
// //           return b.rating - a.rating;
// //         case 'capacity':
// //           return b.capacity - a.capacity;
// //         default:
// //           return 0;
// //       }
// //     });

// //     return filtered;
// //   }, [filters, sortBy]);

// //   const resetFilters = () => {
// //     setFilters({});
// //   };

// //   const calculatePrice = (transfer: Transfer, distance: number = 20) => {
// //     return transfer.basePrice + (transfer.pricePerKm * distance);
// //   };

// //   const TransferCard: React.FC<{ transfer: Transfer }> = ({ transfer }) => (
// //     <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
// //       <div className="relative overflow-hidden">
// //         <img 
// //           src={transfer.image} 
// //           alt={transfer.vehicleType} 
// //           className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
// //         />
// //         <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center shadow-lg">
// //           <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
// //           <span className="text-sm font-medium">{transfer.rating}</span>
// //         </div>
// //         <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
// //           {transfer.duration}
// //         </div>
// //       </div>
      
// //       <div className="p-6">
// //         <div className="mb-4">
// //           <h3 className="text-xl font-bold text-gray-900 mb-2">
// //             {transfer.vehicleType}
// //           </h3>
// //           <div className="flex items-center text-gray-600 mb-2">
// //             <Users className="w-4 h-4 mr-1" />
// //             <span className="text-sm">Up to {transfer.capacity} passengers</span>
// //           </div>
// //           <div className="flex items-center text-gray-600">
// //             <Clock className="w-4 h-4 mr-1" />
// //             <span className="text-sm">Average duration: {transfer.duration}</span>
// //           </div>
// //         </div>

// //         <div className="mb-6">
// //           <h4 className="text-sm font-semibold text-gray-700 mb-2">Features</h4>
// //           <div className="flex flex-wrap gap-2">
// //             {transfer.features.map((feature, index) => (
// //               <span 
// //                 key={index} 
// //                 className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
// //               >
// //                 {feature}
// //               </span>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="mb-4 p-3 bg-gray-50 rounded-lg">
// //           <div className="text-sm text-gray-600 mb-1">Pricing Structure:</div>
// //           <div className="text-sm font-medium text-gray-900">
// //             ${transfer.basePrice} base + ${transfer.pricePerKm}/km
// //           </div>
// //           <div className="text-xs text-gray-500">
// //             Est. ${calculatePrice(transfer)} for 20km trip
// //           </div>
// //         </div>
        
// //         <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium transition-colors">
// //           Book Transfer
// //         </button>
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-8">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Header */}
// //         <div className="mb-8">
// //           <h1 className="text-4xl font-bold text-gray-900 mb-4">Airport Transfers</h1>
// //           <p className="text-xl text-gray-600">
// //             Reliable and comfortable transportation to and from the airport
// //           </p>
// //         </div>

// //         {/* Booking Form */}
// //         <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
// //               <div className="relative">
// //                 <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// //                 <input
// //                   type="text"
// //                   placeholder="Enter pickup address"
// //                   value={pickup}
// //                   onChange={(e) => setPickup(e.target.value)}
// //                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                 />
// //               </div>
// //             </div>
            
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
// //               <div className="relative">
// //                 <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// //                 <input
// //                   type="text"
// //                   placeholder="Airport or destination"
// //                   value={destination}
// //                   onChange={(e) => setDestination(e.target.value)}
// //                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                 />
// //               </div>
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
// //               <select
// //                 value={passengers}
// //                 onChange={(e) => setPassengers(Number(e.target.value))}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
// //               >
// //                 <option value="1">1 Passenger</option>
// //                 <option value="2">2 Passengers</option>
// //                 <option value="3">3 Passengers</option>
// //                 <option value="4">4 Passengers</option>
// //                 <option value="6">5-6 Passengers</option>
// //                 <option value="8">7-8 Passengers</option>
// //                 <option value="20">Group (20+ Passengers)</option>
// //               </select>
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
// //               <input
// //                 type="date"
// //                 value={transferDate}
// //                 onChange={(e) => setTransferDate(e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
// //               <input
// //                 type="time"
// //                 value={transferTime}
// //                 onChange={(e) => setTransferTime(e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
// //               />
// //             </div>
// //           </div>

// //           <button className="mt-4 w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white py-3 px-8 rounded-lg font-medium transition-colors flex items-center justify-center">
// //             Get Quote <ArrowRight className="w-4 h-4 ml-2" />
// //           </button>
// //         </div>

// //         {/* Filters and Sort */}
// //         <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
// //           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
// //             <div className="flex flex-wrap items-center gap-4">
// //               <button
// //                 onClick={() => setShowFilters(!showFilters)}
// //                 className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
// //               >
// //                 <Filter className="w-4 h-4 mr-2" />
// //                 Filters
// //               </button>

// //               {/* Quick Filters */}
// //               <select
// //                 value={filters.vehicleType || ''}
// //                 onChange={(e) => setFilters({...filters, vehicleType: e.target.value || undefined})}
// //                 className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
// //               >
// //                 <option value="">All Vehicle Types</option>
// //                 <option value="Airport Sedan">Airport Sedan</option>
// //                 <option value="Luxury SUV">Luxury SUV</option>
// //                 <option value="Minivan">Minivan</option>
// //                 <option value="Economy Car">Economy Car</option>
// //                 <option value="Bus Transfer">Bus Transfer</option>
// //               </select>

// //               <select
// //                 value={filters.capacity || ''}
// //                 onChange={(e) => setFilters({...filters, capacity: Number(e.target.value) || undefined})}
// //                 className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
// //               >
// //                 <option value="">Any Capacity</option>
// //                 <option value="4">4+ passengers</option>
// //                 <option value="6">6+ passengers</option>
// //                 <option value="8">8+ passengers</option>
// //                 <option value="20">20+ passengers</option>
// //               </select>

// //               <button
// //                 onClick={resetFilters}
// //                 className="px-4 py-2 text-orange-600 hover:text-orange-800 transition-colors"
// //               >
// //                 Clear All
// //               </button>
// //             </div>

// //             <div className="flex items-center gap-4">
// //               <span className="text-gray-600">Sort by:</span>
// //               <select
// //                 value={sortBy}
// //                 onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'capacity')}
// //                 className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
// //               >
// //                 <option value="price">Price: Low to High</option>
// //                 <option value="rating">Highest Rated</option>
// //                 <option value="capacity">Largest Capacity</option>
// //               </select>
// //             </div>
// //           </div>

// //           {/* Advanced Filters Panel */}
// //           {showFilters && (
// //             <div className="mt-6 pt-6 border-t border-gray-200">
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Price Range (estimated for 20km)
// //                   </label>
// //                   <div className="flex items-center gap-2">
// //                     <input
// //                       type="number"
// //                       placeholder="Min"
// //                       onChange={(e) => setFilters({
// //                         ...filters, 
// //                         priceRange: [Number(e.target.value) || 0, filters.priceRange?.[1] || 500]
// //                       })}
// //                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                     />
// //                     <span className="text-gray-500">to</span>
// //                     <input
// //                       type="number"
// //                       placeholder="Max"
// //                       onChange={(e) => setFilters({
// //                         ...filters, 
// //                         priceRange: [filters.priceRange?.[0] || 0, Number(e.target.value) || 500]
// //                       })}
// //                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                     />
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Results Header */}
// //         <div className="flex justify-between items-center mb-6">
// //           <p className="text-gray-600">
// //             Showing {filteredTransfers.length} of {sampleTransfers.length} transfer options
// //           </p>
// //           <div className="flex items-center gap-2 text-gray-600">
// //             <SortDesc className="w-4 h-4" />
// //             <span className="text-sm">Sorted by {sortBy}</span>
// //           </div>
// //         </div>

// //         {/* Transfers Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredTransfers.map((transfer) => (
// //             <TransferCard key={transfer.id} transfer={transfer} />
// //           ))}
// //         </div>

// //         {/* No Results */}
// //         {filteredTransfers.length === 0 && (
// //           <div className="text-center py-16">
// //             <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
// //               <Filter className="w-12 h-12 text-gray-400" />
// //             </div>
// //             <h3 className="text-xl font-semibold text-gray-900 mb-2">No transfers found</h3>
// //             <p className="text-gray-600 mb-4">
// //               Try adjusting your filters to see more results
// //             </p>
// //             <button
// //               onClick={resetFilters}
// //               className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors"
// //             >
// //               Clear Filters
// //             </button>
// //           </div>
// //         )}

// //         {/* Info Section */}
// //         <div className="mt-16 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-8">
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
// //             <div>
// //               <Plane className="w-12 h-12 mx-auto mb-4" />
// //               <h3 className="text-xl font-bold mb-2">Airport Pickup</h3>
// //               <p className="text-orange-100">
// //                 Professional drivers waiting at arrivals with name boards
// //               </p>
// //             </div>
// //             <div>
// //               <Clock className="w-12 h-12 mx-auto mb-4" />
// //               <h3 className="text-xl font-bold mb-2">On-Time Service</h3>
// //               <p className="text-orange-100">
// //                 Flight tracking ensures we're there when you land
// //               </p>
// //             </div>
// //             <div>
// //               <Star className="w-12 h-12 mx-auto mb-4" />
// //               <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
// //               <p className="text-orange-100">
// //                 Clean, comfortable vehicles with professional service
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TransfersPage;


// import React, { useState, useMemo } from 'react';
// import { Star, Users, Clock, MapPin, Plane, Filter, SortDesc, ArrowRight } from 'lucide-react';
// import type { Transfer, TransferFilters } from '../../types';
// import { sampleTransfers } from '../../data/sampleData';

// const TransfersPage: React.FC = () => {
//   const [filters, setFilters] = useState<TransferFilters>({});
//   const [sortBy, setSortBy] = useState<'price' | 'rating' | 'capacity'>('price');
//   const [showFilters, setShowFilters] = useState(false);
//   const [pickup, setPickup] = useState('');
//   const [destination, setDestination] = useState('');
//   const [transferDate, setTransferDate] = useState('');
//   const [transferTime, setTransferTime] = useState('');
//   const [passengers, setPassengers] = useState(1);

//   // Filter and sort transfers
//   const filteredTransfers = useMemo(() => {
//     let filtered = sampleTransfers.filter(transfer => {
//       if (filters.vehicleType && transfer.vehicleType !== filters.vehicleType) return false;
//       if (filters.capacity && transfer.capacity < filters.capacity) return false;
//       if (filters.priceRange) {
//         const estimatedPrice = transfer.basePrice + (transfer.pricePerKm * 20); // Assume 20km average
//         const [min, max] = filters.priceRange;
//         if (estimatedPrice < min || estimatedPrice > max) return false;
//       }
//       return true;
//     });

//     // Sort transfers
//     filtered.sort((a, b) => {
//       switch (sortBy) {
//         case 'price':
//           return (a.basePrice + a.pricePerKm * 20) - (b.basePrice + b.pricePerKm * 20);
//         case 'rating':
//           return b.rating - a.rating;
//         case 'capacity':
//           return b.capacity - a.capacity;
//         default:
//           return 0;
//       }
//     });

//     return filtered;
//   }, [filters, sortBy]);

//   const resetFilters = () => {
//     setFilters({});
//   };

//   const calculatePrice = (transfer: Transfer, distance: number = 20) => {
//     return transfer.basePrice + (transfer.pricePerKm * distance);
//   };

//   const TransferCard: React.FC<{ transfer: Transfer }> = ({ transfer }) => (
//     <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
//       <div className="relative overflow-hidden">
//         <img 
//           src={transfer.image} 
//           alt={transfer.vehicleType} 
//           className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
//         />
//         <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center shadow-lg">
//           <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
//           <span className="text-sm font-medium">{transfer.rating}</span>
//         </div>
//         <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
//           {transfer.duration}
//         </div>
//       </div>
      
//       <div className="p-6">
//         <div className="mb-4">
//           <h3 className="text-xl font-bold text-gray-900 mb-2">
//             {transfer.vehicleType}
//           </h3>
//           <div className="flex items-center text-gray-600 mb-2">
//             <Users className="w-4 h-4 mr-1" />
//             <span className="text-sm">Up to {transfer.capacity} passengers</span>
//           </div>
//           <div className="flex items-center text-gray-600">
//             <Clock className="w-4 h-4 mr-1" />
//             <span className="text-sm">Average duration: {transfer.duration}</span>
//           </div>
//         </div>

//         <div className="mb-6">
//           <h4 className="text-sm font-semibold text-gray-700 mb-2">Features</h4>
//           <div className="flex flex-wrap gap-2">
//             {transfer.features.map((feature, index) => (
//               <span 
//                 key={index} 
//                 className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
//               >
//                 {feature}
//               </span>
//             ))}
//           </div>
//         </div>

//         <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//           <div className="text-sm text-gray-600 mb-1">Pricing Structure:</div>
//           <div className="text-sm font-medium text-gray-900">
//             ${transfer.basePrice} base + ${transfer.pricePerKm}/km
//           </div>
//           <div className="text-xs text-gray-500">
//             Est. ${calculatePrice(transfer)} for 20km trip
//           </div>
//         </div>
        
//         <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium transition-colors">
//           Book Transfer
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Airport Transfers</h1>
//           <p className="text-xl text-gray-600">
//             Reliable and comfortable transportation to and from the airport
//           </p>
//         </div>

//         {/* Booking Form */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Enter pickup address"
//                   value={pickup}
//                   onChange={(e) => setPickup(e.target.value)}
//                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//               </div>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
//               <div className="relative">
//                 <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Airport or destination"
//                   value={destination}
//                   onChange={(e) => setDestination(e.target.value)}
//                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
//               <select
//                 value={passengers}
//                 onChange={(e) => setPassengers(Number(e.target.value))}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               >
//                 <option value="1">1 Passenger</option>
//                 <option value="2">2 Passengers</option>
//                 <option value="3">3 Passengers</option>
//                 <option value="4">4 Passengers</option>
//                 <option value="6">5-6 Passengers</option>
//                 <option value="8">7-8 Passengers</option>
//                 <option value="20">Group (20+ Passengers)</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
//               <input
//                 type="date"
//                 value={transferDate}
//                 onChange={(e) => setTransferDate(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
//               <input
//                 type="time"
//                 value={transferTime}
//                 onChange={(e) => setTransferTime(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>
//           </div>

//           <button className="mt-4 w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white py-3 px-8 rounded-lg font-medium transition-colors flex items-center justify-center">
//             Get Quote <ArrowRight className="w-4 h-4 ml-2" />
//           </button>
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
//                 value={filters.vehicleType || ''}
//                 onChange={(e) => setFilters({...filters, vehicleType: e.target.value || undefined})}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               >
//                 <option value="">All Vehicle Types</option>
//                 <option value="Airport Sedan">Airport Sedan</option>
//                 <option value="Luxury SUV">Luxury SUV</option>
//                 <option value="Minivan">Minivan</option>
//                 <option value="Economy Car">Economy Car</option>
//                 <option value="Bus Transfer">Bus Transfer</option>
//               </select>

//               <select
//                 value={filters.capacity || ''}
//                 onChange={(e) => setFilters({...filters, capacity: Number(e.target.value) || undefined})}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               >
//                 <option value="">Any Capacity</option>
//                 <option value="4">4+ passengers</option>
//                 <option value="6">6+ passengers</option>
//                 <option value="8">8+ passengers</option>
//                 <option value="20">20+ passengers</option>
//               </select>

//               <button
//                 onClick={resetFilters}
//                 className="px-4 py-2 text-orange-600 hover:text-orange-800 transition-colors"
//               >
//                 Clear All
//               </button>
//             </div>

//             <div className="flex items-center gap-4">
//               <span className="text-gray-600">Sort by:</span>
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'capacity')}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               >
//                 <option value="price">Price: Low to High</option>
//                 <option value="rating">Highest Rated</option>
//                 <option value="capacity">Largest Capacity</option>
//               </select>
//             </div>
//           </div>

//           {/* Advanced Filters Panel */}
//           {showFilters && (
//             <div className="mt-6 pt-6 border-t border-gray-200">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Price Range (estimated for 20km)
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="number"
//                       placeholder="Min"
//                       onChange={(e) => setFilters({
//                         ...filters, 
//                         priceRange: [Number(e.target.value) || 0, filters.priceRange?.[1] || 500]
//                       })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     />
//                     <span className="text-gray-500">to</span>
//                     <input
//                       type="number"
//                       placeholder="Max"
//                       onChange={(e) => setFilters({
//                         ...filters, 
//                         priceRange: [filters.priceRange?.[0] || 0, Number(e.target.value) || 500]
//                       })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Results Header */}
//         <div className="flex justify-between items-center mb-6">
//           <p className="text-gray-600">
//             Showing {filteredTransfers.length} of {sampleTransfers.length} transfer options
//           </p>
//           <div className="flex items-center gap-2 text-gray-600">
//             <SortDesc className="w-4 h-4" />
//             <span className="text-sm">Sorted by {sortBy}</span>
//           </div>
//         </div>

//         {/* Transfers Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredTransfers.map((transfer) => (
//             <TransferCard key={transfer.id} transfer={transfer} />
//           ))}
//         </div>

//         {/* No Results */}
//         {filteredTransfers.length === 0 && (
//           <div className="text-center py-16">
//             <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Filter className="w-12 h-12 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">No transfers found</h3>
//             <p className="text-gray-600 mb-4">
//               Try adjusting your filters to see more results
//             </p>
//             <button
//               onClick={resetFilters}
//               className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors"
//             >
//               Clear Filters
//             </button>
//           </div>
//         )}

//         {/* Info Section */}
//         <div className="mt-16 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//             <div>
//               <Plane className="w-12 h-12 mx-auto mb-4" />
//               <h3 className="text-xl font-bold mb-2">Airport Pickup</h3>
//               <p className="text-orange-100">
//                 Professional drivers waiting at arrivals with name boards
//               </p>
//             </div>
//             <div>
//               <Clock className="w-12 h-12 mx-auto mb-4" />
//               <h3 className="text-xl font-bold mb-2">On-Time Service</h3>
//               <p className="text-orange-100">
//                 Flight tracking ensures we're there when you land
//               </p>
//             </div>
//             <div>
//               <Star className="w-12 h-12 mx-auto mb-4" />
//               <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
//               <p className="text-orange-100">
//                 Clean, comfortable vehicles with professional service
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransfersPage;



// TransfersPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Users, MapPin, ArrowRight, Plane } from 'lucide-react';
import { sampleTransfers } from '@/data/sampleData';
import { Transfer } from '@/types';

const TransfersPage: React.FC = () => {
  const [transfers] = useState<Transfer[]>(sampleTransfers);
  const [filteredTransfers, setFilteredTransfers] = useState<Transfer[]>(sampleTransfers);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('All');

  const transferTypes = ['All', 'Airport Pickup', 'Airport Dropoff', 'City Transfer', 'Intercity Transfer'];
  const vehicleTypes = ['All', 'Sedan', 'SUV', 'Van', 'Luxury Car', 'Bus'];

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    filterTransfers(type, selectedVehicle);
  };

  const handleVehicleFilter = (vehicle: string) => {
    setSelectedVehicle(vehicle);
    filterTransfers(selectedType, vehicle);
  };

  const filterTransfers = (type: string, vehicle: string) => {
    let filtered = transfers;

    if (type !== 'All') {
      filtered = filtered.filter(transfer => transfer.type === type);
    }

    if (vehicle !== 'All') {
      filtered = filtered.filter(transfer => transfer.vehicleType === vehicle);
    }

    setFilteredTransfers(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Airport Transfers</h1>
            <p className="text-xl text-orange-100">
              Reliable and comfortable transportation services
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Filter Transfers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transfer Type
              </label>
              <div className="flex flex-wrap gap-2">
                {transferTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeFilter(type)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedType === type
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Type
              </label>
              <div className="flex flex-wrap gap-2">
                {vehicleTypes.map((vehicle) => (
                  <button
                    key={vehicle}
                    onClick={() => handleVehicleFilter(vehicle)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedVehicle === vehicle
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {vehicle}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Transfers ({filteredTransfers.length})
          </h2>
        </div>

        {/* Transfers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTransfers.map((transfer) => (
            <div key={transfer.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 bg-gradient-to-br from-orange-200 to-red-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Plane className="h-16 w-16 text-white mx-auto mb-2" />
                    <p className="text-white font-semibold">{transfer.vehicleType}</p>
                  </div>
                </div>
                
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {transfer.type}
                  </span>
                </div>
                
                {transfer.available && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Available
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {transfer.from} → {transfer.to}
                </h3>

                <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{transfer.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{transfer.distance}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{transfer.maxPassengers} passengers</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                    <span>{transfer.driver.rating}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {transfer.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-orange-600">
                      ${transfer.price}
                    </span>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200">
                    Book Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransfersPage;