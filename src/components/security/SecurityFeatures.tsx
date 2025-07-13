import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  CheckCircle,
  Key,
  Smartphone,
  Globe,
  UserCheck,
  Clock,
  Activity
} from 'lucide-react';

interface SecurityEvent {
  id: string;
  type: 'login' | 'password_change' | 'suspicious_activity' | 'device_added';
  description: string;
  timestamp: string;
  location: string;
  device: string;
  status: 'success' | 'warning' | 'error';
}

const SecurityFeatures: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([
    {
      id: '1',
      type: 'login',
      description: 'Successful login',
      timestamp: '2 hours ago',
      location: 'New York, US',
      device: 'Chrome on Windows',
      status: 'success',
    },
    {
      id: '2',
      type: 'device_added',
      description: 'New device added',
      timestamp: '1 day ago',
      location: 'San Francisco, US',
      device: 'Safari on iPhone',
      status: 'warning',
    },
    {
      id: '3',
      type: 'password_change',
      description: 'Password changed',
      timestamp: '3 days ago',
      location: 'New York, US',
      device: 'Chrome on Windows',
      status: 'success',
    },
  ]);

  const [securityScore, setSecurityScore] = useState(75);

  const enableTwoFactor = async () => {
    // Simulate 2FA setup
    setTwoFactorEnabled(true);
    setSecurityScore(prev => Math.min(100, prev + 15));
  };

  const enableBiometric = async () => {
    if ('credentials' in navigator) {
      try {
        // Check if WebAuthn is supported
        const credential = await navigator.credentials.create({
          publicKey: {
            challenge: new Uint8Array(32),
            rp: { name: 'ShopQuest' },
            user: {
              id: new Uint8Array(16),
              name: 'user@shopquest.com',
              displayName: 'ShopQuest User',
            },
            pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
            authenticatorSelection: {
              authenticatorAttachment: 'platform',
              userVerification: 'required',
            },
          },
        });
        
        if (credential) {
          setBiometricEnabled(true);
          setSecurityScore(prev => Math.min(100, prev + 10));
        }
      } catch (error) {
        console.error('Biometric setup failed:', error);
      }
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'login':
        return UserCheck;
      case 'password_change':
        return Key;
      case 'suspicious_activity':
        return AlertTriangle;
      case 'device_added':
        return Smartphone;
      default:
        return Activity;
    }
  };

  const getEventColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-success-400';
      case 'warning':
        return 'text-warning-400';
      case 'error':
        return 'text-error-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Security Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Security Score</h3>
            <p className="text-gray-400">Your account security level</p>
          </div>
          <div className="text-right">
            <div className="relative w-16 h-16">
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
                  animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - securityScore / 100) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={securityScore >= 80 ? 'text-success-400' : securityScore >= 60 ? 'text-warning-400' : 'text-error-400'}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-white">{securityScore}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-dark-700/30 rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <Lock className="w-5 h-5 text-success-400" />
              <span className="text-white font-medium">Strong Password</span>
            </div>
            <p className="text-gray-400 text-sm">Your password meets security requirements</p>
          </div>

          <div className="p-4 bg-dark-700/30 rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <Shield className={`w-5 h-5 ${twoFactorEnabled ? 'text-success-400' : 'text-warning-400'}`} />
              <span className="text-white font-medium">Two-Factor Auth</span>
            </div>
            <p className="text-gray-400 text-sm">
              {twoFactorEnabled ? 'Enabled and active' : 'Not enabled'}
            </p>
          </div>

          <div className="p-4 bg-dark-700/30 rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <Smartphone className={`w-5 h-5 ${biometricEnabled ? 'text-success-400' : 'text-gray-400'}`} />
              <span className="text-white font-medium">Biometric Login</span>
            </div>
            <p className="text-gray-400 text-sm">
              {biometricEnabled ? 'Fingerprint/Face ID enabled' : 'Not configured'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6">Security Settings</h3>
        
        <div className="space-y-6">
          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between p-4 bg-dark-700/30 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-brand-500/20 rounded-lg">
                <Shield className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={enableTwoFactor}
              disabled={twoFactorEnabled}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                twoFactorEnabled
                  ? 'bg-success-500/20 text-success-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-brand-500 to-brand-600 text-white hover:from-brand-600 hover:to-brand-700'
              }`}
            >
              {twoFactorEnabled ? 'Enabled' : 'Enable'}
            </motion.button>
          </div>

          {/* Biometric Authentication */}
          <div className="flex items-center justify-between p-4 bg-dark-700/30 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent-500/20 rounded-lg">
                <Smartphone className="w-5 h-5 text-accent-400" />
              </div>
              <div>
                <h4 className="text-white font-medium">Biometric Login</h4>
                <p className="text-gray-400 text-sm">Use fingerprint or face recognition to log in</p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={enableBiometric}
              disabled={biometricEnabled}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                biometricEnabled
                  ? 'bg-success-500/20 text-success-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700'
              }`}
            >
              {biometricEnabled ? 'Enabled' : 'Setup'}
            </motion.button>
          </div>

          {/* Session Management */}
          <div className="flex items-center justify-between p-4 bg-dark-700/30 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-warning-500/20 rounded-lg">
                <Globe className="w-5 h-5 text-warning-400" />
              </div>
              <div>
                <h4 className="text-white font-medium">Active Sessions</h4>
                <p className="text-gray-400 text-sm">Manage devices that are logged into your account</p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-warning-500/20 text-warning-400 rounded-lg hover:bg-warning-500/30 transition-colors"
            >
              Manage
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Security Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6">Recent Security Activity</h3>
        
        <div className="space-y-4">
          {securityEvents.map((event, index) => {
            const Icon = getEventIcon(event.type);
            const color = getEventColor(event.status);
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-dark-700/30 rounded-xl"
              >
                <div className="p-2 bg-dark-600/50 rounded-lg">
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                
                <div className="flex-1">
                  <p className="text-white font-medium">{event.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{event.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Globe className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                    <span>{event.device}</span>
                  </div>
                </div>
                
                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  event.status === 'success' ? 'bg-success-500/20 text-success-400' :
                  event.status === 'warning' ? 'bg-warning-500/20 text-warning-400' :
                  'bg-error-500/20 text-error-400'
                }`}>
                  {event.status.toUpperCase()}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default SecurityFeatures;