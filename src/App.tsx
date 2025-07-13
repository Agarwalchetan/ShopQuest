import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/api';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import StreamPage from './pages/StreamPage';
import DashboardPage from './pages/DashboardPage';
import ShopPage from './pages/ShopPage';
import QuestsPage from './pages/QuestsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AdminPage from './pages/AdminPage';
import DevOpsPage from './pages/DevOpsPage';
import AIPage from './pages/AIPage';
import BlockchainPage from './pages/BlockchainPage';
import ToastContainer from './components/ui/ToastContainer';
import CartPanel from './components/cart/CartPanel';
import MobileOptimization from './components/mobile/MobileOptimization';
import { ShoppingBag } from 'lucide-react';
import { useCart } from './hooks/useCart';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();

  return (
    <QueryClientProvider client={queryClient}>
      <MobileOptimization>
        <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 relative overflow-hidden">
          {/* Background Effects */}
          <div className="fixed inset-0 bg-mesh-gradient opacity-5 pointer-events-none" />
          <div className="fixed inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-accent-500/5 pointer-events-none" />
          
          {/* Floating Orbs */}
          <div className="fixed top-20 left-20 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl animate-float pointer-events-none" />
          <div className="fixed bottom-20 right-20 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-brand-600/5 rounded-full blur-3xl animate-pulse pointer-events-none" />

          <Header />
          
          {/* Floating Cart Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300 lg:block hidden"
          >
            <ShoppingBag className="w-6 h-6" />
            {getTotalItems() > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
              >
                {getTotalItems() > 9 ? '9+' : getTotalItems()}
              </motion.span>
            )}
          </motion.button>
          
          <AnimatePresence mode="wait">
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/stream/:id" element={<StreamPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/quests" element={<QuestsPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/devops" element={<DevOpsPage />} />
                <Route path="/ai" element={<AIPage />} />
                <Route path="/blockchain" element={<BlockchainPage />} />
              </Routes>
            </motion.main>
          </AnimatePresence>

          {/* Cart Panel */}
          <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

          {/* Toast Container */}
          <ToastContainer />
        </div>
      </MobileOptimization>
    </QueryClientProvider>
  );
}

export default App;