import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GitBranch, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Play,
  Pause,
  RotateCcw,
  Upload,
  Download,
  Server,
  Globe,
  Shield,
  Zap
} from 'lucide-react';

interface PipelineStage {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
  duration: number;
  startTime?: string;
  logs?: string[];
}

interface Pipeline {
  id: string;
  branch: string;
  commit: string;
  author: string;
  message: string;
  status: 'pending' | 'running' | 'success' | 'failed';
  stages: PipelineStage[];
  createdAt: string;
  duration: number;
}

const CICDPipeline: React.FC = () => {
  const [pipelines, setPipelines] = useState<Pipeline[]>([
    {
      id: '1',
      branch: 'main',
      commit: 'a1b2c3d',
      author: 'Developer',
      message: 'Add advanced gamification features',
      status: 'success',
      createdAt: '2 hours ago',
      duration: 480,
      stages: [
        {
          id: 'build',
          name: 'Build',
          status: 'success',
          duration: 120,
          startTime: '2 hours ago',
        },
        {
          id: 'test',
          name: 'Test',
          status: 'success',
          duration: 180,
          startTime: '2 hours ago',
        },
        {
          id: 'security',
          name: 'Security Scan',
          status: 'success',
          duration: 90,
          startTime: '2 hours ago',
        },
        {
          id: 'deploy',
          name: 'Deploy',
          status: 'success',
          duration: 90,
          startTime: '2 hours ago',
        },
      ],
    },
    {
      id: '2',
      branch: 'feature/payment-integration',
      commit: 'x9y8z7w',
      author: 'Developer',
      message: 'Implement Stripe payment processing',
      status: 'running',
      createdAt: '30 minutes ago',
      duration: 0,
      stages: [
        {
          id: 'build',
          name: 'Build',
          status: 'success',
          duration: 115,
          startTime: '30 minutes ago',
        },
        {
          id: 'test',
          name: 'Test',
          status: 'running',
          duration: 0,
          startTime: '25 minutes ago',
        },
        {
          id: 'security',
          name: 'Security Scan',
          status: 'pending',
          duration: 0,
        },
        {
          id: 'deploy',
          name: 'Deploy',
          status: 'pending',
          duration: 0,
        },
      ],
    },
  ]);

  const [selectedPipeline, setSelectedPipeline] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return CheckCircle;
      case 'failed':
        return XCircle;
      case 'running':
        return Clock;
      case 'pending':
        return Clock;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-success-400';
      case 'failed':
        return 'text-error-400';
      case 'running':
        return 'text-warning-400';
      case 'pending':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStageIcon = (stageName: string) => {
    switch (stageName.toLowerCase()) {
      case 'build':
        return Upload;
      case 'test':
        return Zap;
      case 'security scan':
        return Shield;
      case 'deploy':
        return Globe;
      default:
        return Server;
    }
  };

  const triggerPipeline = () => {
    const newPipeline: Pipeline = {
      id: Date.now().toString(),
      branch: 'main',
      commit: 'new123',
      author: 'Developer',
      message: 'Manual trigger',
      status: 'running',
      createdAt: 'now',
      duration: 0,
      stages: [
        {
          id: 'build',
          name: 'Build',
          status: 'running',
          duration: 0,
          startTime: 'now',
        },
        {
          id: 'test',
          name: 'Test',
          status: 'pending',
          duration: 0,
        },
        {
          id: 'security',
          name: 'Security Scan',
          status: 'pending',
          duration: 0,
        },
        {
          id: 'deploy',
          name: 'Deploy',
          status: 'pending',
          duration: 0,
        },
      ],
    };

    setPipelines(prev => [newPipeline, ...prev]);
  };

  return (
    <div className="space-y-8">
      {/* Pipeline Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">CI/CD Pipeline</h2>
          <p className="text-gray-400">Automated build, test, and deployment pipeline</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={triggerPipeline}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all duration-300 shadow-glow"
        >
          <Play className="w-4 h-4" />
          <span>Trigger Pipeline</span>
        </motion.button>
      </div>

      {/* Pipeline Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-success-500/20 rounded-xl">
              <CheckCircle className="w-6 h-6 text-success-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">24</p>
              <p className="text-sm text-gray-400">Successful Builds</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-error-500/20 rounded-xl">
              <XCircle className="w-6 h-6 text-error-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">2</p>
              <p className="text-sm text-gray-400">Failed Builds</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-brand-500/20 rounded-xl">
              <Clock className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">4.2m</p>
              <p className="text-sm text-gray-400">Avg Build Time</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-accent-500/20 rounded-xl">
              <Globe className="w-6 h-6 text-accent-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-sm text-gray-400">Deployments Today</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pipeline List */}
      <div className="space-y-4">
        {pipelines.map((pipeline, index) => {
          const StatusIcon = getStatusIcon(pipeline.status);
          const statusColor = getStatusColor(pipeline.status);
          
          return (
            <motion.div
              key={pipeline.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-brand-500/50 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedPipeline(selectedPipeline === pipeline.id ? null : pipeline.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <StatusIcon className={`w-6 h-6 ${statusColor}`} />
                  <div>
                    <div className="flex items-center space-x-2">
                      <GitBranch className="w-4 h-4 text-gray-400" />
                      <span className="text-white font-semibold">{pipeline.branch}</span>
                      <span className="text-gray-400">#{pipeline.commit}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{pipeline.message}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-white font-medium">{pipeline.author}</p>
                  <p className="text-gray-400 text-sm">{pipeline.createdAt}</p>
                  {pipeline.duration > 0 && (
                    <p className="text-gray-500 text-xs">{Math.floor(pipeline.duration / 60)}m {pipeline.duration % 60}s</p>
                  )}
                </div>
              </div>

              {/* Pipeline Stages */}
              <div className="flex items-center space-x-2 mb-4">
                {pipeline.stages.map((stage, stageIndex) => {
                  const StageIcon = getStageIcon(stage.name);
                  const stageStatusColor = getStatusColor(stage.status);
                  
                  return (
                    <div key={stage.id} className="flex items-center">
                      <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                        stage.status === 'success' ? 'bg-success-500/20' :
                        stage.status === 'failed' ? 'bg-error-500/20' :
                        stage.status === 'running' ? 'bg-warning-500/20' :
                        'bg-gray-500/20'
                      }`}>
                        <StageIcon className={`w-4 h-4 ${stageStatusColor}`} />
                        <span className={`text-sm font-medium ${stageStatusColor}`}>
                          {stage.name}
                        </span>
                        {stage.status === 'running' && (
                          <div className="w-3 h-3 border border-warning-400 border-t-transparent rounded-full animate-spin" />
                        )}
                      </div>
                      
                      {stageIndex < pipeline.stages.length - 1 && (
                        <div className="w-8 h-px bg-gray-600 mx-2" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Expanded Details */}
              {selectedPipeline === pipeline.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/10 pt-4 mt-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {pipeline.stages.map((stage) => (
                      <div key={stage.id} className="p-4 bg-dark-700/30 rounded-xl">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`w-3 h-3 rounded-full ${
                            stage.status === 'success' ? 'bg-success-500' :
                            stage.status === 'failed' ? 'bg-error-500' :
                            stage.status === 'running' ? 'bg-warning-500' :
                            'bg-gray-500'
                          }`} />
                          <span className="text-white font-medium">{stage.name}</span>
                        </div>
                        
                        <div className="space-y-1 text-sm text-gray-400">
                          <p>Status: <span className={getStatusColor(stage.status)}>{stage.status}</span></p>
                          {stage.duration > 0 && (
                            <p>Duration: {stage.duration}s</p>
                          )}
                          {stage.startTime && (
                            <p>Started: {stage.startTime}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CICDPipeline;