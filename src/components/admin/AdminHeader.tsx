// // components/admin/AdminHeader.tsx
// import React, { useState, useRef, useEffect } from 'react';
// import { 
//   Menu, 
//   Search, 
//   Bell, 
//   User, 
//   Settings, 
//   LogOut,
//   Moon,
//   Sun,
//   ChevronDown
// } from 'lucide-react';
// import { useAdmin } from '../../contexts/AdminContext';

// interface AdminHeaderProps {
//   onMenuClick: () => void;
// }

// const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
//   const { user, logout, stats } = useAdmin();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
  
//   const notificationRef = useRef<HTMLDivElement>(null);
//   const userMenuRef = useRef<HTMLDivElement>(null);

//   // Mock notifications
//   const notifications = [
//     {
//       id: 1,
//       title: 'New booking received',
//       message: 'BMW X5 booked for 3 days',
//       time: '2 minutes ago',
//       unread: true
//     },
//     {
//       id: 2,
//       title: 'Payment completed',
//       message: 'Hotel booking payment processed',
//       time: '1 hour ago',
//       unread: true
//     },
//     {
//       id: 3,
//       title: 'User registered',
//       message: 'New user joined the platform',
//       time: '3 hours ago',
//       unread: false
//     }
//   ];

//   const unreadCount = notifications.filter(n => n.unread).length;

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
//         setShowNotifications(false);
//       }
//       if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
//         setShowUserMenu(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6">
//       {/* Left Section */}
//       <div className="flex items-center space-x-4">
//         {/* Mobile Menu Button */}
//         <button
//           onClick={onMenuClick}
//           className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//         >
//           <Menu className="h-5 w-5" />
//         </button>

//         {/* Search Bar */}
//         <div className="hidden md:block">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center space-x-3">
//         {/* Quick Stats */}
//         <div className="hidden xl:flex items-center space-x-6 mr-6">
//           <div className="text-center">
//             <div className="text-lg font-semibold text-gray-900">{stats.totalUsers.toLocaleString()}</div>
//             <div className="text-xs text-gray-500">Users</div>
//           </div>
//           <div className="text-center">
//             <div className="text-lg font-semibold text-gray-900">{stats.totalBookings.toLocaleString()}</div>
//             <div className="text-xs text-gray-500">Bookings</div>
//           </div>
//           <div className="text-center">
//             <div className="text-lg font-semibold text-green-600">${stats.totalRevenue.toLocaleString()}</div>
//             <div className="text-xs text-gray-500">Revenue</div>
//           </div>
//         </div>

//         {/* Dark Mode Toggle */}
//         <button
//           onClick={() => setDarkMode(!darkMode)}
//           className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//         >
//           {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//         </button>

//         {/* Notifications */}
//         <div className="relative" ref={notificationRef}>
//           <button
//             onClick={() => setShowNotifications(!showNotifications)}
//             className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <Bell className="h-5 w-5" />
//             {unreadCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                 {unreadCount}
//               </span>
//             )}
//           </button>

//           {/* Notifications Dropdown */}
//           {showNotifications && (
//             <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
//               <div className="p-4 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
//                   <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
//                     {unreadCount} new
//                   </span>
//                 </div>
//               </div>
//               <div className="max-h-96 overflow-y-auto">
//                 {notifications.map((notification) => (
//                   <div
//                     key={notification.id}
//                     className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
//                       notification.unread ? 'bg-blue-50' : ''
//                     }`}
//                   >
//                     <div className="flex items-start space-x-3">
//                       <div className={`w-2 h-2 rounded-full mt-2 ${
//                         notification.unread ? 'bg-blue-500' : 'bg-gray-300'
//                       }`} />
//                       <div className="flex-1">
//                         <h4 className="text-sm font-semibold text-gray-900">{notification.title}</h4>
//                         <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
//                         <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="p-4 text-center">
//                 <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//                   View all notifications
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* User Menu */}
//         <div className="relative" ref={userMenuRef}>
//           <button
//             onClick={() => setShowUserMenu(!showUserMenu)}
//             className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
//               <span className="text-white text-sm font-semibold">
//                 {user?.name?.charAt(0) || 'A'}
//               </span>
//             </div>
//             <div className="hidden md:block text-left">
//               <div className="text-sm font-medium text-gray-900">
//                 {user?.name || 'Admin User'}
//               </div>
//               <div className="text-xs text-gray-500 capitalize">{user?.role || 'Administrator'}</div>
//             </div>
//             <ChevronDown className="h-4 w-4 text-gray-400" />
//           </button>

//           {/* User Dropdown */}
//           {showUserMenu && (
//             <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
//               <div className="p-4 border-b border-gray-200">
//                 <div className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</div>
//                 <div className="text-sm text-gray-500">{user?.email || 'admin@example.com'}</div>
//               </div>
              
//               <div className="py-2">
//                 <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
//                   <User className="h-4 w-4 mr-3" />
//                   Profile Settings
//                 </button>
//                 <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
//                   <Settings className="h-4 w-4 mr-3" />
//                   Account Settings
//                 </button>
//               </div>
              
//               <div className="border-t border-gray-200 py-2">
//                 <button
//                   onClick={logout}
//                   className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
//                 >
//                   <LogOut className="h-4 w-4 mr-3" />
//                   Sign Out
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default AdminHeader;



// components/admin/AdminHeader.tsx
import React, { useState } from 'react';
import { Menu, Bell, User, ChevronDown, LogOut, Settings } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

interface AdminHeaderProps {
  activeTab: string;
  selectedService: string;
  user: any;
  onMenuClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  selectedService,
  user,
  onMenuClick
}) => {
  const { logout } = useAdmin();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'services':
        return `${selectedService.charAt(0).toUpperCase() + selectedService.slice(1)} Management`;
      case 'dashboard':
        return 'Dashboard';
      case 'bookings':
        return 'Booking Management';
      case 'users':
        return 'User Management';
      default:
        return 'Dashboard';
    }
  };

  const getPageDescription = () => {
    switch (activeTab) {
      case 'services':
        return `Manage your ${selectedService} inventory and settings`;
      case 'dashboard':
        return 'Manage your travel services platform';
      case 'bookings':
        return 'Track and manage customer bookings';
      case 'users':
        return 'Manage platform users and permissions';
      default:
        return 'Manage your travel services platform';
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} className="text-gray-600" />
          </button>
          
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
              {getPageTitle()}
            </h2>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              {getPageDescription()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-gray-100 relative transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 lg:gap-3 pl-2 lg:pl-4 border-l border-gray-200 hover:bg-gray-50 rounded-lg p-2 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="text-white" size={16} />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'admin@travel.com'}</p>
              </div>
              <ChevronDown size={16} className="text-gray-600" />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100 sm:hidden">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'admin@travel.com'}</p>
                </div>
                
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <User size={16} />
                  Profile
                </button>
                
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <Settings size={16} />
                  Settings
                </button>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default AdminHeader;