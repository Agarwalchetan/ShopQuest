import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Gift, Trophy, Zap, ShoppingBag } from 'lucide-react';

interface Notification {
  id: string;
  type: 'achievement' | 'quest' | 'purchase' | 'stream' | 'reward';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showPanel, setShowPanel] = useState(false);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add notifications for demo
      if (Math.random() > 0.7) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ['achievement', 'quest', 'purchase', 'stream', 'reward'][Math.floor(Math.random() * 5)] as any,
          title: 'New Achievement!',
          message: 'You unlocked the "Stream Watcher" badge',
          timestamp: new Date(),
          read: false,
        };
        
        setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return Trophy;
      case 'quest':
        return Zap;
      case 'purchase':
        return ShoppingBag;
      case 'reward':
        return Gift;
      default:
        return Bell;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'achievement':
        return 'text-accent-400';
      case 'quest':
        return 'text-brand-400';
      case 'purchase':
        return 'text-success-400';
      case 'reward':
        return 'text-warning-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPanel(!showPanel)}
        className="relative p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-error-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </motion.button>

      {/* Notification Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 top-full mt-3 w-96 bg-dark-800/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-premium overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">Notifications</h3>
                <p className="text-sm text-gray-400">
                  {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-brand-400 hover:text-brand-300 font-medium"
                  >
                    Mark all read
                  </button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPanel(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center">
                  <Bell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification, index) => {
                  const Icon = getIcon(notification.type);
                  const color = getColor(notification.type);
                  
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => markAsRead(notification.id)}
                      className={`relative p-4 border-b border-white/5 hover:bg-white/5 transition-all duration-200 cursor-pointer ${
                        !notification.read ? 'bg-white/2' : ''
                      }`}
                    >
                      {!notification.read && (
                        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-brand-500 rounded-full" />
                      )}
                      
                      <div className="flex items-start space-x-3 ml-4">
                        <div className={`p-2 rounded-lg bg-dark-600/50`}>
                          <Icon className={`w-4 h-4 ${color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {notification.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;