// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Star, Users, Clock, ChevronLeft, ChevronRight,
//   Phone, Mail, Check, Shield, Navigation, Wifi, Car as CarIcon
// } from 'lucide-react';
// import { Transfer } from '@/types';
// import { sampleTransfers } from '@/data/sampleData';
// import toast from 'react-hot-toast';

// const TransferDetailPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [transfer, setTransfer] = useState<Transfer | null>(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [bookingDetails, setBookingDetails] = useState({
//     pickupLocation: '',
//     destination: '',
//     date: '',
//     time: '',
//     passengers: 1,
//     notes: ''
//   });

//   useEffect(() => {
//     const foundTransfer = sampleTransfers.find(t => t.id === id);
//     if (foundTransfer) {
//       setTransfer(foundTransfer);
//     } else {
//       toast.error('Transfer not found');
//       navigate('/transfers');
//     }
//   }, [id, navigate]);

//   if (!transfer) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading transfer details...</p>
//         </div>
//       </div>
//     );
//   }

//   const handleBack = () => {
//     navigate('/transfers');
//   };

//   const handleBook = () => {
//     toast.success(`${transfer.vehicleType} transfer booked successfully!`);
//   };

//   // Extended image gallery
//   const transferImages = [
//     transfer.image,
//     `${transfer.image}&brightness=10`,
//     `${transfer.image}&hue=20`,
//     `${transfer.image}&sat=20`,
//     `${transfer.image}&contrast=15`
//   ];

//   const imageLabels = [
//     'Exterior View',
//     'Interior',
//     'Side View',
//     'Features',
//     'Professional Service'
//   ];

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % transferImages.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + transferImages.length) % transferImages.length);
//   };

//   const calculatePrice = (distance: number = 25) => {
//     return transfer.basePrice + (transfer.pricePerKm * distance);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <button
//             onClick={handleBack}
//             className="flex items-center text-orange-600 hover:text-orange-800 transition-colors mb-4"
//           >
//             <ChevronLeft className="w-5 h-5 mr-1" />
//             Back to Transfers
//           </button>
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">
//                 {transfer.vehicleType}
//               </h1>
//               <div className="flex items-center mt-2 space-x-4">
//                 <div className="flex items-center">
//                   <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
//                   <span className="text-lg font-medium">{transfer.rating}</span>
//                   <span className="text-gray-600 ml-2">(89 reviews)</span>
//                 </div>
//                 <div className="flex items-center text-gray-600">
//                   <Users className="w-4 h-4 mr-1" />
//                   <span>Up to {transfer.capacity} passengers</span>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-4 lg:mt-0">
//               <div className="text-right">
//                 <div className="text-3xl font-bold text-orange-600">
//                   ${transfer.basePrice}
//                 </div>
//                 <div className="text-gray-600">base + ${transfer.pricePerKm}/km</div>
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
//                   src={transferImages[currentImageIndex]}
//                   alt={`${transfer.vehicleType} - ${imageLabels[currentImageIndex]}`}
//                   className="w-full h-96 object-cover"
//                 />
                
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

//                 <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
//                   {imageLabels[currentImageIndex]}
//                 </div>

//                 <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
//                   {currentImageIndex + 1} / {transferImages.length}
//                 </div>
//               </div>

//               <div className="p-4">
//                 <div className="flex space-x-2 overflow-x-auto">
//                   {transferImages.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentImageIndex(index)}
//                       className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
//                         index === currentImageIndex ? 'border-orange-500' : 'border-gray-200'
//                       }`}
//                     >
//                       <img
//                         src={image}
//                         alt={`${imageLabels[index]} thumbnail`}
//                         className="w-full h-full object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Transfer Details */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Transfer Details</h2>
              
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
//                 <div className="text-center p-4 bg-gray-50 rounded-lg">
//                   <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
//                   <div className="font-semibold text-gray-900">{transfer.capacity}</div>
//                   <div className="text-sm text-gray-600">Passengers</div>
//                 </div>
                
//                 <div className="text-center p-4 bg-gray-50 rounded-lg">
//                   <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
//                   <div className="font-semibold text-gray-900">{transfer.duration}</div>
//                   <div className="text-sm text-gray-600">Average Time</div>
//                 </div>
                
//                 <div className="text-center p-4 bg-gray-50 rounded-lg">
//                   <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
//                   <div className="font-semibold text-gray-900">Insured</div>
//                   <div className="text-sm text-gray-600">Fully Covered</div>
//                 </div>
                
//                 <div className="text-center p-4 bg-gray-50 rounded-lg">
//                   <CarIcon className="w-8 h-8 text-orange-600 mx-auto mb-2" />
//                   <div className="font-semibold text-gray-900">Professional</div>
//                   <div className="text-sm text-gray-600">Licensed Driver</div>
//                 </div>
//               </div>

