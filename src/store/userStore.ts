import { create } from 'zustand';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  earnedAt: string;
  points: number;
}

interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  joinedAt: string;
}

interface UserStore {
  user: User | null;
  points: number;
  level: number;
  achievements: Achievement[];
  setUser: (user: User) => void;
  addPoints: (points: number) => void;
  addAchievement: (achievement: Achievement) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    id: '1',
    username: 'ShopQuestUser',
    email: 'user@shopquest.com',
    avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100',
    joinedAt: '2024-01-15',
  },
  points: 28340,
  level: 18,
  achievements: [
    {
      id: '1',
      name: 'First Purchase',
      description: 'Made your first purchase on ShopQuest',
      icon: 'ShoppingBag',
      rarity: 'Common',
      earnedAt: '2024-01-16',
      points: 100,
    },
    {
      id: '2',
      name: 'Stream Watcher',
      description: 'Watched 10 hours of live streams',
      icon: 'Play',
      rarity: 'Rare',
      earnedAt: '2024-02-01',
      points: 300,
    },
    {
      id: '3',
      name: 'Social Butterfly',
      description: 'Sent 100 chat messages',
      icon: 'MessageCircle',
      rarity: 'Common',
      earnedAt: '2024-02-15',
      points: 150,
    },
  ],
  setUser: (user) => set({ user }),
  addPoints: (points) => set((state) => ({ points: state.points + points })),
  addAchievement: (achievement) => set((state) => ({ 
    achievements: [...state.achievements, achievement] 
  })),
}));