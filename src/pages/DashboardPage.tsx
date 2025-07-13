import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Zap, 
  Target, 
  ShoppingBag, 
  TrendingUp, 
  Calendar,
  Star,
  Gift,
  Users,
  Award
} from 'lucide-react';
import { useUserStore } from '../store/userStore';

const DashboardPage: React.FC = () => {
  const { user, points, level, achievements } = useUserStore();

  const stats = [
    {
      icon: Zap,
      label: 'Total Points',
      value: points.toLocaleString(),
      change: '+1,234 this week',
      color: 'text-accent-400',
      bgColor: 'bg-accent-500/20',
    },
    {
      icon: Trophy,
      label: 'Current Level',
      value: level.toString(),
      change: '2,340 XP to next level',
      color: 'text-secondary-400',
      bgColor: 'bg-secondary-500/20',
    },
    {
      icon: Target,
      label: 'Quests Completed',
      value: '47',
      change: '3 active quests',
      color: 'text-primary-400',
      bgColor: 'bg-primary-500/20',
    },
    {
      icon: ShoppingBag,
      label: 'Items Purchased',
      value: '23',
      change: '$1,247 total spent',
      color: 'text-success-400',
      bgColor: 'bg-success-500/20',
    },
  ];

  const recentAchievements = [
    {
      id: 1,
      name: 'Shopping Spree',
      description: 'Purchase 10 items in one stream',
      icon: ShoppingBag,
      rarity: 'Epic',
      earnedAt: '2 days ago',
      points: 500,
    },
    {
      id: 2,
      name: 'Stream Supporter',
      description: 'Watch 50 hours of live streams',
      icon: Users,
      rarity: 'Rare',
      earnedAt: '1 week ago',
      points: 300,
    },
    {
      id: 3,
      name: 'Early Bird',
      description: 'Join 10 streams within first 5 minutes',
      icon: Calendar,
      rarity: 'Common',
      earnedAt: '2 weeks ago',
      points: 150,
    },
  ];

  const activeQuests = [
    {
      id: 1,
      title: 'Daily Shopper',
      description: 'Make a purchase today',
      progress: 0,
      target: 1,
      reward: 200,
      timeLeft: '18h 32m',
      type: 'daily',
    },
    {
      id: 2,
      title: 'Stream Watcher',
      description: 'Watch 2 hours of live streams',
      progress: 87,
      target: 120,
      reward: 350,
      timeLeft: '2d 14h',
      type: 'weekly',
    },
    {
      id: 3,
      title: 'Social Butterfly',
      description: 'Send 20 chat messages',
      progress: 14,
      target: 20,
      reward: 150,
      timeLeft: '5d 8h',
      type: 'weekly',
    },
  ];

  const weeklyProgress = [
    { day: 'Mon', points: 120 },
    { day: 'Tue', points: 340 },
    { day: 'Wed', points: 280 },
    { day: 'Thu', points: 450 },
    { day: 'Fri', points: 380 },
    { day: 'Sat', points: 520 },
    { day: 'Sun', points: 290 },
  ];

  const maxPoints = Math.max(...weeklyProgress.map(d => d.points));

  return (
    <div className="min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Track your progress and achievements</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{stat.change}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Weekly Progress</h2>
                <div className="flex items-center space-x-1 text-success-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">+23% this week</span>
                </div>
              </div>
              
              <div className="flex items-end justify-between h-48 space-x-2">
                {weeklyProgress.map((day, index) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.points / maxPoints) * 100}%` }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                      className="w-full bg-gradient-to-t from-primary-500 to-secondary-500 rounded-t-lg mb-2 min-h-[20px]"
                    />
                    <span className="text-xs text-gray-400 mb-1">{day.points}</span>
                    <span className="text-xs text-gray-500">{day.day}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Active Quests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Active Quests</h2>
                <button className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
                  View All →
                </button>
              </div>

              <div className="space-y-4">
                {activeQuests.map((quest, index) => (
                  <motion.div
                    key={quest.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gray-700/30 rounded-xl border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{quest.title}</h3>
                        <p className="text-sm text-gray-400">{quest.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-accent-400 mb-1">
                          <Zap className="w-4 h-4" />
                          <span className="text-sm font-semibold">{quest.reward}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          quest.type === 'daily' 
                            ? 'bg-accent-500/20 text-accent-400'
                            : 'bg-primary-500/20 text-primary-400'
                        }`}>
                          {quest.type}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          Progress: {quest.progress}/{quest.target}
                        </span>
                        <span className="text-gray-400">
                          {quest.timeLeft} left
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(quest.progress / quest.target) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Level Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6">Level Progress</h2>
              
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{level}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Level {level}</h3>
                <p className="text-sm text-gray-400">Shopping Enthusiast</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">XP Progress</span>
                  <span className="text-white font-medium">7,660 / 10,000</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '76.6%' }}
                    transition={{ duration: 1.5 }}
                    className="bg-gradient-to-r from-secondary-500 to-secondary-600 h-3 rounded-full"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center">
                  2,340 XP needed for Level {level + 1}
                </p>
              </div>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Recent Achievements</h2>
                <button className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
                  View All →
                </button>
              </div>

              <div className="space-y-4">
                {recentAchievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg border border-white/10"
                    >
                      <div className={`p-2 rounded-lg ${
                        achievement.rarity === 'Epic' ? 'bg-secondary-500/20' :
                        achievement.rarity === 'Rare' ? 'bg-primary-500/20' :
                        'bg-gray-500/20'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          achievement.rarity === 'Epic' ? 'text-secondary-400' :
                          achievement.rarity === 'Rare' ? 'text-primary-400' :
                          'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-sm font-semibold text-white">{achievement.name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            achievement.rarity === 'Epic' ? 'bg-secondary-500/20 text-secondary-400' :
                            achievement.rarity === 'Rare' ? 'bg-primary-500/20 text-primary-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {achievement.rarity}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mb-1">{achievement.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{achievement.earnedAt}</span>
                          <div className="flex items-center space-x-1 text-accent-400">
                            <Zap className="w-3 h-3" />
                            <span className="text-xs font-semibold">+{achievement.points}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;