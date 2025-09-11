import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Clock,
  Users,
  MapPin,
  ArrowRight,
  Mountain,
  Camera,
  Utensils,
} from "lucide-react";
import { sampleTours } from "@/data/sampleData";
import { Tour } from "@/types";

const ToursPage: React.FC = () => {
  const [tours] = useState<Tour[]>(sampleTours);
  const [filteredTours, setFilteredTours] = useState<Tour[]>(sampleTours);
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<string>("All");

  const tourTypes = [
    "All",
    "City Tour",
    "Adventure",
    "Cultural",
    "Nature",
    "Historical",
    "Food & Wine",
  ];
  const difficulties = ["All", "Easy", "Moderate", "Hard"];
  const priceRanges = ["All", "Under $50", "$50-$100", "Over $100"];

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    filterTours(type, selectedDifficulty, priceRange);
  };

  const handleDifficultyFilter = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    filterTours(selectedType, difficulty, priceRange);
  };

  const handlePriceFilter = (range: string) => {
    setPriceRange(range);
    filterTours(selectedType, selectedDifficulty, range);
  };

  const filterTours = (type: string, difficulty: string, range: string) => {
    let filtered = tours;

    if (type !== "All") {
      filtered = filtered.filter((tour) => tour.type === type);
    }

    if (difficulty !== "All") {
      filtered = filtered.filter((tour) => tour.difficulty === difficulty);
    }

    if (range !== "All") {
      filtered = filtered.filter((tour) => {
        switch (range) {
          case "Under $50":
            return tour.price < 50;
          case "$50-$100":
            return tour.price >= 50 && tour.price <= 100;
          case "Over $100":
            return tour.price > 100;
          default:
            return true;
        }
      });
    }

    setFilteredTours(filtered);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Adventure":
        return <Mountain className="h-6 w-6" />;
      case "Nature":
        return <Camera className="h-6 w-6" />;
      case "Food & Wine":
        return <Utensils className="h-6 w-6" />;
      default:
        return <MapPin className="h-6 w-6" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Moderate":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Guided Tours & Experiences
            </h1>
            <p className="text-xl text-teal-100">
              Discover amazing destinations with expert local guides
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Filter Tours</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tour Type
              </label>
              <div className="flex flex-wrap gap-2">
                {tourTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeFilter(type)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedType === type
                        ? "bg-teal-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => handleDifficultyFilter(difficulty)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedDifficulty === difficulty
                        ? "bg-teal-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>

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
                        ? "bg-teal-600 text-white"
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

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Tours ({filteredTours.length})
          </h2>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 bg-gradient-to-br from-teal-200 to-cyan-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-teal-500 rounded-lg flex items-center justify-center text-white">
                      {getTypeIcon(tour.type)}
                    </div>
                    <p className="text-white font-semibold">{tour.type}</p>
                  </div>
                </div>

                <div className="absolute top-4 left-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                      tour.difficulty
                    )}`}
                  >
                    {tour.difficulty}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <div className="flex items-center bg-white/90 rounded-full px-2 py-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-semibold ml-1">
                      {tour.rating}
                    </span>
                  </div>
                </div>

                {tour.available && (
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Available
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {tour.title}
                </h3>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{tour.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Max {tour.maxGroupSize}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">
                    Highlights:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {tour.highlights.slice(0, 3).map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-teal-50 text-teal-600 px-2 py-1 rounded text-xs"
                      >
                        {highlight}
                      </span>
                    ))}
                    {tour.highlights.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{tour.highlights.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Guide Info */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800">
                      Guide: {tour.guide.name}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                      <span className="text-xs">
                        {tour.guide.rating} • {tour.guide.specialties[0]}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-teal-600">
                      ${tour.price}
                    </span>
                    <span className="text-gray-600 text-sm">/person</span>
                  </div>
                  <Link
                    to={`/tours/${tour.id}`}
                    className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
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
        {filteredTours.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <Mountain className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No tours found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters to find more options
            </p>
            <button
              onClick={() => {
                setSelectedType("All");
                setSelectedDifficulty("All");
                setPriceRange("All");
                setFilteredTours(tours);
              }}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToursPage;
