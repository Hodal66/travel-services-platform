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

interface BookingRequest {
  id: string;
  userName: string;
  userEmail: string;
  serviceType: string;
  serviceName: string;
  bookingDate: string;
  duration: string;
  location: string;
  totalPrice: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const AdminBookingRequests: React.FC = () => {
  const { /* assume some context for requests */ } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null);

  // Mock data - replace with actual data from context/API
  const [requests, setRequests] = useState<BookingRequest[]>([
    {
      id: "1",
      userName: "Sarah Lee",
      userEmail: "sarah@example.com",
      serviceType: "Car Rental",
      serviceName: "Toyota Camry",
      bookingDate: "2024-04-01",
      duration: "5 days",
      location: "Miami",
      totalPrice: 250,
      status: "pending",
      createdAt: "2024-03-15"
    },
    {
      id: "2",
      userName: "David Kim",
      userEmail: "david@example.com",
      serviceType: "Hotel",
      serviceName: "Beach Resort",
      bookingDate: "2024-04-10",
      duration: "3 nights",
      location: "Hawaii",
      totalPrice: 450,
      status: "approved",
      createdAt: "2024-03-18"
    }
  ]);

  // Filter requests based on search and status
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statuses = ["All", "pending", "approved", "rejected"];

  // Column configuration for AdminTable
  const requestColumns: ColumnConfig[] = [
    { key: 'user', label: 'User', isVisible: true, isRequired: true },
    { key: 'service', label: 'Service', isVisible: true, isRequired: true },
    { key: 'bookingDate', label: 'Booking Date', isVisible: true },
    { key: 'duration', label: 'Duration', isVisible: true },
    { key: 'location', label: 'Location', isVisible: true },
    { key: 'price', label: 'Price', isVisible: true },
    { key: 'status', label: 'Status', isVisible: true, isRequired: true },
    { key: 'actions', label: 'Actions', isVisible: true, isRequired: true }
  ];

  const handleViewDetails = (request: BookingRequest) => {
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
  const renderRequestRow = (request: BookingRequest, visibleColumns: ColumnConfig[]) => {
    return visibleColumns.map((col) => {
      switch (col.key) {
        case 'user':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{request.userName}</div>
              <div className="text-sm text-gray-500">{request.userEmail}</div>
            </td>
          );
        case 'service':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{request.serviceType}</div>
              <div className="text-sm text-gray-500">{request.serviceName}</div>
            </td>
          );
        case 'bookingDate':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {request.bookingDate}
            </td>
          );
        case 'duration':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {request.duration}
            </td>
          );
        case 'location':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {request.location}
            </td>
          );
        case 'price':
          return (
            <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              ${request.totalPrice}
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
        <h1 className="text-2xl font-bold">General Booking Requests</h1>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-2 border px-3 py-2 rounded flex-1">
          <Search />
          <input
            type="text"
            placeholder="Search by user, email, service, or location"
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
        tableKey="admin-booking-requests"
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
              <div><strong>Service:</strong> {selectedRequest.serviceType}</div>
              <div><strong>Service Name:</strong> {selectedRequest.serviceName}</div>
              <div><strong>Booking Date:</strong> {selectedRequest.bookingDate}</div>
              <div><strong>Duration:</strong> {selectedRequest.duration}</div>
              <div><strong>Location:</strong> {selectedRequest.location}</div>
              <div><strong>Total Price:</strong> ${selectedRequest.totalPrice}</div>
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

export default AdminBookingRequests;
