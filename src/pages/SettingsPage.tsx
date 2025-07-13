import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  CreditCard,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Lock
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'appearance' | 'account'>('profile');
  const [darkMode, setDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState('public');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'account', label: 'Account', icon: Settings },
  ];

  const notificationSettings = [
    {
      id: 'achievements',
      title: 'Achievement Notifications',
      description: 'Get notified when you unlock new achievements',
      enabled: true,
    },
    {
      id: 'quests',
      title: 'Quest Updates',
      description: 'Receive updates about quest progress and completions',
      enabled: true,
    },
    {
      id: 'streams',
      title: 'Live Stream Alerts',
      description: 'Get notified when followed streamers go live',
      enabled: false,
    },
    {
      id: 'purchases',
      title: 'Purchase Confirmations',
      description: 'Receive confirmations for your purchases',
      enabled: true,
    },
    {
      id: 'promotions',
      title: 'Promotional Offers',
      description: 'Get notified about special deals and promotions',
      enabled: false,
    },
  ];

  const privacySettings = [
    {
      id: 'profile_visibility',
      title: 'Profile Visibility',
      description: 'Control who can see your profile information',
      type: 'select',
      value: profileVisibility,
      options: [
        { value: 'public', label: 'Public' },
        { value: 'friends', label: 'Friends Only' },
        { value: 'private', label: 'Private' },
      ],
    },
    {
      id: 'activity_tracking',
      title: 'Activity Tracking',
      description: 'Allow tracking of your shopping activity for personalized recommendations',
      type: 'toggle',
      enabled: true,
    },
    {
      id: 'data_sharing',
      title: 'Data Sharing',
      description: 'Share anonymized data to help improve the platform',
      type: 'toggle',
      enabled: false,
    },
  ];

  return (
    <div className="min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account preferences and privacy settings</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-3"
          >
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Username
                        </label>
                        <input
                          type="text"
                          defaultValue="ShopQuestUser"
                          className="w-full px-4 py-3 bg-dark-700/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all duration-300"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="user@shopquest.com"
                          className="w-full px-4 py-3 bg-dark-700/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about yourself..."
                        className="w-full px-4 py-3 bg-dark-700/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all duration-300 resize-none"
                      />
                    </div>

                    <div className="flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300"
                      >
                        Save Changes
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    {/* Global Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-brand-400" />
                          <div>
                            <p className="text-white font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-400">Receive notifications via email</p>
                          </div>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setEmailNotifications(!emailNotifications)}
                          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                            emailNotifications ? 'bg-brand-500' : 'bg-gray-600'
                          }`}
                        >
                          <motion.div
                            animate={{ x: emailNotifications ? 24 : 2 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                          />
                        </motion.button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="w-5 h-5 text-brand-400" />
                          <div>
                            <p className="text-white font-medium">Push Notifications</p>
                            <p className="text-sm text-gray-400">Receive push notifications</p>
                          </div>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setPushNotifications(!pushNotifications)}
                          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                            pushNotifications ? 'bg-brand-500' : 'bg-gray-600'
                          }`}
                        >
                          <motion.div
                            animate={{ x: pushNotifications ? 24 : 2 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                          />
                        </motion.button>
                      </div>
                    </div>

                    {/* Specific Notifications */}
                    <div className="space-y-4">
                      {notificationSettings.map((setting, index) => (
                        <motion.div
                          key={setting.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-dark-700/30 rounded-xl"
                        >
                          <div>
                            <p className="text-white font-medium">{setting.title}</p>
                            <p className="text-sm text-gray-400">{setting.description}</p>
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                              setting.enabled ? 'bg-brand-500' : 'bg-gray-600'
                            }`}
                          >
                            <motion.div
                              animate={{ x: setting.enabled ? 24 : 2 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                            />
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Privacy & Security</h2>
                  
                  <div className="space-y-6">
                    {privacySettings.map((setting, index) => (
                      <motion.div
                        key={setting.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-dark-700/30 rounded-xl"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">{setting.title}</p>
                            <p className="text-sm text-gray-400">{setting.description}</p>
                          </div>
                          
                          {setting.type === 'select' && (
                            <select
                              value={setting.value}
                              onChange={(e) => setProfileVisibility(e.target.value)}
                              className="px-4 py-2 bg-dark-600 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                            >
                              {setting.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          )}
                          
                          {setting.type === 'toggle' && (
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                                setting.enabled ? 'bg-brand-500' : 'bg-gray-600'
                              }`}
                            >
                              <motion.div
                                animate={{ x: setting.enabled ? 24 : 2 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                              />
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Security</h3>
                  
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-4 bg-dark-700/30 rounded-xl hover:bg-dark-700/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Lock className="w-5 h-5 text-brand-400" />
                        <div className="text-left">
                          <p className="text-white font-medium">Change Password</p>
                          <p className="text-sm text-gray-400">Update your account password</p>
                        </div>
                      </div>
                      <span className="text-gray-400">→</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-4 bg-dark-700/30 rounded-xl hover:bg-dark-700/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-brand-400" />
                        <div className="text-left">
                          <p className="text-white font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-400">Add an extra layer of security</p>
                        </div>
                      </div>
                      <span className="text-gray-400">→</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Appearance Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-dark-700/30 rounded-xl">
                      <div className="flex items-center space-x-3">
                        {darkMode ? <Moon className="w-5 h-5 text-brand-400" /> : <Sun className="w-5 h-5 text-brand-400" />}
                        <div>
                          <p className="text-white font-medium">Dark Mode</p>
                          <p className="text-sm text-gray-400">Use dark theme for better viewing</p>
                        </div>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDarkMode(!darkMode)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                          darkMode ? 'bg-brand-500' : 'bg-gray-600'
                        }`}
                      >
                        <motion.div
                          animate={{ x: darkMode ? 24 : 2 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                        />
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-dark-700/30 rounded-xl">
                      <div className="flex items-center space-x-3">
                        {soundEnabled ? <Volume2 className="w-5 h-5 text-brand-400" /> : <VolumeX className="w-5 h-5 text-brand-400" />}
                        <div>
                          <p className="text-white font-medium">Sound Effects</p>
                          <p className="text-sm text-gray-400">Play sounds for interactions</p>
                        </div>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                          soundEnabled ? 'bg-brand-500' : 'bg-gray-600'
                        }`}
                      >
                        <motion.div
                          animate={{ x: soundEnabled ? 24 : 2 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                        />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6">
                <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Account Management</h2>
                  
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-4 bg-dark-700/30 rounded-xl hover:bg-dark-700/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-brand-400" />
                        <div className="text-left">
                          <p className="text-white font-medium">Payment Methods</p>
                          <p className="text-sm text-gray-400">Manage your payment options</p>
                        </div>
                      </div>
                      <span className="text-gray-400">→</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-4 bg-dark-700/30 rounded-xl hover:bg-dark-700/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-brand-400" />
                        <div className="text-left">
                          <p className="text-white font-medium">Language & Region</p>
                          <p className="text-sm text-gray-400">Set your preferred language</p>
                        </div>
                      </div>
                      <span className="text-gray-400">→</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-4 bg-dark-700/30 rounded-xl hover:bg-dark-700/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <HelpCircle className="w-5 h-5 text-brand-400" />
                        <div className="text-left">
                          <p className="text-white font-medium">Help & Support</p>
                          <p className="text-sm text-gray-400">Get help with your account</p>
                        </div>
                      </div>
                      <span className="text-gray-400">→</span>
                    </motion.button>
                  </div>
                </div>

                <div className="bg-dark-800/50 backdrop-blur-sm border border-error-500/30 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-error-400 mb-4">Danger Zone</h3>
                  
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-4 bg-error-500/10 border border-error-500/30 rounded-xl hover:bg-error-500/20 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <LogOut className="w-5 h-5 text-error-400" />
                        <div className="text-left">
                          <p className="text-error-400 font-medium">Delete Account</p>
                          <p className="text-sm text-gray-400">Permanently delete your account</p>
                        </div>
                      </div>
                      <span className="text-error-400">→</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;