import React from 'react';
import { motion } from 'framer-motion';
import { X, Trophy, Gift, Zap, ShoppingBag, Star, Crown } from 'lucide-react';

interface NotificationPanelProps {
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const notifications = [
    {
      id: 1,
      type: 'achievement',
      icon: Trophy,
      title: 'Achievement Unlocked!',
      message: 'You earned the "Shopping Spree" badge',
      time: '2 minutes ago',
      color: 'text-accent-400',
      bgColor: 'bg-accent-500/20',
      borderColor: 'border-accent-500/30',
      unread: true,
    },
    {
      id: 2,
      type: 'quest',
      icon: Zap,
      title: 'Quest Completed',
      message: 'Daily Login Streak - 7 days!',
      time: '1 hour ago',
      color: 'text-brand-400',
      bgColor: 'bg-brand-500/20',
      borderColor: 'border-brand-500/30',
      unread: true,
    },
    {
      id: 3,
      type: 'reward',
      icon: Gift,
      title: 'Reward Available',
      message: '500 points for watching 30 minutes',
      time: '3 hours ago',
      color: 'text-success-400',
      bgColor: 'bg-success-500/20',
      borderColor: 'border-success-500/30',
      unread: false,
    },
    {
      id: 4,
      type: 'purchase',
      icon: ShoppingBag,
      title: 'Purchase Confirmed',
      message: 'Your order #SQ-1234 has been processed',
      time: '1 day ago',
      color: 'text-warning-400',
      bgColor: 'bg-warning-500/20',
      borderColor: 'border-warning-500/30',
      unread: false,
    },
    {
      id: 5,
      type: 'level',
      icon: Crown,
      title: 'Level Up!',
      message: 'Congratulations! You reached Level 18',
      time: '2 days ago',
      color: 'text-brand-400',
      bgColor: 'bg-brand-500/20',
      borderColor: 'border-brand-500/30',
      unread: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 top-full mt-3 w-96 bg-dark-800/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-premium overflow-hidden z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-white">Notifications</h3>
          <p className="text-sm text-gray-400">You have 2 unread notifications</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification, index) => {
          const Icon = notification.icon;
          
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`relative p-4 border-b border-white/5 hover:bg-white/5 transition-all duration-200 cursor-pointer group ${
                notification.unread ? 'bg-white/2' : ''
              }`}
            >
              {notification.unread && (
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-brand-500 rounded-full" />
              )}
              
              <div className="flex items-start space-x-4 ml-4">
                <div className={`p-3 rounded-xl ${notification.bgColor} border ${notification.borderColor} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-5 h-5 ${notification.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-semibold text-white truncate">
                      {notification.title}
                    </p>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      {notification.time}
                    </p>
                    {notification.type === 'achievement' && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-accent-400" />
                        <span className="text-xs text-accent-400 font-medium">+500 XP</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 bg-dark-900/50">
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors"
          >
            Mark all as read
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-sm text-gray-400 hover:text-white font-medium transition-colors"
          >
            View all notifications
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationPanel;