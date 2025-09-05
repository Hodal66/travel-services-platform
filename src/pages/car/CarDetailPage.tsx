import React, { useState } from 'react';
import { 
  Star, Users, Fuel, Settings, MapPin, 
  ChevronLeft, ChevronRight, Shield, Phone, Mail, Check,
  Car as CarIcon, Navigation, Wifi, Bluetooth, Snowflake
} from 'lucide-react';
import type { Car } from '../../types';

interface CarDetailPageProps {
  car: Car;
  onBack: () => void;
  onBook: () => void;
}

const CarDetailPage: React.FC<CarDetailPageProps> = ({ car, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDates, setSelectedDates] = useState({
    pickupDate: '',
    returnDate: '',
    pickupTime: '10:00',
    returnTime: '10:00'
  });
  const [rentalDays, setRentalDays] = useState(1);

  // Extended image gallery (multiple angles of the car)
  const carImages = [
    car.image,
    `${car.image}&sat=-50&con=20`, // Different filter for variety
    `${car.image}&hue=10&sat=20`, // Another variation
    `${car.image}&brightness=10`, // Another variation
    `${car.image}&contrast=20` // Interior shot variation
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carImages.length) % carImages.length);
  };

  const calculateTotalPrice = () => {
    return car.pricePerDay * rentalDays;
  };

  const getFeatureIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase();
    if (lowerFeature.includes('gps') || lowerFeature.includes('navigation')) return <Navigation className="w-4 h-4" />;
    if (lowerFeature.includes('wifi')) return <Wifi className="w-4 h-4" />;
    if (lowerFeature.includes('bluetooth')) return <Bluetooth className="w-4 h-4" />;
    if (lowerFeature.includes('ac') || lowerFeature.includes('air conditioning')) return <Snowflake className="w-4 h-4" />;
    return <Check className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Car Rentals
          </button>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {car.brand} {car.model} {car.year}
              </h1>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  <span className="text-lg font-medium">{car.rating}</span>
                  <span className="text-gray-600 ml-2">(128 reviews)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{car.location}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  ${car.pricePerDay}
                </div>
                <div className="text-gray-600">per day</div>
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
                  src={carImages[currentImageIndex]}
                  alt={`${car.brand} ${car.model} - View ${currentImageIndex + 1}`}
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

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
                  {currentImageIndex + 1} / {carImages.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {carImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Car Specifications */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Vehicle Specifications</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{car.seats} Seats</div>
                  <div className="text-sm text-gray-600">Passengers</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Settings className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{car.transmission}</div>
                  <div className="text-sm text-gray-600">Transmission</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Fuel className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{car.fuelType}</div>
                  <div className="text-sm text-gray-600">Fuel Type</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <CarIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{car.category}</div>
                  <div className="text-sm text-gray-600">Category</div>
                </div>
              </div>
            </div>

            {/* Features & Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Features & Amenities</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-blue-600 mr-3">
                      {getFeatureIcon(feature)}
                    </div>
                    <span className="text-gray-900 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Vehicle</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Experience the perfect blend of comfort, performance, and style with the {car.brand} {car.model}. 
                This {car.year} {car.category.toLowerCase()} vehicle offers exceptional reliability and modern features 
                to make your journey memorable.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Whether you're exploring the city or embarking on a long road trip, this {car.fuelType.toLowerCase()} 
                vehicle with {car.transmission.toLowerCase()} transmission provides smooth and efficient transportation 
                for up to {car.seats} passengers.
              </p>
              <p className="text-gray-600 leading-relaxed">
                All our vehicles undergo comprehensive safety checks and are thoroughly cleaned between rentals 
                to ensure your peace of mind and comfort throughout your rental period.
              </p>
            </div>

            {/* Rental Terms */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Rental Terms & Conditions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Requirements</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Valid driver's license (min. 2 years)
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Minimum age: 21 years
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Credit card for security deposit
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Valid identification document
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Included</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Comprehensive insurance
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      24/7 roadside assistance
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Free cancellation (48h notice)
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Unlimited mileage
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Book This Car</h3>
                
                {/* Pickup Date & Time */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      value={selectedDates.pickupDate}
                      onChange={(e) => setSelectedDates({...selectedDates, pickupDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Time
                    </label>
                    <input
                      type="time"
                      value={selectedDates.pickupTime}
                      onChange={(e) => setSelectedDates({...selectedDates, pickupTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Return Date
                    </label>
                    <input
                      type="date"
                      value={selectedDates.returnDate}
                      onChange={(e) => setSelectedDates({...selectedDates, returnDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Return Time
                    </label>
                    <input
                      type="time"
                      value={selectedDates.returnTime}
                      onChange={(e) => setSelectedDates({...selectedDates, returnTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rental Duration
                    </label>
                    <select
                      value={rentalDays}
                      onChange={(e) => setRentalDays(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[1,2,3,4,5,6,7,14,21,30].map(days => (
                        <option key={days} value={days}>
                          {days} {days === 1 ? 'day' : 'days'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Price Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        ${car.pricePerDay}/day × {rentalDays} days
                      </span>
                      <span className="font-medium">${calculateTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Insurance</span>
                      <span className="font-medium">Included</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes & Fees</span>
                      <span className="font-medium">${(calculateTotalPrice() * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-blue-600">
                          ${(calculateTotalPrice() * 1.1).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Book Button */}
                <button
                //   onClick={handleBook}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors mb-4"
                >
                  Reserve Now
                </button>
                
                <p className="text-xs text-gray-500 text-center mb-4">
                  Free cancellation up to 48 hours before pickup
                </p>

                {/* Contact Info */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Need Help?</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span className="text-sm">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="text-sm">support@travelhub.com</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Safety Features */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-green-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Safety First</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Enhanced cleaning protocols
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Regular maintenance checks
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    GPS tracking for security
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    24/7 emergency support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;