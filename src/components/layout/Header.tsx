import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Trophy, 
  ShoppingBag, 
  Target, 
  User, 
  Bell,
  Search,
  Menu,
  X,
  Settings,
  Crown,
  Sparkles,
  BarChart3,
  Shield,
  Server,
  Coins
} from 'lucide-react';
import { useUserStore } from '../../store/userStore';
import NotificationSystem from '../notifications/NotificationSystem';
import SmartNotifications from '../ai/SmartNotifications';
import { useCart } from '../../hooks/useCart';

const Header: React.FC = () => {
  const location = useLocation();
  const { user, points, level } = useUserStore();
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { path: '/', label: 'Home', icon: Zap },
    { path: '/shop', label: 'Shop', icon: ShoppingBag },
    { path: '/quests', label: 'Quests', icon: Target },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { path: '/dashboard', label: 'Dashboard', icon: User },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/ai', label: 'AI Features', icon: Sparkles },
    { path: '/blockchain', label: 'Web3', icon: Coins },
  ];

  const adminItems = [
    { path: '/admin', label: 'Admin', icon: Shield },
    { path: '/devops', label: 'DevOps', icon: Server },
    { path: '/blockchain', label: 'Blockchain', icon: Coins },
  ];

  const userMenuItems = [
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-dark-900/80 border-b border-white/10 shadow-premium"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                ShopQuest
              </h1>
              <p className="text-xs text-gray-400 font-medium">Premium Shopping</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-brand-400 transition-colors" />
              <input
                type="text"
                placeholder="Search streams, products, creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-dark-800/50 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all duration-300 backdrop-blur-sm"
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-brand-500/20 text-brand-400 shadow-glow'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.path === '/shop' && getTotalItems() > 0 && (
                      <span className="w-5 h-5 bg-accent-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {getTotalItems() > 9 ? '9+' : getTotalItems()}
                      </span>
                    )}
                  </motion.div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-brand-500/10 rounded-xl border border-brand-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Admin Section */}
            <div className="w-px h-6 bg-white/10 mx-2" />
            {adminItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-warning-500/20 text-warning-400 shadow-glow'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.div>
                  {isActive && (
                    <motion.div
                      layoutId="activeAdminTab"
                      className="absolute inset-0 bg-warning-500/10 rounded-xl border border-warning-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Actions */}
          <div className="flex items-center space-x-4">
            {/* Points & Level */}
            <div className="hidden sm:flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-accent-500/20 to-accent-600/20 px-4 py-2 rounded-xl border border-accent-500/30 backdrop-blur-sm"
              >
                <Zap className="w-4 h-4 text-accent-400" />
                <span className="text-sm font-bold text-accent-400">
                  {points.toLocaleString()}
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-brand-500/20 to-brand-600/20 px-4 py-2 rounded-xl border border-brand-500/30 backdrop-blur-sm"
              >
                <Crown className="w-4 h-4 text-brand-400" />
                <span className="text-sm font-bold text-brand-400">
                  Level {level}
                </span>
              </motion.div>
            </div>

            {/* Notifications */}
            <SmartNotifications />

            {/* User Avatar */}
            <div className="relative group">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/5 transition-all duration-300"
              >
                <img
                  src={user?.avatar}
                  alt={user?.username}
                  className="w-10 h-10 rounded-xl border-2 border-brand-500/50 object-cover"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-white">{user?.username}</p>
                  <p className="text-xs text-gray-400">Level {level}</p>
                </div>
              </motion.button>

              {/* User Dropdown */}
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-dark-800/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-premium overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto"
                >
                  {userMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/10 py-4"
            >
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-12 pr-4 py-3 bg-dark-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  />
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-2">
                {[...navItems, ...adminItems].map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  const isAdmin = adminItems.includes(item);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? isAdmin 
                            ? 'bg-warning-500/20 text-warning-400'
                            : 'bg-brand-500/20 text-brand-400'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      {item.path === '/shop' && getTotalItems() > 0 && (
                        <span className="w-5 h-5 bg-accent-500 text-white text-xs font-bold rounded-full flex items-center justify-center ml-auto">
                          {getTotalItems() > 9 ? '9+' : getTotalItems()}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
              
              {/* Mobile Points & Level */}
              <div className="flex items-center justify-center space-x-4 mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center space-x-2 bg-accent-500/20 px-4 py-2 rounded-xl">
                  <Zap className="w-4 h-4 text-accent-400" />
                  <span className="text-sm font-bold text-accent-400">
                    {points.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-brand-500/20 px-4 py-2 rounded-xl">
                  <Crown className="w-4 h-4 text-brand-400" />
                  <span className="text-sm font-bold text-brand-400">
                    Level {level}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;