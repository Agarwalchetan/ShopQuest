import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, 
  Award, 
  Sparkles, 
  Crown,
  Star,
  Gift,
  Zap,
  TrendingUp,
  Lock,
  Unlock,
  ExternalLink,
  Copy,
  Wallet
} from 'lucide-react';

interface NFTReward {
  id: string;
  name: string;
  description: string;
  image: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  category: 'Achievement' | 'Seasonal' | 'Exclusive' | 'Community';
  owned: boolean;
  mintDate?: string;
  tokenId?: string;
  value: number;
  transferable: boolean;
  utility: string[];
}

interface CryptoWallet {
  address: string;
  balance: {
    eth: number;
    shopToken: number;
    nfts: number;
  };
  connected: boolean;
}

const NFTRewards: React.FC = () => {
  const [nftRewards, setNftRewards] = useState<NFTReward[]>([]);
  const [wallet, setWallet] = useState<CryptoWallet | null>(null);
  const [selectedNFT, setSelectedNFT] = useState<NFTReward | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeTab, setActiveTab] = useState<'owned' | 'available' | 'marketplace'>('owned');

  useEffect(() => {
    loadNFTRewards();
    checkWalletConnection();
  }, []);

  const loadNFTRewards = () => {
    const mockNFTs: NFTReward[] = [
      {
        id: '1',
        name: 'Golden Shopper Crown',
        description: 'Exclusive NFT for reaching Level 50 in ShopQuest',
        image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=300',
        rarity: 'Legendary',
        category: 'Achievement',
        owned: true,
        mintDate: '2024-03-15',
        tokenId: '#1247',
        value: 2.5,
        transferable: true,
        utility: ['10% discount on all purchases', 'VIP customer support', 'Early access to sales'],
      },
      {
        id: '2',
        name: 'Stream Master Badge',
        description: 'Awarded for watching 1000+ hours of live streams',
        image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=300',
        rarity: 'Epic',
        category: 'Achievement',
        owned: true,
        mintDate: '2024-02-28',
        tokenId: '#892',
        value: 1.2,
        transferable: true,
        utility: ['Access to exclusive streams', 'Priority chat messages'],
      },
      {
        id: '3',
        name: 'Holiday 2024 Ornament',
        description: 'Limited edition holiday NFT - only 500 minted',
        image: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=300',
        rarity: 'Rare',
        category: 'Seasonal',
        owned: false,
        value: 0.8,
        transferable: true,
        utility: ['Seasonal profile decoration', 'Holiday event access'],
      },
      {
        id: '4',
        name: 'Founder\'s Genesis Token',
        description: 'Original ShopQuest founder NFT with unique benefits',
        image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=300',
        rarity: 'Mythic',
        category: 'Exclusive',
        owned: false,
        value: 10.0,
        transferable: false,
        utility: ['Lifetime premium benefits', 'Governance voting rights', 'Revenue sharing'],
      },
    ];

    setNftRewards(mockNFTs);
  };

  const checkWalletConnection = () => {
    // Mock wallet connection check
    const mockWallet: CryptoWallet = {
      address: '0x742d35Cc6634C0532925a3b8D4C9db96590b5',
      balance: {
        eth: 1.2345,
        shopToken: 2500,
        nfts: 12,
      },
      connected: true,
    };
    setWallet(mockWallet);
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockWallet: CryptoWallet = {
      address: '0x742d35Cc6634C0532925a3b8D4C9db96590b5',
      balance: {
        eth: 1.2345,
        shopToken: 2500,
        nfts: 12,
      },
      connected: true,
    };
    
    setWallet(mockWallet);
    setIsConnecting(false);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return 'text-gray-400 border-gray-500/30 bg-gray-500/10';
      case 'Rare':
        return 'text-brand-400 border-brand-500/30 bg-brand-500/10';
      case 'Epic':
        return 'text-accent-400 border-accent-500/30 bg-accent-500/10';
      case 'Legendary':
        return 'text-warning-400 border-warning-500/30 bg-warning-500/10';
      case 'Mythic':
        return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
      default:
        return 'text-gray-400 border-gray-500/30 bg-gray-500/10';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return Crown;
      case 'Mythic':
        return Sparkles;
      case 'Epic':
        return Award;
      default:
        return Star;
    }
  };

  const copyAddress = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address);
    }
  };

  const filteredNFTs = nftRewards.filter(nft => {
    switch (activeTab) {
      case 'owned':
        return nft.owned;
      case 'available':
        return !nft.owned;
      case 'marketplace':
        return nft.transferable;
      default:
        return true;
    }
  });

  return (
    <div className="space-y-8">
      {/* Wallet Connection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-brand-500/20 to-accent-500/20 rounded-xl">
              <Wallet className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Crypto Wallet</h2>
              <p className="text-gray-400">Manage your NFTs and tokens</p>
            </div>
          </div>
          
          {!wallet?.connected ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={connectWallet}
              disabled={isConnecting}
              className="px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl disabled:opacity-50 transition-all duration-300 shadow-glow"
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </motion.button>
          ) : (
            <div className="flex items-center space-x-2 text-success-400">
              <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse" />
              <span className="font-medium">Connected</span>
            </div>
          )}
        </div>

        {wallet?.connected && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-dark-700/30 rounded-xl">
              <p className="text-2xl font-bold text-white">{wallet.balance.eth.toFixed(4)}</p>
              <p className="text-sm text-gray-400">ETH</p>
            </div>
            <div className="text-center p-4 bg-dark-700/30 rounded-xl">
              <p className="text-2xl font-bold text-brand-400">{wallet.balance.shopToken.toLocaleString()}</p>
              <p className="text-sm text-gray-400">SHOP Tokens</p>
            </div>
            <div className="text-center p-4 bg-dark-700/30 rounded-xl">
              <p className="text-2xl font-bold text-accent-400">{wallet.balance.nfts}</p>
              <p className="text-sm text-gray-400">NFTs Owned</p>
            </div>
            <div className="text-center p-4 bg-dark-700/30 rounded-xl">
              <div className="flex items-center justify-center space-x-2">
                <p className="text-sm text-gray-300 truncate">{wallet.address}</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={copyAddress}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-3 h-3" />
                </motion.button>
              </div>
              <p className="text-xs text-gray-500">Wallet Address</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* NFT Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex space-x-1 bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-1"
      >
        {[
          { id: 'owned', label: 'My NFTs', count: nftRewards.filter(n => n.owned).length },
          { id: 'available', label: 'Available', count: nftRewards.filter(n => !n.owned).length },
          { id: 'marketplace', label: 'Marketplace', count: nftRewards.filter(n => n.transferable).length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-brand-500 text-white shadow-glow'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{tab.count}</span>
          </button>
        ))}
      </motion.div>

      {/* NFT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNFTs.map((nft, index) => {
          const RarityIcon = getRarityIcon(nft.rarity);
          const rarityColor = getRarityColor(nft.rarity);
          
          return (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setSelectedNFT(nft)}
              className={`bg-dark-800/50 backdrop-blur-sm border rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-glow ${
                nft.owned ? 'border-white/10' : 'border-gray-600/30 opacity-75'
              }`}
            >
              {/* NFT Image */}
              <div className="relative aspect-square">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Rarity Badge */}
                <div className={`absolute top-3 left-3 flex items-center space-x-1 px-3 py-1 rounded-full border ${rarityColor}`}>
                  <RarityIcon className="w-3 h-3" />
                  <span className="text-xs font-bold">{nft.rarity}</span>
                </div>

                {/* Owned Badge */}
                {nft.owned && (
                  <div className="absolute top-3 right-3 p-2 bg-success-500 rounded-full">
                    <Unlock className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Value */}
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1 text-white">
                    <Coins className="w-3 h-3" />
                    <span className="text-sm font-bold">{nft.value} ETH</span>
                  </div>
                </div>
              </div>

              {/* NFT Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">{nft.name}</h3>
                  {nft.tokenId && (
                    <span className="text-xs text-gray-400">{nft.tokenId}</span>
                  )}
                </div>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{nft.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    nft.category === 'Achievement' ? 'bg-success-500/20 text-success-400' :
                    nft.category === 'Seasonal' ? 'bg-warning-500/20 text-warning-400' :
                    nft.category === 'Exclusive' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-brand-500/20 text-brand-400'
                  }`}>
                    {nft.category}
                  </span>
                  
                  {nft.transferable && (
                    <div className="flex items-center space-x-1 text-brand-400">
                      <ExternalLink className="w-3 h-3" />
                      <span className="text-xs">Tradeable</span>
                    </div>
                  )}
                </div>

                {/* Utility Preview */}
                {nft.utility.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-400 mb-2">Utility:</p>
                    <div className="flex flex-wrap gap-1">
                      {nft.utility.slice(0, 2).map((util, i) => (
                        <span key={i} className="text-xs bg-dark-700/50 text-gray-300 px-2 py-1 rounded">
                          {util}
                        </span>
                      ))}
                      {nft.utility.length > 2 && (
                        <span className="text-xs text-brand-400">+{nft.utility.length - 2} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredNFTs.length === 0 && (
        <div className="text-center py-12">
          <Gift className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            {activeTab === 'owned' ? 'No NFTs Owned' : 
             activeTab === 'available' ? 'No NFTs Available' : 
             'No NFTs in Marketplace'}
          </h3>
          <p className="text-gray-400 mb-6">
            {activeTab === 'owned' ? 'Complete quests and achievements to earn your first NFT!' :
             activeTab === 'available' ? 'Check back later for new NFT drops' :
             'No tradeable NFTs available at the moment'}
          </p>
          {activeTab === 'owned' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-glow"
            >
              Explore Quests
            </motion.button>
          )}
        </div>
      )}

      {/* NFT Detail Modal */}
      {selectedNFT && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-800/95 backdrop-blur-xl border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">{selectedNFT.name}</h2>
                <button
                  onClick={() => setSelectedNFT(null)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedNFT.image}
                    alt={selectedNFT.name}
                    className="w-full aspect-square object-cover rounded-2xl"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                    <p className="text-gray-400">{selectedNFT.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Utility Benefits</h3>
                    <div className="space-y-2">
                      {selectedNFT.utility.map((util, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-accent-400" />
                          <span className="text-gray-300">{util}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Value</p>
                      <p className="text-white font-bold">{selectedNFT.value} ETH</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Rarity</p>
                      <p className="text-white font-bold">{selectedNFT.rarity}</p>
                    </div>
                  </div>
                  
                  {selectedNFT.owned && (
                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl transition-all duration-300"
                      >
                        View on OpenSea
                      </motion.button>
                      
                      {selectedNFT.transferable && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3 bg-accent-500/20 border border-accent-500/30 text-accent-400 font-semibold rounded-xl hover:bg-accent-500/30 transition-all duration-300"
                        >
                          List for Sale
                        </motion.button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default NFTRewards;