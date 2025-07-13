import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Star, 
  ShoppingBag, 
  Heart,
  Grid3X3,
  List,
  SlidersHorizontal,
  TrendingUp,
  Zap
} from 'lucide-react';

const ShopPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { id: 'all', name: 'All Products', count: 1247 },
    { id: 'electronics', name: 'Electronics', count: 324 },
    { id: 'fashion', name: 'Fashion', count: 456 },
    { id: 'home', name: 'Home & Garden', count: 234 },
    { id: 'beauty', name: 'Beauty', count: 123 },
    { id: 'sports', name: 'Sports', count: 110 },
  ];

  const products = [
    {
      id: 1,
      name: 'Wireless Noise-Canceling Headphones',
      price: 299,
      originalPrice: 399,
      image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 4.8,
      reviews: 1247,
      discount: 25,
      category: 'electronics',
      isLive: true,
      streamer: 'TechGuru Mike',
      viewers: 2847,
      inStock: true,
      fastShipping: true,
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 249,
      originalPrice: 329,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 4.6,
      reviews: 892,
      discount: 24,
      category: 'electronics',
      isLive: false,
      inStock: true,
      fastShipping: true,
    },
    {
      id: 3,
      name: 'Premium Coffee Maker',
      price: 149,
      originalPrice: 199,
      image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 4.7,
      reviews: 634,
      discount: 25,
      category: 'home',
      isLive: true,
      streamer: 'HomeDesign Pro',
      viewers: 1456,
      inStock: true,
      fastShipping: false,
    },
    {
      id: 4,
      name: 'Designer Handbag',
      price: 189,
      originalPrice: 249,
      image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 4.9,
      reviews: 423,
      discount: 24,
      category: 'fashion',
      isLive: true,
      streamer: 'StyleQueen Sarah',
      viewers: 1923,
      inStock: true,
      fastShipping: true,
    },
    {
      id: 5,
      name: 'Wireless Charging Pad',
      price: 39,
      originalPrice: 59,
      image: 'https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 4.4,
      reviews: 756,
      discount: 34,
      category: 'electronics',
      isLive: false,
      inStock: true,
      fastShipping: true,
    },
    {
      id: 6,
      name: 'Organic Skincare Set',
      price: 79,
      originalPrice: 99,
      image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
      rating: 4.8,
      reviews: 312,
      discount: 20,
      category: 'beauty',
      isLive: false,
      inStock: true,
      fastShipping: false,
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'discount':
        return b.discount - a.discount;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Shop</h1>
          <p className="text-gray-400">Discover amazing products from live streams and featured collections</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-800/50 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>

              {/* View Mode */}
              <div className="flex items-center space-x-1 bg-gray-800/50 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live Shopping Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-gradient-to-r from-error-500/20 to-accent-500/20 rounded-xl p-6 border border-error-500/30"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-error-500 rounded-full animate-pulse" />
                <span className="text-error-400 font-semibold">LIVE</span>
              </div>
              <h3 className="text-lg font-semibold text-white">
                3 products are being featured in live streams right now!
              </h3>
            </div>
            <button className="px-4 py-2 bg-error-500 text-white font-semibold rounded-lg hover:bg-error-600 transition-colors">
              Watch Now
            </button>
          </div>
        </motion.div>

        {/* Products Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: viewMode === 'grid' ? 1.02 : 1 }}
                className={`group cursor-pointer ${
                  viewMode === 'list' ? 'flex space-x-6' : ''
                }`}
              >
                <div className={`bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 ${
                  viewMode === 'list' ? 'flex w-full' : ''
                }`}>
                  {/* Image */}
                  <div className={`relative ${
                    viewMode === 'list' ? 'w-48 flex-shrink-0' : ''
                  }`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                        viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'
                      }`}
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 space-y-2">
                      {product.discount > 0 && (
                        <span className="bg-error-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{product.discount}%
                        </span>
                      )}
                      {product.fastShipping && (
                        <span className="bg-success-500 text-white text-xs font-bold px-2 py-1 rounded-full block">
                          Fast Ship
                        </span>
                      )}
                    </div>

                    {/* Live Indicator */}
                    {product.isLive && (
                      <div className="absolute top-3 right-3 flex items-center space-x-1 bg-error-500 px-2 py-1 rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-xs font-semibold text-white">LIVE</span>
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <button className="absolute bottom-3 right-3 p-2 bg-black/50 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error-500">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-white font-medium">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                      </div>

                      {/* Live Stream Info */}
                      {product.isLive && (
                        <div className="flex items-center space-x-2 mb-3 p-2 bg-error-500/10 rounded-lg border border-error-500/20">
                          <div className="flex items-center space-x-1 text-error-400">
                            <TrendingUp className="w-3 h-3" />
                            <span className="text-xs font-semibold">Live with {product.streamer}</span>
                          </div>
                          <span className="text-xs text-gray-400">• {product.viewers} watching</span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-2xl font-bold text-accent-400">
                          ${product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-400 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className={`space-y-2 ${viewMode === 'list' ? 'mt-4' : ''}`}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </motion.button>

                      {product.isLive && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-center space-x-2 py-2 bg-error-500/20 text-error-400 font-semibold rounded-lg border border-error-500/30 hover:bg-error-500/30 transition-all duration-200"
                        >
                          <Zap className="w-4 h-4" />
                          <span>Watch Live</span>
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <button className="px-8 py-3 bg-gray-800/50 border border-white/20 text-white font-semibold rounded-xl hover:bg-gray-700/50 transition-colors">
            Load More Products
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ShopPage;