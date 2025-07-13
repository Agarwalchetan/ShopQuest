import React from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Star, TrendingUp, Zap, Trophy, Gift, ArrowRight, Sparkles, Crown, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import LiveStreamGrid from '../components/live/LiveStreamGrid';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';

const HomePage: React.FC = () => {
  const { data: products } = useProducts({ sortBy: 'featured' });
  const { addItem } = useCart();
  const { success } = useToast();

  const handleAddToCart = (product: any) => {
    addItem(product);
    success('Added to cart!', `${product.name} has been added to your cart.`);
  };

  const achievements = [
    { 
      icon: Trophy, 
      title: 'Shopping Spree', 
      description: 'Purchase 10 items in one stream', 
      progress: 70,
      color: 'text-accent-400',
      bgColor: 'bg-accent-500/20',
      borderColor: 'border-accent-500/30',
    },
    { 
      icon: Zap, 
      title: 'Speed Shopper', 
      description: 'Complete purchase in under 30 seconds', 
      progress: 100,
      color: 'text-success-400',
      bgColor: 'bg-success-500/20',
      borderColor: 'border-success-500/30',
    },
    { 
      icon: Gift, 
      title: 'Gift Giver', 
      description: 'Send 5 gifts to streamers', 
      progress: 40,
      color: 'text-brand-400',
      bgColor: 'bg-brand-500/20',
      borderColor: 'border-brand-500/30',
    },
  ];

  const stats = [
    { label: 'Active Streamers', value: '2.5K+', icon: Users },
    { label: 'Products Available', value: '50K+', icon: Star },
    { label: 'Happy Customers', value: '100K+', icon: Trophy },
    { label: 'Live Streams Daily', value: '500+', icon: Play },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 via-transparent to-accent-600/20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-brand-500/10 border border-brand-500/30 rounded-full px-6 py-3 mb-8"
            >
              <Sparkles className="w-5 h-5 text-brand-400" />
              <span className="text-brand-400 font-semibold">Welcome to the Future of Shopping</span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
              Shop, Watch,{' '}
              <span className="bg-gradient-to-r from-brand-400 via-accent-400 to-brand-600 bg-clip-text text-transparent animate-gradient-x">
                Win
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience the ultimate gamified shopping platform where live streams meet 
              interactive quests, exclusive rewards, and a thriving community of shoppers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/shop">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold rounded-2xl shadow-glow hover:shadow-glow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-400 to-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center space-x-2">
                    <span>Start Shopping</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center space-x-2">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Watch Demo</span>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-500/20 to-brand-600/20 border border-brand-500/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-brand-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                  <p className="text-gray-400 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Live Streams Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Live Now</h2>
              <p className="text-gray-400 text-lg">Join thousands of shoppers in real-time</p>
            </div>
            <Link
              to="/streams"
              className="group flex items-center space-x-2 text-brand-400 hover:text-brand-300 font-semibold transition-colors"
            >
              <span>View All Streams</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          <LiveStreamGrid />
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 bg-gradient-to-br from-dark-900/50 to-dark-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Trending Products</h2>
              <p className="text-gray-400 text-lg">Discover what everyone's buying</p>
            </div>
            <Link
              to="/shop"
              className="group flex items-center space-x-2 text-brand-400 hover:text-brand-300 font-semibold transition-colors"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.slice(0, 3).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group cursor-pointer"
              >
                <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 hover:border-brand-500/50 rounded-3xl overflow-hidden transition-all duration-500 shadow-premium hover:shadow-glow">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.discount && (
                      <div className="absolute top-4 left-4">
                        <span className="text-xs font-bold bg-error-500 text-white px-3 py-1.5 rounded-full shadow-lg">
                          -{product.discount}%
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-400 transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-accent-400 fill-current" />
                        <span className="text-sm font-semibold text-white">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 mb-6">
                      <span className="text-2xl font-bold text-accent-400">
                        ${product.price}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-lg text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAddToCart(product)}
                      className="w-full py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all duration-300 shadow-lg hover:shadow-glow"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Your Progress</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Complete quests, earn achievements, and climb the leaderboard to unlock exclusive rewards and showcase your shopping prowess.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`bg-dark-800/50 backdrop-blur-sm border ${achievement.borderColor} rounded-3xl p-8 hover:shadow-glow transition-all duration-500`}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`p-4 ${achievement.bgColor} border ${achievement.borderColor} rounded-2xl`}>
                      <Icon className={`w-8 h-8 ${achievement.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
                      <p className="text-gray-400">{achievement.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white font-semibold">{achievement.progress}%</span>
                    </div>
                    <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${achievement.progress}%` }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                        className={`h-full bg-gradient-to-r ${
                          achievement.progress === 100 
                            ? 'from-success-500 to-success-600' 
                            : 'from-brand-500 to-brand-600'
                        } rounded-full relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/quests"
              className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold rounded-2xl hover:from-brand-600 hover:to-brand-700 transition-all duration-300 shadow-glow hover:shadow-glow-lg"
            >
              <Target className="w-6 h-6" />
              <span>View All Quests</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-600/20 to-accent-600/20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Crown className="w-16 h-16 text-accent-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Level Up Your Shopping?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join millions of shoppers earning rewards, completing quests, and discovering amazing products through live streams.
            </p>
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(99, 102, 241, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-5 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold text-lg rounded-2xl shadow-glow hover:shadow-glow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <span>Get Started Now</span>
                  <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;