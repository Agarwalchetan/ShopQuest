// API Service for ShopQuest Platform
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Mock API endpoints - replace with real backend URLs
const API_BASE_URL = 'https://api.shopquest.com/v1';

// Types
export interface Stream {
  id: string;
  title: string;
  streamer: {
    id: string;
    name: string;
    avatar: string;
    followers: number;
    level: number;
    verified: boolean;
  };
  thumbnail: string;
  viewers: number;
  category: string;
  tags: string[];
  isLive: boolean;
  startedAt: string;
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  discount?: number;
  category: string;
  inStock: boolean;
  fastShipping?: boolean;
  description: string;
  features: string[];
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special' | 'achievement';
  progress: number;
  target: number;
  reward: number;
  timeLeft?: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  completed: boolean;
  icon?: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: string;
  avatar: string;
  points?: number;
  level?: number;
  badge: string;
  change?: string;
  purchases?: number;
  totalSpent?: number;
  hoursWatched?: number;
  streamsJoined?: number;
  isCurrentUser?: boolean;
}

// API Functions
export const api = {
  // Streams
  getStreams: async (): Promise<Stream[]> => {
    // Mock data - replace with actual API call
    return [
      {
        id: '1',
        title: 'Tech Gadgets Showcase - Latest iPhone Accessories',
        streamer: {
          id: '1',
          name: 'TechGuru Mike',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
          followers: 45200,
          level: 15,
          verified: true,
        },
        thumbnail: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800',
        viewers: 2847,
        category: 'Electronics',
        tags: ['Tech', 'Gadgets', 'iPhone', 'Accessories'],
        isLive: true,
        startedAt: '2 hours ago',
        products: [],
      },
      {
        id: '2',
        title: 'Fashion Friday Finds',
        streamer: {
          id: '2',
          name: 'StyleQueen Sarah',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
          followers: 32100,
          level: 12,
          verified: true,
        },
        thumbnail: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=800',
        viewers: 1923,
        category: 'Fashion',
        tags: ['Fashion', 'Style', 'Trends'],
        isLive: true,
        startedAt: '1 hour ago',
        products: [],
      },
    ];
  },

  getStream: async (id: string): Promise<Stream | null> => {
    const streams = await api.getStreams();
    return streams.find(stream => stream.id === id) || null;
  },

  // Products
  getProducts: async (filters?: {
    category?: string;
    search?: string;
    sortBy?: string;
  }): Promise<Product[]> => {
    // Mock data - replace with actual API call
    return [
      {
        id: '1',
        name: 'Wireless Noise-Canceling Headphones',
        price: 299,
        originalPrice: 399,
        image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=500',
        rating: 4.8,
        reviews: 1247,
        discount: 25,
        category: 'electronics',
        inStock: true,
        fastShipping: true,
        description: 'Premium wireless headphones with active noise cancellation',
        features: ['Active Noise Cancellation', '30-hour battery', 'Quick charge', 'Premium sound quality'],
      },
      {
        id: '2',
        name: 'Smart Fitness Watch',
        price: 249,
        originalPrice: 329,
        image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
        rating: 4.6,
        reviews: 892,
        discount: 24,
        category: 'electronics',
        inStock: true,
        fastShipping: true,
        description: 'Advanced fitness tracking with heart rate monitoring',
        features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', '7-day battery'],
      },
    ];
  },

  // Quests
  getQuests: async (type?: string): Promise<Quest[]> => {
    return [
      {
        id: '1',
        title: 'Daily Login',
        description: 'Log in to ShopQuest',
        type: 'daily',
        progress: 1,
        target: 1,
        reward: 50,
        completed: true,
        difficulty: 'easy',
        icon: 'calendar',
      },
      {
        id: '2',
        title: 'Stream Watcher',
        description: 'Watch a live stream for 30 minutes',
        type: 'daily',
        progress: 22,
        target: 30,
        reward: 200,
        completed: false,
        difficulty: 'easy',
        icon: 'play',
      },
    ];
  },

  // Leaderboard
  getLeaderboard: async (type: 'points' | 'purchases' | 'streaming'): Promise<LeaderboardEntry[]> => {
    const pointsLeaderboard: LeaderboardEntry[] = [
      {
        rank: 1,
        user: 'ShopMaster Pro',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
        points: 45230,
        level: 28,
        badge: 'Legendary Shopper',
        change: '+1,234',
      },
      {
        rank: 2,
        user: 'StreamQueen Sarah',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
        points: 42180,
        level: 26,
        badge: 'Elite Buyer',
        change: '+987',
      },
    ];

    return pointsLeaderboard;
  },

  // User actions
  followStreamer: async (streamerId: string): Promise<void> => {
    // Implementation for following a streamer
    console.log('Following streamer:', streamerId);
  },

  purchaseProduct: async (productId: string, quantity: number = 1): Promise<void> => {
    // Implementation for purchasing a product
    console.log('Purchasing product:', productId, 'quantity:', quantity);
  },

  completeQuest: async (questId: string): Promise<void> => {
    // Implementation for completing a quest
    console.log('Completing quest:', questId);
  },

  sendChatMessage: async (streamId: string, message: string): Promise<void> => {
    // Implementation for sending chat messages
    console.log('Sending message to stream:', streamId, 'message:', message);
  },
};