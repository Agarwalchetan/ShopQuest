import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Medal, 
  Award, 
  Crown, 
  TrendingUp, 
  Calendar,
  Zap,
  Star,
  Users,
  ShoppingBag
} from 'lucide-react';

const LeaderboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'points' | 'purchases' | 'streaming'>('points');

  const pointsLeaderboard = [
    {
      rank: 1,
      user: 'ShopMaster Pro',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      points: 45230,
      level: 28,
      badge: 'Legendary Shopper',
      change: '+1,234',
    },
    {
      rank: 2,
      user: 'StreamQueen Sarah',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
      points: 42180,
      level: 26,
      badge: 'Elite Buyer',
      change: '+987',
    },
    {
      rank: 3,
      user: 'TechGuru Mike',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
      points: 38950,
      level: 24,
      badge: 'Gadget Hunter',
      change: '+756',
    },
    {
      rank: 4,
      user: 'FashionFanatic',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100',
      points: 35670,
      level: 22,
      badge: 'Style Icon',
      change: '+623',
    },
    {
      rank: 5,
      user: 'HomeDesignPro',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      points: 32450,
      level: 21,
      badge: 'Interior Expert',
      change: '+445',
    },
    {
      rank: 6,
      user: 'You',
      avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100',
      points: 28340,
      level: 18,
      badge: 'Rising Star',
      change: '+234',
      isCurrentUser: true,
    },
  ];

  const purchasesLeaderboard = [
    {
      rank: 1,
      user: 'ShopMaster Pro',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      purchases: 156,
      totalSpent: 12450,
      badge: 'Big Spender',
    },
    {
      rank: 2,
      user: 'FashionFanatic',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100',
      purchases: 134,
      totalSpent: 9870,
      badge: 'Fashion Forward',
    },
    {
      rank: 3,
      user: 'TechGuru Mike',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
      purchases: 98,
      totalSpent: 15600,
      badge: 'Tech Collector',
    },
  ];

  const streamingLeaderboard = [
    {
      rank: 1,
      user: 'StreamQueen Sarah',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
      hoursWatched: 247,
      streamsJoined: 89,
      badge: 'Stream Addict',
    },
    {
      rank: 2,
      user: 'ShopMaster Pro',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      hoursWatched: 198,
      streamsJoined: 76,
      badge: 'Loyal Viewer',
    },
    {
      rank: 3,
      user: 'TechGuru Mike',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
      hoursWatched: 156,
      streamsJoined: 54,
      badge: 'Tech Enthusiast',
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
      case 2:
        return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30';
      case 3:
        return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30';
      default:
        return 'bg-gray-800/50 border-white/10';
    }
  };

  const tabs = [
    { id: 'points', label: 'Points', icon: Zap },
    { id: 'purchases', label: 'Purchases', icon: ShoppingBag },
    { id: 'streaming', label: 'Streaming', icon: Users },
  ];

  const getCurrentLeaderboard = () => {
    switch (activeTab) {
      case 'points':
        return pointsLeaderboard;
      case 'purchases':
        return purchasesLeaderboard;
      case 'streaming':
        return streamingLeaderboard;
      default:
        return pointsLeaderboard;
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
          <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
          <p className="text-gray-400">See how you rank against other ShopQuest users</p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Trophy className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">#6</p>
                <p className="text-sm text-gray-400">Your Rank</p>
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
              <div className="p-3 bg-primary-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">+3</p>
                <p className="text-sm text-gray-400">Rank Change</p>
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
              <div className="p-3 bg-accent-500/20 rounded-lg">
                <Zap className="w-6 h-6 text-accent-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">28,340</p>
                <p className="text-sm text-gray-400">Total Points</p>
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
              <div className="p-3 bg-secondary-500/20 rounded-lg">
                <Star className="w-6 h-6 text-secondary-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">18</p>
                <p className="text-sm text-gray-400">Current Level</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Leaderboard Tabs */}
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

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getCurrentLeaderboard().slice(0, 3).map((user, index) => {
              const actualRank = user.rank;
              const podiumOrder = actualRank === 1 ? 1 : actualRank === 2 ? 0 : 2; // 2nd, 1st, 3rd visual order
              
              return (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + podiumOrder * 0.1 }}
                  className={`relative ${getRankBg(actualRank)} backdrop-blur-sm border rounded-xl p-6 text-center ${
                    actualRank === 1 ? 'md:order-2 transform md:scale-110' : 
                    actualRank === 2 ? 'md:order-1' : 'md:order-3'
                  }`}
                >
                  {/* Rank Icon */}
                  <div className="flex justify-center mb-4">
                    {getRankIcon(actualRank)}
                  </div>

                  {/* Avatar */}
                  <div className="relative mb-4">
                    <img
                      src={user.avatar}
                      alt={user.user}
                      className="w-20 h-20 rounded-full mx-auto border-4 border-white/20"
                    />
                    {actualRank === 1 && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Crown className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <h3 className="text-lg font-bold text-white mb-1">{user.user}</h3>
                  <p className="text-sm text-gray-400 mb-3">{user.badge}</p>

                  {/* Stats */}
                  {activeTab === 'points' && (
                    <div>
                      <p className="text-2xl font-bold text-accent-400 mb-1">
                        {user.points?.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-400">Points</p>
                      <div className="flex items-center justify-center space-x-1 mt-2 text-success-400">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-xs">{user.change}</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'purchases' && (
                    <div>
                      <p className="text-2xl font-bold text-accent-400 mb-1">
                        {user.purchases}
                      </p>
                      <p className="text-sm text-gray-400">Purchases</p>
                      <p className="text-xs text-gray-500 mt-1">
                        ${user.totalSpent?.toLocaleString()} spent
                      </p>
                    </div>
                  )}

                  {activeTab === 'streaming' && (
                    <div>
                      <p className="text-2xl font-bold text-accent-400 mb-1">
                        {user.hoursWatched}h
                      </p>
                      <p className="text-sm text-gray-400">Hours Watched</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {user.streamsJoined} streams joined
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Full Rankings</h2>
          </div>

          <div className="divide-y divide-white/10">
            {getCurrentLeaderboard().map((user, index) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 hover:bg-white/5 transition-colors ${
                  user.isCurrentUser ? 'bg-primary-500/10 border-l-4 border-primary-500' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className="w-12 flex justify-center">
                    {getRankIcon(user.rank)}
                  </div>

                  {/* Avatar */}
                  <img
                    src={user.avatar}
                    alt={user.user}
                    className="w-12 h-12 rounded-full border-2 border-white/20"
                  />

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className={`font-semibold ${
                        user.isCurrentUser ? 'text-primary-400' : 'text-white'
                      }`}>
                        {user.user}
                      </h3>
                      {user.isCurrentUser && (
                        <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-1 rounded-full">
                          You
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{user.badge}</p>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    {activeTab === 'points' && (
                      <>
                        <p className="text-lg font-bold text-accent-400">
                          {user.points?.toLocaleString()}
                        </p>
                        <div className="flex items-center space-x-1 text-success-400">
                          <TrendingUp className="w-3 h-3" />
                          <span className="text-xs">{user.change}</span>
                        </div>
                      </>
                    )}

                    {activeTab === 'purchases' && (
                      <>
                        <p className="text-lg font-bold text-accent-400">
                          {user.purchases} items
                        </p>
                        <p className="text-xs text-gray-400">
                          ${user.totalSpent?.toLocaleString()}
                        </p>
                      </>
                    )}

                    {activeTab === 'streaming' && (
                      <>
                        <p className="text-lg font-bold text-accent-400">
                          {user.hoursWatched}h
                        </p>
                        <p className="text-xs text-gray-400">
                          {user.streamsJoined} streams
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Season Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 bg-gradient-to-r from-secondary-500/20 to-primary-500/20 rounded-xl p-6 border border-secondary-500/30"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-secondary-500/20 rounded-lg">
              <Calendar className="w-5 h-5 text-secondary-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Season 3: Holiday Shopping</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div>
              <h4 className="font-semibold text-white mb-2">Season Rewards</h4>
              <p>Top 10 players receive exclusive badges and bonus points at season end.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Time Remaining</h4>
              <p>Season ends in 23 days. Keep climbing to secure your position!</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Special Events</h4>
              <p>Double points weekends and bonus challenges throughout the season.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeaderboardPage;