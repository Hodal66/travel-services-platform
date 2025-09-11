import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Building,
  Bed,
  Bath,
  Square,
  MapPin,
  Star,
  X,
  User,
  Phone,
  Mail,
  Grid,
  List
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { Property } from '@/types';
import AdminTable from '../../components/common/AdminTable';
import { ColumnConfig } from '../../hooks/useColumnVisibility';

const AdminProperties: React.FC = () => {
  const { properties, addProperty, updateProperty, deleteProperty } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterListingType, setFilterListingType] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter properties based on search and filters
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || property.type === filterType;
    const matchesListingType = filterListingType === 'All' || property.listingType === filterListingType;

    let matchesPrice = true;
    if (priceRange !== 'All') {
      switch (priceRange) {
        case 'Under $100k':
          matchesPrice = property.price < 100000;
          break;
        case '$100k-$500k':
          matchesPrice = property.price >= 100000 && property.price <= 500000;
          break;
        case '$500k-$1M':
          matchesPrice = property.price >= 500000 && property.price <= 1000000;
          break;
        case 'Over $1M':
          matchesPrice = property.price > 1000000;
          break;
      }
    }

    return matchesSearch && matchesType && matchesListingType && matchesPrice;
  });

  const propertyTypes = ['All', 'Apartment', 'House', 'Villa', 'Condo', 'Studio'];
  const listingTypes = ['All', 'Sale', 'Rent'];
  const priceRanges = ['All', 'Under $100k', '$100k-$500k', '$500k-$1M', 'Over $1M'];

  // Column configuration for AdminTable
  const propertyColumns: ColumnConfig[] = [
    { key: 'property', label: 'Property', isVisible: true, isRequired: true },
    { key: 'type', label: 'Type', isVisible: true, isRequired: true },
    { key: 'price', label: 'Price', isVisible: true, isRequired: true },
    { key: 'details', label: 'Details', isVisible: true, isRequired: true },
    { key: 'agent', label: 'Agent', isVisible: true },
    { key: 'actions', label: 'Actions', isVisible: true, isRequired: true }
  ];

  const handleView = (property: Property) => {
    setSelectedProperty(property);
    setShowViewModal(true);
  };

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setShowEditModal(true);
  };

  const handleDelete = (id: string) => {
    deleteProperty(id);
    setShowDeleteConfirm(null);
  };

  const formatPrice = (price: number, listingType: string) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    } else {
      return `$${price.toLocaleString()}`;
    }
  };

  // Render function for table rows
  const renderPropertyRow = (property: Property, visibleColumns: ColumnConfig[]) => {
    return visibleColumns.map((col) => {
      switch (col.key) {
        case 'property':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <Building className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                    {property.title}
                  </div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {property.location}
                  </div>
                </div>
              </div>
            </td>
          );
        case 'type':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                property.listingType === 'Sale'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {property.type} - {property.listingType}
              </span>
            </td>
          );
        case 'price':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                {formatPrice(property.price, property.listingType)}
                {property.listingType === 'Rent' && '/mo'}
              </div>
              <div className="flex items-center">
                <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                <span className="text-xs text-gray-500">{property.rating}</span>
              </div>
            </td>
          );
        case 'details':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div>{property.bedrooms} bed • {property.bathrooms} bath</div>
              <div>{property.area} sqft</div>
            </td>
          );
        case 'agent':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{property.agent.name}</div>
              <div className="text-sm text-gray-500">{property.agent.phone}</div>
            </td>
          );
        case 'actions':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={() => handleView(property)}
                  className="text-blue-600 hover:text-blue-900 transition-colors"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleEdit(property)}
                  className="text-blue-600 hover:text-blue-900 transition-colors"
                  title="Edit Property"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(property.id)}
                  className="text-red-600 hover:text-red-900 transition-colors"
                  title="Delete Property"
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

  // Property Form Component (simplified for brevity - keeping original)
  const PropertyForm: React.FC<{
    property?: Property | null;
    onSubmit: (propertyData: Omit<Property, 'id'>) => void;
    onClose: () => void;
  }> = ({ property, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
      title: property?.title || '',
      type: property?.type || 'Apartment' as Property['type'],
      listingType: property?.listingType || 'Sale' as Property['listingType'],
      price: property?.price || 0,
      rating: property?.rating || 0,
      location: property?.location || '',
      address: property?.address || '',
      bedrooms: property?.bedrooms || 1,
      bathrooms: property?.bathrooms || 1,
      area: property?.area || 0,
      image: property?.image || '',
      features: property?.features || [],
      description: property?.description || '',
      agent: property?.agent || {
        name: '',
        phone: '',
        email: ''
      }
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
              {property ? 'Edit Property' : 'Add New Property'}
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
                placeholder="Property Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
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
                {property ? 'Update' : 'Add'} Property
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
          <h1 className="text-3xl font-bold text-gray-900">Property Management</h1>
          <p className="mt-2 text-gray-600">Manage your real estate property listings</p>
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
            Add Property
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
                placeholder="Search properties..."
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
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <select
              value={filterListingType}
              onChange={(e) => setFilterListingType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {listingTypes.map(type => (
                <option key={type} value={type}>{type === 'All' ? 'All Types' : `For ${type}`}</option>
              ))}
            </select>

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

      {/* Properties Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 group">
              <div className="relative h-48 bg-gradient-to-br from-green-200 to-blue-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Building className="h-16 w-16 mx-auto mb-2 text-white" />
                    <p className="text-white font-semibold">{property.type}</p>
                  </div>
                </div>

                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    property.listingType === 'Sale'
                      ? 'bg-blue-600 text-white'
                      : 'bg-green-600 text-white'
                  }`}>
                    For {property.listingType}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-sm font-bold">
                    {formatPrice(property.price, property.listingType)}
                    {property.listingType === 'Rent' && '/mo'}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {property.title}
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{property.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm truncate">{property.location}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3 text-xs text-gray-600">
                  <div className="flex items-center">
                    <Bed className="h-3 w-3 mr-1" />
                    <span>{property.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-3 w-3 mr-1" />
                    <span>{property.bathrooms} bath</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-3 w-3 mr-1" />
                    <span>{property.area} sqft</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 border-t pt-2">
                  Agent: {property.agent.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View with Column Selection */
        <AdminTable
          tableKey="admin-properties"
          columns={propertyColumns}
          data={filteredProperties}
          renderRow={renderPropertyRow}
          className="bg-white rounded-lg shadow-sm border border-gray-100"
        />
      )}

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No properties found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterType !== 'All' || filterListingType !== 'All' || priceRange !== 'All'
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first property'
            }
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Property
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <PropertyForm
          property={selectedProperty}
          onSubmit={(propertyData) => {
            if (selectedProperty) {
              updateProperty(selectedProperty.id, propertyData);
            } else {
              addProperty(propertyData);
            }
          }}
          onClose={() => {
            setShowAddModal(false);
            setShowEditModal(false);
            setSelectedProperty(null);
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
                <h3 className="text-lg font-semibold text-gray-900">Delete Property</h3>
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

export default AdminProperties;
