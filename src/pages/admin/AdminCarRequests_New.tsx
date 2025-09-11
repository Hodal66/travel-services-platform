import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Check,
  XCircle
} from "lucide-react";
import { useAdmin } from "../../contexts/AdminContext";
import AdminTable from "../../components/common/AdminTable";
import { ColumnConfig } from "../../hooks/useColumnVisibility";

interface CarRequest {
  id: string;
  userName: string;
  userEmail: string;
  carBrand: string;
  carModel: string;
  pickupDate: string;
  returnDate: string;
  location: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const AdminCarRequests: React.FC = () => {
  const { /* assume some context for requests */ } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<CarRequest | null>(null);

  // Mock data - replace with actual data from context/API
  const [requests, setRequests] = useState<CarRequest[]>([
    {
      id: "1",
      userName: "John Doe",
      userEmail: "john@example.com",
      carBrand: "Toyota",
      carModel: "Camry",
      pickupDate: "2024-01-15",
      returnDate: "2024-01-20",
      location: "New York",
      status: "pending",
      createdAt: "2024-01-10"
    },
    {
      id: "2",
      userName: "Jane Smith",
      userEmail: "jane@example.com",
      carBrand: "Honda",
      carModel: "Civic",
      pickupDate: "2024-01-18",
      returnDate: "2024-01-25",
      location: "Los Angeles",
      status: "approved",
      createdAt: "2024-01-12"
    }
  ]);

  // Filter requests based on search and status
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.carBrand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.carModel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statuses = ["All", "pending", "approved", "rejected"];

  // Column configuration for AdminTable
  const requestColumns: ColumnConfig[] = [
    { key: 'user', label: 'User', isVisible: true, isRequired: true },
    { key: 'car', label: 'Car', isVisible: true, isRequired: true },
    { key: 'dates', label: 'Dates', isVisible: true, isRequired: true },
    { key: 'location', label: 'Location', isVisible: true, isRequired: true },
    { key: 'status', label: 'Status', isVisible: true },
    { key: 'actions', label: 'Actions', isVisible: true, isRequired: true }
  ];

  const handleViewDetails = (request: CarRequest) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(req =>
      req.id === id ? { ...req, status: 'approved' as const } : req
    ));
  };

  const handleReject = (id: string) => {
    setRequests(prev => prev.map(req =>
      req.id === id ? { ...req, status: 'rejected' as const } : req
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  // Render function for table rows
  const renderRequestRow = (request: CarRequest, visibleColumns: ColumnConfig[]) => {
    return visibleColumns.map((col) => {
      switch (col.key) {
        case 'user':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{request.userName}</div>
              <div className="text-sm text-gray-500">{request.userEmail}</div>
            </td>
          );
        case 'car':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{request.carBrand}</div>
              <div className="text-sm text-gray-500">{request.carModel}</div>
            </td>
          );
        case 'dates':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {request.pickupDate} - {request.returnDate}
            </td>
          );
        case 'location':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {request.location}
            </td>
          );
        case 'status':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
            </td>
          );
        case 'actions':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2 justify-end">
              <button onClick={() => handleViewDetails(request)} className="text-indigo-600 hover:text-indigo-900">
                <Edit size={16} />
              </button>
              {request.status === 'pending' && (
                <>
                  <button onClick={() => handleApprove(request.id)} className="text-green-600 hover:text-green-900">
                    <Check size={16} />
                  </button>
                  <button onClick={() => handleReject(request.id)} className="text-red-600 hover:text-red-900">
                    <XCircle size={16} />
                  </button>
                </>
              )}
            </td>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Car Rental Requests</h1>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-2 border px-3 py-2 rounded flex-1">
          <Search />
          <input
            type="text"
            placeholder="Search by user, email, or car"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Requests Table with Column Selection */}
      <AdminTable
        tableKey="admin-car-requests"
        columns={requestColumns}
        data={filteredRequests}
        renderRow={renderRequestRow}
        className="bg-white shadow rounded-lg"
      />

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setShowDetailsModal(false)}
            >
              <X />
            </button>
            <h2 className="text-xl font-bold mb-4">Request Details</h2>
            <div className="space-y-3">
              <div><strong>User:</strong> {selectedRequest.userName}</div>
              <div><strong>Email:</strong> {selectedRequest.userEmail}</div>
              <div><strong>Car:</strong> {selectedRequest.carBrand} {selectedRequest.carModel}</div>
              <div><strong>Pickup:</strong> {selectedRequest.pickupDate}</div>
              <div><strong>Return:</strong> {selectedRequest.returnDate}</div>
              <div><strong>Location:</strong> {selectedRequest.location}</div>
              <div><strong>Status:</strong> <span className={getStatusColor(selectedRequest.status)}>{selectedRequest.status}</span></div>
              <div><strong>Created:</strong> {selectedRequest.createdAt}</div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 border rounded"
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCarRequests;
