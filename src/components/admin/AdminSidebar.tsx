// components/admin/AdminSidebar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Car,
  Home,
  Hotel,
  Plane,
  MapPin,
  Users,
  Calendar,
  BarChart3,
  Settings,
  X,
  LogOut,
  Shield,
  Briefcase,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user, logout } = useAdmin();

  const [openDropdowns, setOpenDropdowns] = useState<{[key: string]: boolean}>({});

  const toggleDropdown = (label: string) => {
    setOpenDropdowns(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    {
      icon: Briefcase,
      label: 'Services',
      subItems: [
        { icon: Car, label: 'Car Rentals', path: '/admin/cars' },
        { icon: Home, label: 'Real Estate', path: '/admin/properties' },
        { icon: Hotel, label: 'Hotels', path: '/admin/hotels' },
        { icon: Calendar, label: 'Bookings', path: '/admin/bookings' },
      ]
    },
    {
      icon: MessageSquare,
      label: 'User Requests',
      subItems: [
        { icon: Car, label: 'Car Requests', path: '/admin/car-requests' },
        { icon: Home, label: 'Property Requests', path: '/admin/property-requests' },
        { icon: Hotel, label: 'Hotel Requests', path: '/admin/hotel-requests' },
        { icon: Calendar, label: 'Booking Requests', path: '/admin/booking-requests' },
        { icon: Plane, label: 'Transfer Requests', path: '/admin/transfer-requests' },
        { icon: MapPin, label: 'Tour Requests', path: '/admin/tour-requests' },
      ]
    },
    { icon: Plane, label: 'Transfers', path: '/admin/transfers' },
    { icon: MapPin, label: 'Tours', path: '/admin/tours' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const isActivePath = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Admin Panel</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {user?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'Admin User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || 'admin@example.com'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = item.path ? isActivePath(item.path) : false;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isOpen = openDropdowns[item.label];

            if (hasSubItems) {
              return (
                <div key={item.label}>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={`flex items-center w-full px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <IconComponent className={`h-5 w-5 mr-3 ${
                      isActive ? 'text-blue-700' : 'text-gray-400'
                    }`} />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((subItem) => {
                        const SubIconComponent = subItem.icon;
                        const subIsActive = isActivePath(subItem.path);
                        return (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            onClick={onClose}
                            className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                              subIsActive
                                ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-r-2 border-blue-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <SubIconComponent className={`h-4 w-4 mr-3 ${
                              subIsActive ? 'text-blue-700' : 'text-gray-400'
                            }`} />
                            <span>{subItem.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            } else if (item.path) {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className={`h-5 w-5 mr-3 ${
                    isActive ? 'text-blue-700' : 'text-gray-400'
                  }`} />
                  <span>{item.label}</span>
                </Link>
              );
            }
            return null;
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-200 p-3">
          <button
            onClick={logout}
            className="flex items-center w-full px-3 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-all duration-200"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>

        {/* Version */}
        <div className="px-6 py-3 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            Version 1.0.0
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;