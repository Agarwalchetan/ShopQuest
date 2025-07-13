import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  ShoppingBag, 
  Play, 
  Target, 
  Star,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { backendService, Recommendation } from '../../services/backend';
import { useToast } from '../../hooks/useToast';

interface RecommendationEngineProps {
  type?: 'product' | 'stream' | 'quest';
  limit?: number;
  className?: string;
}

const RecommendationEngine: React.FC<RecommendationEngineProps> = ({
  type,
  limit = 6,
  className = ''
}) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { error } = useToast();

  useEffect(() => {
    loadRecommendations();
  }, [type]);

  const loadRecommendations = async () => {
    try {
      setIsLoading(true);
      const data = await backendService.getRecommendations(type);
      setRecommendations(data.slice(0, limit));
    } catch (err) {
      error('Failed to load recommendations', 'Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshRecommendations = async () => {
    try {
      setIsRefreshing(true);
      const data = await backendService.getRecommendations(type);
      setRecommendations(data.slice(0, limit));
    } catch (err) {
      error('Failed to refresh recommendations', 'Please try again later.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const getIcon = (recType: string) => {
    switch (recType) {
      case 'product':
        return ShoppingBag;
      case 'stream':
        return Play;
      case 'quest':
        return Target;
      default:
        return Star;
    }
  };

  const getTypeColor = (recType: string) => {
    switch (recType) {
      case 'product':
        return 'text-success-400';
      case 'stream':
        return 'text-error-400';
      case 'quest':
        return 'text-brand-400';
      default:
        return 'text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className={`bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-700 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-premium ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-brand-500/20 to-accent-500/20 rounded-xl">
            <Sparkles className="w-5 h-5 text-brand-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI Recommendations</h3>
            <p className="text-sm text-gray-400">Personalized just for you</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={refreshRecommendations}
          disabled={isRefreshing}
          className="p-2 bg-dark-700/50 border border-white/10 text-gray-400 hover:text-white rounded-xl transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((rec, index) => {
          const Icon = getIcon(rec.type);
          const typeColor = getTypeColor(rec.type);
          
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="group bg-dark-700/30 border border-white/10 rounded-xl p-4 hover:border-brand-500/50 transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative mb-3">
                <img
                  src={rec.image}
                  alt={rec.title}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <div className="absolute top-2 left-2">
                  <div className="p-1.5 bg-dark-800/80 backdrop-blur-sm rounded-lg">
                    <Icon className={`w-3 h-3 ${typeColor}`} />
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="px-2 py-1 bg-dark-800/80 backdrop-blur-sm rounded-full">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-accent-400" />
                      <span className="text-xs text-accent-400 font-semibold">
                        {Math.round(rec.score * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h4 className="text-white font-semibold text-sm line-clamp-1 group-hover:text-brand-400 transition-colors">
                  {rec.title}
                </h4>
                <p className="text-gray-400 text-xs line-clamp-2">
                  {rec.description}
                </p>
                
                {/* Reason */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 italic">
                    {rec.reason}
                  </span>
                  <ChevronRight className="w-3 h-3 text-gray-500 group-hover:text-brand-400 transition-colors" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {recommendations.length === 0 && (
        <div className="text-center py-8">
          <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No recommendations available</p>
          <p className="text-gray-500 text-sm">Check back later for personalized suggestions</p>
        </div>
      )}
    </motion.div>
  );
};

export default RecommendationEngine;