import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminCars from "./admin/AdminCars";
import AdminProperties from "./admin/AdminProperties";
import AdminHotels from "./admin/AdminHotels";
import AdminTransfers from "./admin/AdminTransfers";
import AdminTours from "./admin/AdminTours";
import AdminUsers from "./admin/AdminUsers";
import AdminBookings from "./admin/AdminBookings";
import AdminAnalytics from "./admin/AdminAnalytics";
import AdminSettings from "./admin/AdminSettings";

//  Protected layout wrapper
const AdminLayout: React.FC = () => {
  const { isAuthenticated, loading } = useAdmin();

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <Outlet /> {/* Protected routes render here */}
        </div>
      </main>
    </div>
  );
};

const AdminApp: React.FC = () => {
  return (
    <AdminProvider>
      <Routes>
        {/*  Public login route (no AdminLayout) */}
        <Route path="/login" element={<AdminLogin />} />

        {/*  Protected admin routes */}
        <Route path="/*" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="cars" element={<AdminCars />} />
          <Route path="properties" element={<AdminProperties />} />
          <Route path="hotels" element={<AdminHotels />} />
          <Route path="transfers" element={<AdminTransfers />} />
          <Route path="tours" element={<AdminTours />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
    </AdminProvider>
  );
};

export default AdminApp;
