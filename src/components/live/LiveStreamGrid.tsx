import React from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStreams } from '../../hooks/useStreams';
import LoadingSpinner from '../ui/LoadingSpinner';

const LiveStreamGrid: React.FC = () => {
  const { data: streams, isLoading, error } = useStreams();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-error-400">Failed to load streams. Please try again.</p>
      </div>
    );
  }

  if (!streams || streams.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No live streams available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {streams.map((stream, index) => (
        <motion.div
          key={stream.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="group cursor-pointer"
        >
          <Link to={`/stream/${stream.id}`}>
            <div className="relative overflow-hidden rounded-3xl bg-dark-800/50 backdrop-blur-sm border border-white/10 hover:border-brand-500/50 transition-all duration-500 shadow-premium hover:shadow-glow">
              <div className="relative">
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Live Badge */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <div className="flex items-center space-x-1 bg-error-500 px-3 py-1.5 rounded-full shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-white">LIVE</span>
                  </div>
                  {stream.tags.slice(0, 1).map((tag) => (
                    <span key={tag} className="text-xs font-semibold bg-brand-500/80 text-white px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Viewers */}
                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Users className="w-4 h-4 text-white" />
                  <span className="text-sm font-semibold text-white">{stream.viewers.toLocaleString()}</span>
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-400 transition-colors line-clamp-2">
                  {stream.title}
                </h3>
                
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={stream.streamer.avatar}
                    alt={stream.streamer.name}
                    className="w-8 h-8 rounded-full border border-brand-500/50"
                  />
                  <div>
                    <p className="text-gray-300 font-medium">{stream.streamer.name}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <span>{stream.streamer.followers.toLocaleString()} followers</span>
                      {stream.streamer.verified && (
                        <Star className="w-3 h-3 text-brand-400 fill-current" />
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-400 bg-brand-500/20 border border-brand-500/30 px-3 py-1 rounded-full font-semibold">
                    {stream.category}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Started {stream.startedAt}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default LiveStreamGrid;