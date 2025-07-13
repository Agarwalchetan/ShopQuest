import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Zap, 
  Calendar, 
  Clock, 
  Trophy, 
  Star,
  Gift,
  ShoppingBag,
  Users,
  Play,
  CheckCircle
} from 'lucide-react';

const QuestsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'special'>('daily');

  const dailyQuests = [
    {
      id: 1,
      title: 'Daily Login',
      description: 'Log in to ShopQuest',
      progress: 1,
      target: 1,
      reward: 50,
      completed: true,
      icon: Calendar,
      difficulty: 'Easy',
    },
    {
      id: 2,
      title: 'Stream Watcher',
      description: 'Watch a live stream for 30 minutes',
      progress: 22,
      target: 30,
      reward: 200,
      completed: false,
      icon: Play,
      difficulty: 'Easy',
    },
    {
      id: 3,
      title: 'Social Shopper',
      description: 'Make a purchase during a live stream',
      progress: 0,
      target: 1,
      reward: 300,
      completed: false,
      icon: ShoppingBag,
      difficulty: 'Medium',
    },
    {
      id: 4,
      title: 'Chat Participant',
      description: 'Send 10 messages in live chat',
      progress: 7,
      target: 10,
      reward: 150,
      completed: false,
      icon: Users,
      difficulty: 'Easy',
    },
  ];

  const weeklyQuests = [
    {
      id: 5,
      title: 'Shopping Spree',
      description: 'Purchase 5 different items',
      progress: 2,
      target: 5,
      reward: 1000,
      completed: false,
      icon: ShoppingBag,
      difficulty: 'Hard',
    },
    {
      id: 6,
      title: 'Stream Supporter',
      description: 'Watch 10 hours of live streams',
      progress: 6.5,
      target: 10,
      reward: 750,
      completed: false,
      icon: Play,
      difficulty: 'Medium',
    },
    {
      id: 7,
      title: 'Gift Giver',
      description: 'Send 5 gifts to streamers',
      progress: 3,
      target: 5,
      reward: 500,
      completed: false,
      icon: Gift,
      difficulty: 'Medium',
    },
  ];

  const specialQuests = [
    {
      id: 8,
      title: 'Black Friday Hunter',
      description: 'Purchase items worth $500 during Black Friday',
      progress: 247,
      target: 500,
      reward: 2500,
      completed: false,
      icon: Star,
      difficulty: 'Legendary',
      timeLeft: '2d 14h 32m',
    },
    {
      id: 9,
      title: 'Early Bird Special',
      description: 'Join 3 streams within the first 5 minutes',
      progress: 1,
      target: 3,
      reward: 800,
      completed: false,
      icon: Clock,
      difficulty: 'Hard',
      timeLeft: '6d 8h 15m',
    },
  ];

  const getQuestsByTab = () => {
    switch (activeTab) {
      case 'daily':
        return dailyQuests;
      case 'weekly':
        return weeklyQuests;
      case 'special':
        return specialQuests;
      default:
        return dailyQuests;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-success-500/20 text-success-400';
      case 'Medium':
        return 'bg-warning-500/20 text-warning-400';
      case 'Hard':
        return 'bg-error-500/20 text-error-400';
      case 'Legendary':
        return 'bg-secondary-500/20 text-secondary-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const tabs = [
    { id: 'daily', label: 'Daily', icon: Calendar },
    { id: 'weekly', label: 'Weekly', icon: Target },
    { id: 'special', label: 'Special', icon: Star },
  ];

  return (
    <div className="min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Quests</h1>
          <p className="text-gray-400">Complete quests to earn points and unlock achievements</p>
        </motion.div>

        {/* Quest Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary-500/20 rounded-lg">
                <Target className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">47</p>
                <p className="text-sm text-gray-400">Completed</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-accent-500/20 rounded-lg">
                <Zap className="w-6 h-6 text-accent-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">12,450</p>
                <p className="text-sm text-gray-400">Points Earned</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-secondary-500/20 rounded-lg">
                <Trophy className="w-6 h-6 text-secondary-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">8</p>
                <p className="text-sm text-gray-400">Active Quests</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-success-500/20 rounded-lg">
                <Calendar className="w-6 h-6 text-success-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">7</p>
                <p className="text-sm text-gray-400">Day Streak</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quest Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Quest List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {getQuestsByTab().map((quest, index) => {
            const Icon = quest.icon;
            const progressPercentage = (quest.progress / quest.target) * 100;
            
            return (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gray-800/50 backdrop-blur-sm border rounded-xl p-6 ${
                  quest.completed 
                    ? 'border-success-500/50 bg-success-500/5' 
                    : 'border-white/10 hover:border-primary-500/50'
                } transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${
                      quest.completed 
                        ? 'bg-success-500/20' 
                        : 'bg-primary-500/20'
                    }`}>
                      {quest.completed ? (
                        <CheckCircle className="w-6 h-6 text-success-400" />
                      ) : (
                        <Icon className="w-6 h-6 text-primary-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{quest.title}</h3>
                      <p className="text-sm text-gray-400">{quest.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-accent-400 mb-2">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm font-semibold">{quest.reward}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(quest.difficulty)}`}>
                      {quest.difficulty}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      Progress: {quest.progress}/{quest.target}
                    </span>
                    <span className="text-white font-medium">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-2 rounded-full ${
                        quest.completed
                          ? 'bg-success-500'
                          : 'bg-gradient-to-r from-primary-500 to-secondary-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Special Quest Timer */}
                {'timeLeft' in quest && quest.timeLeft && (
                  <div className="flex items-center space-x-2 mb-4 p-2 bg-warning-500/10 rounded-lg border border-warning-500/20">
                    <Clock className="w-4 h-4 text-warning-400" />
                    <span className="text-sm text-warning-400 font-medium">
                      Time left: {quest.timeLeft}
                    </span>
                  </div>
                )}

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={quest.completed}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                    quest.completed
                      ? 'bg-success-500/20 text-success-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700'
                  }`}
                >
                  {quest.completed ? 'Completed' : 'Start Quest'}
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Quest Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl p-6 border border-primary-500/30"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-primary-500/20 rounded-lg">
              <Trophy className="w-5 h-5 text-primary-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Quest Tips</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div>
              <h4 className="font-semibold text-white mb-2">Daily Quests</h4>
              <p>Reset every day at midnight. Complete them for consistent point gains and streak bonuses.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Weekly Quests</h4>
              <p>More challenging but offer higher rewards. Plan your shopping and streaming activities accordingly.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Special Events</h4>
              <p>Limited-time quests with exclusive rewards. Keep an eye on announcements for new events!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuestsPage;