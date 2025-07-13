import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Brain, 
  TrendingUp, 
  ShoppingBag, 
  Clock,
  Star,
  Zap,
  X,
  Settings,
  Filter
} from 'lucide-react';

interface SmartNotification {
  id: string;
  type: 'price_drop' | 'restock' | 'recommendation' | 'trend' | 'social' | 'achievement';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  timestamp: Date;
  read: boolean;
  actionable: boolean;
  action?: {
    label: string;
    url?: string;
    callback?: () => void;
  };
  metadata?: any;
  aiGenerated: boolean;
  relevanceScore: number;
}

const SmartNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<SmartNotification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'ai' | 'actionable'>('all');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadSmartNotifications();
    
    // Simulate real-time AI notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        generateAINotification();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadSmartNotifications = () => {
    const mockNotifications: SmartNotification[] = [
      {
        id: '1',
        type: 'price_drop',
        title: 'Smart Price Alert',
        message: 'Wireless Headphones you viewed dropped 25% - perfect timing based on your purchase pattern!',
        priority: 'high',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false,
        actionable: true,
        action: {
          label: 'Buy Now',
          url: '/product/wireless-headphones',
        },
        aiGenerated: true,
        relevanceScore: 0.92,
      },
      {
        id: '2',
        type: 'recommendation',
        title: 'AI Recommendation',
        message: 'Based on your recent tech purchases, you might love this new smart watch (89% match)',
        priority: 'medium',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        read: false,
        actionable: true,
        action: {
          label: 'View Product',
          url: '/product/smart-watch',
        },
        aiGenerated: true,
        relevanceScore: 0.89,
      },
      {
        id: '3',
        type: 'trend',
        title: 'Trending Alert',
        message: 'Your favorite category "Electronics" is trending 40% higher today',
        priority: 'low',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: true,
        actionable: true,
        action: {
          label: 'Explore Trends',
          url: '/shop?category=electronics',
        },
        aiGenerated: true,
        relevanceScore: 0.76,
      },
      {
        id: '4',
        type: 'social',
        title: 'Social Insight',
        message: 'Friends who bought similar items also purchased phone accessories',
        priority: 'medium',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        read: false,
        actionable: true,
        action: {
          label: 'See Recommendations',
          url: '/recommendations/social',
        },
        aiGenerated: true,
        relevanceScore: 0.84,
      },
    ];

    setNotifications(mockNotifications);
  };

  const generateAINotification = () => {
    const aiNotifications = [
      {
        type: 'restock' as const,
        title: 'Restock Alert',
        message: 'Item in your wishlist is back in stock - limited quantity!',
        priority: 'urgent' as const,
      },
      {
        type: 'recommendation' as const,
        title: 'Perfect Match Found',
        message: 'AI found a 95% match for your preferences in new arrivals',
        priority: 'high' as const,
      },
      {
        type: 'trend' as const,
        title: 'Market Trend',
        message: 'Prices in your favorite category expected to rise 15% next week',
        priority: 'medium' as const,
      },
    ];

    const template = aiNotifications[Math.floor(Math.random() * aiNotifications.length)];
    const newNotification: SmartNotification = {
      id: Date.now().toString(),
      ...template,
      timestamp: new Date(),
      read: false,
      actionable: true,
      action: {
        label: 'View Details',
        url: '/recommendations',
      },
      aiGenerated: true,
      relevanceScore: 0.7 + Math.random() * 0.3,
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    switch (filter) {
      case 'unread':
        return !notif.read;
      case 'ai':
        return notif.aiGenerated;
      case 'actionable':
        return notif.actionable;
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-error-400 bg-error-500/20 border-error-500/30';
      case 'high':
        return 'text-warning-400 bg-warning-500/20 border-warning-500/30';
      case 'medium':
        return 'text-brand-400 bg-brand-500/20 border-brand-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'price_drop':
        return TrendingUp;
      case 'restock':
        return ShoppingBag;
      case 'recommendation':
        return Brain;
      case 'trend':
        return TrendingUp;
      case 'social':
        return Star;
      case 'achievement':
        return Zap;
      default:
        return Bell;
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
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
        
        {/* AI Indicator */}
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-brand-500 rounded-full flex items-center justify-center">
          <Brain className="w-2 h-2 text-white" />
        </div>
      </motion.button>

      {/* Smart Notifications Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 top-full mt-3 w-96 bg-dark-800/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-premium overflow-hidden z-50"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-brand-400" />
                    <h3 className="text-lg font-bold text-white">Smart Notifications</h3>
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
                      onClick={() => setIsOpen(false)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex space-x-2">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'unread', label: 'Unread' },
                    { id: 'ai', label: 'AI' },
                    { id: 'actionable', label: 'Actionable' },
                  ].map((filterOption) => (
                    <button
                      key={filterOption.id}
                      onClick={() => setFilter(filterOption.id as any)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        filter === filterOption.id
                          ? 'bg-brand-500 text-white'
                          : 'bg-dark-700/50 text-gray-400 hover:text-white'
                      }`}
                    >
                      {filterOption.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                  <div className="p-6 text-center">
                    <Bell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No notifications</p>
                  </div>
                ) : (
                  filteredNotifications.map((notification, index) => {
                    const Icon = getTypeIcon(notification.type);
                    
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
                          <div className="p-2 bg-dark-600/50 rounded-lg">
                            <Icon className="w-4 h-4 text-brand-400" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <p className="text-sm font-semibold text-white truncate">
                                {notification.title}
                              </p>
                              {notification.aiGenerated && (
                                <div className="flex items-center space-x-1 bg-brand-500/20 px-2 py-0.5 rounded-full">
                                  <Brain className="w-3 h-3 text-brand-400" />
                                  <span className="text-xs text-brand-400 font-medium">AI</span>
                                </div>
                              )}
                            </div>
                            
                            <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(notification.priority)}`}>
                                  {notification.priority.toUpperCase()}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              
                              {notification.aiGenerated && (
                                <div className="flex items-center space-x-1 text-brand-400">
                                  <Star className="w-3 h-3" />
                                  <span className="text-xs font-medium">
                                    {Math.round(notification.relevanceScore * 100)}%
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            {notification.actionable && notification.action && (
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full mt-3 py-2 bg-brand-500/20 border border-brand-500/30 text-brand-400 rounded-lg hover:bg-brand-500/30 transition-colors text-sm font-medium"
                              >
                                {notification.action.label}
                              </motion.button>
                            )}
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="p-1 text-gray-500 hover:text-error-400 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/10 bg-dark-900/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <Brain className="w-3 h-3" />
                    <span>Powered by AI</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-1 text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    <Settings className="w-3 h-3" />
                    <span>Settings</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartNotifications;