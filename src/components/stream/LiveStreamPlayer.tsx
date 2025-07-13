import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings, 
  Heart,
  Gift,
  Share2,
  Users,
  Eye
} from 'lucide-react';

interface LiveStreamPlayerProps {
  streamId: string;
  title: string;
  streamer: string;
  viewers: number;
  isLive?: boolean;
}

const LiveStreamPlayer: React.FC<LiveStreamPlayerProps> = ({
  streamId,
  title,
  streamer,
  viewers,
  isLive = true
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quality, setQuality] = useState('1080p');
  const playerRef = useRef<HTMLDivElement>(null);

  const qualities = ['1080p', '720p', '480p', '360p'];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (showControls) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [showControls]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleLike = () => {
    // Implement like functionality
    console.log('Liked stream');
  };

  const handleGift = () => {
    // Implement gift functionality
    console.log('Send gift');
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Share stream');
  };

  return (
    <div 
      ref={playerRef}
      className="relative aspect-video bg-black rounded-2xl overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onMouseMove={() => setShowControls(true)}
    >
      {/* Video Player Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-brand-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
            <div className="w-8 h-8 bg-brand-500 rounded-full animate-pulse" />
          </div>
          <p className="text-white text-lg font-semibold">Live Stream</p>
          <p className="text-gray-400">Video player integration goes here</p>
        </div>
      </div>

      {/* Live Badge */}
      {isLive && (
        <div className="absolute top-4 left-4 z-20">
          <div className="flex items-center space-x-1 bg-error-500 px-3 py-1.5 rounded-full shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-xs font-bold text-white">LIVE</span>
          </div>
        </div>
      )}

      {/* Viewer Count */}
      <div className="absolute top-4 right-4 z-20">
        <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <Eye className="w-4 h-4 text-white" />
          <span className="text-sm font-semibold text-white">{viewers.toLocaleString()}</span>
        </div>
      </div>

      {/* Interactive Overlays */}
      <div className="absolute bottom-20 left-4 right-4 z-20 flex items-end justify-between">
        {/* Product Hotspots */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-accent-500 text-white p-3 rounded-full cursor-pointer hover:bg-accent-600 transition-colors shadow-glow"
        >
          <Gift className="w-6 h-6" />
        </motion.div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="bg-error-500/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-error-600 transition-colors shadow-lg"
          >
            <Heart className="w-6 h-6" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleGift}
            className="bg-brand-500/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-brand-600 transition-colors shadow-lg"
          >
            <Gift className="w-6 h-6" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="bg-gray-500/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-gray-600 transition-colors shadow-lg"
          >
            <Share2 className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Controls Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10"
      >
        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold text-lg">{title}</h3>
            <p className="text-gray-300 text-sm">{streamer}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="bg-black/50 text-white text-sm px-3 py-1 rounded-lg border border-white/20 focus:outline-none"
            >
              {qualities.map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
            
            <button className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Play/Pause */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </motion.button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                setIsMuted(Number(e.target.value) === 0);
              }}
              className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex-1" />

          <button
            onClick={toggleFullscreen}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LiveStreamPlayer;