
import {
  Star, Bed, Bath, Square, MapPin, ChevronLeft, ChevronRight,
  Heart, Share2, Phone, Mail, Check, Car, Wifi,
  Utensils, Dumbbell, TreePine, Shield} from 'lucide-react';
import type { Property } from '../types';
import { useState } from 'react';

interface PropertyDetailPageProps {
  property: Property;
  onBack: () => void;
  onContact: () => void;
}

const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ property, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  // Extended image gallery (different rooms and angles)
  const propertyImages = [
    property.image, // Main exterior
    `${property.image}&brightness=10`, // Living room
    `${property.image}&hue=30`, // Kitchen
    `${property.image}&sat=20`, // Bedroom
    `${property.image}&con=15`, // Bathroom
    `${property.image}&brightness=-10`, // Another exterior angle
    `${property.image}&hue=-20`, // Dining area
    `${property.image}&sat=-10` // Garden/outdoor space
  ];

  const imageLabels = [
    'Exterior View',
    'Living Room',
    'Kitchen',
    'Master Bedroom',
    'Bathroom',
    'Front View',
    'Dining Area',
    'Outdoor Space'
  ];

  // Extended amenities list based on property type
  const getAllAmenities = () => {
    const baseAmenities = [...property.features];
    const additionalAmenities = [
      'High-Speed Internet',
      'Central Heating',
      'Air Conditioning',
      'Hardwood Floors',
      'Updated Kitchen',
      'In-Unit Laundry',
      'Walk-in Closet',
      'Storage Space',
      property.type === 'Villa' || property.type === 'House' ? 'Private Garden' : 'Balcony',
      property.area > 2000 ? 'Home Office' : 'Work Space',
      'Security System',
      'Ample Lighting'
    ];
    return [...new Set([...baseAmenities, ...additionalAmenities])];
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);
  };

  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes('parking') || lowerAmenity.includes('garage')) return <Car className="w-4 h-4" />;
    if (lowerAmenity.includes('wifi') || lowerAmenity.includes('internet')) return <Wifi className="w-4 h-4" />;
    if (lowerAmenity.includes('kitchen') || lowerAmenity.includes('dining')) return <Utensils className="w-4 h-4" />;
    if (lowerAmenity.includes('gym') || lowerAmenity.includes('fitness')) return <Dumbbell className="w-4 h-4" />;
    if (lowerAmenity.includes('garden') || lowerAmenity.includes('balcony')) return <TreePine className="w-4 h-4" />;
    // if (lowerAmenity.includes('pool')) return <Swimming className="w-4 h-4" />;
    if (lowerAmenity.includes('security')) return <Shield className="w-4 h-4" />;
    return <Check className="w-4 h-4" />;
  };

  const monthlyPayment = property.listingType === 'Sale' ? (property.price * 0.004).toFixed(0) : null; // Rough estimate

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-green-600 hover:text-green-800 transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Properties
          </button>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium mr-3 ${
                  property.listingType === 'Sale' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  For {property.listingType}
                </span>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  <span className="text-lg font-medium">{property.rating}</span>
                  <span className="text-gray-600 ml-2">(89 reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-1" />
                <span className="text-lg">{property.location}</span>
              </div>

              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center">
                  <Bed className="w-5 h-5 mr-1" />
                  <span>{property.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center">
                  <Bath className="w-5 h-5 mr-1" />
                  <span>{property.bathrooms} bathrooms</span>
                </div>
                <div className="flex items-center">
                  <Square className="w-5 h-5 mr-1" />
                  <span>{property.area} sqft</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 lg:mt-0 lg:ml-8">
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`p-2 rounded-full border transition-colors ${
                    isFavorited ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">
                  ${property.price.toLocaleString()}
                </div>
                <div className="text-gray-600">
                  {property.listingType === 'Rent' ? '/month' : ''}
                </div>
                {monthlyPayment && property.listingType === 'Sale' && (
                  <div className="text-sm text-gray-500 mt-1">
                    Est. ${monthlyPayment}/month mortgage
                  </div>
                )}
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
                  src={propertyImages[currentImageIndex]}
                  alt={`${property.title} - ${imageLabels[currentImageIndex]}`}
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
                  {currentImageIndex + 1} / {propertyImages.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {propertyImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex ? 'border-green-500' : 'border-gray-200'
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
            </div>

            {/* Property Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Overview</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bed className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bath className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Square className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{property.area}</div>
                  <div className="text-sm text-gray-600">Square Feet</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{property.type}</div>
                  <div className="text-sm text-gray-600">Property Type</div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <dl className="space-y-3">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Property Type:</dt>
                        <dd className="font-medium text-gray-900">{property.type}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Listing Type:</dt>
                        <dd className="font-medium text-gray-900">For {property.listingType}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Year Built:</dt>
                        <dd className="font-medium text-gray-900">2018</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Lot Size:</dt>
                        <dd className="font-medium text-gray-900">{Math.round(property.area * 1.2)} sqft</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div>
                    <dl className="space-y-3">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Parking:</dt>
                        <dd className="font-medium text-gray-900">2 spaces</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Heating:</dt>
                        <dd className="font-medium text-gray-900">Central</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Cooling:</dt>
                        <dd className="font-medium text-gray-900">AC</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Flooring:</dt>
                        <dd className="font-medium text-gray-900">Hardwood</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  {property.description || `Discover this exceptional ${property.type.toLowerCase()} located in the heart of ${property.location}. 
                  This stunning ${property.bedrooms}-bedroom, ${property.bathrooms}-bathroom property offers ${property.area} square feet 
                  of thoughtfully designed living space.`}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The property features an open-concept design that seamlessly blends modern amenities with classic charm. 
                  The spacious living areas are perfect for both relaxation and entertaining, while the well-appointed bedrooms 
                  provide private retreats for rest and rejuvenation.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Located in {property.location}, you'll enjoy convenient access to shopping, dining, schools, and transportation. 
                  This {property.type.toLowerCase()} represents an excellent opportunity for those seeking quality, comfort, and value 
                  in today's real estate market.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {property.listingType === 'Sale' ? 
                    'Don\'t miss this opportunity to own a piece of prime real estate in one of the most desirable neighborhoods.' :
                    'Available for immediate occupancy. Lease terms are flexible and pets are welcome with approval.'
                  }
                </p>
              </div>
            </div>

            {/* Features & Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Features & Amenities</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getAllAmenities().slice(0, showAllAmenities ? undefined : 8).map((amenity, index) => (
                  <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="text-green-600 mr-3">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span className="text-gray-900 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>

              {getAllAmenities().length > 8 && (
                <button
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                  className="mt-4 text-green-600 hover:text-green-800 font-medium transition-colors"
                >
                  {showAllAmenities ? 'Show Less' : `Show All ${getAllAmenities().length} Amenities`}
                </button>
              )}
            </div>

            {/* Neighborhood Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Neighborhood</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About {property.location}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {property.location} is a vibrant neighborhood known for its excellent schools, diverse dining options, 
                  and convenient transportation links. Residents enjoy easy access to parks, shopping centers, and cultural attractions. 
                  The area has seen steady growth and development, making it an attractive location for both families and professionals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">9.2</div>
                  <div className="text-sm font-medium text-gray-900">Walk Score</div>
                  <div className="text-xs text-gray-600">Very Walkable</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">8.7</div>
                  <div className="text-sm font-medium text-gray-900">Transit Score</div>
                  <div className="text-xs text-gray-600">Excellent Transit</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">7.8</div>
                  <div className="text-sm font-medium text-gray-900">Bike Score</div>
                  <div className="text-xs text-gray-600">Very Bikeable</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {property.listingType === 'Sale' ? 'Schedule a Viewing' : 'Inquire About Rental'}
                </h3>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {property.listingType === 'Rent' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Move-in Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  )}

                  {property.listingType === 'Sale' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Viewing Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder={`I'm interested in this ${property.type.toLowerCase()}. Please contact me with more information.`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    // onClick={handleContact}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  >
                    {property.listingType === 'Sale' ? 'Schedule Viewing' : 'Send Inquiry'}
                  </button>
                </form>
                
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 mb-3">Contact Agent</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="text-sm">+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center justify-center text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        <span className="text-sm">properties@travelhub.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mortgage Calculator (for Sale properties) */}
              {property.listingType === 'Sale' && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Mortgage Calculator</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Home Price</label>
                      <div className="text-lg font-bold text-gray-900">
                        ${property.price.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Down Payment (20%)</label>
                      <div className="text-lg font-bold text-gray-900">
                        ${(property.price * 0.2).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Est. Monthly Payment</label>
                      <div className="text-lg font-bold text-green-600">
                        ${monthlyPayment}/month
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      *Estimate based on 30-year fixed rate at 6.5% APR
                    </div>
                  </div>
                </div>
              )}

              {/* Safety & Security */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-green-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Safety & Security</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Verified property listing
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Licensed real estate agent
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Secure online transactions
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Professional property management
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

export default PropertyDetailPage;