import React from 'react';
import { motion } from 'framer-motion';
import UserAnalytics from '../components/analytics/UserAnalytics';

const AnalyticsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-gray-400">Track your shopping journey and achievements</p>
        </motion.div>

        <UserAnalytics />
      </div>
    </div>
  );
};

export default AnalyticsPage;