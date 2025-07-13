import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Crown, 
  Zap, 
  Target, 
  Gift,
  Flame,
  Award,
  Medal,
  Sparkles,
  TrendingUp,
  Calendar,
  Clock,
  Users
} from 'lucide-react';

interface Season {
  id: string;
  name: string;
  theme: string;
  startDate: string;
  endDate: string;
  rewards: SeasonReward[];
  currentTier: number;
  maxTier: number;
}

interface SeasonReward {
  tier: number;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
}

interface Challenge {
  id: string;
  name: string;
  description: string;
  type: 'time_limited' | 'community' | 'personal';
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  progress: number;
  target: number;
  reward: number;
  timeLeft?: string;
  participants?: number;
  completed: boolean;
}

const AdvancedGamification: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'season' | 'challenges' | 'achievements'>('season');
  const [currentSeason, setCurrentSeason] = useState<Season | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userStreak, setUserStreak] = useState(7);
  const [weeklyXP, setWeeklyXP] = useState(2340);

  useEffect(() => {
    // Load gamification data
    loadSeasonData();
    loadChallenges();
  }, []);

  const loadSeasonData = () => {
    const mockSeason: Season = {
      id: 'season-3',
      name: 'Holiday Shopping Extravaganza',
      theme: 'winter',
      startDate: '2024-11-01',
      endDate: '2024-12-31',
      currentTier: 7,
      maxTier: 20,
      rewards: [
        {
          tier: 1,
          name: 'Festive Badge',
          description: 'Show your holiday spirit',
          icon: 'star',
          rarity: 'common',
          unlocked: true,
        },
        {
          tier: 5,
          name: 'Snow Globe Avatar Frame',
          description: 'Magical winter frame',
          icon: 'crown',
          rarity: 'rare',
          unlocked: true,
        },
        {
          tier: 10,
          name: 'Holiday Shopping Spree',
          description: '$50 shopping credit',
          icon: 'gift',
          rarity: 'epic',
          unlocked: false,
        },
        {
          tier: 20,
          name: 'Legendary Santa Crown',
          description: 'Ultimate holiday prestige',
          icon: 'crown',
          rarity: 'legendary',
          unlocked: false,
        },
      ],
    };
    setCurrentSeason(mockSeason);
  };

  const loadChallenges = () => {
    const mockChallenges: Challenge[] = [
      {
        id: 'black-friday-rush',
        name: 'Black Friday Rush',
        description: 'Purchase 5 items during Black Friday weekend',
        type: 'time_limited',
        difficulty: 'medium',
        progress: 2,
        target: 5,
        reward: 1000,
        timeLeft: '2d 14h 32m',
        completed: false,
      },
      {
        id: 'community-goal',
        name: 'Community Shopping Goal',
        description: 'Help the community reach 10,000 purchases',
        type: 'community',
        difficulty: 'hard',
        progress: 7834,
        target: 10000,
        reward: 500,
        participants: 15420,
        completed: false,
      },
      {
        id: 'stream-marathon',
        name: 'Stream Marathon',
        description: 'Watch 20 hours of streams this week',
        type: 'personal',
        difficulty: 'hard',
        progress: 14.5,
        target: 20,
        reward: 750,
        completed: false,
      },
    ];
    setChallenges(mockChallenges);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-success-400 bg-success-500/20';
      case 'medium': return 'text-warning-400 bg-warning-500/20';
      case 'hard': return 'text-error-400 bg-error-500/20';
      case 'extreme': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-500/30';
      case 'rare': return 'text-brand-400 border-brand-500/30';
      case 'epic': return 'text-accent-400 border-accent-500/30';
      case 'legendary': return 'text-warning-400 border-warning-500/30';
      default: return 'text-gray-400 border-gray-500/30';
    }
  };

  const tabs = [
    { id: 'season', label: 'Season Pass', icon: Crown },
    { id: 'challenges', label: 'Challenges', icon: Target },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
  ];

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-error-500/20 rounded-xl">
              <Flame className="w-6 h-6 text-error-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{userStreak}</p>
              <p className="text-sm text-gray-400">Day Streak</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-brand-500/20 rounded-xl">
              <Zap className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{weeklyXP.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Weekly XP</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-warning-500/20 rounded-xl">
              <Crown className="w-6 h-6 text-warning-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{currentSeason?.currentTier || 0}</p>
              <p className="text-sm text-gray-400">Season Tier</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-success-500/20 rounded-xl">
              <Target className="w-6 h-6 text-success-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{challenges.filter(c => c.completed).length}</p>
              <p className="text-sm text-gray-400">Challenges Done</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
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

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'season' && currentSeason && (
            <div className="space-y-6">
              {/* Season Header */}
              <div className="bg-gradient-to-r from-warning-500/20 to-brand-500/20 rounded-2xl p-6 border border-warning-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{currentSeason.name}</h2>
                    <p className="text-gray-400">Tier {currentSeason.currentTier} / {currentSeason.maxTier}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Season ends in</p>
                    <p className="text-lg font-bold text-warning-400">23 days</p>
                  </div>
                </div>
                
                <div className="w-full bg-dark-700 rounded-full h-4 mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentSeason.currentTier / currentSeason.maxTier) * 100}%` }}
                    transition={{ duration: 1.5 }}
                    className="h-full bg-gradient-to-r from-warning-500 to-warning-600 rounded-full relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </motion.div>
                </div>
              </div>

              {/* Season Rewards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentSeason.rewards.map((reward, index) => (
                  <motion.div
                    key={reward.tier}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                      reward.unlocked
                        ? `${getRarityColor(reward.rarity)} bg-gradient-to-br from-${reward.rarity === 'legendary' ? 'warning' : reward.rarity === 'epic' ? 'accent' : reward.rarity === 'rare' ? 'brand' : 'gray'}-500/10 to-transparent`
                        : 'border-gray-600/30 bg-gray-800/30 opacity-60'
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-dark-700 rounded-2xl flex items-center justify-center">
                        {reward.unlocked ? (
                          <Crown className={`w-8 h-8 ${getRarityColor(reward.rarity).split(' ')[0]}`} />
                        ) : (
                          <div className="w-8 h-8 bg-gray-600 rounded-lg" />
                        )}
                      </div>
                      
                      <h3 className="text-white font-bold mb-2">{reward.name}</h3>
                      <p className="text-gray-400 text-sm mb-3">{reward.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-500">Tier {reward.tier}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(reward.rarity).split(' ')[1]} ${getRarityColor(reward.rarity).split(' ')[0]}`}>
                          {reward.rarity.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {reward.unlocked && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center"
                      >
                        <Star className="w-3 h-3 text-white fill-current" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-6">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-dark-800/50 backdrop-blur-sm border rounded-2xl p-6 ${
                    challenge.completed
                      ? 'border-success-500/50 bg-success-500/5'
                      : 'border-white/10 hover:border-brand-500/50'
                  } transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${
                        challenge.type === 'time_limited' ? 'bg-error-500/20' :
                        challenge.type === 'community' ? 'bg-brand-500/20' :
                        'bg-success-500/20'
                      }`}>
                        {challenge.type === 'time_limited' && <Clock className="w-6 h-6 text-error-400" />}
                        {challenge.type === 'community' && <Users className="w-6 h-6 text-brand-400" />}
                        {challenge.type === 'personal' && <Target className="w-6 h-6 text-success-400" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{challenge.name}</h3>
                        <p className="text-gray-400">{challenge.description}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty.toUpperCase()}
                        </span>
                        <div className="flex items-center space-x-1 text-accent-400">
                          <Zap className="w-4 h-4" />
                          <span className="font-bold">{challenge.reward}</span>
                        </div>
                      </div>
                      
                      {challenge.timeLeft && (
                        <p className="text-xs text-warning-400">{challenge.timeLeft} left</p>
                      )}
                      
                      {challenge.participants && (
                        <p className="text-xs text-gray-400">{challenge.participants.toLocaleString()} participants</p>
                      )}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        Progress: {challenge.progress.toLocaleString()}/{challenge.target.toLocaleString()}
                      </span>
                      <span className="text-white font-semibold">
                        {Math.round((challenge.progress / challenge.target) * 100)}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-dark-700 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className={`h-full rounded-full ${
                          challenge.completed
                            ? 'bg-success-500'
                            : 'bg-gradient-to-r from-brand-500 to-brand-600'
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Achievement System</h3>
              <p className="text-gray-400">Advanced achievement tracking coming soon!</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AdvancedGamification;