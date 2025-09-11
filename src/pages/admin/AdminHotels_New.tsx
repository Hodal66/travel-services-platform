import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Hotel,
  Star,
  MapPin,
  Clock,
  Users,
  Wifi,
  Car,
  Utensils,
  Waves,
  Coffee,
  Dumbbell,
  X,
  Grid,
  List,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { Hotel as HotelType } from '@/types';
import AdminTable from '../../components/common/AdminTable';
import { ColumnConfig } from '../../hooks/useColumnVisibility';

const AdminHotels: React.FC = () => {
  const { hotels, addHotel, updateHotel, deleteHotel } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<HotelType | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter hotels based on search and filters
  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.address.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesRating = true;
    if (filterRating !== 'All') {
      const minRating = filterRating === '5 Stars' ? 5 :
                       filterRating === '4+ Stars' ? 4 :
                       filterRating === '3+ Stars' ? 3 : 0;
      matchesRating = hotel.rating >= minRating;
    }

    let matchesPrice = true;
    if (priceRange !== 'All') {
      switch (priceRange) {
        case 'Under $100':
          matchesPrice = hotel.pricePerNight < 100;
          break;
        case '$100-$200':
          matchesPrice = hotel.pricePerNight >= 100 && hotel.pricePerNight <= 200;
          break;
        case '$200-$400':
          matchesPrice = hotel.pricePerNight >= 200 && hotel.pricePerNight <= 400;
          break;
        case 'Over $400':
          matchesPrice = hotel.pricePerNight > 400;
          break;
      }
    }

    return matchesSearch && matchesRating && matchesPrice;
  });

  const ratings = ['All', '5 Stars', '4+ Stars', '3+ Stars'];
  const priceRanges = ['All', 'Under $100', '$100-$200', '$200-$400', 'Over $400'];

  // Column configuration for AdminTable
  const hotelColumns: ColumnConfig[] = [
    { key: 'hotel', label: 'Hotel', isVisible: true, isRequired: true },
    { key: 'rating', label: 'Rating', isVisible: true, isRequired: true },
    { key: 'price', label: 'Price/Night', isVisible: true, isRequired: true },
    { key: 'rooms', label: 'Rooms', isVisible: true },
    { key: 'amenities', label: 'Amenities', isVisible: true },
    { key: 'actions', label: 'Actions', isVisible: true, isRequired: true }
  ];

  const handleView = (hotel: HotelType) => {
    setSelectedHotel(hotel);
    setShowViewModal(true);
  };

  const handleEdit = (hotel: HotelType) => {
    setSelectedHotel(hotel);
    setShowEditModal(true);
  };

  const handleDelete = (id: string) => {
    deleteHotel(id);
    setShowDeleteConfirm(null);
  };

  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wifi')) return <Wifi className="h-4 w-4" />;
    if (amenityLower.includes('pool') || amenityLower.includes('spa')) return <Waves className="h-4 w-4" />;
    if (amenityLower.includes('restaurant') || amenityLower.includes('bar')) return <Utensils className="h-4 w-4" />;
    if (amenityLower.includes('parking')) return <Car className="h-4 w-4" />;
    if (amenityLower.includes('gym') || amenityLower.includes('fitness')) return <Dumbbell className="h-4 w-4" />;
    if (amenityLower.includes('breakfast')) return <Coffee className="h-4 w-4" />;
    return <Star className="h-4 w-4" />;
  };

  // Render function for table rows
  const renderHotelRow = (hotel: HotelType, visibleColumns: ColumnConfig[]) => {
    return visibleColumns.map((col) => {
      switch (col.key) {
        case 'hotel':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                  <Hotel className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                    {hotel.name}
                  </div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {hotel.location}
                  </div>
                </div>
              </div>
            </td>
          );
        case 'rating':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < hotel.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">{hotel.rating}</span>
              </div>
            </td>
          );
        case 'price':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                ${hotel.pricePerNight}
              </div>
              <div className="text-xs text-gray-500">per night</div>
            </td>
          );
        case 'rooms':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {hotel.roomTypes.length} types
            </td>
          );
        case 'amenities':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap">
              <div className="flex flex-wrap gap-1">
                {hotel.amenities.slice(0, 3).map((amenity, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                    {getAmenityIcon(amenity)}
                    <span className="ml-1">{amenity}</span>
                  </span>
                ))}
                {hotel.amenities.length > 3 && (
                  <span className="text-xs text-gray-500">+{hotel.amenities.length - 3}</span>
                )}
              </div>
            </td>
          );
        case 'actions':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={() => handleView(hotel)}
                  className="text-blue-600 hover:text-blue-900 transition-colors"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleEdit(hotel)}
                  className="text-blue-600 hover:text-blue-900 transition-colors"
                  title="Edit Hotel"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(hotel.id)}
                  className="text-red-600 hover:text-red-900 transition-colors"
                  title="Delete Hotel"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </td>
          );
        default:
          return null;
      }
    });
  };

  // Hotel Form Component (simplified for brevity - keeping original)
  const HotelForm: React.FC<{
    hotel?: HotelType | null;
    onSubmit: (hotelData: Omit<HotelType, 'id'>) => void;
    onClose: () => void;
  }> = ({ hotel, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
      name: hotel?.name || '',
      rating: hotel?.rating || 0,
      location: hotel?.location || '',
      address: hotel?.address || '',
      pricePerNight: hotel?.pricePerNight || 0,
      image: hotel?.image || '',
      amenities: hotel?.amenities || [],
      checkIn: hotel?.checkIn || '3:00 PM',
      checkOut: hotel?.checkOut || '11:00 AM',
      description: hotel?.description || '',
      roomTypes: hotel?.roomTypes || [
        { name: 'Standard Room', price: 0, features: [], maxGuests: 2 }
      ]
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-xl font-semibold">
              {hotel ? 'Edit Hotel' : 'Add New Hotel'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Hotel Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border px-3 py-2 rounded w-full"
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="border px-3 py-2 rounded w-full"
                required
              />
              <input
                type="number"
                placeholder="Price per Night"
                value={formData.pricePerNight}
                onChange={(e) => setFormData({ ...formData, pricePerNight: Number(e.target.value) })}
                className="border px-3 py-2 rounded w-full"
                required
              />
              <input
                type="number"
                placeholder="Rating"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="border px-3 py-2 rounded w-full"
                min="0"
                max="5"
                step="0.1"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                className="px-4 py-2 border rounded"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {hotel ? 'Update' : 'Add'} Hotel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hotel Management</h1>
          <p className="mt-2 text-gray-600">Manage your hotel and accommodation listings</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Hotel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search hotels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {ratings.map(rating => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
              </select>
            </div>

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {priceRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Hotels Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 group">
              <div className="relative h-48 bg-gradient-to-br from-purple-200 to-pink-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Hotel className="h-16 w-16 mx-auto mb-2 text-white" />
                    <p className="text-white font-semibold">{hotel.name}</p>
                  </div>
                </div>

                <div className="absolute top-3 left-3">
                  <div className="flex items-center bg-white/90 rounded-full px-2 py-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < hotel.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-semibold ml-1">{hotel.rating}</span>
                  </div>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm font-bold">
                    ${hotel.pricePerNight}/night
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{hotel.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm truncate">{hotel.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>In: {hotel.checkIn}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Out: {hotel.checkOut}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 border-t pt-2">
                  {hotel.roomTypes.length} room type{hotel.roomTypes.length !== 1 ? 's' : ''} available
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View with Column Selection */
        <AdminTable
          tableKey="admin-hotels"
          columns={hotelColumns}
          data={filteredHotels}
          renderRow={renderHotelRow}
          className="bg-white rounded-lg shadow-sm border border-gray-100"
        />
      )}

      {/* Empty State */}
      {filteredHotels.length === 0 && (
        <div className="text-center py-12">
          <Hotel className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No hotels found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterRating !== 'All' || priceRange !== 'All'
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first hotel'
            }
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Hotel
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <HotelForm
          hotel={selectedHotel}
          onSubmit={(hotelData) => {
            if (selectedHotel) {
              updateHotel(selectedHotel.id, hotelData);
            } else {
              addHotel(hotelData);
            }
          }}
          onClose={() => {
            setShowAddModal(false);
            setShowEditModal(false);
            setSelectedHotel(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Hotel</h3>
                <p className="text-gray-600">This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHotels;
