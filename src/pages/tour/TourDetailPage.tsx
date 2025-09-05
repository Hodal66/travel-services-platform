import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Star, Clock, Users, Mountain, ChevronLeft, ChevronRight,
  Calendar, MapPin, Phone, Mail, Check, Shield, Camera
} from 'lucide-react';
import type { Tour } from '../../types';
import { sampleTours } from '../../data/sampleData';
import toast from 'react-hot-toast';

const TourDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tour, setTour] = useState<Tour | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    participants: 1,
    specialRequests: ''
  });

  useEffect(() => {
    const foundTour = sampleTours.find(t => t.id === id);
    if (foundTour) {
      setTour(foundTour);
    } else {
      toast.error('Tour not found');
      navigate('/tours');
    }
  }, [id, navigate]);

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tour details...</p>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/tours');
  };

  const handleBook = () => {
    toast.success(`${tour.title} booked successfully!`);
  };

  // Extended image gallery
  const tourImages = [
    tour.image,
    `${tour.image}&brightness=15`,
    `${tour.image}&hue=30`,
    `${tour.image}&sat=25`,
    `${tour.image}&contrast=20`,
    `${tour.image}&brightness=-10`
  ];

  const imageLabels = [
    'Main Attraction',
    'Scenic Views',
    'Group Activity',
    'Local Culture',
    'Adventure Moments',
    'Beautiful Landscapes'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tourImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tourImages.length) % tourImages.length);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Challenging':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Adventure':
        return <Mountain className="w-4 h-4" />;
      case 'Cultural':
        return <Star className="w-4 h-4" />;
      case 'Nature':
        return <MapPin className="w-4 h-4" />;
      case 'Food':
        return <Calendar className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const calculateTotalPrice = () => {
    return tour.price * bookingDetails.participants;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={handleBack}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Tours
          </button>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <div className="flex items-center mr-4">
                  {getCategoryIcon(tour.category)}
                  <span className="ml-1 text-sm font-semibold text-gray-700">{tour.category}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  <span className="text-lg font-medium">{tour.rating}</span>
                  <span className="text-gray-600 ml-2">(156 reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {tour.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-gray-600 mb-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>Max {tour.groupSize} people</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(tour.difficulty)}`}>
                  {tour.difficulty}
                </span>
              </div>
            </div>
            
            <div className="mt-4 lg:mt-0 lg:ml-8 text-right">
              <div className="text-3xl font-bold text-indigo-600">
                ${tour.price}
              </div>
              <div className="text-gray-600">per person</div>
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
                  src={tourImages[currentImageIndex]}
                  alt={`${tour.title} - ${imageLabels[currentImageIndex]}`}
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
                  {imageLabels[currentImageIndex]}
                </div>

                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
                  {currentImageIndex + 1} / {tourImages.length}
                </div>
              </div>

              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {tourImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex ? 'border-indigo-500' : 'border-gray-200'
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

            {/* Tour Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tour Overview</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{tour.duration}</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{tour.groupSize}</div>
                  <div className="text-sm text-gray-600">Max Group Size</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Mountain className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{tour.difficulty}</div>
                  <div className="text-sm text-gray-600">Difficulty</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Star className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{tour.category}</div>
                  <div className="text-sm text-gray-600">Category</div>
                </div>
              </div>

              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  {tour.description || `Join us for an unforgettable ${tour.category.toLowerCase()} experience with our ${tour.title}. 
                  This ${tour.difficulty.toLowerCase()} level tour is perfect for those looking to explore and discover new adventures 
                  over the course of ${tour.duration}.`}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our experienced guides will lead you through carefully selected locations, ensuring you get the most out of your 
                  {tour.duration} journey. With a maximum group size of {tour.groupSize} participants, you'll enjoy a personalized 
                  and intimate experience that larger tours simply cannot provide.
                </p>
              </div>
            </div>

            {/* Tour Highlights */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tour Highlights</h2>
              
              <div className="space-y-3">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center p-3 bg-indigo-50 rounded-lg">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                    <span className="text-gray-900 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included Services */}
            {tour.included && tour.included.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tour.included.map((item, index) => (
                    <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                      <Check className="w-4 h-4 text-green-600 mr-3" />
                      <span className="text-gray-900 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Itinerary */}
            {tour.schedule && tour.schedule.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Itinerary</h2>
                
                <div className="space-y-4">
                  {tour.schedule.map((item, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Important Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">What to Bring</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Comfortable walking shoes
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Weather-appropriate clothing
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Camera for memorable photos
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Water bottle and snacks
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Tour Policies</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Free cancellation (24h notice)
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Small group experience
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Professional guide included
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      All entrance fees covered
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
                <h3 className="text-xl font-bold text-gray-900 mb-6">Book This Tour</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tour Date
                    </label>
                    <input
                      type="date"
                      value={bookingDetails.date}
                      onChange={(e) => setBookingDetails({...bookingDetails, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Participants
                    </label>
                    <select
                      value={bookingDetails.participants}
                      onChange={(e) => setBookingDetails({...bookingDetails, participants: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {Array.from({length: tour.groupSize}, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>{num} participant{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                      value={bookingDetails.specialRequests}
                      onChange={(e) => setBookingDetails({...bookingDetails, specialRequests: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    ></textarea>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        ${tour.price} × {bookingDetails.participants} participant{bookingDetails.participants > 1 ? 's' : ''}
                      </span>
                      <span className="font-medium">${calculateTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service fee</span>
                      <span className="font-medium">${Math.round(calculateTotalPrice() * 0.05)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-indigo-600">
                          ${Math.round(calculateTotalPrice() * 1.05)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBook}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors mt-6"
                >
                  Book Tour
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  Free cancellation up to 24 hours before tour starts
                </p>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Questions?</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-3" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-3" />
                    <span className="text-sm">tours@travelhub.com</span>
                  </div>
                </div>
              </div>

              {/* Safety Features */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-indigo-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Safety & Guidelines</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Certified professional guides
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    First aid trained staff
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Safety equipment provided
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Emergency procedures in place
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Insurance coverage included
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

export default TourDetailPage;