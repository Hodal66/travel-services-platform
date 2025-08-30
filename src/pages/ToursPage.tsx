/* eslint-disable prefer-const */
/* eslint-disable no-case-declarations */
import React, { useState, useMemo } from 'react';
import { Star, Clock, Users, Mountain, Filter, SortDesc, Calendar, MapPin } from 'lucide-react';
import type { Tour, TourFilters } from '../types';
import { sampleTours } from '../data/sampleData';

const ToursPage: React.FC = () => {
  const [filters, setFilters] = useState<TourFilters>({});
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'duration'>('price');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort tours
  const filteredTours = useMemo(() => {
    let filtered = sampleTours.filter(tour => {
      if (filters.category && tour.category !== filters.category) return false;
      if (filters.difficulty && tour.difficulty !== filters.difficulty) return false;
      if (filters.duration && tour.duration !== filters.duration) return false;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (tour.price < min || tour.price > max) return false;
      }
      return true;
    });

    // Sort tours
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'duration':
          // Simple duration sorting (this could be more sophisticated)
          const getDurationValue = (duration: string) => {
            if (duration.includes('hour')) return 1;
            if (duration.includes('Half day')) return 2;
            if (duration.includes('Full day')) return 3;
            if (duration.includes('2 days')) return 4;
            return 5;
          };
          return getDurationValue(a.duration) - getDurationValue(b.duration);
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, sortBy]);

  const resetFilters = () => {
    setFilters({});
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

  const TourCard: React.FC<{ tour: Tour }> = ({ tour }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={tour.image} 
          alt={tour.title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 shadow-lg">
          <div className="flex items-center">
            {getCategoryIcon(tour.category)}
            <span className="ml-1 text-xs font-semibold text-gray-700">{tour.category}</span>
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center shadow-lg">
          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
          <span className="text-sm font-medium">{tour.rating}</span>
        </div>
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          <Clock className="w-3 h-3 inline mr-1" />
          {tour.duration}
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {tour.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>Max {tour.groupSize} people</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tour.difficulty)}`}>
              {tour.difficulty}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Tour Highlights</h4>
          <div className="space-y-1">
            {tour.highlights.slice(0, 3).map((highlight, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                {highlight}
              </div>
            ))}
            {tour.highlights.length > 3 && (
              <div className="text-xs text-gray-500">
                +{tour.highlights.length - 3} more highlights
              </div>
            )}
          </div>
        </div>

        {tour.schedule && tour.schedule.length > 0 && (
          <div className="mb-6 p-3 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Sample Schedule</h4>
            <div className="space-y-1">
              {tour.schedule.slice(0, 2).map((item, index) => (
                <div key={index} className="text-xs text-gray-600">
                  {item}
                </div>
              ))}
              {tour.schedule.length > 2 && (
                <div className="text-xs text-gray-500">
                  +{tour.schedule.length - 2} more activities
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold text-indigo-600">
              ${tour.price}
            </span>
            <span className="text-gray-600 ml-1">/person</span>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Book Tour
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tours & Experiences</h1>
          <p className="text-xl text-gray-600">
            Discover amazing experiences and create unforgettable memories
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
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Categories</option>
                <option value="Cultural">Cultural</option>
                <option value="Adventure">Adventure</option>
                <option value="Nature">Nature</option>
                <option value="City">City</option>
                <option value="Food">Food</option>
              </select>

              <select
                value={filters.difficulty || ''}
                onChange={(e) => setFilters({...filters, difficulty: e.target.value || undefined})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Any Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Challenging">Challenging</option>
              </select>

              <select
                value={filters.duration || ''}
                onChange={(e) => setFilters({...filters, duration: e.target.value || undefined})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Any Duration</option>
                <option value="3 hours">3 hours</option>
                <option value="4 hours">4 hours</option>
                <option value="Half day">Half day</option>
                <option value="Full day">Full day</option>
                <option value="2 days">2 days</option>
                <option value="2.5 hours">2.5 hours</option>
              </select>

              <button
                onClick={resetFilters}
                className="px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Clear All
              </button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'duration')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="price">Price: Low to High</option>
                <option value="rating">Highest Rated</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (per person)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      onChange={(e) => setFilters({
                        ...filters, 
                        priceRange: [Number(e.target.value) || 0, filters.priceRange?.[1] || 1000]
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      onChange={(e) => setFilters({
                        ...filters, 
                        priceRange: [filters.priceRange?.[0] || 0, Number(e.target.value) || 1000]
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredTours.length} of {sampleTours.length} tours
          </p>
          <div className="flex items-center gap-2 text-gray-600">
            <SortDesc className="w-4 h-4" />
            <span className="text-sm">Sorted by {sortBy}</span>
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {/* No Results */}
        {filteredTours.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters to see more results
            </p>
            <button
              onClick={resetFilters}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Popular Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Cultural', 'Adventure', 'Nature', 'City', 'Food'].map((category) => (
              <button
                key={category}
                onClick={() => setFilters({...filters, category})}
                className={`p-4 rounded-xl text-center transition-all duration-300 ${
                  filters.category === category
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white hover:bg-indigo-50 text-gray-700 shadow-md hover:shadow-lg'
                }`}
              >
                <div className="flex justify-center mb-2">
                  {getCategoryIcon(category)}
                </div>
                <div className="text-sm font-medium">{category}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToursPage;