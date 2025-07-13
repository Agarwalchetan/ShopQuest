import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, 
  Award, 
  Store, 
  Users,
  TrendingUp,
  Shield,
  Zap,
  Crown,
  Gift,
  Sparkles
} from 'lucide-react';
import NFTRewards from '../components/blockchain/NFTRewards';
import SellerDashboard from '../components/marketplace/SellerDashboard';
import LiveCollaboration from '../components/collaboration/LiveCollaboration';

const BlockchainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nft' | 'marketplace' | 'collaboration'>('nft');

  const tabs = [
    { id: 'nft', label: 'NFT Rewards', icon: Award },
    { id: 'marketplace', label: 'Marketplace', icon: Store },
    { id: 'collaboration', label: 'Live Collaboration', icon: Users },
  ];

  const blockchainFeatures = [
    {
      icon: Coins,
      title: 'SHOP Token Economy',
      description: 'Earn and spend native tokens for exclusive benefits',
      value: '2.5M',
      metric: 'Tokens in circulation',
      color: 'text-brand-400',
    },
    {
      icon: Award,
      title: 'NFT Rewards',
      description: 'Unique digital collectibles with real utility',
      value: '15K+',
      metric: 'NFTs minted',
      color: 'text-accent-400',
    },
    {
      icon: Shield,
      title: 'Decentralized Trust',
      description: 'Blockchain-verified transactions and reviews',
      value: '99.9%',
      metric: 'Trust score',
      color: 'text-success-400',
    },
    {
      icon: TrendingUp,
      title: 'DeFi Integration',
      description: 'Yield farming and staking opportunities',
      value: '12.5%',
      metric: 'APY rewards',
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
              <h1 className="text-3xl font-bold text-white">Blockchain & Web3</h1>
              <p className="text-gray-400">Decentralized shopping with NFT rewards and crypto integration</p>
            </div>
          </div>
        </motion.div>

        {/* Blockchain Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {blockchainFeatures.map((feature, index) => {
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
                    <p className="text-sm text-gray-400">{feature.metric}</p>
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
          {activeTab === 'nft' && <NFTRewards />}
          {activeTab === 'marketplace' && <SellerDashboard />}
          {activeTab === 'collaboration' && <LiveCollaboration />}
        </motion.div>

        {/* Web3 Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-brand-500/10 to-accent-500/10 rounded-2xl p-8 border border-brand-500/20"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Why Web3 Shopping?</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Experience the future of commerce with blockchain technology, NFT rewards, and decentralized features that put you in control.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-brand-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">True Ownership</h3>
              <p className="text-gray-400 text-sm">Own your digital assets and rewards as NFTs on the blockchain</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-success-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-success-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Instant Rewards</h3>
              <p className="text-gray-400 text-sm">Earn tokens and NFTs instantly for your shopping activities</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-accent-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Exclusive Access</h3>
              <p className="text-gray-400 text-sm">Unlock special features and benefits with your NFT collection</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlockchainPage;