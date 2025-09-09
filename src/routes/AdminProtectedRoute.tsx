// src/routes/AdminProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";

const AdminProtectedRoute: React.FC = () => {
  const { isAuthenticated, contextLoading } = useAdmin();

  if (contextLoading) {
    return (
      <p className="text-center mt-20 text-gray-500">Checking session...</p>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
