import React, { useState, useEffect } from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
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
  ChevronDown,
  MapPin,
  Plane,
  User,
  LogOut,
  Briefcase,
  MessageSquare,
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

interface SubItem {
  name: string;
  icon: React.ComponentType<{ className?: string; size?: string | number }>;
  path: string;
}

interface MenuItem {
  name: string;
  icon: React.ComponentType<{ className?: string; size?: string | number }>;
  path?: string;
  subItems?: SubItem[];
}

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openDropdowns, setOpenDropdowns] = useState<{[key: string]: boolean}>({});
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { logout, user } = useAdmin();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { name: "Dashboard", icon: Home, path: "/admin/dashboard" },
    { name: "Users", icon: Users, path: "/admin/users" },
    {
      name: "Services",
      icon: Briefcase,
      subItems: [
        { name: "Cars", icon: Car, path: "/admin/cars" },
        { name: "Properties", icon: Building, path: "/admin/properties" },
        { name: "Hotels", icon: Hotel, path: "/admin/hotels" },
        { name: "Bookings", icon: CreditCard, path: "/admin/bookings" },
        { name: "Tours", icon: MapPin, path: "/admin/tours" },
        { name: "Transfers", icon: Plane, path: "/admin/transfers" },
      ]
    },
    {
      name: "User Requests",
      icon: MessageSquare,
      subItems: [
        { name: "Car Requests", icon: Car, path: "/admin/car-requests" },
        { name: "Property Requests", icon: Building, path: "/admin/property-requests" },
        { name: "Hotel Requests", icon: Hotel, path: "/admin/hotel-requests" },
        { name: "Booking Requests", icon: CreditCard, path: "/admin/booking-requests" },
        { name: "Tour Requests", icon: MapPin, path: "/admin/tour-requests" },
        { name: "Transfer Requests", icon: Plane, path: "/admin/transfer-requests" },
      ]
    },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const toggleDropdown = (label: string) => {
    setOpenDropdowns(prev => ({ 
      ...prev, 
      [label]: !prev[label] 
    }));
  };

  // Auto-expand parent dropdown if current route matches a sub-item
  useEffect(() => {
    const currentPath = location.pathname;
    menuItems.forEach((item) => {
      if (item.subItems) {
        const hasActiveSubItem = item.subItems.some(subItem => 
          currentPath === subItem.path
        );
        if (hasActiveSubItem) {
          setOpenDropdowns(prev => ({ ...prev, [item.name]: true }));
        }
      }
    });
  }, [location.pathname]);

  // Check if a dropdown has any active sub-items
  const hasActiveSubItem = (item: MenuItem): boolean => {
    if (!item.subItems) return false;
    return item.subItems.some(subItem => location.pathname === subItem.path);
  };

  // Close dropdowns when sidebar is collapsed
  useEffect(() => {
    if (!sidebarOpen) {
      setOpenDropdowns({});
    }
  }, [sidebarOpen]);

  // Close other menus when one is opened
  const handleDropdownToggle = (itemName: string) => {
    if (!sidebarOpen) return;
    
    setOpenDropdowns(prev => {
      const newState = { ...prev };
      
      // If we're opening a dropdown, close all others
      if (!prev[itemName]) {
        Object.keys(newState).forEach(key => {
          if (key !== itemName) {
            newState[key] = false;
          }
        });
      }
      
      newState[itemName] = !prev[itemName];
      return newState;
    });
  };

  const renderMenuItem = (item: MenuItem) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isOpen = openDropdowns[item.name];
    const isParentActive = hasActiveSubItem(item);

    if (hasSubItems) {
      return (
        <div key={item.name} className="relative">
          <button
            onClick={() => handleDropdownToggle(item.name)}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
              isParentActive
                ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <item.icon className={`flex-shrink-0 w-5 h-5 mr-3 ${
              isParentActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
            }`} />
            {sidebarOpen && (
              <>
                <span className="flex-1 text-left truncate">{item.name}</span>
                <ChevronDown 
                  className={`flex-shrink-0 h-4 w-4 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  } ${isParentActive ? 'text-indigo-600' : 'text-gray-400'}`} 
                />
              </>
            )}
          </button>
          
          {/* Submenu */}
          {isOpen && sidebarOpen && (
            <div className="mt-1 space-y-1 bg-gray-50 rounded-lg mx-2 py-1">
              {item.subItems!.map((subItem) => (
                <NavLink
                  key={subItem.path}
                  to={subItem.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 ml-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700 border-r-2 border-indigo-600 font-semibold'
                        : 'text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm'
                    }`
                  }
                >
                  <subItem.icon className={`flex-shrink-0 w-4 h-4 mr-3 ${
                    location.pathname === subItem.path 
                      ? 'text-indigo-600' 
                      : 'text-gray-400 group-hover:text-gray-500'
                  }`} />
                  <span className="truncate">{subItem.name}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Regular menu item (no sub-items)
    if (item.path) {
      return (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
              isActive 
                ? "bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600 font-semibold" 
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`
          }
        >
          <item.icon className={`flex-shrink-0 w-5 h-5 mr-3 ${
            location.pathname === item.path 
              ? 'text-indigo-600' 
              : 'text-gray-400 group-hover:text-gray-500'
          }`} />
          {sidebarOpen && <span className="truncate">{item.name}</span>}
        </NavLink>
      );
    }

    return null;
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 flex flex-col border-r border-gray-200`}
      >
        {/* Logo & toggle */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-white">
          <Link to="/" className="flex items-center">
            <span
              className={`font-bold text-xl text-indigo-600 transition-all duration-300 ${
                !sidebarOpen && "hidden"
              }`}
            >
              Travel Admin
            </span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map(renderMenuItem)}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-200 bg-gray-50">
          {sidebarOpen && user && (
            <div className="mb-3 p-2 bg-white rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Logged in as:</p>
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          )}
          <button
            onClick={logout}
            className={`w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center space-x-2 ${
              !sidebarOpen && "p-2"
            }`}
            title={!sidebarOpen ? "Logout" : undefined}
          >
            <LogOut size={16} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="flex items-center justify-between bg-white shadow-sm px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {!sidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <Menu size={20} />
              </button>
            )}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64 transition-all duration-200"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="p-2 rounded-full hover:bg-gray-100 relative transition-colors duration-200"
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  3
                </span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                  <div className="py-2">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          </div>
                          <div className="ml-3 flex-1 min-w-0">
                            <p className="text-sm text-gray-900 font-medium">New booking request from John Doe</p>
                            <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          </div>
                          <div className="ml-3 flex-1 min-w-0">
                            <p className="text-sm text-gray-900 font-medium">Hotel listing needs approval</p>
                            <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                          <div className="ml-3 flex-1 min-w-0">
                            <p className="text-sm text-gray-900 font-medium">Monthly report is ready</p>
                            <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 border-t border-gray-200">
                      <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="font-medium text-gray-700 hidden sm:block">{user?.name}</span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                  <div className="py-1">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/admin/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User size={16} className="mr-3 text-gray-400" />
                      Profile Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <LogOut size={16} className="mr-3 text-gray-400" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                  <p className="text-2xl font-bold text-gray-900">1,250</p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-500 text-sm font-medium">Total Bookings</h3>
                  <p className="text-2xl font-bold text-gray-900">3,840</p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 font-bold text-sm">$</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
                  <p className="text-2xl font-bold text-gray-900">$125,000</p>
                </div>
              </div>
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