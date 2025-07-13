import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  DollarSign,
  Eye,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Crown,
  Zap
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  streamViews: number;
  questCompletions: number;
}

interface RecentActivity {
  id: string;
  type: 'user_signup' | 'purchase' | 'stream_start' | 'quest_complete';
  user: string;
  description: string;
  timestamp: string;
  value?: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 15420,
    activeUsers: 3247,
    totalRevenue: 284750,
    totalOrders: 8934,
    averageOrderValue: 31.85,
    conversionRate: 4.2,
    streamViews: 125000,
    questCompletions: 45600,
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'purchase',
      user: 'ShopMaster Pro',
      description: 'Purchased Wireless Headphones',
      timestamp: '2 minutes ago',
      value: 299,
    },
    {
      id: '2',
      type: 'user_signup',
      user: 'NewUser123',
      description: 'Signed up for ShopQuest',
      timestamp: '5 minutes ago',
    },
    {
      id: '3',
      type: 'stream_start',
      user: 'TechGuru Mike',
      description: 'Started streaming Tech Gadgets',
      timestamp: '8 minutes ago',
    },
    {
      id: '4',
      type: 'quest_complete',
      user: 'QuestHunter',
      description: 'Completed Daily Login Quest',
      timestamp: '12 minutes ago',
      value: 50,
    },
  ]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return ShoppingBag;
      case 'user_signup':
        return Users;
      case 'stream_start':
        return Eye;
      case 'quest_complete':
        return Star;
      default:
        return CheckCircle;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'purchase':
        return 'text-success-400';
      case 'user_signup':
        return 'text-brand-400';
      case 'stream_start':
        return 'text-error-400';
      case 'quest_complete':
        return 'text-accent-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Monitor platform performance and user activity</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-brand-500/20 rounded-xl">
                <Users className="w-6 h-6 text-brand-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-gray-400">Total Users</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-success-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+12% this month</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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
              <span className="text-sm font-semibold">+18% this month</span>
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
                <ShoppingBag className="w-6 h-6 text-accent-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalOrders.toLocaleString()}</p>
                <p className="text-sm text-gray-400">Total Orders</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-success-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+8% this week</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-warning-500/20 rounded-xl">
                <BarChart3 className="w-6 h-6 text-warning-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.conversionRate}%</p>
                <p className="text-sm text-gray-400">Conversion Rate</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-success-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+0.3% this week</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type);
                  const color = getActivityColor(activity.type);
                  
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-dark-700/30 rounded-xl"
                    >
                      <div className="p-3 bg-dark-600/50 rounded-xl">
                        <Icon className={`w-5 h-5 ${color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{activity.description}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <span>{activity.user}</span>
                          <span>•</span>
                          <span>{activity.timestamp}</span>
                          {activity.value && (
                            <>
                              <span>•</span>
                              <span className="text-success-400 font-semibold">
                                ${activity.value}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-3 bg-brand-500/20 border border-brand-500/30 text-brand-400 rounded-xl hover:bg-brand-500/30 transition-colors"
                >
                  <Users className="w-5 h-5" />
                  <span>Manage Users</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-3 bg-success-500/20 border border-success-500/30 text-success-400 rounded-xl hover:bg-success-500/30 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>View Orders</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-3 bg-warning-500/20 border border-warning-500/30 text-warning-400 rounded-xl hover:bg-warning-500/30 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span>Platform Settings</span>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">API Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                    <span className="text-success-400 text-sm">Operational</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Database</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                    <span className="text-success-400 text-sm">Healthy</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Payment System</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                    <span className="text-success-400 text-sm">Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">WebSocket</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
                    <span className="text-warning-400 text-sm">Degraded</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;