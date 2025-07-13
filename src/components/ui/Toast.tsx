import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose
}) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success: {
      bg: 'bg-success-500/20',
      border: 'border-success-500/30',
      text: 'text-success-400',
      icon: 'text-success-400',
    },
    error: {
      bg: 'bg-error-500/20',
      border: 'border-error-500/30',
      text: 'text-error-400',
      icon: 'text-error-400',
    },
    warning: {
      bg: 'bg-warning-500/20',
      border: 'border-warning-500/30',
      text: 'text-warning-400',
      icon: 'text-warning-400',
    },
    info: {
      bg: 'bg-brand-500/20',
      border: 'border-brand-500/30',
      text: 'text-brand-400',
      icon: 'text-brand-400',
    },
  };

  const Icon = icons[type];
  const colorScheme = colors[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
      className={`relative max-w-sm w-full ${colorScheme.bg} backdrop-blur-xl border ${colorScheme.border} rounded-2xl shadow-premium overflow-hidden`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className={`w-6 h-6 ${colorScheme.icon}`} />
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className={`text-sm font-semibold ${colorScheme.text}`}>
              {title}
            </p>
            {message && (
              <p className="mt-1 text-sm text-gray-300">
                {message}
              </p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => onClose(id)}
              className="inline-flex text-gray-400 hover:text-white focus:outline-none transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: duration / 1000, ease: 'linear' }}
        className={`h-1 ${colorScheme.text.replace('text-', 'bg-')}`}
      />
    </motion.div>
  );
};

export default Toast;