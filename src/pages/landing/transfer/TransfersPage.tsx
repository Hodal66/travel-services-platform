import React, { useState } from "react";
import { Star, Clock, Users, MapPin, ArrowRight, Plane } from "lucide-react";
import { sampleTransfers } from "@/data/sampleData";
import { Transfer } from "@/types";

const TransfersPage: React.FC = () => {
  const [transfers] = useState<Transfer[]>(sampleTransfers);
  const [filteredTransfers, setFilteredTransfers] =
    useState<Transfer[]>(sampleTransfers);
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("All");

  const transferTypes = [
    "All",
    "Airport Pickup",
    "Airport Dropoff",
    "City Transfer",
    "Intercity Transfer",
  ];
  const vehicleTypes = ["All", "Sedan", "SUV", "Van", "Luxury Car", "Bus"];

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    filterTransfers(type, selectedVehicle);
  };

  const handleVehicleFilter = (vehicle: string) => {
    setSelectedVehicle(vehicle);
    filterTransfers(selectedType, vehicle);
  };

  const filterTransfers = (type: string, vehicle: string) => {
    let filtered = transfers;

    if (type !== "All") {
      filtered = filtered.filter((transfer) => transfer.type === type);
    }

    if (vehicle !== "All") {
      filtered = filtered.filter(
        (transfer) => transfer.vehicleType === vehicle
      );
    }

    setFilteredTransfers(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Airport Transfers</h1>
            <p className="text-xl text-orange-100">
              Reliable and comfortable transportation services
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Filter Transfers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transfer Type
              </label>
              <div className="flex flex-wrap gap-2">
                {transferTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeFilter(type)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedType === type
                        ? "bg-orange-600 text-white"
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
                Vehicle Type
              </label>
              <div className="flex flex-wrap gap-2">
                {vehicleTypes.map((vehicle) => (
                  <button
                    key={vehicle}
                    onClick={() => handleVehicleFilter(vehicle)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedVehicle === vehicle
                        ? "bg-orange-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {vehicle}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Transfers ({filteredTransfers.length})
          </h2>
        </div>

        {/* Transfers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTransfers.map((transfer) => (
            <div
              key={transfer.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 bg-gradient-to-br from-orange-200 to-red-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Plane className="h-16 w-16 text-white mx-auto mb-2" />
                    <p className="text-white font-semibold">
                      {transfer.vehicleType}
                    </p>
                  </div>
                </div>

                <div className="absolute top-4 left-4">
                  <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {transfer.type}
                  </span>
                </div>

                {transfer.available && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Available
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {transfer.from} → {transfer.to}
                </h3>

                <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{transfer.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{transfer.distance}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{transfer.maxPassengers} passengers</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                    <span>{transfer.driver.rating}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {transfer.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-orange-600">
                      ${transfer.price}
                    </span>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200">
                    Book Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransfersPage;
