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

interface TransferRequest {
  id: string;
  userName: string;
  userEmail: string;
  transferType: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  passengers: number;
  vehicleType: string;
  totalPrice: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const AdminTransferRequests: React.FC = () => {
  const { /* assume some context for requests */ } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<TransferRequest | null>(null);

  // Mock data - replace with actual data from context/API
  const [requests, setRequests] = useState<TransferRequest[]>([
    {
      id: "1",
      userName: "Anna Martinez",
      userEmail: "anna@example.com",
      transferType: "Airport Transfer",
      pickupLocation: "JFK Airport",
      dropoffLocation: "Manhattan Hotel",
      pickupDate: "2024-06-01",
      pickupTime: "14:00",
      passengers: 2,
      vehicleType: "Sedan",
      totalPrice: 75,
      status: "pending",
      createdAt: "2024-05-15"
    },
    {
      id: "2",
      userName: "Robert Garcia",
      userEmail: "robert@example.com",
      transferType: "City Transfer",
      pickupLocation: "Central Station",
      dropoffLocation: "Business District",
      pickupDate: "2024-06-10",
      pickupTime: "09:30",
      passengers: 1,
      vehicleType: "SUV",
      totalPrice: 45,
      status: "approved",
      createdAt: "2024-05-18"
    }
  ]);

  // Filter requests based on search and status
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.dropoffLocation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statuses = ["All", "pending", "approved", "rejected"];

  const handleViewDetails = (request: TransferRequest) => {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transfer Service Requests</h1>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-2 border px-3 py-2 rounded flex-1">
          <Search />
          <input
            type="text"
            placeholder="Search by user, email, pickup, or dropoff location"
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
            <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Requests Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transfer Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dropoff</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passengers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{request.userName}</div>
                  <div className="text-sm text-gray-500">{request.userEmail}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.transferType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.pickupLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.dropoffLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {request.pickupDate} {request.pickupTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.passengers}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.vehicleType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${request.totalPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2 justify-end">
                  <button onClick={() => handleViewDetails(request)} className="text-indigo-600 hover:text-indigo-900"><Edit size={16} /></button>
                  {request.status === 'pending' && (
                    <>
                      <button onClick={() => handleApprove(request.id)} className="text-green-600 hover:text-green-900"><Check size={16} /></button>
                      <button onClick={() => handleReject(request.id)} className="text-red-600 hover:text-red-900"><XCircle size={16} /></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
            <div><strong>Transfer Type:</strong> {selectedRequest.transferType}</div>
            <div><strong>Pickup:</strong> {selectedRequest.pickupLocation}</div>
            <div><strong>Dropoff:</strong> {selectedRequest.dropoffLocation}</div>
            <div><strong>Date:</strong> {selectedRequest.pickupDate}</div>
            <div><strong>Time:</strong> {selectedRequest.pickupTime}</div>
            <div><strong>Passengers:</strong> {selectedRequest.passengers}</div>
            <div><strong>Vehicle Type:</strong> {selectedRequest.vehicleType}</div>
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
      )}
    </div>
  );
};

export default AdminTransferRequests;