//               <div className="border-t border-gray-200 pt-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Description</h3>
//                 <p className="text-gray-600 leading-relaxed mb-4">
//                   Our {transfer.vehicleType} service provides reliable and comfortable transportation 
//                   for up to {transfer.capacity} passengers. Perfect for airport transfers, city tours, 
//                   or any transportation needs you may have.
//                 </p>
//                 <p className="text-gray-600 leading-relaxed">
//                   All our vehicles are regularly maintained, fully insured, and operated by professional, 
//                   licensed drivers who prioritize your safety and comfort. We track flights to ensure 
//                   timely pickups and provide complimentary waiting time.
//                 </p>
//               </div>
//             </div>

//             {/* Features */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Included Features</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {transfer.features.map((feature, index) => (
//                   <div key={index} className="flex items-center p-3 bg-orange-50 rounded-lg">
//                     <div className="text-orange-600 mr-3">
//                       {feature.toLowerCase().includes('wifi') ? <Wifi className="w-4 h-4" /> :
//                        feature.toLowerCase().includes('gps') ? <Navigation className="w-4 h-4" /> :
//                        <Check className="w-4 h-4" />}
//                     </div>
//                     <span className="text-gray-900 font-medium">{feature}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Pricing Info */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing Information</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="p-4 bg-orange-50 rounded-lg">
//                   <h3 className="font-semibold text-gray-900 mb-2">Base Price</h3>
//                   <div className="text-2xl font-bold text-orange-600">${transfer.basePrice}</div>
//                   <p className="text-sm text-gray-600">Fixed starting cost</p>
//                 </div>
                
//                 <div className="p-4 bg-orange-50 rounded-lg">
//                   <h3 className="font-semibold text-gray-900 mb-2">Per Kilometer</h3>
//                   <div className="text-2xl font-bold text-orange-600">${transfer.pricePerKm}</div>
//                   <p className="text-sm text-gray-600">Distance-based pricing</p>
//                 </div>
//               </div>

//               <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold text-gray-900 mb-2">Example Pricing</h4>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Airport to City Center (20km):</span>
//                     <span className="font-medium">${calculatePrice(20)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Airport to Hotel District (25km):</span>
//                     <span className="font-medium">${calculatePrice(25)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">City Tour (50km):</span>
//                     <span className="font-medium">${calculatePrice(50)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Booking Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-8 space-y-6">
//               {/* Booking Form */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6">Book Your Transfer</h3>
                
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Pickup Location
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Enter pickup address"
//                       value={bookingDetails.pickupLocation}
//                       onChange={(e) => setBookingDetails({...bookingDetails, pickupLocation: e.target.value})}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Destination
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Enter destination"
//                       value={bookingDetails.destination}
//                       onChange={(e) => setBookingDetails({...bookingDetails, destination: e.target.value})}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     />
//                   </div>
                  
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Date
//                       </label>
//                       <input
//                         type="date"
//                         value={bookingDetails.date}
//                         onChange={(e) => setBookingDetails({...bookingDetails, date: e.target.value})}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Time
//                       </label>
//                       <input
//                         type="time"
//                         value={bookingDetails.time}
//                         onChange={(e) => setBookingDetails({...bookingDetails, time: e.target.value})}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                       />
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Passengers
//                     </label>
//                     <select
//                       value={bookingDetails.passengers}
//                       onChange={(e) => setBookingDetails({...bookingDetails, passengers: Number(e.target.value)})}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     >
//                       {Array.from({length: transfer.capacity}, (_, i) => i + 1).map(num => (
//                         <option key={num} value={num}>{num} passenger{num > 1 ? 's' : ''}</option>
//                       ))}
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Special Notes
//                     </label>
//                     <textarea
//                       rows={3}
//                       placeholder="Any special requirements or notes..."
//                       value={bookingDetails.notes}
//                       onChange={(e) => setBookingDetails({...bookingDetails, notes: e.target.value})}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     ></textarea>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleBook}
//                   className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-medium transition-colors mt-6"
//                 >
//                   Book Transfer
//                 </button>
//               </div>

//               {/* Contact Info */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <h4 className="font-semibold text-gray-900 mb-4">Need Help?</h4>
//                 <div className="space-y-3">
//                   <div className="flex items-center text-gray-600">
//                     <Phone className="w-4 h-4 mr-3" />
//                     <span className="text-sm">+1 (555) 123-4567</span>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <Mail className="w-4 h-4 mr-3" />
//                     <span className="text-sm">transfers@travelhub.com</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Safety Features */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <div className="flex items-center mb-4">
//                   <Shield className="w-6 h-6 text-orange-600 mr-2" />
//                   <h4 className="font-semibold text-gray-900">Safety & Security</h4>
//                 </div>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li className="flex items-center">
//                     <Check className="w-4 h-4 text-green-500 mr-2" />
//                     Licensed professional drivers
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="w-4 h-4 text-green-500 mr-2" />
//                     Comprehensive insurance coverage
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="w-4 h-4 text-green-500 mr-2" />
//                     Real-time GPS tracking
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="w-4 h-4 text-green-500 mr-2" />
//                     24/7 customer support
//                   </li>
//                   <li className="flex items-center">
//                     <Check className="w-4 h-4 text-green-500 mr-2" />
//                     Regular vehicle maintenance
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

// export default TransferDetailPage;