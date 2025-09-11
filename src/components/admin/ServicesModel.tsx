// components/admin/ServiceModal.tsx
import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Minus } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

interface ServiceModalProps {
  mode: 'add' | 'edit' | 'view';
  serviceType: string;
  item?: any;
  onClose: () => void;
  onSave: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  mode,
  serviceType,
  item,
  onClose,
  onSave
}) => {
  const { addCar, updateCar, addProperty, updateProperty, addHotel, updateHotel, addTransfer, updateTransfer, addTour, updateTour } = useAdmin();
  const [formData, setFormData] = useState<any>({});
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData(item);
      setFeatures(item.features || []);
    } else {
      // Initialize empty form based on service type
      const defaultData = getDefaultFormData();
      setFormData(defaultData);
      setFeatures([]);
    }
  }, [item, serviceType]);

  const getDefaultFormData = () => {
    const defaults = {
      cars: {
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        category: 'Economy',
        pricePerDay: 0,
        rating: 0,
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        available: true,
        location: '',
        description: '',
        image: ''
      },
      properties: {
        title: '',
        type: 'Apartment',
        listingType: 'Rent',
        price: 0,
        rating: 0,
        location: '',
        address: '',
        bedrooms: 1,
        bathrooms: 1,
        area: 0,
        description: '',
        image: ''
      },
      hotels: {
        name: '',
        rating: 0,
        location: '',
        address: '',
        pricePerNight: 0,
        checkIn: '3:00 PM',
        checkOut: '11:00 AM',
        description: '',
        image: ''
      },
      transfers: {
        type: 'Airport Pickup',
        vehicleType: 'Sedan',
        from: '',
        to: '',
        duration: '',
        distance: '',
        price: 0,
        maxPassengers: 4,
        available: true,
        description: '',
        image: ''
      },
      tours: {
        title: '',
        type: 'Historical',
        duration: '',
        price: 0,
        rating: 0,
        location: '',
        maxGroupSize: 10,
        difficulty: 'Easy',
        available: true,
        description: '',
        image: ''
      }
    };

    return defaults[serviceType as keyof typeof defaults] || {};
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataWithFeatures = {
        ...formData,
        features: features
      };

      if (mode === 'add') {
        switch (serviceType) {
          case 'cars':
            addCar(dataWithFeatures);
            break;
          case 'properties':
            addProperty(dataWithFeatures);
            break;
          case 'hotels':
            addHotel(dataWithFeatures);
            break;
          case 'transfers':
            addTransfer(dataWithFeatures);
            break;
          case 'tours':
            addTour(dataWithFeatures);
            break;
        }
      } else if (mode === 'edit') {
        switch (serviceType) {
          case 'cars':
            updateCar(item.id, dataWithFeatures);
            break;
          case 'properties':
            updateProperty(item.id, dataWithFeatures);
            break;
          case 'hotels':
            updateHotel(item.id, dataWithFeatures);
            break;
          case 'transfers':
            updateTransfer(item.id, dataWithFeatures);
            break;
          case 'tours':
            updateTour(item.id, dataWithFeatures);
            break;
        }
      }

      onSave();
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderFormFields = () => {
    switch (serviceType) {
      case 'cars':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
                <select
                  value={formData.transmission || 'Automatic'}
                  onChange={(e) => handleInputChange('transmission', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={mode === 'view'}
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                <select
                  value={formData.fuelType || 'Petrol'}
                  onChange={(e) => handleInputChange('fuelType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={mode === 'view'}
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Seats</label>
                <input
                  type="number"
                  value={formData.seats || 5}
                  onChange={(e) => handleInputChange('seats', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={mode === 'view'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={mode === 'view'}
                  required
                />
              </div>
            </div>
          </>
        );

      case 'properties':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={mode === 'view'}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={formData.type || 'Apartment'}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={mode === 'view'}
                >
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Studio">Studio</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Listing Type</label>
                <select
                  value={formData.listingType || 'Rent'}
                  onChange={(e) => handleInputChange('listingType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={mode === 'view'}
                >
                  <option value="Rent">For Rent</option>
                  <option value="Sale">For Sale</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  value={formData.price || 0}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={mode === 'view'}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <input
                  type="number"
                  value={formData.bedrooms || 1}
                  onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={mode === 'view'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                <input
                  type="number"
                  value={formData.bathrooms || 1}
                  onChange={(e) => handleInputChange('bathrooms', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={mode === 'view'}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq ft)</label>
                <input
                  type="number"
                  value={formData.area || 0}
                  onChange={(e) => handleInputChange('area', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={mode === 'view'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={mode === 'view'}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={mode === 'view'}
              />
            </div>
          </>
        );

      default:
        return (
          <div>
            <p className="text-gray-500">Form fields for {serviceType} will be implemented here.</p>
          </div>
        );
    }
  };

  const getModalTitle = () => {
    const action = mode === 'add' ? 'Add' : mode === 'edit' ? 'Edit' : 'View';
    const service = serviceType.charAt(0).toUpperCase() + serviceType.slice(0, -1);
    return `${action} ${service}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{getModalTitle()}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                {formData.image ? (
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="mx-auto h-32 w-32 object-cover rounded-lg"
                    />
                    {mode !== 'view' && (
                      <button
                        type="button"
                        onClick={() => handleInputChange('image', '')}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      {mode === 'view' ? 'No image' : 'Click to upload or drag and drop'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Form Fields */}
            {renderFormFields()}

            {/* Features Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {feature}
                    </span>
                    {mode !== 'view' && (
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Minus size={16} />
                      </button>
                    )}
                  </div>
                ))}
                
                {mode !== 'view' && (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a feature..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={mode === 'view'}
                placeholder="Enter description..."
              />
            </div>

            {/* Status */}
            {mode !== 'view' && (
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.available || false}
                    onChange={(e) => handleInputChange('available', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Available</span>
                </label>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {mode === 'view' ? 'Close' : 'Cancel'}
              </button>
              
              {mode !== 'view' && (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    mode === 'add' ? 'Add' : 'Save Changes'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;