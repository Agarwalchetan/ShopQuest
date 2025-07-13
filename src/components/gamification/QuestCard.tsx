import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Zap, 
  Clock, 
  CheckCircle, 
  Star,
  Gift,
  Trophy,
  Calendar
} from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special' | 'achievement';
  progress: number;
  target: number;
  reward: number;
  timeLeft?: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  completed: boolean;
  icon?: React.ComponentType<any>;
}

interface QuestCardProps {
  quest: Quest;
  onClaim?: (questId: string) => void;
  onStart?: (questId: string) => void;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest, onClaim, onStart }) => {
  const difficultyColors = {
    easy: {
      bg: 'bg-success-500/20',
      border: 'border-success-500/30',
      text: 'text-success-400',
    },
    medium: {
      bg: 'bg-warning-500/20',
      border: 'border-warning-500/30',
      text: 'text-warning-400',
    },
    hard: {
      bg: 'bg-error-500/20',
      border: 'border-error-500/30',
      text: 'text-error-400',
    },
    legendary: {
      bg: 'bg-brand-500/20',
      border: 'border-brand-500/30',
      text: 'text-brand-400',
    },
  };

  const typeIcons = {
    daily: Calendar,
    weekly: Target,
    special: Star,
    achievement: Trophy,
  };

  const progressPercentage = Math.min((quest.progress / quest.target) * 100, 100);
  const Icon = quest.icon || typeIcons[quest.type];
  const difficultyStyle = difficultyColors[quest.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative bg-dark-800/50 backdrop-blur-sm border rounded-2xl p-6 transition-all duration-500 overflow-hidden ${
        quest.completed 
          ? 'border-success-500/50 bg-success-500/5 shadow-glow' 
          : 'border-white/10 hover:border-brand-500/50 hover:shadow-glow'
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-500 to-transparent rounded-full transform translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent-500 to-transparent rounded-full transform -translate-x-12 translate-y-12" />
      </div>

      {/* Quest Type Badge */}
      <div className="absolute top-4 right-4">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${difficultyStyle.bg} ${difficultyStyle.border} ${difficultyStyle.text} border`}>
          {quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}
        </span>
      </div>

      {/* Completion Badge */}
      {quest.completed && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="absolute top-4 left-4 w-8 h-8 bg-success-500 rounded-full flex items-center justify-center"
        >
          <CheckCircle className="w-5 h-5 text-white" />
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start space-x-4 mb-4">
          <div className={`p-3 rounded-xl ${
            quest.completed 
              ? 'bg-success-500/20 border border-success-500/30' 
              : 'bg-brand-500/20 border border-brand-500/30'
          }`}>
            {quest.completed ? (
              <CheckCircle className="w-6 h-6 text-success-400" />
            ) : (
              <Icon className="w-6 h-6 text-brand-400" />
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1">{quest.title}</h3>
            <p className="text-gray-400 text-sm">{quest.description}</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">
              Progress: {quest.progress}/{quest.target}
            </span>
            <span className="text-white font-semibold">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          
          <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full relative overflow-hidden ${
                quest.completed
                  ? 'bg-gradient-to-r from-success-500 to-success-600'
                  : 'bg-gradient-to-r from-brand-500 to-brand-600'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </motion.div>
          </div>
        </div>

        {/* Reward & Time */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-accent-400">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-bold">{quest.reward}</span>
            </div>
            <span className="text-xs text-gray-500">points</span>
          </div>
          
          {quest.timeLeft && !quest.completed && (
            <div className="flex items-center space-x-1 text-warning-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{quest.timeLeft}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (quest.completed) {
              onClaim?.(quest.id);
            } else {
              onStart?.(quest.id);
            }
          }}
          disabled={quest.completed && !onClaim}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
            quest.completed
              ? onClaim
                ? 'bg-gradient-to-r from-success-500 to-success-600 text-white hover:from-success-600 hover:to-success-700 shadow-glow'
                : 'bg-success-500/20 text-success-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-brand-500 to-brand-600 text-white hover:from-brand-600 hover:to-brand-700 shadow-glow hover:shadow-glow-lg'
          }`}
        >
          {quest.completed ? (onClaim ? 'Claim Reward' : 'Completed') : 'Start Quest'}
        </motion.button>
      </div>

      {/* Sparkle Effect for Completed Quests */}
      {quest.completed && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                repeatDelay: 3,
              }}
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-accent-400 rounded-full"
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default QuestCard;