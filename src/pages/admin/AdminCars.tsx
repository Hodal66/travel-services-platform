// pages/admin/AdminCars.tsx
import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X
} from "lucide-react";
import { useAdmin } from "../../contexts/AdminContext";
import { Car as CarType } from "../../types";

const AdminCars: React.FC = () => {
  const { cars, addCar, updateCar, deleteCar } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );

  // Filter cars based on search and category
  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || car.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Economy", "Compact", "SUV", "Luxury", "Sports"];

  const handleEdit = (car: CarType) => {
    setSelectedCar(car);
    setShowEditModal(true);
  };

  const handleDelete = (id: string) => {
    deleteCar(id);
    setShowDeleteConfirm(null);
  };

  // Car Form Component
  const CarForm: React.FC<{
    car?: CarType | null;
    onSubmit: (carData: Omit<CarType, "id">) => void;
    onClose: () => void;
  }> = ({ car, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
      brand: car?.brand || "",
      model: car?.model || "",
      year: car?.year || new Date().getFullYear(),
      category: car?.category || ("Economy" as CarType["category"]),
      pricePerDay: car?.pricePerDay || 0,
      rating: car?.rating || 0,
      image: car?.image || "",
      seats: car?.seats || 5,
      transmission: car?.transmission || ("Automatic" as CarType["transmission"]),
      fuelType: car?.fuelType || ("Petrol" as CarType["fuelType"]),
      features: car?.features || [],
      available: car?.available ?? true,
      location: car?.location || "",
      description: car?.description || ""
    });

    const [newFeature, setNewFeature] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
      onClose();
    };

    const addFeature = () => {
      if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
        setFormData({
          ...formData,
          features: [...formData.features, newFeature.trim()]
        });
        setNewFeature("");
      }
    };

    const removeFeature = (feature: string) => {
      setFormData({
        ...formData,
        features: formData.features.filter((f) => f !== feature)
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            <X />
          </button>
          <h2 className="text-xl font-bold mb-4">{car ? "Edit Car" : "Add Car"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="border px-3 py-2 rounded w-full"
                required
              />
              <input
                type="text"
                placeholder="Model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="border px-3 py-2 rounded w-full"
                required
              />
              <input
                type="number"
                placeholder="Year"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                className="border px-3 py-2 rounded w-full"
                required
              />
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as CarType["category"] })
                }
                className="border px-3 py-2 rounded w-full"
              >
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="border px-3 py-2 rounded w-full"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Feature"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className="border px-3 py-2 rounded flex-1"
              />
              <button
                type="button"
                className="bg-indigo-600 text-white px-3 py-2 rounded"
                onClick={addFeature}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature) => (
                <span
                  key={feature}
                  className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
                >
                  {feature}
                  <button type="button" onClick={() => removeFeature(feature)}>
                    <X size={14} />
                  </button>
                </span>
              ))}
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
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                {car ? "Update" : "Add"} Car
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Car Management</h1>
        <button
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={() => setShowAddModal(true)}
        >
          <Plus /> Add Car
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-2 border px-3 py-2 rounded flex-1">
          <Search /> 
          <input
            type="text"
            placeholder="Search by brand, model, or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Cars Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Day</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCars.map((car) => (
              <tr key={car.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{car.brand}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{car.model}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{car.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{car.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${car.pricePerDay}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2 justify-end">
                  <button onClick={() => handleEdit(car)} className="text-indigo-600 hover:text-indigo-900"><Edit size={16} /></button>
                  <button onClick={() => setShowDeleteConfirm(car.id)} className="text-red-600 hover:text-red-900"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <CarForm
          onSubmit={(data) => addCar(data)}
          onClose={() => setShowAddModal(false)}
        />
      )}
      {showEditModal && selectedCar && (
        <CarForm
          car={selectedCar}
          onSubmit={(data) => selectedCar && updateCar(selectedCar.id, data)}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this car?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 border rounded"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => handleDelete(showDeleteConfirm)}
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

export default AdminCars;
