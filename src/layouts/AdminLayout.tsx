import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Users,
  Car,
  Building,
  Hotel,
  CreditCard,
  Bell,
  Search,
  Settings,
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout, user } = useAdmin();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 flex flex-col`}
      >
        {/* Logo & toggle */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <Link to="/">
            <span
              className={`font-bold text-lg text-indigo-600 ${
                !sidebarOpen && "hidden"
              }`}
            >
              Travel Admin
            </span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded hover:bg-gray-100"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-4 space-y-1">
          {[
            { name: "Dashboard", icon: Home, path: "/admin/dashboard" },
            { name: "Users", icon: Users, path: "/admin/users" },
            { name: "Cars", icon: Car, path: "/admin/cars" },
            { name: "Properties", icon: Building, path: "/admin/properties" },
            { name: "Hotels", icon: Hotel, path: "/admin/hotels" },
            { name: "Bookings", icon: CreditCard, path: "/admin/bookings" },
            { name: "Settings", icon: Settings, path: "/admin/settings" },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg transition-colors hover:bg-gray-100 ${
                  isActive ? "bg-indigo-100 font-semibold text-indigo-600" : ""
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {sidebarOpen && item.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-200">
          {sidebarOpen && (
            <p className="text-sm mb-2">Logged in as: {user?.name}</p>
          )}
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {!sidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="p-1 rounded hover:bg-gray-100"
              >
                <Menu size={20} />
              </button>
            )}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-3 h-3 text-xs font-bold text-white bg-red-500 rounded-full">
                3
              </span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name.charAt(0)}
              </div>
              {sidebarOpen && <span className="font-medium">{user?.name}</span>}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Stats Cards (example, can extend dynamically) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
              <p className="text-2xl font-semibold">1,250</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-gray-500 text-sm font-medium">
                Total Bookings
              </h3>
              <p className="text-2xl font-semibold">3,840</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-gray-500 text-sm font-medium">
                Total Revenue
              </h3>
              <p className="text-2xl font-semibold">$125,000</p>
            </div>
          </div>

          {/* Nested routes will render here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
