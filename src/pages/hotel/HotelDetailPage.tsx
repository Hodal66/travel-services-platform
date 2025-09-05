// import React, { useState } from 'react';
// import {
//   Star, MapPin, ChevronLeft, ChevronRight, Users,
//   Wifi, Car, Coffee, Dumbbell, Utensils, Phone, Mail,
//   Check, Clock, Shield, CreditCard, Bed, Wind
// } from 'lucide-react';
// import type { Hotel } from '../../types';

// interface HotelDetailPageProps {
//   hotel: Hotel;
//   onBack: () => void;
//   onBook: () => void;
// }

// const HotelDetailPage: React.FC<HotelDetailPageProps> = ({ hotel, onBack, onBook }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [checkIn, setCheckIn] = useState('');
//   const [checkOut, setCheckOut] = useState('');
//   const [guests, setGuests] = useState(2);
//   const [rooms, setRooms] = useState(1);
//   const [selectedRoom, setSelectedRoom] = useState(0);

//   // Extended image gallery (different hotel areas)
//   const hotelImages = [
//     hotel.image, // Main exterior
//     `${hotel.image}&brightness=10`, // Lobby
//     `${hotel.image}&hue=30`, // Standard room
//     `${hotel.image}&sat=20`, // Deluxe room
//     `${hotel.image}&con=15`, // Restaurant
//     `${hotel.image}&brightness=-10`, // Pool area
//     `${hotel.image}&hue=-20`, // Spa/wellness
//     `${hotel.image}&sat=-10` // Conference room
//   ];

//   const imageLabels = [
//     'Hotel Exterior',
//     'Elegant Lobby',
//     'Standard Room',
//     'Deluxe Suite',
//     'Restaurant',
//     'Pool Area',
//     'Spa & Wellness',
//     'Conference Room'
//   ];

//   // Sample room types
//   const roomTypes = [
//     {
//       id: '1',
//       name: 'Standard Room',
//       capacity: 2,
//       price: hotel.pricePerNight,
//       features: ['King Bed', 'City View', 'Free WiFi', 'Air Conditioning', 'Mini Fridge'],
//       image: `${hotel.image}&hue=30`,
//       size: '250 sq ft'
//     },
//     {
//       id: '2',
//       name: 'Deluxe Room',
//       capacity: 3,
//       price: hotel.pricePerNight * 1.3,
//       features: ['Queen Bed + Sofa Bed', 'Balcony', 'Premium WiFi', 'Mini Bar', 'Coffee Machine'],
//       image: `${hotel.image}&sat=20`,
//       size: '350 sq ft'
//     },
//     {
//       id: '3',
//       name: 'Executive Suite',
//       capacity: 4,
//       price: hotel.pricePerNight * 1.8,
//       features: ['Separate Living Room', 'Panoramic View', 'Work Desk', 'Premium Amenities', 'Room Service'],
//       image: `${hotel.image}&brightness=20`,
//       size: '550 sq ft'
//     }
//   ];

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % hotelImages.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + hotelImages.length) % hotelImages.length);
//   };

//   const getAmenityIcon = (amenity: string) => {
//     const lowerAmenity = amenity.toLowerCase();
//     if (lowerAmenity.includes('wifi')) return <Wifi className="w-4 h-4" />;
//     if (lowerAmenity.includes('parking')) return <Car className="w-4 h-4" />;
//     if (lowerAmenity.includes('breakfast')) return <Coffee className="w-4 h-4" />;
//     if (lowerAmenity.includes('gym') || lowerAmenity.includes('fitness')) return <Dumbbell className="w-4 h-4" />;
//     // if (lowerAmenity.includes('pool')) return <Swimming className="w-4 h-4" />;
//     if (lowerAmenity.includes('restaurant')) return <Utensils className="w-4 h-4" />;
//     if (lowerAmenity.includes('spa')) return <Wind className="w-4 h-4" />;
//     return <Check className="w-4 h-4" />;
//   };

