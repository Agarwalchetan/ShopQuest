import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Server,
  Database,
  Globe,
  Zap,
  Users,
  TrendingUp,
  TrendingDown,
  Wifi,
  HardDrive
} from 'lucide-react';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  history: number[];
}

interface Alert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
  service: string;
}

const MonitoringDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    {
      name: 'CPU Usage',
      value: 45.2,
      unit: '%',
      status: 'healthy',
      trend: 'stable',
      history: [42, 44, 43, 45, 46, 45, 45],
    },
    {
      name: 'Memory Usage',
      value: 67.8,
      unit: '%',
      status: 'warning',
      trend: 'up',
      history: [60, 62, 64, 66, 67, 68, 68],
    },
    {
      name: 'Disk Usage',
      value: 23.4,
      unit: '%',
      status: 'healthy',
      trend: 'stable',
      history: [22, 23, 23, 24, 23, 23, 23],
    },
    {
      name: 'Network I/O',
      value: 156.7,
      unit: 'MB/s',
      status: 'healthy',
      trend: 'up',
      history: [120, 130, 140, 150, 155, 157, 157],
    },
    {
      name: 'Response Time',
      value: 245,
      unit: 'ms',
      status: 'healthy',
      trend: 'down',
      history: [280, 270, 260, 250, 245, 245, 245],
    },
    {
      name: 'Error Rate',
      value: 0.12,
      unit: '%',
      status: 'healthy',
      trend: 'stable',
      history: [0.1, 0.11, 0.12, 0.12, 0.12, 0.12, 0.12],
    },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      severity: 'medium',
      title: 'High Memory Usage',
      description: 'Memory usage has exceeded 65% threshold',
      timestamp: '5 minutes ago',
      resolved: false,
      service: 'API Server',
    },
    {
      id: '2',
      severity: 'low',
      title: 'Slow Database Query',
      description: 'Query execution time increased by 15%',
      timestamp: '12 minutes ago',
      resolved: false,
      service: 'Database',
    },
    {
      id: '3',
      severity: 'high',
      title: 'Payment Service Timeout',
      description: 'Stripe webhook response timeout',
      timestamp: '1 hour ago',
      resolved: true,
      service: 'Payment Gateway',
    },
  ]);

  const [uptime, setUptime] = useState(99.97);
  const [activeUsers, setActiveUsers] = useState(3247);

  useEffect(() => {
    // Simulate real-time metric updates
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + (Math.random() - 0.5) * 2,
        history: [...metric.history.slice(1), metric.value],
      })));
      
      setActiveUsers(prev => prev + Math.floor(Math.random() * 20) - 10);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-success-400';
      case 'warning':
        return 'text-warning-400';
      case 'critical':
        return 'text-error-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return CheckCircle;
      case 'warning':
        return AlertTriangle;
      case 'critical':
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return TrendingUp;
      case 'down':
        return TrendingDown;
      default:
        return Activity;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'medium':
        return 'bg-warning-500/20 text-warning-400 border-warning-500/30';
      case 'high':
        return 'bg-error-500/20 text-error-400 border-error-500/30';
      case 'critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  return (
    <div className="space-y-8">
      {/* System Overview */}
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
              <p className="text-2xl font-bold text-white">{uptime}%</p>
              <p className="text-sm text-gray-400">Uptime</p>
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
            <div className="p-3 bg-brand-500/20 rounded-xl">
              <Users className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{activeUsers.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Active Users</p>
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
            <div className="p-3 bg-accent-500/20 rounded-xl">
              <Server className="w-6 h-6 text-accent-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">8</p>
              <p className="text-sm text-gray-400">Services Online</p>
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
            <div className="p-3 bg-warning-500/20 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-warning-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{alerts.filter(a => !a.resolved).length}</p>
              <p className="text-sm text-gray-400">Active Alerts</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* System Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6">System Metrics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => {
            const StatusIcon = getStatusIcon(metric.status);
            const TrendIcon = getTrendIcon(metric.trend);
            const statusColor = getStatusColor(metric.status);
            
            return (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-dark-700/30 rounded-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">{metric.name}</h4>
                  <div className="flex items-center space-x-2">
                    <StatusIcon className={`w-4 h-4 ${statusColor}`} />
                    <TrendIcon className={`w-4 h-4 ${
                      metric.trend === 'up' ? 'text-success-400' :
                      metric.trend === 'down' ? 'text-error-400' :
                      'text-gray-400'
                    }`} />
                  </div>
                </div>
                
                <div className="flex items-baseline space-x-2 mb-3">
                  <span className="text-2xl font-bold text-white">
                    {metric.value.toFixed(1)}
                  </span>
                  <span className="text-gray-400 text-sm">{metric.unit}</span>
                </div>
                
                {/* Mini Chart */}
                <div className="h-8 flex items-end space-x-1">
                  {metric.history.map((value, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-brand-500/30 rounded-t"
                      style={{ 
                        height: `${(value / Math.max(...metric.history)) * 100}%`,
                        minHeight: '2px'
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6">System Alerts</h3>
        
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border ${
                alert.resolved 
                  ? 'bg-gray-500/10 border-gray-500/30 opacity-60' 
                  : 'bg-dark-700/30 border-white/10'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(alert.severity)}`}>
                    {alert.severity.toUpperCase()}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`font-semibold ${alert.resolved ? 'text-gray-400' : 'text-white'}`}>
                      {alert.title}
                    </h4>
                    <p className="text-gray-400 text-sm mt-1">{alert.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{alert.service}</span>
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                {!alert.resolved && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => resolveAlert(alert.id)}
                    className="px-3 py-1 bg-success-500/20 text-success-400 text-sm font-medium rounded-lg hover:bg-success-500/30 transition-colors"
                  >
                    Resolve
                  </motion.button>
                )}
                
                {alert.resolved && (
                  <div className="flex items-center space-x-1 text-success-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Resolved</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MonitoringDashboard;