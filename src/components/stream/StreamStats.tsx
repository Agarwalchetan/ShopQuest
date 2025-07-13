import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Heart, ShoppingBag, Gift, Zap } from 'lucide-react';

const StreamStats: React.FC = () => {
  const stats = [
    {
      icon: Users,
      label: 'Peak Viewers',
      value: '3,247',
      change: '+12%',
      color: 'text-primary-400',
      bgColor: 'bg-primary-500/20',
    },
    {
      icon: Heart,
      label: 'Total Likes',
      value: '8,934',
      change: '+25%',
      color: 'text-error-400',
      bgColor: 'bg-error-500/20',
    },
    {
      icon: ShoppingBag,
      label: 'Items Sold',
      value: '127',
      change: '+18%',
      color: 'text-success-400',
      bgColor: 'bg-success-500/20',
    },
    {
      icon: Gift,
      label: 'Gifts Received',
      value: '45',
      change: '+8%',
      color: 'text-secondary-400',
      bgColor: 'bg-secondary-500/20',
    },
  ];

  const recentActivity = [
    { user: 'ShopperPro', action: 'purchased MagSafe Charger', time: '2 min ago' },
    { user: 'TechFan99', action: 'sent a gift', time: '3 min ago' },
    { user: 'GadgetLover', action: 'followed the stream', time: '5 min ago' },
    { user: 'StreamWatcher', action: 'purchased Phone Case', time: '7 min ago' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
    >
      <h2 className="text-xl font-bold text-white mb-6">Stream Analytics</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-700/30 rounded-xl p-4 border border-white/10"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="flex items-center space-x-1 text-success-400">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-xs font-semibold">{stat.change}</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {activity.user.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">
                  <span className="font-semibold text-primary-400">{activity.user}</span>
                  {' '}{activity.action}
                </p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Engagement Meter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl border border-primary-500/30"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-primary-400" />
            <span className="text-lg font-semibold text-white">Engagement Level</span>
          </div>
          <span className="text-2xl font-bold text-primary-400">92%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '92%' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full"
          />
        </div>
        <p className="text-sm text-gray-400 mt-2">
          Exceptional engagement! Your audience is highly active.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default StreamStats;