//   const calculateStayDuration = () => {
//     if (checkIn && checkOut) {
//       const startDate = new Date(checkIn);
//       const endDate = new Date(checkOut);
//       const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//       return diffDays > 0 ? diffDays : 1;
//     }
//     return 1;
//   };

//   const calculateTotalPrice = () => {
//     const selectedRoomType = roomTypes[selectedRoom];
//     return selectedRoomType.price * calculateStayDuration() * rooms;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <button
//             onClick={onBack}
//             className="flex items-center text-purple-600 hover:text-purple-800 transition-colors mb-4"
//           >
//             <ChevronLeft className="w-5 h-5 mr-1" />
//             Back to Hotels
//           </button>
//           <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
//             <div className="flex-1">
//               <div className="flex items-center mb-2">
//                 <div className="flex items-center mr-4">
//                   {[...Array(Math.floor(hotel.rating))].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                   <span className="ml-2 text-lg font-medium">{hotel.rating}</span>
//                   <span className="text-gray-600 ml-2">(245 reviews)</span>
//                 </div>
//               </div>
              
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                 {hotel.name}
//               </h1>
              
//               <div className="flex items-center text-gray-600 mb-4">
//                 <MapPin className="w-5 h-5 mr-1" />
//                 <span className="text-lg">{hotel.location}</span>
//               </div>

//               <div className="flex items-center space-x-6 text-gray-600">
//                 <div className="flex items-center">
//                   <Clock className="w-4 h-4 mr-1" />
//                   <span>Check-in: {hotel.checkIn}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Clock className="w-4 h-4 mr-1" />
//                   <span>Check-out: {hotel.checkOut}</span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="mt-4 lg:mt-0 lg:ml-8 text-right">
//               <div className="text-3xl font-bold text-purple-600">
//                 From ${hotel.pricePerNight}
//               </div>
//               <div className="text-gray-600">per night</div>
//               <div className="text-sm text-gray-500 mt-1">
//                 Taxes and fees included
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Image Gallery */}
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//               <div className="relative">
//                 <img
//                   src={hotelImages[currentImageIndex]}
//                   alt={`${hotel.name} - ${imageLabels[currentImageIndex]}`}
//                   className="w-full h-96 object-cover"
//                 />
                
//                 {/* Navigation Arrows */}
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
//                 >
//                   <ChevronLeft className="w-6 h-6" />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
//                 >
//                   <ChevronRight className="w-6 h-6" />
//                 </button>

//                 {/* Image Label */}
//                 <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
//                   {imageLabels[currentImageIndex]}
//                 </div>

//                 {/* Image Counter */}
//                 <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
//                   {currentImageIndex + 1} / {hotelImages.length}
//                 </div>
//               </div>

//               {/* Thumbnail Gallery */}
//               <div className="p-4">
//                 <div className="flex space-x-2 overflow-x-auto">
//                   {hotelImages.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentImageIndex(index)}
//                       className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
//                         index === currentImageIndex ? 'border-purple-500' : 'border-gray-200'
//                       }`}
//                     >
//                       <img
//                         src={image}
//                         alt={`${imageLabels[index]} thumbnail`}
//                         className="w-full h-full object-cover"
//                       />
//                     </button>
//               </div>
//             </div>

//             {/* Hotel Description */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">About {hotel.name}</h2>
//               <div className="prose prose-gray max-w-none">
//                 <p className="text-gray-600 leading-relaxed mb-4">
//                   {hotel.description || `Welcome to ${hotel.name}, a premier ${hotel.rating}-star hotel located in the heart of ${hotel.location}. 
//                   Our hotel combines modern luxury with exceptional service to provide an unforgettable experience for both business 
//                   and leisure travelers.`}
//                 </p>
//                 <p className="text-gray-600 leading-relaxed mb-4">
//                   Each of our thoughtfully designed rooms and suites features contemporary furnishings, premium bedding, 
//                   and state-of-the-art amenities. Whether you're here for a romantic getaway, family vacation, or business trip, 
//                   our dedicated staff is committed to making your stay exceptional.
//                 </p>
//                 <p className="text-gray-600 leading-relaxed">
//                   Located in {hotel.location}, you'll have easy access to the city's top attractions, shopping districts, 
//                   and dining establishments. Our concierge team is available 24/7 to help you make the most of your visit.
//                 </p>
//               </div>
//             </div>

