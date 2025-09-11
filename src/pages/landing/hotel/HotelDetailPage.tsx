import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, Users, Calendar, Phone, Shield, Wifi, Car, Utensils, Waves, ChevronLeft, ChevronRight } from 'lucide-react';
import { sampleHotels } from '@/data/sampleData';

const HotelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const [guests, setGuests] = useState<number>(2);
  
  const hotel = sampleHotels.find(h => h.id === id);
  console.log("This is my Hotel :", hotel)

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hotel Not Found</h2>
          <p className="text-gray-600 mb-6">The hotel you're looking for doesn't exist.</p>
          <Link
            to="/hotels"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hotels
          </Link>
        </div>
      </div>
    );
  }
    const hotelImages= hotel.images;

   const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 ));
  };

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes('wifi')) return <Wifi className="h-4 w-4 text-purple-500" />;
    if (amenity.toLowerCase().includes('pool') || amenity.toLowerCase().includes('spa')) return <Waves className="h-4 w-4 text-purple-500" />;
    if (amenity.toLowerCase().includes('restaurant') || amenity.toLowerCase().includes('bar')) return <Utensils className="h-4 w-4 text-purple-500" />;
    if (amenity.toLowerCase().includes('parking')) return <Car className="h-4 w-4 text-purple-500" />;
    return <Star className="h-4 w-4 text-purple-500" />;
  };

  const handleBooking = () => {
    if (!selectedRoom) {
      alert('Please select a room type');
      return;
    }
    alert('Booking functionality will be implemented with backend integration');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hotels
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hotel Header */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
    
                
                <div className="text-right">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${
                          i < hotel.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`} 
                      />
                    ))}
                    <span className="text-lg font-semibold ml-2">{hotel.rating}</span>
                  </div>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {Math.floor(hotel.rating)} Star Hotel
                  </span>
                </div>
              </div>

              {/* Hotel Image */}
               {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative">
               
                 <img
                  src={hotel.image}
                  alt={`${hotel.description}`}
                  className="w-full h-96 object-cover"
                />
              
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

                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
                  {[currentImageIndex]}
                </div>

                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
                  {currentImageIndex + 1}
                </div>
              </div>

              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {hotel && hotelImages?.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex ? 'border-indigo-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${[index]} thumbnail`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
           
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{hotel.address}</span>
                  </div>
                  <p className="text-gray-600">{hotel.location}</p>
                </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold">Check-in</div>
                  <div className="text-sm text-gray-600">{hotel.checkIn}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold">Check-out</div>
                  <div className="text-sm text-gray-600">{hotel.checkOut}</div>
                </div>
              </div>

              {/* Description */}
              {hotel.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">About This Hotel</h3>
                  <p className="text-gray-600">{hotel.description}</p>
                </div>
              )}

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Hotel Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      {getAmenityIcon(amenity)}
                      <span className="text-sm text-gray-700 ml-2">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Room Types */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Available Rooms</h3>
              <div className="space-y-4">
                {hotel.roomTypes.map((room, index) => (
                  <div key={index} className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedRoom === room.name 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`} onClick={() => setSelectedRoom(room.name)}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">{room.name}</h4>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Users className="h-4 w-4 mr-1" />
                          <span className="text-sm">Up to {room.maxGuests} guests</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {room.features.map((feature, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-purple-600 mb-1">
                          ${room.price}
                        </div>
                        <div className="text-sm text-gray-600">per night</div>
                        <input
                          type="radio"
                          name="room"
                          value={room.name}
                          checked={selectedRoom === room.name}
                          onChange={() => setSelectedRoom(room.name)}
                          className="mt-2 text-purple-600"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  ${hotel.pricePerNight}
                </div>
                <div className="text-gray-600">starting price per night</div>
              </div>

              {/* Booking Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select 
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Selected Room Display */}
                {selectedRoom && (
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-sm font-medium text-purple-800">Selected Room:</div>
                    <div className="text-sm text-purple-600">{selectedRoom}</div>
                  </div>
                )}
              </div>

              {/* Booking Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBooking}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold"
                >
                  Book Now
                </button>
                
                <button className="w-full flex items-center justify-center bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors duration-200 font-semibold">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Hotel
                </button>
              </div>

              {/* Hotel Policies */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-2">Hotel Policies</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    <span>Free cancellation up to 24 hours</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Check-in: {hotel.checkIn}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Check-out: {hotel.checkOut}</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600 mb-2">Need assistance?</p>
                <p className="text-sm font-semibold text-purple-600">+1-800-HOTELS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailPage;