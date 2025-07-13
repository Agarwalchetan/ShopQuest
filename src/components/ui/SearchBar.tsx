import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Clock, Star } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'stream' | 'product' | 'user';
  title: string;
  subtitle?: string;
  image?: string;
  trending?: boolean;
}

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search streams, products, creators...",
  onSearch,
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock search results
  const mockResults: SearchResult[] = [
    {
      id: '1',
      type: 'stream',
      title: 'Tech Gadgets Showcase',
      subtitle: 'TechGuru Mike • 2.8K viewers',
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=100',
      trending: true,
    },
    {
      id: '2',
      type: 'product',
      title: 'Wireless Earbuds Pro',
      subtitle: '$199 • 4.9★ (1.2K reviews)',
      image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: '3',
      type: 'user',
      title: 'StyleQueen Sarah',
      subtitle: 'Fashion Streamer • 45K followers',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
  ];

  const recentSearches = [
    'Wireless headphones',
    'Gaming setup',
    'Fashion trends',
  ];

  const trendingSearches = [
    'Black Friday deals',
    'Smart watches',
    'Home decor',
    'Tech reviews',
  ];

  useEffect(() => {
    if (query.length > 0) {
      // Simulate search API call
      const filteredResults = mockResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.subtitle?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch?.(searchQuery);
    setIsOpen(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'stream':
        return '🎥';
      case 'product':
        return '🛍️';
      case 'user':
        return '👤';
      default:
        return '🔍';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-brand-400 transition-colors" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-12 pr-12 py-3 bg-dark-800/50 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all duration-300 backdrop-blur-sm"
        />
        {query && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      {/* Search Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full left-0 right-0 mt-2 bg-dark-800/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-premium overflow-hidden z-50"
            >
              {query.length > 0 ? (
                // Search Results
                <div className="max-h-96 overflow-y-auto">
                  {results.length > 0 ? (
                    <div className="p-2">
                      {results.map((result, index) => (
                        <motion.button
                          key={result.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleSearch(result.title)}
                          className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left"
                        >
                          {result.image ? (
                            <img
                              src={result.image}
                              alt={result.title}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-brand-500/20 rounded-lg flex items-center justify-center text-lg">
                              {getTypeIcon(result.type)}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <p className="text-white font-medium truncate">{result.title}</p>
                              {result.trending && (
                                <TrendingUp className="w-4 h-4 text-accent-400" />
                              )}
                            </div>
                            {result.subtitle && (
                              <p className="text-sm text-gray-400 truncate">{result.subtitle}</p>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-gray-400">No results found for "{query}"</p>
                    </div>
                  )}
                </div>
              ) : (
                // Default state with recent and trending
                <div className="p-4 space-y-4">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <h4 className="text-sm font-medium text-gray-400">Recent</h4>
                      </div>
                      <div className="space-y-1">
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearch(search)}
                            className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Trending Searches */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-accent-400" />
                      <h4 className="text-sm font-medium text-gray-400">Trending</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((search, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSearch(search)}
                          className="px-3 py-1.5 bg-brand-500/20 border border-brand-500/30 text-brand-400 text-sm font-medium rounded-full hover:bg-brand-500/30 transition-colors"
                        >
                          {search}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;