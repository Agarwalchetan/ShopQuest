import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Eye, 
  Share2, 
  Zap,
  TrendingUp,
  Clock,
  Users
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  discount?: number;
  badge?: string;
  isLive?: boolean;
  streamer?: string;
  viewers?: number;
  inStock: boolean;
  fastShipping?: boolean;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onWishlist?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  onWatchLive?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onWishlist,
  onQuickView,
  onWatchLive
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onWishlist?.(product.id);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group bg-dark-800/50 backdrop-blur-sm border border-white/10 hover:border-brand-500/50 rounded-2xl overflow-hidden transition-all duration-500 shadow-premium hover:shadow-glow"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        {/* Image */}
        <div className="relative aspect-square bg-gray-800">
          <img
            src={product.image}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } group-hover:scale-105`}
          />
          
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-2">
          {discountPercentage > 0 && (
            <span className="bg-error-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              -{discountPercentage}%
            </span>
          )}
          {product.badge && (
            <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg block">
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg block">
              Out of Stock
            </span>
          )}
        </div>

        {/* Live Indicator */}
        {product.isLive && (
          <div className="absolute top-3 right-3">
            <div className="flex items-center space-x-1 bg-error-500 px-2 py-1 rounded-full shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-xs font-bold text-white">LIVE</span>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlist}
            className={`p-2 rounded-full backdrop-blur-sm border border-white/20 transition-colors ${
              isWishlisted 
                ? 'bg-error-500 text-white' 
                : 'bg-black/50 text-white hover:bg-error-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onQuickView?.(product.id)}
            className="p-2 bg-black/50 text-white rounded-full backdrop-blur-sm border border-white/20 hover:bg-brand-500 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-black/50 text-white rounded-full backdrop-blur-sm border border-white/20 hover:bg-gray-600 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onQuickView?.(product.id)}
            className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            Quick View
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="text-xs text-brand-400 bg-brand-500/20 border border-brand-500/30 px-2 py-1 rounded-full font-semibold">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mt-3 mb-2 group-hover:text-brand-400 transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-accent-400 fill-current" />
            <span className="text-sm font-semibold text-white">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-400">({product.reviews.toLocaleString()} reviews)</span>
        </div>

        {/* Live Stream Info */}
        {product.isLive && product.streamer && (
          <div className="flex items-center space-x-2 mb-3 p-2 bg-error-500/10 rounded-lg border border-error-500/20">
            <div className="flex items-center space-x-1 text-error-400">
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs font-semibold">Live with {product.streamer}</span>
            </div>
            {product.viewers && (
              <>
                <span className="text-xs text-gray-400">•</span>
                <div className="flex items-center space-x-1 text-gray-400">
                  <Users className="w-3 h-3" />
                  <span className="text-xs">{product.viewers} watching</span>
                </div>
              </>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-2xl font-bold text-accent-400">
            ${product.price}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-lg text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Features */}
        <div className="flex items-center space-x-2 mb-4">
          {product.fastShipping && (
            <div className="flex items-center space-x-1 text-success-400">
              <Zap className="w-3 h-3" />
              <span className="text-xs font-semibold">Fast Shipping</span>
            </div>
          )}
          {product.inStock && (
            <span className="text-xs text-success-400 bg-success-500/20 border border-success-500/30 px-2 py-1 rounded-full">
              In Stock
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAddToCart?.(product.id)}
            disabled={!product.inStock}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl hover:from-brand-600 hover:to-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-glow"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
          </motion.button>

          {product.isLive && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onWatchLive?.(product.id)}
              className="w-full flex items-center justify-center space-x-2 py-2 bg-error-500/20 text-error-400 font-semibold rounded-xl border border-error-500/30 hover:bg-error-500/30 transition-all duration-300"
            >
              <Zap className="w-4 h-4" />
              <span>Watch Live</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;