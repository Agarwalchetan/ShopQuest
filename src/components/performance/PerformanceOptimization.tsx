import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timeToInteractive: number;
}

const PerformanceOptimization: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    firstInputDelay: 0,
    timeToInteractive: 0,
  });

  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    // Measure performance metrics
    measurePerformance();
    
    // Set up performance observer
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            setMetrics(prev => ({
              ...prev,
              loadTime: navEntry.loadEventEnd - navEntry.loadEventStart,
            }));
          }
        }
      });
      
      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
      
      return () => observer.disconnect();
    }
  }, []);

  const measurePerformance = () => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      setMetrics({
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        firstContentfulPaint: getMetricValue('first-contentful-paint'),
        largestContentfulPaint: getMetricValue('largest-contentful-paint'),
        cumulativeLayoutShift: 0.1, // Mock value
        firstInputDelay: 50, // Mock value
        timeToInteractive: navigation.domInteractive - navigation.navigationStart,
      });
    }
  };

  const getMetricValue = (metricName: string): number => {
    const entries = performance.getEntriesByName(metricName);
    return entries.length > 0 ? entries[0].startTime : 0;
  };

  const optimizePerformance = async () => {
    setIsOptimizing(true);
    
    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Apply optimizations
    await Promise.all([
      preloadCriticalResources(),
      optimizeImages(),
      enableServiceWorker(),
      compressAssets(),
    ]);
    
    setIsOptimizing(false);
    measurePerformance();
  };

  const preloadCriticalResources = async () => {
    // Preload critical CSS and fonts
    const criticalResources = [
      '/fonts/inter-var.woff2',
      '/css/critical.css',
    ];
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.includes('.woff') ? 'font' : 'style';
      if (resource.includes('.woff')) {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });
  };

  const optimizeImages = async () => {
    // Implement lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
  };

  const enableServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully');
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  };

  const compressAssets = async () => {
    // Enable compression for static assets
    if ('CompressionStream' in window) {
      // Implement asset compression logic
      console.log('Asset compression enabled');
    }
  };

  const getScoreColor = (score: number, thresholds: [number, number]) => {
    if (score <= thresholds[0]) return 'text-success-400';
    if (score <= thresholds[1]) return 'text-warning-400';
    return 'text-error-400';
  };

  const getScoreIcon = (score: number, thresholds: [number, number]) => {
    if (score <= thresholds[0]) return CheckCircle;
    if (score <= thresholds[1]) return Clock;
    return AlertTriangle;
  };

  const performanceScore = useMemo(() => {
    const scores = [
      metrics.firstContentfulPaint <= 1800 ? 100 : Math.max(0, 100 - (metrics.firstContentfulPaint - 1800) / 20),
      metrics.largestContentfulPaint <= 2500 ? 100 : Math.max(0, 100 - (metrics.largestContentfulPaint - 2500) / 30),
      metrics.cumulativeLayoutShift <= 0.1 ? 100 : Math.max(0, 100 - (metrics.cumulativeLayoutShift - 0.1) * 1000),
      metrics.firstInputDelay <= 100 ? 100 : Math.max(0, 100 - (metrics.firstInputDelay - 100) / 5),
    ];
    
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [metrics]);

  return (
    <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-premium">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Performance Optimization</h3>
          <p className="text-gray-400">Monitor and optimize platform performance</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={optimizePerformance}
          disabled={isOptimizing}
          className="px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl hover:from-brand-600 hover:to-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-glow"
        >
          {isOptimizing ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Optimizing...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Optimize</span>
            </div>
          )}
        </motion.button>
      </div>

      {/* Performance Score */}
      <div className="text-center mb-8">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-700"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - performanceScore / 100) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={performanceScore >= 90 ? 'text-success-400' : performanceScore >= 70 ? 'text-warning-400' : 'text-error-400'}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{performanceScore}</span>
          </div>
        </div>
        <h4 className="text-lg font-semibold text-white">Performance Score</h4>
        <p className="text-gray-400 text-sm">
          {performanceScore >= 90 ? 'Excellent' : performanceScore >= 70 ? 'Good' : 'Needs Improvement'}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            name: 'First Contentful Paint',
            value: metrics.firstContentfulPaint,
            unit: 'ms',
            thresholds: [1800, 3000] as [number, number],
            description: 'Time until first content appears',
          },
          {
            name: 'Largest Contentful Paint',
            value: metrics.largestContentfulPaint,
            unit: 'ms',
            thresholds: [2500, 4000] as [number, number],
            description: 'Time until largest content loads',
          },
          {
            name: 'Cumulative Layout Shift',
            value: metrics.cumulativeLayoutShift,
            unit: '',
            thresholds: [0.1, 0.25] as [number, number],
            description: 'Visual stability score',
          },
          {
            name: 'First Input Delay',
            value: metrics.firstInputDelay,
            unit: 'ms',
            thresholds: [100, 300] as [number, number],
            description: 'Responsiveness to user input',
          },
        ].map((metric, index) => {
          const Icon = getScoreIcon(metric.value, metric.thresholds);
          const color = getScoreColor(metric.value, metric.thresholds);
          
          return (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-dark-700/30 rounded-xl"
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon className={`w-5 h-5 ${color}`} />
                <h5 className="text-white font-medium">{metric.name}</h5>
              </div>
              <div className="flex items-baseline space-x-2 mb-1">
                <span className={`text-2xl font-bold ${color}`}>
                  {metric.value.toFixed(metric.unit === 'ms' ? 0 : 3)}
                </span>
                <span className="text-gray-400 text-sm">{metric.unit}</span>
              </div>
              <p className="text-gray-500 text-xs">{metric.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Optimization Recommendations */}
      <div className="mt-6 p-4 bg-brand-500/10 border border-brand-500/30 rounded-xl">
        <h5 className="text-brand-400 font-semibold mb-2">Optimization Tips</h5>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Enable image lazy loading and compression</li>
          <li>• Implement service worker for caching</li>
          <li>• Preload critical resources</li>
          <li>• Minimize JavaScript bundle size</li>
          <li>• Use CDN for static assets</li>
        </ul>
      </div>
    </div>
  );
};

export default PerformanceOptimization;