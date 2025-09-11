// components/admin/DashboardOverview.tsx
import React from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Star, 
  TrendingUp, 
  Car, 
  Home, 
  Building, 
  Plane, 
  MapPin,
  Eye,
  Edit2,
  ArrowUpRight
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

interface DashboardOverviewProps {
  onNavigateToService: (serviceId: string) => void;
}

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ComponentType<any>;
  color: string;
  trend?: 'up' | 'down' | 'neutral';
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigateToService }) => {
  const { stats } = useAdmin();

  const services = [
    { id: 'cars', name: 'Car Rentals', icon: Car, color: 'bg-blue-500', count: 25, revenue: '$45,200' },
    { id: 'properties', name: 'Properties', icon: Home, color: 'bg-green-500', count: 18, revenue: '$32,800' },
    { id: 'hotels', name: 'Hotels', icon: Building, color: 'bg-purple-500', count: 12, revenue: '$28,500' },
    { id: 'transfers', name: 'Transfers', icon: Plane, color: 'bg-orange-500', count: 15, revenue: '$12,400' },
    { id: 'tours', name: 'Tours', icon: MapPin, color: 'bg-teal-500', count: 22, revenue: '$18,600' }
  ];

  const recentBookings = [
    {
      id: '1',
      customerName: 'John Doe',
      service: 'BMW X5',
      type: 'Car Rental',
      amount: 450,
      status: 'confirmed',
      date: '2024-01-15'
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      service: 'Grand Plaza Hotel',
      type: 'Hotel',
      amount: 320,
      status: 'pending',
      date: '2024-01-14'
    },
    {
      id: '3',
      customerName: 'Mike Johnson',
      service: 'Airport Transfer',
      type: 'Transfer',
      amount: 60,
      status: 'completed',
      date: '2024-01-13'
    },
    {
      id: '4',
      customerName: 'Sarah Wilson',
      service: 'City Tour',
      type: 'Tour',
      amount: 85,
      status: 'confirmed',
      date: '2024-01-12'
    }
  ];

  const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color, trend = 'up' }) => (
    <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {change !== undefined && (
            <p className={`text-sm flex items-center gap-1 ${
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              <TrendingUp size={16} className={trend === 'down' ? 'rotate-180' : ''} />
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-200`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    
    return statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          change={12.5}
          icon={Users}
          color="bg-blue-500"
          trend="up"
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings.toLocaleString()}
          change={8.2}
          icon={Calendar}
          color="bg-green-500"
          trend="up"
        />
        <StatCard
          title="Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          change={15.3}
          icon={DollarSign}
          color="bg-purple-500"
          trend="up"
        />
        <StatCard
          title="Active Services"
          value={stats.activeServices}
          change={-2.1}
          icon={Star}
          color="bg-orange-500"
          trend="down"
        />
      </div>
      
      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div 
              key={service.id} 
              className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={() => onNavigateToService(service.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${service.color} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="text-white" size={24} />
                </div>
                <ArrowUpRight className="text-gray-400 group-hover:text-gray-600 transition-colors" size={20} />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{service.count} items</span>
                  <span className="font-medium text-gray-900">{service.revenue}</span>
                </div>
                <div className="text-xs text-gray-400">
                  Click to manage {service.name.toLowerCase()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                        <div className="text-sm text-gray-500">{booking.date}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.service}</div>
                        <div className="text-sm text-gray-500">{booking.type}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${booking.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="text-green-600 hover:text-green-900 p-1 rounded transition-colors">
                          <Edit2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* Performance Card */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Booking Rate</span>
                <span className="text-sm font-semibold text-gray-900">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Customer Satisfaction</span>
                <span className="text-sm font-semibold text-gray-900">4.8/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Response Time</span>
                <span className="text-sm font-semibold text-green-600">2.3min</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">New booking confirmed</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">User registered</p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">Payment processed</p>
                  <p className="text-xs text-gray-500">32 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-900">New review submitted</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;