//             {/* Room Types */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Room Types</h2>
              
//               <div className="space-y-6">
//                 {roomTypes.map((room, index) => (
//                   <div 
//                     key={room.id}
//                     className={`border-2 rounded-xl p-6 transition-all cursor-pointer ${
//                       selectedRoom === index ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
//                     }`}
//                     onClick={() => setSelectedRoom(index)}
//                   >
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                       <div className="md:col-span-1">
//                         <img
//                           src={room.image}
//                           alt={room.name}
//                           className="w-full h-32 object-cover rounded-lg"
//                         />
//                       </div>
                      
//                       <div className="md:col-span-2">
//                         <h3 className="text-lg font-bold text-gray-900 mb-2">{room.name}</h3>
//                         <div className="flex items-center text-gray-600 mb-3">
//                           <Users className="w-4 h-4 mr-1" />
//                           <span className="mr-4">Up to {room.capacity} guests</span>
//                           <Bed className="w-4 h-4 mr-1" />
//                           <span>{room.size}</span>
//                         </div>
                        
//                         <div className="grid grid-cols-2 gap-2">
//                           {room.features.map((feature, featureIndex) => (
//                             <div key={featureIndex} className="flex items-center text-sm text-gray-600">
//                               <Check className="w-3 h-3 text-green-500 mr-1" />
//                               {feature}
//                             </div>
//                           ))}
//                         </div>
//                       </div>
                      
