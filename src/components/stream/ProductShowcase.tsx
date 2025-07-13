import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Zap } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  inStock: boolean;
  discount: number;
}

interface ProductShowcaseProps {
  products: Product[];
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ products }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Featured Products</h2>
        <div className="flex items-center space-x-1 text-accent-400">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-semibold">Live Deals</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group bg-gray-700/30 rounded-xl overflow-hidden border border-white/10 hover:border-primary-500/50 transition-all duration-300"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 bg-error-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{product.discount}%
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Quick View Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                >
                  Quick View
                </motion.button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                {product.name}
              </h3>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-accent-400">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm">4.8</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  product.inStock 
                    ? 'bg-success-500/20 text-success-400' 
                    : 'bg-error-500/20 text-error-400'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!product.inStock}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stream-specific Offers */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 p-4 bg-gradient-to-r from-accent-500/20 to-secondary-500/20 rounded-xl border border-accent-500/30"
      >
        <div className="flex items-center space-x-2 mb-2">
          <Zap className="w-5 h-5 text-accent-400" />
          <span className="text-lg font-semibold text-white">Stream Exclusive</span>
        </div>
        <p className="text-gray-300 text-sm mb-3">
          Get an additional 10% off when you purchase during this live stream! Use code: LIVE10
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Offer expires when stream ends</span>
          <div className="flex items-center space-x-1 text-accent-400">
            <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
            <span className="text-xs font-semibold">Limited Time</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductShowcase;