import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Crown, Zap, Gift, Target } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt?: string;
  points: number;
  progress?: number;
  maxProgress?: number;
}

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
  onClick?: () => void;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  size = 'md',
  showProgress = false,
  onClick
}) => {
  const rarityStyles = {
    common: {
      bg: 'bg-gray-500/20',
      border: 'border-gray-500/30',
      text: 'text-gray-400',
      glow: 'shadow-gray-500/20',
    },
    rare: {
      bg: 'bg-brand-500/20',
      border: 'border-brand-500/30',
      text: 'text-brand-400',
      glow: 'shadow-brand-500/20',
    },
    epic: {
      bg: 'bg-accent-500/20',
      border: 'border-accent-500/30',
      text: 'text-accent-400',
      glow: 'shadow-accent-500/20',
    },
    legendary: {
      bg: 'bg-warning-500/20',
      border: 'border-warning-500/30',
      text: 'text-warning-400',
      glow: 'shadow-warning-500/20',
    },
  };

  const sizeStyles = {
    sm: {
      container: 'w-16 h-16',
      icon: 'w-6 h-6',
      text: 'text-xs',
    },
    md: {
      container: 'w-20 h-20',
      icon: 'w-8 h-8',
      text: 'text-sm',
    },
    lg: {
      container: 'w-24 h-24',
      icon: 'w-10 h-10',
      text: 'text-base',
    },
  };

  const iconMap = {
    trophy: Trophy,
    star: Star,
    crown: Crown,
    zap: Zap,
    gift: Gift,
    target: Target,
  };

  const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Trophy;
  const rarityStyle = rarityStyles[achievement.rarity];
  const sizeStyle = sizeStyles[size];
  const isEarned = !!achievement.earnedAt;
  const progress = achievement.progress || 0;
  const maxProgress = achievement.maxProgress || 100;
  const progressPercentage = (progress / maxProgress) * 100;

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative ${onClick ? 'cursor-pointer' : ''} group`}
    >
      {/* Badge Container */}
      <div
        className={`
          ${sizeStyle.container} 
          ${rarityStyle.bg} 
          border-2 ${rarityStyle.border} 
          rounded-2xl 
          flex items-center justify-center 
          transition-all duration-300
          ${isEarned ? `shadow-lg ${rarityStyle.glow}` : 'opacity-50 grayscale'}
          ${onClick ? 'hover:shadow-xl' : ''}
        `}
      >
        <IconComponent className={`${sizeStyle.icon} ${rarityStyle.text}`} />
        
        {/* Rarity Indicator */}
        <div className={`absolute -top-1 -right-1 w-4 h-4 ${rarityStyle.bg} border ${rarityStyle.border} rounded-full flex items-center justify-center`}>
          <div className={`w-2 h-2 ${rarityStyle.text.replace('text-', 'bg-')} rounded-full`} />
        </div>
      </div>

      {/* Progress Ring (for unearned achievements) */}
      {showProgress && !isEarned && achievement.progress !== undefined && (
        <svg className={`absolute inset-0 ${sizeStyle.container} transform -rotate-90`}>
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-700"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45} ${2 * Math.PI * 45}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - progressPercentage / 100) }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={rarityStyle.text}
          />
        </svg>
      )}

      {/* Earned Indicator */}
      {isEarned && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="absolute -bottom-1 -right-1 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center border-2 border-dark-800"
        >
          <Star className="w-3 h-3 text-white fill-current" />
        </motion.div>
      )}

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
        <div className="bg-dark-800/95 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-premium min-w-max max-w-xs">
          <h4 className={`font-bold ${rarityStyle.text} ${sizeStyle.text}`}>
            {achievement.name}
          </h4>
          <p className="text-gray-400 text-xs mt-1">
            {achievement.description}
          </p>
          
          {showProgress && !isEarned && achievement.progress !== undefined && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Progress</span>
                <span>{progress}/{maxProgress}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div 
                  className={`h-1 rounded-full ${rarityStyle.text.replace('text-', 'bg-')}`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-2">
            <span className={`text-xs font-semibold ${rarityStyle.text}`}>
              {achievement.rarity.toUpperCase()}
            </span>
            <div className="flex items-center space-x-1 text-accent-400">
              <Zap className="w-3 h-3" />
              <span className="text-xs font-semibold">+{achievement.points}</span>
            </div>
          </div>
          
          {isEarned && achievement.earnedAt && (
            <p className="text-xs text-gray-500 mt-1">
              Earned {achievement.earnedAt}
            </p>
          )}
        </div>
      </div>

      {/* Sparkle Animation for Legendary */}
      {achievement.rarity === 'legendary' && isEarned && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                repeatDelay: 2,
              }}
              className="absolute top-0 left-0 w-2 h-2 bg-warning-400 rounded-full"
              style={{
                left: `${25 + (i * 25)}%`,
                top: `${25 + ((i % 2) * 50)}%`,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AchievementBadge;