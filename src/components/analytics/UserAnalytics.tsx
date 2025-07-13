import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, ShoppingBag, Clock, Star, Zap } from 'lucide-react';

const UserAnalytics: React.FC = () => {
  const analyticsData = {
    weeklyStats: [
      { day: 'Mon', points: 120, purchases: 2, watchTime: 45 },
      { day: 'Tue', points: 340, purchases: 1, watchTime: 67 },
      { day: 'Wed', points: 280, purchases: 3, watchTime: 89 },
      { day: 'Thu', points: 450, purchases: 0, watchTime: 34 },
      { day: 'Fri', points: 380, purchases: 4, watchTime: 123 },
      { day: 'Sat', points: 520, purchases: 2, watchTime: 156 },
      { day: 'Sun', points: 290, purchases: 1, watchTime: 78 },
    ],
    totalStats: {
      totalPoints: 28340,
      totalPurchases: 47,
      totalWatchTime: 234,
      averageRating: 4.8,
      streaksCount: 7,
      achievementsUnlocked: 23,
    },
    topCategories: [
      { name: 'Electronics', percentage: 45, color: 'bg-brand-500' },
      { name: 'Fashion', percentage: 30, color: 'bg-accent-500' },
      { name: 'Home & Garden', percentage: 15, color: 'bg-success-500' },
      { name: 'Beauty', percentage: 10, color: 'bg-warning-500' },
    ],
  };

  const maxPoints = Math.max(...analyticsData.weeklyStats.map(d => d.points));

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-brand-500/20 rounded-xl">
              <Zap className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{analyticsData.totalStats.totalPoints.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Total Points</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-success-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">+12% this week</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-success-500/20 rounded-xl">
              <ShoppingBag className="w-6 h-6 text-success-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{analyticsData.totalStats.totalPurchases}</p>
              <p className="text-sm text-gray-400">Total Purchases</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-success-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">+8% this month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-accent-500/20 rounded-xl">
              <Clock className="w-6 h-6 text-accent-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{analyticsData.totalStats.totalWatchTime}h</p>
              <p className="text-sm text-gray-400">Watch Time</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-success-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">+15% this week</span>
          </div>
        </motion.div>
      </div>

      {/* Weekly Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6">Weekly Activity</h3>
        
        <div className="flex items-end justify-between h-48 space-x-2">
          {analyticsData.weeklyStats.map((day, index) => (
            <div key={day.day} className="flex-1 flex flex-col items-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(day.points / maxPoints) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="w-full bg-gradient-to-t from-brand-500 to-brand-600 rounded-t-lg mb-2 min-h-[20px] relative group"
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-dark-700 text-white text-xs px-2 py-1 rounded">
                  {day.points} pts
                </div>
              </motion.div>
              <span className="text-xs text-gray-400 mb-1">{day.points}</span>
              <span className="text-xs text-gray-500">{day.day}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6">Shopping Categories</h3>
        
        <div className="space-y-4">
          {analyticsData.topCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4"
            >
              <div className="w-24 text-sm text-gray-300">{category.name}</div>
              <div className="flex-1 bg-dark-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${category.percentage}%` }}
                  transition={{ delay: index * 0.2, duration: 1 }}
                  className={`h-full ${category.color} rounded-full`}
                />
              </div>
              <div className="w-12 text-sm text-gray-400 text-right">
                {category.percentage}%
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default UserAnalytics;