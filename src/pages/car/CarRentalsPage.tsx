// /* eslint-disable prefer-const */

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Fuel, Settings, Filter, SortDesc } from 'lucide-react';
import type { Car, CarFilters } from '../../types';
import { sampleCars } from '../../data/sampleData';

const CarRentalsPage: React.FC = () => {
  const [filters, setFilters] = useState<CarFilters>({});
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'year'>('price');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort cars
  const filteredCars = useMemo(() => {
    let filtered = sampleCars.filter(car => {
      if (filters.category && car.category !== filters.category) return false;
      if (filters.transmission && car.transmission !== filters.transmission) return false;
      if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
      if (filters.seats && car.seats < filters.seats) return false;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (car.pricePerDay < min || car.pricePerDay > max) return false;
      }
      return true;
    });

    // Sort cars
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.pricePerDay - b.pricePerDay;
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, sortBy]);

  const resetFilters = () => {
    setFilters({});
  };

  const CarCard: React.FC<{ car: Car }> = ({ car }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={car.image} 
          alt={`${car.brand} ${car.model}`} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center shadow-lg">
          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
          <span className="text-sm font-medium">{car.rating}</span>
        </div>
        {!car.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
              Not Available
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {car.brand} {car.model}
          </h3>
          <p className="text-gray-600">{car.year} • {car.category}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm">{car.seats} seats</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Settings className="w-4 h-4 mr-1" />
            <span className="text-sm">{car.transmission}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Fuel className="w-4 h-4 mr-1" />
            <span className="text-sm">{car.fuelType}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {car.features.slice(0, 3).map((feature, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {feature}
            </span>
          ))}
          {car.features.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{car.features.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold text-blue-600">${car.pricePerDay}</span>
            <span className="text-gray-600 ml-1">/day</span>
          </div>
          <div className="flex gap-2">
            <Link 
              to={`/cars/${car.id}`}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium transition-colors hover:bg-blue-50"
            >
              View Details
            </Link>
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                car.available 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!car.available}
            >
              {car.available ? 'Book Now' : 'Unavailable'}
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Car Rentals</h1>
          <p className="text-xl text-gray-600">
            Choose from our premium fleet of vehicles for your perfect journey
          </p>
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
                value={filters.category || ''}
                onChange={(e) => setFilters({...filters, category: e.target.value || undefined})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option value="Economy">Economy</option>
                <option value="Compact">Compact</option>
                <option value="SUV">SUV</option>
                <option value="Luxury">Luxury</option>
                <option value="Luxury SUV">Luxury SUV</option>
              </select>

              <select
                value={filters.transmission || ''}
                onChange={(e) => setFilters({...filters, transmission: e.target.value || undefined})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any Transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>

              <select
                value={filters.fuelType || ''}
                onChange={(e) => setFilters({...filters, fuelType: e.target.value || undefined})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>

              <button
                onClick={resetFilters}
                className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                Clear All
              </button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'year')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="price">Price: Low to High</option>
                <option value="rating">Highest Rated</option>
                <option value="year">Newest First</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (per day)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      onChange={(e) => setFilters({
                        ...filters, 
                        priceRange: [Number(e.target.value) || 0, filters.priceRange?.[1] || 1000]
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      onChange={(e) => setFilters({
                        ...filters, 
                        priceRange: [filters.priceRange?.[0] || 0, Number(e.target.value) || 1000]
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Seats
                  </label>
                  <select
                    value={filters.seats || ''}
                    onChange={(e) => setFilters({...filters, seats: Number(e.target.value) || undefined})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any</option>
                    <option value="4">4+ seats</option>
                    <option value="5">5+ seats</option>
                    <option value="7">7+ seats</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredCars.length} of {sampleCars.length} cars
          </p>
          <div className="flex items-center gap-2 text-gray-600">
            <SortDesc className="w-4 h-4" />
            <span className="text-sm">Sorted by {sortBy}</span>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* No Results */}
        {filteredCars.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No cars found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters to see more results
            </p>
            <button
              onClick={resetFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarRentalsPage;