import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Sparkles, 
  TrendingUp, 
  Eye,
  Mic,
  Camera,
  Zap,
  Target,
  Users,
  ShoppingBag
} from 'lucide-react';
import PersonalizedDashboard from '../components/ai/PersonalizedDashboard';
import RecommendationEngine from '../components/ai/RecommendationEngine';
import VoiceCommerce from '../components/advanced/VoiceCommerce';
import ARProductViewer from '../components/advanced/ARProductViewer';

const AIPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'insights' | 'recommendations' | 'voice' | 'ar'>('insights');

  const handleVoiceCommand = (command: string, action?: string) => {
    if (action?.startsWith('navigate:')) {
      const page = action.split(':')[1];
      window.location.href = `/${page}`;
    } else if (action?.startsWith('search:')) {
      const searchTerm = action.split(':')[1];
      window.location.href = `/shop?search=${encodeURIComponent(searchTerm)}`;
    } else if (action === 'show_cart') {
      // Trigger cart panel
      console.log('Opening cart');
    }
  };

  const tabs = [
    { id: 'insights', label: 'AI Insights', icon: Brain },
    { id: 'recommendations', label: 'Recommendations', icon: Target },
    { id: 'voice', label: 'Voice Commerce', icon: Mic },
    { id: 'ar', label: 'AR Viewer', icon: Camera },
  ];

  const aiFeatures = [
    {
      icon: Brain,
      title: 'Predictive Analytics',
      description: 'AI predicts your next purchase with 89% accuracy',
      value: '89%',
      color: 'text-brand-400',
    },
    {
      icon: TrendingUp,
      title: 'Smart Recommendations',
      description: 'Personalized product suggestions based on behavior',
      value: '95%',
      color: 'text-success-400',
    },
    {
      icon: Eye,
      title: 'Visual Recognition',
      description: 'Find products by uploading photos',
      value: '92%',
      color: 'text-accent-400',
    },
    {
      icon: Mic,
      title: 'Voice Shopping',
      description: 'Shop hands-free with voice commands',
      value: '87%',
      color: 'text-warning-400',
    },
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
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-brand-500/20 to-accent-500/20 rounded-2xl">
              <Sparkles className="w-8 h-8 text-brand-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">AI-Powered Shopping</h1>
              <p className="text-gray-400">Experience the future of personalized commerce</p>
            </div>
          </div>
        </motion.div>

        {/* AI Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {aiFeatures.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-brand-500/50 transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-dark-700/50 rounded-xl">
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{feature.value}</p>
                    <p className="text-sm text-gray-400">Accuracy</p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
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
          {activeTab === 'insights' && <PersonalizedDashboard />}
          
          {activeTab === 'recommendations' && (
            <div className="space-y-8">
              <RecommendationEngine type="product" limit={6} />
              <RecommendationEngine type="stream" limit={4} />
              <RecommendationEngine type="quest" limit={3} />
            </div>
          )}
          
          {activeTab === 'voice' && (
            <div className="max-w-2xl mx-auto">
              <VoiceCommerce onCommand={handleVoiceCommand} />
            </div>
          )}
          
          {activeTab === 'ar' && (
            <div className="max-w-2xl mx-auto">
              <ARProductViewer
                productId="sample-product"
                productName="Wireless Headphones Pro"
                productImage="https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=500"
              />
            </div>
          )}
        </motion.div>

        {/* AI Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-brand-500/10 to-accent-500/10 rounded-2xl p-8 border border-brand-500/20"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Why AI-Powered Shopping?</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Our advanced AI algorithms learn from your behavior to provide personalized experiences that save time and help you discover products you'll love.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-brand-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Faster Shopping</h3>
              <p className="text-gray-400 text-sm">Find what you need 3x faster with AI recommendations</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-success-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-success-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Better Matches</h3>
              <p className="text-gray-400 text-sm">95% accuracy in product recommendations</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Social Insights</h3>
              <p className="text-gray-400 text-sm">Discover trends from your social network</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIPage;