import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Store, 
  TrendingUp, 
  DollarSign, 
  Package,
  Users,
  Star,
  Plus,
  Edit3,
  Eye,
  BarChart3,
  Calendar,
  ShoppingBag,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  sold: number;
  rating: number;
  reviews: number;
  status: 'active' | 'draft' | 'out_of_stock';
  image: string;
  category: string;
}

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}

interface SellerStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  averageRating: number;
  conversionRate: number;
  monthlyGrowth: number;
}

const SellerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'analytics'>('overview');
  const [stats, setStats] = useState<SellerStats>({
    totalRevenue: 15420,
    totalOrders: 342,
    totalProducts: 28,
    averageRating: 4.8,
    conversionRate: 3.2,
    monthlyGrowth: 18.5,
  });

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 89.99,
      stock: 45,
      sold: 127,
      rating: 4.7,
      reviews: 89,
      status: 'active',
      image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'Electronics',
    },
    {
      id: '2',
      name: 'Smart Fitness Tracker',
      price: 129.99,
      stock: 0,
      sold: 203,
      rating: 4.9,
      reviews: 156,
      status: 'out_of_stock',
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'Electronics',
    },
    {
      id: '3',
      name: 'Premium Coffee Beans',
      price: 24.99,
      stock: 78,
      sold: 89,
      rating: 4.6,
      reviews: 67,
      status: 'active',
      image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'Food & Beverage',
    },
  ]);

  const [recentOrders, setRecentOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customer: 'John Smith',
      product: 'Wireless Bluetooth Headphones',
      amount: 89.99,
      status: 'shipped',
      date: '2024-01-15',
    },
    {
      id: 'ORD-002',
      customer: 'Sarah Johnson',
      product: 'Smart Fitness Tracker',
      amount: 129.99,
      status: 'delivered',
      date: '2024-01-14',
    },
    {
      id: 'ORD-003',
      customer: 'Mike Wilson',
      product: 'Premium Coffee Beans',
      amount: 24.99,
      status: 'processing',
      date: '2024-01-13',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-success-400 bg-success-500/20';
      case 'draft':
        return 'text-warning-400 bg-warning-500/20';
      case 'out_of_stock':
        return 'text-error-400 bg-error-500/20';
      case 'pending':
        return 'text-warning-400 bg-warning-500/20';
      case 'processing':
        return 'text-brand-400 bg-brand-500/20';
      case 'shipped':
        return 'text-accent-400 bg-accent-500/20';
      case 'delivered':
        return 'text-success-400 bg-success-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-brand-500/20 to-accent-500/20 rounded-2xl">
            <Store className="w-8 h-8 text-brand-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Seller Dashboard</h1>
            <p className="text-gray-400">Manage your store and track performance</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </motion.button>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-success-500/20 rounded-xl">
              <DollarSign className="w-6 h-6 text-success-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Total Revenue</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-success-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">+{stats.monthlyGrowth}% this month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-brand-500/20 rounded-xl">
              <ShoppingBag className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.totalOrders}</p>
              <p className="text-sm text-gray-400">Total Orders</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-success-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">+15% this week</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-accent-500/20 rounded-xl">
              <Star className="w-6 h-6 text-accent-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.averageRating}</p>
              <p className="text-sm text-gray-400">Average Rating</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-success-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">+0.2 this month</span>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex space-x-1 bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-1"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-brand-500 text-white shadow-glow'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Recent Orders</h3>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-dark-700/30 rounded-xl"
                  >
                    <div>
                      <p className="text-white font-medium">{order.customer}</p>
                      <p className="text-gray-400 text-sm">{order.product}</p>
                      <p className="text-gray-500 text-xs">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">${order.amount}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Top Products</h3>
              <div className="space-y-4">
                {products.slice(0, 3).map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-dark-700/30 rounded-xl"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-white font-medium">{product.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span>{product.sold} sold</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-accent-400 fill-current" />
                          <span>{product.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">${product.price}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(product.status)}`}>
                        {product.status.replace('_', ' ')}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Product Management</h3>
                <div className="flex items-center space-x-3">
                  <select className="px-4 py-2 bg-dark-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50">
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Food & Beverage</option>
                  </select>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                  >
                    Add Product
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-700/30">
                  <tr>
                    <th className="text-left p-4 text-gray-400 font-medium">Product</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Price</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Stock</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Sold</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Rating</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="text-white font-medium">{product.name}</p>
                            <p className="text-gray-400 text-sm">{product.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-white font-semibold">${product.price}</td>
                      <td className="p-4">
                        <span className={`${product.stock === 0 ? 'text-error-400' : 'text-white'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-4 text-white">{product.sold}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-accent-400 fill-current" />
                          <span className="text-white">{product.rating}</span>
                          <span className="text-gray-400 text-sm">({product.reviews})</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(product.status)}`}>
                          {product.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Order Management</h3>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-6 bg-dark-700/30 rounded-xl"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-brand-500/20 rounded-xl">
                      <ShoppingBag className="w-6 h-6 text-brand-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{order.id}</p>
                      <p className="text-gray-400">{order.customer}</p>
                      <p className="text-gray-500 text-sm">{order.product}</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-white font-bold">${order.amount}</p>
                    <p className="text-gray-400 text-sm">{order.date}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-brand-500/20 border border-brand-500/30 text-brand-400 rounded-lg hover:bg-brand-500/30 transition-colors"
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Performance Metrics</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Conversion Rate</span>
                    <span className="text-white font-semibold">{stats.conversionRate}%</span>
                  </div>
                  <div className="w-full bg-dark-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-brand-500 to-brand-600 h-3 rounded-full"
                      style={{ width: `${stats.conversionRate * 10}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Customer Satisfaction</span>
                    <span className="text-white font-semibold">{stats.averageRating}/5.0</span>
                  </div>
                  <div className="w-full bg-dark-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-success-500 to-success-600 h-3 rounded-full"
                      style={{ width: `${(stats.averageRating / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Growth Insights</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-dark-700/30 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-success-400" />
                    <span className="text-white">Monthly Growth</span>
                  </div>
                  <span className="text-success-400 font-bold">+{stats.monthlyGrowth}%</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-dark-700/30 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-brand-400" />
                    <span className="text-white">Return Customers</span>
                  </div>
                  <span className="text-brand-400 font-bold">67%</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-dark-700/30 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-accent-400" />
                    <span className="text-white">Avg. Order Value</span>
                  </div>
                  <span className="text-accent-400 font-bold">$45.12</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SellerDashboard;