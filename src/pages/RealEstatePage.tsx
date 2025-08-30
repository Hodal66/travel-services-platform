/* eslint-disable prefer-const */
import React, { useState, useMemo } from 'react';
import { Star, Bed, Bath, Square, MapPin, Filter, SortDesc, Heart } from 'lucide-react';
import type { Property, PropertyFilters } from '../types';
import { sampleProperties } from '../data/sampleData';

const RealEstatePage: React.FC = () => {
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'area'>('price');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let filtered = sampleProperties.filter(property => {
      if (filters.type && property.type !== filters.type) return false;
      if (filters.listingType && property.listingType !== filters.listingType) return false;
      if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false;
      if (filters.bathrooms && property.bathrooms < filters.bathrooms) return false;
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (property.price < min || property.price > max) return false;
      }
      return true;
    });

    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'area':
          return b.area - a.area;
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, sortBy]);

  const resetFilters = () => {
    setFilters({});
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const PropertyCard: React.FC<{ property: Property }> = ({ property }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 shadow-lg">
          <span className={`text-xs font-semibold ${
            property.listingType === 'Sale' ? 'text-green-600' : 'text-blue-600'
          }`}>
            For {property.listingType}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center shadow-lg">
          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
          <span className="text-sm font-medium">{property.rating}</span>
        </div>
        <button
          onClick={() => toggleFavorite(property.id)}
          className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
        >
          <Heart 
            className={`w-5 h-5 ${
              favorites.includes(property.id) 
                ? 'text-red-500 fill-current' 
                : 'text-gray-400'
            }`} 
          />
        </button>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {property.title}
          </h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.location}</span>
          </div>
          <p className="text-gray-600">{property.type}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <Bed className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Bath className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Square className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.area} sqft</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {property.features.slice(0, 3).map((feature, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
            >
              {feature}
            </span>
          ))}
          {property.features.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{property.features.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold text-green-600">
              ${property.price.toLocaleString()}
            </span>
            <span className="text-gray-600 ml-1">
              {property.listingType === 'Rent' ? '/month' : ''}
            </span>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            {property.listingType === 'Rent' ? 'Inquire' : 'View Details'}
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Real Estate</h1>
          <p className="text-xl text-gray-600">
            Find your perfect property from our curated listings
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
                value={filters.listingType || ''}
                onChange={(e) => setFilters({...filters, listingType: e.target.value || undefined})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">For Sale & Rent</option>
                <option value="Sale">For Sale</option>
                <option value="Rent">For Rent</option>
              </select>

              <select
                value={filters.type || ''}
                onChange={(e) => setFilters({...filters, type: e.target.value || undefined})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Condo">Condo</option>
                <option value="Studio">Studio</option>
                <option value="Townhouse">Townhouse</option>
              </select>

              <select
                value={filters.bedrooms || ''}
                onChange={(e) => setFilters({...filters, bedrooms: Number(e.target.value) || undefined})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Any Bedrooms</option>
                <option value="1">1+ bedrooms</option>
                <option value="2">2+ bedrooms</option>
                <option value="3">3+ bedrooms</option>
                <option value="4">4+ bedrooms</option>
                <option value="5">5+ bedrooms</option>
              </select>

              <button
                onClick={resetFilters}
                className="px-4 py-2 text-green-600 hover:text-green-800 transition-colors"
              >
                Clear All
              </button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'area')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="price">Price: Low to High</option>
                <option value="rating">Highest Rated</option>
                <option value="area">Largest First</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min Price"
                      onChange={(e) => setFilters({
                        ...filters, 
                        priceRange: [Number(e.target.value) || 0, filters.priceRange?.[1] || 10000000]
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="Max Price"
                      onChange={(e) => setFilters({
                        ...filters, 
                        priceRange: [filters.priceRange?.[0] || 0, Number(e.target.value) || 10000000]
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    value={filters.location || ''}
                    onChange={(e) => setFilters({...filters, location: e.target.value || undefined})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Bathrooms
                  </label>
                  <select
                    value={filters.bathrooms || ''}
                    onChange={(e) => setFilters({...filters, bathrooms: Number(e.target.value) || undefined})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Any</option>
                    <option value="1">1+ bathrooms</option>
                    <option value="2">2+ bathrooms</option>
                    <option value="3">3+ bathrooms</option>
                    <option value="4">4+ bathrooms</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredProperties.length} of {sampleProperties.length} properties
          </p>
          <div className="flex items-center gap-2 text-gray-600">
            <SortDesc className="w-4 h-4" />
            <span className="text-sm">Sorted by {sortBy}</span>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* No Results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters to see more results
            </p>
            <button
              onClick={resetFilters}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealEstatePage;