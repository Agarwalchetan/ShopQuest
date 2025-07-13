import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Play, 
  Pause,
  RotateCcw,
  Bug,
  Shield,
  Zap,
  Target,
  AlertTriangle
} from 'lucide-react';

interface TestResult {
  id: string;
  name: string;
  type: 'unit' | 'integration' | 'e2e' | 'performance' | 'security';
  status: 'passed' | 'failed' | 'running' | 'pending';
  duration: number;
  error?: string;
  coverage?: number;
}

interface TestSuite {
  name: string;
  tests: TestResult[];
  totalTests: number;
  passedTests: number;
  failedTests: number;
  coverage: number;
}

const TestingSuite: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [testSuites, setTestSuites] = useState<TestSuite[]>([
    {
      name: 'Unit Tests',
      totalTests: 156,
      passedTests: 152,
      failedTests: 4,
      coverage: 94.2,
      tests: [
        {
          id: '1',
          name: 'Cart functionality',
          type: 'unit',
          status: 'passed',
          duration: 45,
          coverage: 98,
        },
        {
          id: '2',
          name: 'User authentication',
          type: 'unit',
          status: 'passed',
          duration: 32,
          coverage: 95,
        },
        {
          id: '3',
          name: 'Payment processing',
          type: 'unit',
          status: 'failed',
          duration: 78,
          error: 'Stripe webhook validation failed',
          coverage: 87,
        },
      ],
    },
    {
      name: 'Integration Tests',
      totalTests: 89,
      passedTests: 85,
      failedTests: 4,
      coverage: 87.5,
      tests: [
        {
          id: '4',
          name: 'API endpoints',
          type: 'integration',
          status: 'passed',
          duration: 156,
          coverage: 92,
        },
        {
          id: '5',
          name: 'Database operations',
          type: 'integration',
          status: 'passed',
          duration: 234,
          coverage: 89,
        },
      ],
    },
    {
      name: 'E2E Tests',
      totalTests: 45,
      passedTests: 43,
      failedTests: 2,
      coverage: 78.3,
      tests: [
        {
          id: '6',
          name: 'Complete purchase flow',
          type: 'e2e',
          status: 'passed',
          duration: 2340,
          coverage: 85,
        },
        {
          id: '7',
          name: 'Live stream interaction',
          type: 'e2e',
          status: 'failed',
          duration: 1890,
          error: 'WebSocket connection timeout',
          coverage: 72,
        },
      ],
    },
  ]);

  const runAllTests = async () => {
    setIsRunning(true);
    
    // Simulate test execution
    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Update test status simulation
    }
    
    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return CheckCircle;
      case 'failed':
        return XCircle;
      case 'running':
        return Clock;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'text-success-400';
      case 'failed':
        return 'text-error-400';
      case 'running':
        return 'text-warning-400';
      default:
        return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'unit':
        return Target;
      case 'integration':
        return Zap;
      case 'e2e':
        return Play;
      case 'performance':
        return Clock;
      case 'security':
        return Shield;
      default:
        return Bug;
    }
  };

  const totalTests = testSuites.reduce((sum, suite) => sum + suite.totalTests, 0);
  const totalPassed = testSuites.reduce((sum, suite) => sum + suite.passedTests, 0);
  const totalFailed = testSuites.reduce((sum, suite) => sum + suite.failedTests, 0);
  const overallCoverage = testSuites.reduce((sum, suite) => sum + suite.coverage, 0) / testSuites.length;

  return (
    <div className="space-y-8">
      {/* Test Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-brand-500/20 rounded-xl">
              <Target className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalTests}</p>
              <p className="text-sm text-gray-400">Total Tests</p>
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
            <div className="p-3 bg-success-500/20 rounded-xl">
              <CheckCircle className="w-6 h-6 text-success-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalPassed}</p>
              <p className="text-sm text-gray-400">Passed</p>
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
            <div className="p-3 bg-error-500/20 rounded-xl">
              <XCircle className="w-6 h-6 text-error-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalFailed}</p>
              <p className="text-sm text-gray-400">Failed</p>
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
              <Shield className="w-6 h-6 text-accent-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{overallCoverage.toFixed(1)}%</p>
              <p className="text-sm text-gray-400">Coverage</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Test Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Test Suites</h2>
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={runAllTests}
            disabled={isRunning}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl hover:from-brand-600 hover:to-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-glow"
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Run All Tests</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Test Suites */}
      <div className="space-y-6">
        {testSuites.map((suite, index) => (
          <motion.div
            key={suite.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">{suite.name}</h3>
                <p className="text-gray-400">
                  {suite.passedTests}/{suite.totalTests} tests passed • {suite.coverage}% coverage
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                    <span className="text-sm text-success-400">{suite.passedTests} passed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-error-500 rounded-full"></div>
                    <span className="text-sm text-error-400">{suite.failedTests} failed</span>
                  </div>
                </div>
                
                <div className="w-16 h-16 relative">
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
                      animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - suite.coverage / 100) }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className={suite.coverage >= 90 ? 'text-success-400' : suite.coverage >= 70 ? 'text-warning-400' : 'text-error-400'}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{suite.coverage.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Individual Tests */}
            <div className="space-y-3">
              {suite.tests.map((test) => {
                const StatusIcon = getStatusIcon(test.status);
                const TypeIcon = getTypeIcon(test.type);
                const statusColor = getStatusColor(test.status);
                
                return (
                  <div
                    key={test.id}
                    className="flex items-center space-x-4 p-4 bg-dark-700/30 rounded-xl"
                  >
                    <StatusIcon className={`w-5 h-5 ${statusColor}`} />
                    
                    <div className="flex items-center space-x-2">
                      <TypeIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500 uppercase font-semibold">
                        {test.type}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-white font-medium">{test.name}</p>
                      {test.error && (
                        <p className="text-error-400 text-sm mt-1">{test.error}</p>
                      )}
                    </div>
                    
                    <div className="text-right text-sm text-gray-400">
                      <p>{test.duration}ms</p>
                      {test.coverage && (
                        <p>{test.coverage}% coverage</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TestingSuite;