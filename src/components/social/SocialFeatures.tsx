import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  UserMinus, 
  Share2, 
  Heart, 
  MessageCircle,
  Trophy,
  Star,
  Crown,
  Gift,
  Eye,
  TrendingUp
} from 'lucide-react';
import { backendService, User } from '../../services/backend';
import { useToast } from '../../hooks/useToast';

interface SocialFeaturesProps {
  userId?: string;
  showFollowButton?: boolean;
  compact?: boolean;
}

const SocialFeatures: React.FC<SocialFeaturesProps> = ({
  userId,
  showFollowButton = true,
  compact = false
}) => {
  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>('followers');
  const { success, error } = useToast();

  useEffect(() => {
    loadSocialData();
  }, [userId]);

  const loadSocialData = async () => {
    try {
      setIsLoading(true);
      const [followersData, followingData] = await Promise.all([
        backendService.getFollowers(userId),
        backendService.getFollowing(userId)
      ]);
      
      setFollowers(followersData);
      setFollowing(followingData);
    } catch (err) {
      error('Failed to load social data', 'Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollow = async () => {
    if (!userId) return;
    
    try {
      if (isFollowing) {
        await backendService.unfollowUser(userId);
        setIsFollowing(false);
        success('Unfollowed successfully');
      } else {
        await backendService.followUser(userId);
        setIsFollowing(true);
        success('Following successfully');
      }
      loadSocialData();
    } catch (err) {
      error('Failed to update follow status', 'Please try again.');
    }
  };

  const shareProfile = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this ShopQuest profile!',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        success('Profile link copied to clipboard!');
      }
    } catch (err) {
      error('Failed to share profile', 'Please try again.');
    }
  };

  if (compact) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-gray-400">
          <Users className="w-4 h-4" />
          <span className="text-sm">{followers.length} followers</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <UserPlus className="w-4 h-4" />
          <span className="text-sm">{following.length} following</span>
        </div>
        {showFollowButton && userId && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFollow}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              isFollowing
                ? 'bg-gray-600 text-white hover:bg-gray-700'
                : 'bg-gradient-to-r from-brand-500 to-brand-600 text-white hover:from-brand-600 hover:to-brand-700 shadow-glow'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </motion.button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-premium">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">Social</h3>
        <div className="flex items-center space-x-2">
          {showFollowButton && userId && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFollow}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                isFollowing
                  ? 'bg-gray-600 text-white hover:bg-gray-700'
                  : 'bg-gradient-to-r from-brand-500 to-brand-600 text-white hover:from-brand-600 hover:to-brand-700 shadow-glow'
              }`}
            >
              {isFollowing ? (
                <div className="flex items-center space-x-2">
                  <UserMinus className="w-4 h-4" />
                  <span>Following</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <UserPlus className="w-4 h-4" />
                  <span>Follow</span>
                </div>
              )}
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={shareProfile}
            className="p-2 bg-dark-700/50 border border-white/10 text-gray-400 hover:text-white rounded-lg transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-dark-700/30 rounded-xl">
          <p className="text-2xl font-bold text-white">{followers.length}</p>
          <p className="text-sm text-gray-400">Followers</p>
        </div>
        <div className="text-center p-4 bg-dark-700/30 rounded-xl">
          <p className="text-2xl font-bold text-white">{following.length}</p>
          <p className="text-sm text-gray-400">Following</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-dark-700/50 rounded-xl p-1 mb-4">
        <button
          onClick={() => setActiveTab('followers')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'followers'
              ? 'bg-brand-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Followers
        </button>
        <button
          onClick={() => setActiveTab('following')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'following'
              ? 'bg-brand-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Following
        </button>
      </div>

      {/* User List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center space-x-3 p-3 bg-dark-700/30 rounded-xl">
                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {(activeTab === 'followers' ? followers : following).map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center space-x-3 p-3 bg-dark-700/30 rounded-xl hover:bg-dark-700/50 transition-colors cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full border border-brand-500/50"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-500 rounded-full flex items-center justify-center border border-dark-800">
                      <span className="text-xs text-white font-bold">{user.level}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-white font-medium truncate">{user.username}</p>
                      {user.level >= 20 && (
                        <Crown className="w-3 h-3 text-warning-400" />
                      )}
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Trophy className="w-3 h-3" />
                        <span>{user.points.toLocaleString()} pts</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>Level {user.level}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 text-gray-400 hover:text-error-400 transition-colors"
                    >
                      <Heart className="w-3 h-3" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 text-gray-400 hover:text-brand-400 transition-colors"
                    >
                      <MessageCircle className="w-3 h-3" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!isLoading && (activeTab === 'followers' ? followers : following).length === 0 && (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">
              {activeTab === 'followers' ? 'No followers yet' : 'Not following anyone yet'}
            </p>
            <p className="text-gray-500 text-sm">
              {activeTab === 'followers' 
                ? 'Share your profile to gain followers' 
                : 'Discover and follow other users'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialFeatures;