import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Public Components
import Layout from "./components/common/Layout";
import HomePage from "./pages/HomePage";
import CarRentalsPage from "./pages/landing/car/CarRentalsPage";
import RealEstatePage from "./pages/landing/real_estate/RealEstatePage";
import TransfersPage from "./pages/landing/transfer/TransfersPage";
import ToursPage from "./pages/landing/tour/ToursPage";
import HotelsPage from "./pages/landing/hotel/HotelPage";

// Detail Pages
import CarDetailPage from "./pages/landing/car/CarDetailPage";
import HotelDetailPage from "./pages/landing/hotel/HotelDetailPage";
import PropertyDetailPage from "./pages/landing/real_estate/PropertyDetailPage";
// import TransferDetailPage from "./pages/landing/transfer/TransferDetailPage";
import TourDetailPage from "./pages/landing/tour/TourDetailPage";

// Admin Components
import { AdminProvider } from "./contexts/AdminContext";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
// import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./components/admin/UserManagement";
import AdminCars from "./pages/admin/AdminCars";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminProperties from "./pages/admin/AdminProperties";
import AdminHotels from "./pages/admin/AdminHotels";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminCarRequests from "./pages/admin/AdminCarRequests";
import AdminPropertyRequests from "./pages/admin/AdminPropertyRequests";
import AdminHotelRequests from "./pages/admin/AdminHotelRequests";
import AdminBookingRequests from "./pages/admin/AdminBookingRequests";
import AdminTourRequests from "./pages/admin/AdminTourRequests";
import AdminTransferRequests from "./pages/admin/AdminTransferRequests";

function App() {
  return (
    <AdminProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { background: "#363636", color: "#fff" },
            }}
          />

          <Routes>
            {/* Public Routes with Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="cars" element={<CarRentalsPage />} />
              <Route path="properties" element={<RealEstatePage />} />
              <Route path="hotels" element={<HotelsPage />} />
              <Route path="transfers" element={<TransfersPage />} />
              <Route path="tours" element={<ToursPage />} />
            </Route>

            {/* Detail Pages */}
            <Route path="/cars/:id" element={<CarDetailPage />} />
            <Route path="/properties/:id" element={<PropertyDetailPage />} />
            <Route path="/hotels/:id" element={<HotelDetailPage />} />
            {/* <Route path="/transfers/:id" element={<TransferDetailPage />} /> */}
            <Route path="/tours/:id" element={<TourDetailPage />} />

            {/* Admin Routes */}

            <Route path="/admin/login" element={<AdminLogin />} />

            <Route path="/admin" element={<AdminProtectedRoute />}>
              {/* AdminLayout wraps all admin pages */}
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} /> {/* /admin */}
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} /> 
                <Route path="cars" element={<AdminCars />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="properties" element={<AdminProperties />} />
                <Route path="hotels" element={<AdminHotels />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="car-requests" element={<AdminCarRequests />} />
                <Route path="property-requests" element={<AdminPropertyRequests />} />
                <Route path="hotel-requests" element={<AdminHotelRequests />} />
                <Route path="booking-requests" element={<AdminBookingRequests />} />
                <Route path="tour-requests" element={<AdminTourRequests />} />
                <Route path="transfer-requests" element={<AdminTransferRequests />} />
              </Route>
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AdminProvider>
  );
}

export default App;
