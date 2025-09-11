import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Users,
  Settings,
  Fuel,
  MapPin,
  Shield,
  Phone,
  Calendar,
} from "lucide-react";
import { sampleCars } from "@/data/sampleData";

const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const car = sampleCars.find((c) => c.id === id);

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Car Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The car you're looking for doesn't exist.
          </p>
          <Link
            to="/cars"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cars
          </Link>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    alert("Booking functionality will be implemented with backend integration");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cars
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Car Header */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {car.brand} {car.model}
                  </h1>
                  <p className="text-gray-600">
                    {car.year} • {car.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold ml-1">
                      {car.rating}
                    </span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {car.category}
                  </span>
                </div>
              </div>

              {/* Car Image */}
              <div className="relative h-80 bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-500 rounded-lg flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">
                        {car.brand.charAt(0)}
                      </span>
                    </div>
                    <p className="text-white font-semibold text-xl">
                      {car.brand} {car.model}
                    </p>
                  </div>
                </div>
                {car.available && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-2 rounded-full text-sm font-semibold">
                      Available Now
                    </span>
                  </div>
                )}
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">{car.seats}</div>
                  <div className="text-sm text-gray-600">Passengers</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Settings className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">{car.transmission}</div>
                  <div className="text-sm text-gray-600">Transmission</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Fuel className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">{car.fuelType}</div>
                  <div className="text-sm text-gray-600">Fuel Type</div>
                </div>
              </div>

              {/* Description */}
              {car.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{car.description}</p>
                </div>
              )}

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Features & Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Shield className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Specifications */}
            {car.specifications && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Engine</span>
                    <span className="font-medium">
                      {car.specifications.engine}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Horsepower</span>
                    <span className="font-medium">
                      {car.specifications.horsepower}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Fuel Capacity</span>
                    <span className="font-medium">
                      {car.specifications.fuelCapacity}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Baggage</span>
                    <span className="font-medium">
                      {car.specifications.baggage}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  ${car.pricePerDay}
                </div>
                <div className="text-gray-600">per day</div>
              </div>

              {/* Booking Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pick-up Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Drop-off Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pick-up Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>{car.location}</option>
                      <option>Airport</option>
                      <option>Downtown</option>
                      <option>Hotel Delivery</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Booking Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBooking}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
                >
                  Book Now
                </button>

                <button className="w-full flex items-center justify-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold">
                  <Phone className="mr-2 h-4 w-4" />
                  Call for Booking
                </button>
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Need help with your booking?
                </p>
                <p className="text-sm font-semibold text-blue-600">
                  +1-800-CAR-RENT
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
