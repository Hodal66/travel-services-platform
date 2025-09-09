// pages/admin/AdminDashboard.tsx
import React from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Car, 
  Home, 
  Hotel, 
  Plane,
  MapPin,
  ArrowUp,
  ArrowDown,
  Activity,
  Clock
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

const AdminDashboard: React.FC = () => {
  const { stats, bookings, users } = useAdmin();

  // Calculate recent activity
  const recentBookings = bookings.slice(0, 5);
  const recentUsers = users.slice(0, 5);

  // Mock data for charts (in real app, this would come from backend)
  const monthlyRevenue = [45000, 52000, 48000, 61000, 55000, 67000];
  const serviceStats = [
    { name: 'Car Rentals', value: 35, color: 'bg-blue-500', icon: Car },
    { name: 'Hotels', value: 28, color: 'bg-purple-500', icon: Hotel },
    { name: 'Real Estate', value: 20, color: 'bg-green-500', icon: Home },
    { name: 'Tours', value: 12, color: 'bg-teal-500', icon: MapPin },
    { name: 'Transfers', value: 5, color: 'bg-orange-500', icon: Plane }
  ];

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    change: number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }> = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-2">
            {change >= 0 ? (
              <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(change)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-2 text-gray-600">Welcome back! Here's what's happening with your platform.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Last updated: just now</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          change={12.5}
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings.toLocaleString()}
          change={8.2}
          icon={Calendar}
          color="bg-green-500"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          change={stats.monthlyGrowth}
          icon={DollarSign}
          color="bg-purple-500"
        />
        <StatCard
          title="Active Services"
          value={stats.activeServices}
          change={5.1}
          icon={Activity}
          color="bg-orange-500"
        />
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-green-600">+{stats.monthlyGrowth}%</span>
            </div>
          </div>
          
          {/* Simple Bar Chart */}
          <div className="space-y-4">
            {monthlyRevenue.map((revenue, index) => {
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
              const maxRevenue = Math.max(...monthlyRevenue);
              const percentage = (revenue / maxRevenue) * 100;
              
              return (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-600 w-8">{months[index]}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-16">
                    ${(revenue / 1000).toFixed(0)}k
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Service Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Service Distribution</h3>
          
          <div className="space-y-4">
            {serviceStats.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${service.color}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{service.name}</span>
                      <span className="text-sm font-semibold text-gray-600">{service.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${service.color} transition-all duration-500`}
                        style={{ width: `${service.value}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all
            </button>
          </div>
          
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  booking.status === 'confirmed' ? 'bg-green-500' :
                  booking.status === 'pending' ? 'bg-yellow-500' :
                  booking.status === 'cancelled' ? 'bg-red-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {booking.serviceName}
                  </p>
                  <p className="text-sm text-gray-600">{booking.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    ${booking.totalAmount}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{booking.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">New Users</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all
            </button>
          </div>
          
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-600 truncate">{user.email}</p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' :
                    user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 capitalize">{user.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { label: 'Add Car', icon: Car, color: 'bg-blue-500' },
            { label: 'Add Property', icon: Home, color: 'bg-green-500' },
            { label: 'Add Hotel', icon: Hotel, color: 'bg-purple-500' },
            { label: 'Add Transfer', icon: Plane, color: 'bg-orange-500' },
            { label: 'Add Tour', icon: MapPin, color: 'bg-teal-500' },
            { label: 'Add User', icon: Users, color: 'bg-indigo-500' }
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className={`p-3 rounded-full ${action.color} mb-2`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;