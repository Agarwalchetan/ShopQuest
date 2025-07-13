import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Edit3, 
  Camera, 
  Trophy, 
  Zap, 
  ShoppingBag, 
  Calendar,
  Star,
  Crown,
  Gift,
  Target,
  TrendingUp,
  Award,
  Settings
} from 'lucide-react';
import { useUserStore } from '../store/userStore';

const ProfilePage: React.FC = () => {
  const { user, points, level, achievements } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'activity' | 'stats'>('overview');

  const userStats = [
    {
      label: 'Total Points',
      value: points.toLocaleString(),
      icon: Zap,
      color: 'text-accent-400',
      bgColor: 'bg-accent-500/20',
      borderColor: 'border-accent-500/30',
    },
    {
      label: 'Current Level',
      value: level.toString(),
      icon: Crown,
      color: 'text-brand-400',
      bgColor: 'bg-brand-500/20',
      borderColor: 'border-brand-500/30',
    },
    {
      label: 'Achievements',
      value: achievements.length.toString(),
      icon: Trophy,
      color: 'text-warning-400',
      bgColor: 'bg-warning-500/20',
      borderColor: 'border-warning-500/30',
    },
    {
      label: 'Items Purchased',
      value: '47',
      icon: ShoppingBag,
      color: 'text-success-400',
      bgColor: 'bg-success-500/20',
      borderColor: 'border-success-500/30',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'achievement',
      title: 'Achievement Unlocked',
      description: 'Earned "Shopping Spree" badge',
      time: '2 hours ago',
      icon: Trophy,
      color: 'text-accent-400',
    },
    {
      id: 2,
      type: 'purchase',
      title: 'Purchase Made',
      description: 'Bought Wireless Earbuds Pro',
      time: '1 day ago',
      icon: ShoppingBag,
      color: 'text-success-400',
    },
    {
      id: 3,
      type: 'quest',
      title: 'Quest Completed',
      description: 'Daily Login Streak - 7 days',
      time: '2 days ago',
      icon: Target,
      color: 'text-brand-400',
    },
    {
      id: 4,
      type: 'level',
      title: 'Level Up!',
      description: 'Reached Level 18',
      time: '3 days ago',
      icon: Crown,
      color: 'text-warning-400',
    },
  ];

  const levelProgress = {
    current: 7660,
    required: 10000,
    percentage: 76.6,
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'activity', label: 'Activity', icon: TrendingUp },
    { id: 'stats', label: 'Statistics', icon: Star },
  ];

  return (
    <div className="min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-8 shadow-premium"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative group">
              <img
                src={user?.avatar}
                alt={user?.username}
                className="w-32 h-32 rounded-3xl border-4 border-brand-500/50 object-cover shadow-glow"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-2 right-2 p-3 bg-brand-500 text-white rounded-xl shadow-lg hover:bg-brand-600 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Camera className="w-4 h-4" />
              </motion.button>
              
              {/* Level Badge */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-bold px-3 py-1 rounded-full border-2 border-dark-800 shadow-lg">
                Level {level}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <h1 className="text-3xl font-bold text-white">{user?.username}</h1>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                >
                  <Edit3 className="w-5 h-5" />
                </motion.button>
              </div>
              
              <p className="text-gray-400 mb-4">{user?.email}</p>
              
              <div className="flex items-center justify-center md:justify-start space-x-6 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent-400">{points.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Points</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-brand-400">{achievements.length}</p>
                  <p className="text-sm text-gray-400">Achievements</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success-400">47</p>
                  <p className="text-sm text-gray-400">Purchases</p>
                </div>
              </div>

              {/* Level Progress */}
              <div className="max-w-md mx-auto md:mx-0">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Level Progress</span>
                  <span className="text-white font-semibold">{levelProgress.current.toLocaleString()} / {levelProgress.required.toLocaleString()} XP</span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${levelProgress.percentage}%` }}
                    transition={{ duration: 1.5 }}
                    className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </motion.div>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center md:text-left">
                  {(levelProgress.required - levelProgress.current).toLocaleString()} XP to Level {level + 1}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300"
              >
                Edit Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-dark-700/50 border border-white/10 text-white font-semibold rounded-xl hover:bg-dark-600/50 transition-all duration-300"
              >
                <div className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat, index) => {
            const Icon = stat.icon;
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`bg-dark-800/50 backdrop-blur-sm border ${stat.borderColor} rounded-2xl p-6 hover:shadow-glow transition-all duration-300`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 ${stat.bgColor} border ${stat.borderColor} rounded-xl`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-1">
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
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => {
                      const Icon = activity.icon;
                      
                      return (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-4 p-4 bg-dark-700/30 rounded-xl hover:bg-dark-700/50 transition-colors"
                        >
                          <div className="p-3 bg-dark-600/50 rounded-xl">
                            <Icon className={`w-5 h-5 ${activity.color}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold">{activity.title}</h4>
                            <p className="text-gray-400 text-sm">{activity.description}</p>
                            <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">This Week</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Points Earned</span>
                      <span className="text-accent-400 font-semibold">+1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Items Purchased</span>
                      <span className="text-success-400 font-semibold">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Quests Completed</span>
                      <span className="text-brand-400 font-semibold">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Streams Watched</span>
                      <span className="text-warning-400 font-semibold">12</span>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Badges</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {achievements.slice(0, 6).map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        whileHover={{ scale: 1.1 }}
                        className="aspect-square bg-gradient-to-br from-brand-500/20 to-brand-600/20 border border-brand-500/30 rounded-xl flex items-center justify-center"
                      >
                        <Award className="w-6 h-6 text-brand-400" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:shadow-glow transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-brand-500/20 border border-brand-500/30 rounded-xl">
                      <Trophy className="w-6 h-6 text-brand-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{achievement.name}</h3>
                      <p className="text-sm text-gray-400">{achievement.rarity}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4">{achievement.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{achievement.earnedAt}</span>
                    <div className="flex items-center space-x-1 text-accent-400">
                      <Zap className="w-3 h-3" />
                      <span className="text-sm font-semibold">+{achievement.points}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;