//                       <div className="md:col-span-1 text-right">
//                         <div className="text-2xl font-bold text-purple-600 mb-1">
//                           ${room.price}
//                         </div>
//                         <div className="text-gray-600 text-sm mb-2">per night</div>
//                         {selectedRoom === index && (
//                           <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
//                             <Check className="w-4 h-4 mr-1" />
//                             Selected
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Hotel Amenities */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Hotel Amenities</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {hotel.amenities.map((amenity, index) => (
//                   <div key={index} className="flex items-center p-3 bg-purple-50 rounded-lg">
//                     <div className="text-purple-600 mr-3">
//                       {getAmenityIcon(amenity)}
//                     </div>
//                     <span className="text-gray-900 font-medium">{amenity}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Location & Nearby */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Location & Nearby</h2>
              
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">About the Area</h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Located in the vibrant {hotel.location}, our hotel puts you at the center of the action. 
//                   The area is known for its rich culture, excellent dining, and convenient transportation links. 
//                   Whether you're interested in shopping, sightseeing, or business meetings, everything is within easy reach.
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="font-semibold text-gray-900 mb-3">Nearby Attractions</h4>
//                   <ul className="space-y-2 text-gray-600">
//                     <li className="flex items-center">
//                       <MapPin className="w-4 h-4 text-purple-600 mr-2" />
//                       City Center - 0.5 miles
//                     </li>
//                     <li className="flex items-center">
//                       <MapPin className="w-4 h-4 text-purple-600 mr-2" />
//                       Shopping Mall - 0.8 miles
//                     </li>
//                     <li className="flex items-center">
//                       <MapPin className="w-4 h-4 text-purple-600 mr-2" />
//                       Museum District - 1.2 miles
//                     </li>
//                     <li className="flex items-center">
//                       <MapPin className="w-4 h-4 text-purple-600 mr-2" />
//                       Business District - 2.1 miles
//                     </li>
//                   </ul>
//                 </div>
                
//                 <div>
//                   <h4 className="font-semibold text-gray-900 mb-3">Transportation</h4>
//                   <ul className="space-y-2 text-gray-600">
//                     <li className="flex items-center">
//                       <Car className="w-4 h-4 text-purple-600 mr-2" />
//                       Airport - 15 minutes
//                     </li>
//                     <li className="flex items-center">
//                       <MapPin className="w-4 h-4 text-purple-600 mr-2" />
//                       Metro Station - 3 minutes walk
//                     </li>
//                     <li className="flex items-center">
//                       <Car className="w-4 h-4 text-purple-600 mr-2" />
//                       Taxi Stand - Front entrance
//                     </li>
//                     <li className="flex items-center">
//                       <Car className="w-4 h-4 text-purple-600 mr-2" />
//                       Valet Parking Available
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Policies */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Hotel Policies</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-3">Check-in/Check-out</h3>
//                   <ul className="space-y-2 text-gray-600">
//                     <li className="flex items-center">
//                       <Clock className="w-4 h-4 text-green-500 mr-2" />
//                       Check-in: {hotel.checkIn}
//                     </li>
//                     <li className="flex items-center">
//                       <Clock className="w-4 h-4 text-green-500 mr-2" />
//                       Check-out: {hotel.checkOut}
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="w-4 h-4 text-green-500 mr-2" />
//                       Early check-in subject to availability
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="w-4 h-4 text-green-500 mr-2" />
//                       Late check-out available (fees may apply)
//                     </li>
//                   </ul>
//                 </div>
                
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-3">General Policies</h3>
//                   <ul className="space-y-2 text-gray-600">
//                     <li className="flex items-center">
//                       <Check className="w-4 h-4 text-green-500 mr-2" />
//                       Non-smoking hotel
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="w-4 h-4 text-green-500 mr-2" />
//                       Pets allowed (fees apply)
//                     </li>
//                     <li className="flex items-center">
//                       <Check className="w-4 h-4 text-green-500 mr-2" />
//                       Free cancellation (24h notice)
//                     </li>
//                     <li className="flex items-center">
//                       <CreditCard className="w-4 h-4 text-green-500 mr-2" />
//                       Credit card required at check-in
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Booking Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-8 space-y-6">
//               {/* Booking Form */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6">Book Your Stay</h3>
                
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Check-in Date
//                     </label>
//                     <input
//                       type="date"
//                       value={checkIn}
//                       onChange={(e) => setCheckIn(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Check-out Date
//                     </label>
//                     <input
//                       type="date"
//                       value={checkOut}
//                       onChange={(e) => setCheckOut(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                   </div>
                  
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Rooms
//                       </label>
//                       <select
//                         value={rooms}
//                         onChange={(e) => setRooms(Number(e.target.value))}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                       >
//                         {[1,2,3,4,5].map(num => (
//                           <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
//                         ))}
//                       </select>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Guests
//                       </label>
//                       <select
//                         value={guests}
//                         onChange={(e) => setGuests(Number(e.target.value))}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                       >
//                         {[1,2,3,4,5,6].map(num => (
//                           <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Selected Room
//                     </label>
//                     <div className="p-3 bg-purple-50 rounded-lg">
//                       <div className="font-medium text-gray-900">{roomTypes[selectedRoom].name}</div>
//                       <div className="text-sm text-gray-600">${roomTypes[selectedRoom].price}/night</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Price Breakdown */}
//                 {checkIn && checkOut && (
//                   <div className="border-t border-gray-200 pt-6 mt-6">
//                     <h4 className="font-semibold text-gray-900 mb-3">Price Breakdown</h4>
//                     <div className="space-y-2">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">
//                           ${roomTypes[selectedRoom].price}/night × {calculateStayDuration()} nights × {rooms} room{rooms > 1 ? 's' : ''}
//                         </span>
//                         <span className="font-medium">${calculateTotalPrice()}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Taxes & Fees</span>
//                         <span className="font-medium">${(calculateTotalPrice() * 0.12).toFixed(2)}</span>
//                       </div>
//                       <div className="border-t border-gray-200 pt-2">
//                         <div className="flex justify-between text-lg font-bold">
//                           <span>Total</span>
//                           <span className="text-purple-600">
//                             ${(calculateTotalPrice() * 1.12).toFixed(2)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <button
//                   onClick={handleBook}
//                   className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors mt-6"
//                 >
//                   Book Now
//                 </button>
                
//                 <p className="text-xs text-gray-500 text-center mt-4">
//                   Free cancellation up to 24 hours before check-in
//                 </p>
//               </div>

//               {/* Contact Info */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <h4 className="font-semibold text-gray-900 mb-4">Contact Hotel</h4>
//                 <div className="space-y-3">
//                   <div className="flex items-center text-gray-600">
//                     <Phone className="w-4 h-4 mr-3" />
//                     <div>
//                       <div className="font-medium">+1 (555) 123-4567</div>
//                       <div className="text-xs">Front Desk - 24/7</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <Mail className="w-4 h-4 mr-3" />
//                     <div>
//                       <div className="font-medium">reservations@{hotel.name.toLowerCase().replace(/\s+/g, '')}.com</div>
//                       <div className="text-xs">Reservations</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Safety Features */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <div className="flex items-center mb-4">
//                   <Shield className="w-6 h-6 text-purple-600 mr-2" />
//                   <h4 className="font-semibold text-gray-900">Health & Safety</h4>
//                 </div>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li className="flex items-center">
//                     <Check className="w-4 h-4 text-green-500 mr-2" />
//                     Enhanced cleaning protocols
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="w-4 h-4 text-green-500 mr-2" />
//                     Contactless check-in available
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="w-4 h-4 text-green-500 mr-2" />
//                     24/7 security monitoring
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="w-4 h-4 text-green-500 mr-2" />
//                     Fire safety systems
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="w-4 h-4 text-green-500 mr-2" />
//                     Medical assistance available
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotelDetailPage;



import React, { useState } from 'react';
import {
  Star, MapPin, ChevronLeft, ChevronRight, Users,
  Wifi, Car, Coffee, Dumbbell, Utensils, Phone, Mail,
  Check, Clock, Shield, CreditCard, Bed, Wind
} from 'lucide-react';
import type { Hotel } from '../../types';

interface HotelDetailPageProps {
  hotel: Hotel;
  onBack: () => void;
  onBook: () => void;
}

const HotelDetailPage: React.FC<HotelDetailPageProps> = ({ hotel, onBack, onBook }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(0);

  // Extended image gallery (different hotel areas)
  const hotelImages = [
    hotel.image, // Main exterior
    `${hotel.image}&brightness=10`, // Lobby
    `${hotel.image}&hue=30`, // Standard room
    `${hotel.image}&sat=20`, // Deluxe room
    `${hotel.image}&con=15`, // Restaurant
    `${hotel.image}&brightness=-10`, // Pool area
    `${hotel.image}&hue=-20`, // Spa/wellness
    `${hotel.image}&sat=-10` // Conference room
  ];

  const imageLabels = [
    'Hotel Exterior',
    'Elegant Lobby',
    'Standard Room',
    'Deluxe Suite',
    'Restaurant',
    'Pool Area',
    'Spa & Wellness',
    'Conference Room'
  ];

  // Sample room types
  const roomTypes = [
    {
      id: '1',
      name: 'Standard Room',
      capacity: 2,
      price: hotel.pricePerNight,
      features: ['King Bed', 'City View', 'Free WiFi', 'Air Conditioning', 'Mini Fridge'],
      image: `${hotel.image}&hue=30`,
      size: '250 sq ft'
    },
    {
      id: '2',
      name: 'Deluxe Room',
      capacity: 3,
      price: hotel.pricePerNight * 1.3,
      features: ['Queen Bed + Sofa Bed', 'Balcony', 'Premium WiFi', 'Mini Bar', 'Coffee Machine'],
      image: `${hotel.image}&sat=20`,
      size: '350 sq ft'
    },
    {
      id: '3',
      name: 'Executive Suite',
      capacity: 4,
      price: hotel.pricePerNight * 1.8,
      features: ['Separate Living Room', 'Panoramic View', 'Work Desk', 'Premium Amenities', 'Room Service'],
      image: `${hotel.image}&brightness=20`,
      size: '550 sq ft'
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotelImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotelImages.length) % hotelImages.length);
  };

  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes('wifi')) return <Wifi className="w-4 h-4" />;
    if (lowerAmenity.includes('parking')) return <Car className="w-4 h-4" />;
    if (lowerAmenity.includes('breakfast')) return <Coffee className="w-4 h-4" />;
    if (lowerAmenity.includes('gym') || lowerAmenity.includes('fitness')) return <Dumbbell className="w-4 h-4" />;
    // if (lowerAmenity.includes('pool')) return <Swimming className="w-4 h-4" />;
    if (lowerAmenity.includes('restaurant')) return <Utensils className="w-4 h-4" />;
    if (lowerAmenity.includes('spa')) return <Wind className="w-4 h-4" />;
    return <Check className="w-4 h-4" />;
  };

  const calculateStayDuration = () => {
    if (checkIn && checkOut) {
      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    }
    return 1;
  };

  const calculateTotalPrice = () => {
    const selectedRoomType = roomTypes[selectedRoom];
    return selectedRoomType.price * calculateStayDuration() * rooms;
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-purple-600 hover:text-purple-800 transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Hotels
          </button>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <div className="flex items-center mr-4">
                  {[...Array(Math.floor(hotel.rating))].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-lg font-medium">{hotel.rating}</span>
                  <span className="text-gray-600 ml-2">(245 reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {hotel.name}
              </h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-1" />
                <span className="text-lg">{hotel.location}</span>
              </div>

              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Check-in: {hotel.checkIn}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Check-out: {hotel.checkOut}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 lg:mt-0 lg:ml-8 text-right">
              <div className="text-3xl font-bold text-purple-600">
                From ${hotel.pricePerNight}
              </div>
              <div className="text-gray-600">per night</div>
              <div className="text-sm text-gray-500 mt-1">
                Taxes and fees included
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={hotelImages[currentImageIndex]}
                  alt={`${hotel.name} - ${imageLabels[currentImageIndex]}`}
                  className="w-full h-96 object-cover"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Image Label */}
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
                  {imageLabels[currentImageIndex]}
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
                  {currentImageIndex + 1} / {hotelImages.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {hotelImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex ? 'border-purple-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${imageLabels[index]} thumbnail`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
              </div>
            </div>

            {/* Hotel Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {hotel.name}</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  {hotel.description || `Welcome to ${hotel.name}, a premier ${hotel.rating}-star hotel located in the heart of ${hotel.location}. 
                  Our hotel combines modern luxury with exceptional service to provide an unforgettable experience for both business 
                  and leisure travelers.`}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Each of our thoughtfully designed rooms and suites features contemporary furnishings, premium bedding, 
                  and state-of-the-art amenities. Whether you're here for a romantic getaway, family vacation, or business trip, 
                  our dedicated staff is committed to making your stay exceptional.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Located in {hotel.location}, you'll have easy access to the city's top attractions, shopping districts, 
                  and dining establishments. Our concierge team is available 24/7 to help you make the most of your visit.
                </p>
              </div>
            </div>

            {/* Room Types */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Room Types</h2>
              
              <div className="space-y-6">
                {roomTypes.map((room, index) => (
                  <div 
                    key={room.id}
                    className={`border-2 rounded-xl p-6 transition-all cursor-pointer ${
                      selectedRoom === index ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setSelectedRoom(index)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="md:col-span-1">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{room.name}</h3>
                        <div className="flex items-center text-gray-600 mb-3">
                          <Users className="w-4 h-4 mr-1" />
                          <span className="mr-4">Up to {room.capacity} guests</span>
                          <Bed className="w-4 h-4 mr-1" />
                          <span>{room.size}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {room.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                              <Check className="w-3 h-3 text-green-500 mr-1" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="md:col-span-1 text-right">
                        <div className="text-2xl font-bold text-purple-600 mb-1">
                          ${room.price}
                        </div>
                        <div className="text-gray-600 text-sm mb-2">per night</div>
                        {selectedRoom === index && (
                          <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                            <Check className="w-4 h-4 mr-1" />
                            Selected
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotel Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Hotel Amenities</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-purple-600 mr-3">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span className="text-gray-900 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Nearby */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Location & Nearby</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About the Area</h3>
                <p className="text-gray-600 leading-relaxed">
                  Located in the vibrant {hotel.location}, our hotel puts you at the center of the action. 
                  The area is known for its rich culture, excellent dining, and convenient transportation links. 
                  Whether you're interested in shopping, sightseeing, or business meetings, everything is within easy reach.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Nearby Attractions</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <MapPin className="w-4 h-4 text-purple-600 mr-2" />
                      City Center - 0.5 miles
                    </li>
                    <li className="flex items-center">
                      <MapPin className="w-4 h-4 text-purple-600 mr-2" />
                      Shopping Mall - 0.8 miles
                    </li>
                    <li className="flex items-center">
                      <MapPin className="w-4 h-4 text-purple-600 mr-2" />
                      Museum District - 1.2 miles
                    </li>
                    <li className="flex items-center">
                      <MapPin className="w-4 h-4 text-purple-600 mr-2" />
                      Business District - 2.1 miles
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Transportation</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <Car className="w-4 h-4 text-purple-600 mr-2" />
                      Airport - 15 minutes
                    </li>
                    <li className="flex items-center">
                      <MapPin className="w-4 h-4 text-purple-600 mr-2" />
                      Metro Station - 3 minutes walk
                    </li>
                    <li className="flex items-center">
                      <Car className="w-4 h-4 text-purple-600 mr-2" />
                      Taxi Stand - Front entrance
                    </li>
                    <li className="flex items-center">
                      <Car className="w-4 h-4 text-purple-600 mr-2" />
                      Valet Parking Available
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Policies */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Hotel Policies</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Check-in/Check-out</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <Clock className="w-4 h-4 text-green-500 mr-2" />
                      Check-in: {hotel.checkIn}
                    </li>
                    <li className="flex items-center">
                      <Clock className="w-4 h-4 text-green-500 mr-2" />
                      Check-out: {hotel.checkOut}
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Early check-in subject to availability
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Late check-out available (fees may apply)
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">General Policies</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Non-smoking hotel
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Pets allowed (fees apply)
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Free cancellation (24h notice)
                    </li>
                    <li className="flex items-center">
                      <CreditCard className="w-4 h-4 text-green-500 mr-2" />
                      Credit card required at check-in
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Booking Form */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Book Your Stay</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rooms
                      </label>
                      <select
                        value={rooms}
                        onChange={(e) => setRooms(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {[1,2,3,4,5].map(num => (
                          <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Guests
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {[1,2,3,4,5,6].map(num => (
                          <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selected Room
                    </label>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-medium text-gray-900">{roomTypes[selectedRoom].name}</div>
                      <div className="text-sm text-gray-600">${roomTypes[selectedRoom].price}/night</div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                {checkIn && checkOut && (
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Price Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          ${roomTypes[selectedRoom].price}/night × {calculateStayDuration()} nights × {rooms} room{rooms > 1 ? 's' : ''}
                        </span>
                        <span className="font-medium">${calculateTotalPrice()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Taxes & Fees</span>
                        <span className="font-medium">${(calculateTotalPrice() * 0.12).toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span className="text-purple-600">
                            ${(calculateTotalPrice() * 1.12).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button
                //   onClick={handleBook}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors mt-6"
                >
                  Book Now
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  Free cancellation up to 24 hours before check-in
                </p>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Contact Hotel</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-3" />
                    <div>
                      <div className="font-medium">+1 (555) 123-4567</div>
                      <div className="text-xs">Front Desk - 24/7</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-3" />
                    <div>
                      <div className="font-medium">reservations@{hotel.name.toLowerCase().replace(/\s+/g, '')}.com</div>
                      <div className="text-xs">Reservations</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Safety Features */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Health & Safety</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Enhanced cleaning protocols
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Contactless check-in available
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    24/7 security monitoring
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Fire safety systems
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Medical assistance available
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HotelDetailPage;