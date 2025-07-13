import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut,
  Move3D,
  Maximize,
  Download,
  Share2,
  Eye,
  Sparkles,
  Smartphone
} from 'lucide-react';

interface ARProductViewerProps {
  productId: string;
  productName: string;
  productImage: string;
  onClose?: () => void;
}

const ARProductViewer: React.FC<ARProductViewerProps> = ({
  productId,
  productName,
  productImage,
  onClose
}) => {
  const [isARSupported, setIsARSupported] = useState(false);
  const [isARActive, setIsARActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'3d' | 'ar' | 'try-on'>('3d');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    checkARSupport();
  }, []);

  const checkARSupport = () => {
    // Check for WebXR support
    if ('xr' in navigator) {
      (navigator as any).xr.isSessionSupported('immersive-ar').then((supported: boolean) => {
        setIsARSupported(supported);
      });
    } else {
      // Fallback: check for basic camera access
      setIsARSupported('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices);
    }
  };

  const startAR = async () => {
    if (!isARSupported) return;

    setIsLoading(true);
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsARActive(true);
      }
    } catch (error) {
      console.error('AR initialization failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stopAR = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsARActive(false);
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0, z: 0 });
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleRotate = (axis: 'x' | 'y' | 'z', delta: number) => {
    setRotation(prev => ({
      ...prev,
      [axis]: prev[axis] + delta
    }));
  };

  const handleZoom = (delta: number) => {
    setScale(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  const takeScreenshot = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `${productName}-ar-view.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const shareAR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out ${productName} in AR`,
          text: `I'm viewing ${productName} in augmented reality!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Sharing failed:', error);
      }
    }
  };

  return (
    <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-premium">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-brand-500/20 to-accent-500/20 rounded-xl">
              <Sparkles className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AR Product Viewer</h3>
              <p className="text-sm text-gray-400">{productName}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {isARSupported ? (
              <div className="flex items-center space-x-1 text-success-400">
                <Eye className="w-4 h-4" />
                <span className="text-xs font-medium">AR Ready</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-warning-400">
                <Smartphone className="w-4 h-4" />
                <span className="text-xs font-medium">Limited Support</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="p-4 border-b border-white/10">
        <div className="flex space-x-1 bg-dark-700/50 rounded-xl p-1">
          {[
            { id: '3d', label: '3D View', icon: Move3D },
            { id: 'ar', label: 'AR View', icon: Camera },
            { id: 'try-on', label: 'Try On', icon: Eye },
          ].map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id as any)}
                disabled={mode.id === 'ar' && !isARSupported}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  viewMode === mode.id
                    ? 'bg-brand-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* AR/3D Viewer */}
      <div className="relative aspect-square bg-dark-900">
        {viewMode === 'ar' && isARActive ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900">
            <div 
              className="relative transition-transform duration-300 ease-out"
              style={{
                transform: `
                  translate(${position.x}px, ${position.y}px) 
                  scale(${scale}) 
                  rotateX(${rotation.x}deg) 
                  rotateY(${rotation.y}deg) 
                  rotateZ(${rotation.z}deg)
                `,
              }}
            >
              <img
                src={productImage}
                alt={productName}
                className="w-64 h-64 object-contain filter drop-shadow-2xl"
              />
              
              {/* 3D Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 rounded-lg" />
            </div>
          </div>
        )}

        {/* AR Overlay Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ display: isARActive ? 'block' : 'none' }}
        />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-white font-medium">Initializing AR...</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 space-y-4">
        {/* AR Controls */}
        {viewMode === 'ar' && (
          <div className="flex items-center justify-center space-x-3">
            {!isARActive ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startAR}
                disabled={!isARSupported || isLoading}
                className="px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-glow"
              >
                <div className="flex items-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span>Start AR View</span>
                </div>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={stopAR}
                className="px-6 py-3 bg-error-500 text-white font-semibold rounded-xl transition-all duration-300"
              >
                Stop AR
              </motion.button>
            )}
          </div>
        )}

        {/* 3D Controls */}
        {viewMode === '3d' && (
          <div className="space-y-3">
            {/* Rotation Controls */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Rotation</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleRotate('y', -15)}
                  className="p-2 bg-dark-700/50 text-gray-400 hover:text-white rounded-lg transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={() => handleRotate('x', -15)}
                  className="p-2 bg-dark-700/50 text-gray-400 hover:text-white rounded-lg transition-colors"
                >
                  ↑
                </button>
                <button
                  onClick={() => handleRotate('x', 15)}
                  className="p-2 bg-dark-700/50 text-gray-400 hover:text-white rounded-lg transition-colors"
                >
                  ↓
                </button>
                <button
                  onClick={() => handleRotate('y', 15)}
                  className="p-2 bg-dark-700/50 text-gray-400 hover:text-white rounded-lg transition-colors"
                >
                  →
                </button>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Zoom</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleZoom(-0.1)}
                  className="p-2 bg-dark-700/50 text-gray-400 hover:text-white rounded-lg transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-sm text-white w-12 text-center">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={() => handleZoom(0.1)}
                  className="p-2 bg-dark-700/50 text-gray-400 hover:text-white rounded-lg transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Reset Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetView}
              className="w-full py-2 bg-dark-700/50 border border-white/10 text-gray-400 hover:text-white rounded-lg transition-colors"
            >
              <div className="flex items-center justify-center space-x-2">
                <RotateCcw className="w-4 h-4" />
                <span>Reset View</span>
              </div>
            </motion.button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={takeScreenshot}
            className="flex-1 py-2 bg-success-500/20 border border-success-500/30 text-success-400 rounded-lg hover:bg-success-500/30 transition-colors"
          >
            <div className="flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Save</span>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={shareAR}
            className="flex-1 py-2 bg-brand-500/20 border border-brand-500/30 text-brand-400 rounded-lg hover:bg-brand-500/30 transition-colors"
          >
            <div className="flex items-center justify-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* AR Instructions */}
      {viewMode === 'ar' && !isARActive && (
        <div className="p-4 bg-brand-500/10 border-t border-brand-500/30">
          <h4 className="text-sm font-semibold text-brand-400 mb-2">AR Instructions:</h4>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• Point your camera at a flat surface</li>
            <li>• Move your device slowly to detect the surface</li>
            <li>• Tap to place the product in your space</li>
            <li>• Walk around to view from different angles</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ARProductViewer;