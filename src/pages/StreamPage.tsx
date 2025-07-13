import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  MessageCircle, 
  ShoppingBag, 
  Users, 
  Gift,
  Star,
  Zap,
  Send,
  Crown,
  TrendingUp
} from 'lucide-react';
import ChatPanel from '../components/stream/ChatPanel';
import ProductShowcase from '../components/stream/ProductShowcase';
import StreamStats from '../components/stream/StreamStats';
import LiveStreamPlayer from '../components/stream/LiveStreamPlayer';
import QuestCard from '../components/gamification/QuestCard';

const StreamPage: React.FC = () => {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [viewerCount, setViewerCount] = useState(2847);
  const [chatMessage, setChatMessage] = useState('');

  // Simulate real-time viewer count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const streamData = {
    title: 'Tech Gadgets Showcase - Latest iPhone Accessories',
    streamer: {
      name: 'TechGuru Mike',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      followers: 45200,
      level: 15,
      verified: true,
    },
    category: 'Electronics',
    tags: ['Tech', 'Gadgets', 'iPhone', 'Accessories'],
    startedAt: '2 hours ago',
  };

  const featuredProducts = [
    {
      id: 1,
      name: 'MagSafe Wireless Charger',
      price: 39,
      originalPrice: 49,
      image: 'https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true,
      discount: 20,
    },
    {
      id: 2,
      name: 'Premium Phone Case',
      price: 29,
      originalPrice: 39,
      image: 'https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg?auto=compress&cs=tinysrgb&w=300',
      inStock: true,
      discount: 25,
    },
  ];

  const activeQuest = {
    id: 'stream-watch',
    title: 'Stream Watcher',
    description: 'Watch this stream for 30 minutes',
    type: 'daily' as const,
    progress: 22,
    target: 30,
    reward: 500,
    difficulty: 'easy' as const,
    completed: false,
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      // Handle sending message
      setChatMessage('');
    }
  };

  return (
    <div className="min-h-screen pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Stream Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <LiveStreamPlayer
                streamId={id || ''}
                title={streamData.title}
                streamer={streamData.streamer.name}
                viewers={viewerCount}
                isLive={true}
              />
            </motion.div>

            {/* Stream Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-premium"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-3">{streamData.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                    <span className="bg-brand-500/20 text-brand-400 px-3 py-1 rounded-full border border-brand-500/30 font-semibold">
                      {streamData.category}
                    </span>
                    <span>Started {streamData.startedAt}</span>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{viewerCount.toLocaleString()} viewers</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {streamData.tags.map((tag) => (
                      <span key={tag} className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      isFollowing
                        ? 'bg-gray-600 text-white hover:bg-gray-700'
                        : 'bg-gradient-to-r from-brand-500 to-brand-600 text-white hover:from-brand-600 hover:to-brand-700 shadow-glow'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-dark-700/50 border border-white/10 text-white rounded-xl hover:bg-dark-600/50 transition-all duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Streamer Info */}
              <div className="flex items-center space-x-4 p-4 bg-dark-700/30 rounded-xl">
                <div className="relative">
                  <img
                    src={streamData.streamer.avatar}
                    alt={streamData.streamer.name}
                    className="w-16 h-16 rounded-2xl border-2 border-brand-500/50 object-cover"
                  />
                  {streamData.streamer.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center border-2 border-dark-800">
                      <Star className="w-3 h-3 text-white fill-current" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-bold text-white">{streamData.streamer.name}</h3>
                    <div className="flex items-center space-x-1 text-brand-400">
                      <Crown className="w-4 h-4" />
                      <span className="text-sm font-semibold">Level {streamData.streamer.level}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{streamData.streamer.followers.toLocaleString()} followers</span>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>Trending Creator</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-error-500/20 border border-error-500/30 text-error-400 font-semibold rounded-xl hover:bg-error-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4" />
                      <span>Like</span>
                    </div>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-accent-500/20 border border-accent-500/30 text-accent-400 font-semibold rounded-xl hover:bg-accent-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-2">
                      <Gift className="w-4 h-4" />
                      <span>Gift</span>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Featured Products */}
            <ProductShowcase products={featuredProducts} />

            {/* Stream Stats */}
            <StreamStats />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Chat Panel */}
            <ChatPanel />

            {/* Active Quest */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <QuestCard quest={activeQuest} />
            </motion.div>

            {/* Quick Purchase */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-premium"
            >
              <h3 className="text-lg font-bold text-white mb-4">Quick Purchase</h3>
              <div className="space-y-3">
                {featuredProducts.slice(0, 2).map((product) => (
                  <div key={product.id} className="flex items-center space-x-3 p-3 bg-dark-700/50 rounded-xl hover:bg-dark-700/70 transition-colors">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{product.name}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-accent-400 font-bold">${product.price}</p>
                        {product.originalPrice && (
                          <p className="text-xs text-gray-400 line-through">${product.originalPrice}</p>
                        )}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gradient-to-r from-brand-500 to-brand-600 text-white text-xs font-semibold rounded-lg hover:from-brand-600 hover:to-brand-700 transition-all duration-300"
                    >
                      Buy
                    </motion.button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stream Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-premium"
            >
              <h3 className="text-lg font-bold text-white mb-4">More Streams</h3>
              <div className="space-y-3">
                {[
                  {
                    title: 'Fashion Friday Finds',
                    streamer: 'StyleQueen Sarah',
                    viewers: 1923,
                    thumbnail: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=100',
                  },
                  {
                    title: 'Home & Garden Essentials',
                    streamer: 'HomeDesign Pro',
                    viewers: 1456,
                    thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=100',
                  },
                ].map((stream, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-3 p-3 bg-dark-700/50 rounded-xl hover:bg-dark-700/70 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={stream.thumbnail}
                        alt={stream.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-error-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{stream.title}</p>
                      <p className="text-xs text-gray-400">{stream.streamer}</p>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Users className="w-3 h-3" />
                        <span className="text-xs">{stream.viewers.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamPage;