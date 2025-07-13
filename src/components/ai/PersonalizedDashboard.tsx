import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  ShoppingBag, 
  Eye, 
  Heart,
  Zap,
  Target,
  Star,
  Clock,
  Gift,
  Users,
  Sparkles
} from 'lucide-react';

interface PersonalizedInsight {
  id: string;
  type: 'spending' | 'behavior' | 'recommendation' | 'trend';
  title: string;
  description: string;
  value: string;
  change: number;
  icon: React.ComponentType<any>;
  color: string;
  actionable: boolean;
  action?: string;
}

interface PredictiveAnalytics {
  nextPurchase: {
    category: string;
    probability: number;
    timeframe: string;
    suggestedProducts: string[];
  };
  spendingForecast: {
    thisMonth: number;
    nextMonth: number;
    confidence: number;
  };
  engagementScore: {
    current: number;
    trend: 'up' | 'down' | 'stable';
    factors: string[];
  };
}

const PersonalizedDashboard: React.FC = () => {
  const [insights, setInsights] = useState<PersonalizedInsight[]>([]);
  const [analytics, setAnalytics] = useState<PredictiveAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPersonalizedData();
  }, []);

  const loadPersonalizedData = async () => {
    // Simulate AI-powered insights
    const mockInsights: PersonalizedInsight[] = [
      {
        id: '1',
        type: 'spending',
        title: 'Smart Spending Pattern',
        description: 'You tend to make better purchase decisions on weekends',
        value: '23% better deals',
        change: 15,
        icon: Brain,
        color: 'text-brand-400',
        actionable: true,
        action: 'Schedule weekend shopping reminders',
      },
      {
        id: '2',
        type: 'behavior',
        title: 'Engagement Peak',
        description: 'Your most active time is 7-9 PM on weekdays',
        value: '2.3x more active',
        change: 8,
        icon: TrendingUp,
        color: 'text-success-400',
        actionable: true,
        action: 'Get notified about live streams during peak hours',
      },
      {
        id: '3',
        type: 'recommendation',
        title: 'Category Preference',
        description: 'Electronics purchases increase 40% after tech reviews',
        value: '40% correlation',
        change: 12,
        icon: Eye,
        color: 'text-accent-400',
        actionable: true,
        action: 'Follow more tech reviewers',
      },
      {
        id: '4',
        type: 'trend',
        title: 'Social Influence',
        description: 'Friend purchases influence your decisions by 65%',
        value: '65% influence',
        change: 5,
        icon: Users,
        color: 'text-warning-400',
        actionable: true,
        action: 'Connect with more friends',
      },
    ];

    const mockAnalytics: PredictiveAnalytics = {
      nextPurchase: {
        category: 'Electronics',
        probability: 78,
        timeframe: '3-5 days',
        suggestedProducts: ['Wireless Headphones', 'Smart Watch', 'Phone Case'],
      },
      spendingForecast: {
        thisMonth: 247,
        nextMonth: 312,
        confidence: 85,
      },
      engagementScore: {
        current: 87,
        trend: 'up',
        factors: ['Increased stream watching', 'More social interactions', 'Quest completion rate'],
      },
    };

    setInsights(mockInsights);
    setAnalytics(mockAnalytics);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* AI Insights Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-brand-500/10 to-accent-500/10 rounded-2xl p-6 border border-brand-500/20"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-brand-500/20 rounded-xl">
            <Brain className="w-6 h-6 text-brand-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI-Powered Insights</h2>
            <p className="text-gray-400">Personalized recommendations based on your behavior</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-brand-400">{analytics?.engagementScore.current}%</p>
            <p className="text-sm text-gray-400">Engagement Score</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success-400">{analytics?.nextPurchase.probability}%</p>
            <p className="text-sm text-gray-400">Purchase Likelihood</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent-400">${analytics?.spendingForecast.nextMonth}</p>
            <p className="text-sm text-gray-400">Predicted Spending</p>
          </div>
        </div>
      </motion.div>

      {/* Personalized Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-brand-500/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-dark-700/50 rounded-lg">
                    <Icon className={`w-5 h-5 ${insight.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{insight.title}</h3>
                    <p className="text-sm text-gray-400">{insight.description}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`text-lg font-bold ${insight.color}`}>{insight.value}</p>
                  <div className="flex items-center space-x-1 text-success-400">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs">+{insight.change}%</span>
                  </div>
                </div>
              </div>
              
              {insight.actionable && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 bg-brand-500/20 border border-brand-500/30 text-brand-400 rounded-lg hover:bg-brand-500/30 transition-colors text-sm font-medium"
                >
                  {insight.action}
                </motion.button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Predictive Analytics */}
      {analytics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6">Predictive Analytics</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Next Purchase Prediction */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Next Purchase Prediction</h4>
              <div className="p-4 bg-dark-700/30 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400">Category</span>
                  <span className="text-white font-semibold">{analytics.nextPurchase.category}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400">Probability</span>
                  <span className="text-success-400 font-semibold">{analytics.nextPurchase.probability}%</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">Timeframe</span>
                  <span className="text-white font-semibold">{analytics.nextPurchase.timeframe}</span>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Suggested Products:</p>
                  {analytics.nextPurchase.suggestedProducts.map((product, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-brand-400 rounded-full" />
                      <span className="text-sm text-white">{product}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Spending Forecast */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Spending Forecast</h4>
              <div className="p-4 bg-dark-700/30 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400">This Month</span>
                  <span className="text-white font-semibold">${analytics.spendingForecast.thisMonth}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400">Next Month (Predicted)</span>
                  <span className="text-accent-400 font-semibold">${analytics.spendingForecast.nextMonth}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">Confidence</span>
                  <span className="text-success-400 font-semibold">{analytics.spendingForecast.confidence}%</span>
                </div>
                
                <div className="w-full bg-dark-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-brand-500 to-accent-500 h-2 rounded-full"
                    style={{ width: `${analytics.spendingForecast.confidence}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Engagement Factors */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-white mb-4">Engagement Factors</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {analytics.engagementScore.factors.map((factor, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-dark-700/30 rounded-xl">
                  <div className="w-3 h-3 bg-success-400 rounded-full" />
                  <span className="text-sm text-white">{factor}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PersonalizedDashboard;