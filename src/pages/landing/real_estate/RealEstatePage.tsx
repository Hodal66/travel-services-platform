// export default RealEstatePage;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Bed,
  Bath,
  Square,
  MapPin,
  ArrowRight,
  DollarSign,
} from "lucide-react";
import { sampleProperties } from "@/data/sampleData";
import { Property } from "@/types";

const RealEstatePage: React.FC = () => {
  const [properties] = useState<Property[]>(sampleProperties);
  const [filteredProperties, setFilteredProperties] =
    useState<Property[]>(sampleProperties);
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedListingType, setSelectedListingType] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<string>("All");

  const propertyTypes = [
    "All",
    "Apartment",
    "House",
    "Villa",
    "Condo",
    "Studio",
  ];
  const listingTypes = ["All", "Sale", "Rent"];
  const priceRanges = [
    "All",
    "Under $100k",
    "$100k-$500k",
    "$500k-$1M",
    "Over $1M",
  ];

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    filterProperties(type, selectedListingType, priceRange);
  };

  const handleListingTypeFilter = (listingType: string) => {
    setSelectedListingType(listingType);
    filterProperties(selectedType, listingType, priceRange);
  };

  const handlePriceFilter = (range: string) => {
    setPriceRange(range);
    filterProperties(selectedType, selectedListingType, range);
  };

  const filterProperties = (
    type: string,
    listingType: string,
    range: string
  ) => {
    let filtered = properties;

    if (type !== "All") {
      filtered = filtered.filter((property) => property.type === type);
    }

    if (listingType !== "All") {
      filtered = filtered.filter(
        (property) => property.listingType === listingType
      );
    }

    if (range !== "All") {
      filtered = filtered.filter((property) => {
        switch (range) {
          case "Under $100k":
            return property.price < 100000;
          case "$100k-$500k":
            return property.price >= 100000 && property.price <= 500000;
          case "$500k-$1M":
            return property.price >= 500000 && property.price <= 1000000;
          case "Over $1M":
            return property.price > 1000000;
          default:
            return true;
        }
      });
    }

    setFilteredProperties(filtered);
  };

  const formatPrice = (price: number, listingType: string) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    } else {
      return `$${price}`;
    }
    console.log(listingType);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Premium Real Estate</h1>
            <p className="text-xl text-green-100">
              Discover your dream property with our exclusive listings
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Filter Properties</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Property Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeFilter(type)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedType === type
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Listing Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Listing Type
              </label>
              <div className="flex flex-wrap gap-2">
                {listingTypes.map((listingType) => (
                  <button
                    key={listingType}
                    onClick={() => handleListingTypeFilter(listingType)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedListingType === listingType
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {listingType}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => handlePriceFilter(range)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      priceRange === range
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Properties ({filteredProperties.length})
          </h2>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Property Image */}
              <div className="relative h-48 bg-gradient-to-br from-green-200 to-blue-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {property.type.charAt(0)}
                      </span>
                    </div>
                    <p className="text-white font-semibold">{property.type}</p>
                  </div>
                </div>

                {/* Listing Type Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      property.listingType === "Sale"
                        ? "bg-blue-600 text-white"
                        : "bg-green-600 text-white"
                    }`}
                  >
                    For {property.listingType}
                  </span>
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-sm font-bold">
                    {formatPrice(property.price, property.listingType)}
                    {property.listingType === "Rent" && "/mo"}
                  </span>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                    {property.title}
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">
                      {property.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Bed className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Bath className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.bathrooms} bath</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Square className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.area} sqft</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {property.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                    {property.features.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{property.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-green-600">
                      {formatPrice(property.price, property.listingType)}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {property.listingType === "Rent" ? "/month" : ""}
                    </span>
                  </div>
                  <Link
                    to={`/properties/${property.id}`}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <DollarSign className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters to find more options
            </p>
            <button
              onClick={() => {
                setSelectedType("All");
                setSelectedListingType("All");
                setPriceRange("All");
                setFilteredProperties(properties);
              }}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
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
