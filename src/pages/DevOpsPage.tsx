import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Database, 
  Shield, 
  Activity,
  GitBranch,
  TestTube,
  FileText,
  Settings
} from 'lucide-react';
import TestingSuite from '../components/testing/TestingSuite';
import CICDPipeline from '../components/cicd/CICDPipeline';
import MonitoringDashboard from '../components/monitoring/MonitoringDashboard';
import ContentManagement from '../components/content/ContentManagement';

const DevOpsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'testing' | 'cicd' | 'monitoring' | 'content'>('testing');

  const tabs = [
    { id: 'testing', label: 'Testing', icon: TestTube },
    { id: 'cicd', label: 'CI/CD', icon: GitBranch },
    { id: 'monitoring', label: 'Monitoring', icon: Activity },
    { id: 'content', label: 'Content', icon: FileText },
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
          <h1 className="text-3xl font-bold text-white mb-2">DevOps & Operations</h1>
          <p className="text-gray-400">Development operations, testing, and content management</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-brand-500 text-white shadow-glow'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'testing' && <TestingSuite />}
          {activeTab === 'cicd' && <CICDPipeline />}
          {activeTab === 'monitoring' && <MonitoringDashboard />}
          {activeTab === 'content' && <ContentManagement />}
        </motion.div>
      </div>
    </div>
  );
};

export default DevOpsPage;