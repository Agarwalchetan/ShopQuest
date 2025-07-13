// Enhanced Backend API Service
import { QueryClient } from '@tanstack/react-query';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.shopquest.com/v1';

// Enhanced Types
export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  level: number;
  points: number;
  joinedAt: string;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    achievements: boolean;
    quests: boolean;
    streams: boolean;
    purchases: boolean;
    promotions: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'friends' | 'private';
    activityTracking: boolean;
    dataSharing: boolean;
  };
  appearance: {
    darkMode: boolean;
    soundEnabled: boolean;
  };
}

export interface UserStats {
  totalPurchases: number;
  totalSpent: number;
  hoursWatched: number;
  streamsJoined: number;
  questsCompleted: number;
  achievementsUnlocked: number;
  currentStreak: number;
  longestStreak: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Recommendation {
  id: string;
  type: 'product' | 'stream' | 'quest';
  title: string;
  description: string;
  image: string;
  score: number;
  reason: string;
  metadata: any;
}

class BackendService {
  private authToken: string | null = null;

  constructor() {
    this.authToken = localStorage.getItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.handleAuthError();
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  private handleAuthError() {
    localStorage.removeItem('auth_token');
    this.authToken = null;
    window.location.href = '/login';
  }

  // Authentication
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await this.request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    this.authToken = response.token;
    localStorage.setItem('auth_token', response.token);
    
    return response;
  }

  async register(userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    const response = await this.request<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    this.authToken = response.token;
    localStorage.setItem('auth_token', response.token);
    
    return response;
  }

  async logout(): Promise<void> {
    await this.request('/auth/logout', { method: 'POST' });
    localStorage.removeItem('auth_token');
    this.authToken = null;
  }

  // User Management
  async getCurrentUser(): Promise<User> {
    return this.request<User>('/users/me');
  }

  async updateUser(updates: Partial<User>): Promise<User> {
    return this.request<User>('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async updatePreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    return this.request<UserPreferences>('/users/me/preferences', {
      method: 'PATCH',
      body: JSON.stringify(preferences),
    });
  }

  // Orders
  async createOrder(orderData: {
    items: OrderItem[];
    shippingAddress: Address;
    billingAddress: Address;
    paymentMethodId: string;
  }): Promise<Order> {
    return this.request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrders(page = 1, limit = 10): Promise<{ orders: Order[]; total: number }> {
    return this.request<{ orders: Order[]; total: number }>(`/orders?page=${page}&limit=${limit}`);
  }

  async getOrder(orderId: string): Promise<Order> {
    return this.request<Order>(`/orders/${orderId}`);
  }

  // Analytics
  async getUserAnalytics(timeframe: 'week' | 'month' | 'year' = 'week'): Promise<{
    points: { date: string; value: number }[];
    purchases: { date: string; value: number }[];
    watchTime: { date: string; value: number }[];
    categories: { name: string; percentage: number }[];
  }> {
    return this.request(`/analytics/user?timeframe=${timeframe}`);
  }

  // Recommendations
  async getRecommendations(type?: 'product' | 'stream' | 'quest'): Promise<Recommendation[]> {
    const query = type ? `?type=${type}` : '';
    return this.request<Recommendation[]>(`/recommendations${query}`);
  }

  // Social Features
  async followUser(userId: string): Promise<void> {
    await this.request(`/users/${userId}/follow`, { method: 'POST' });
  }

  async unfollowUser(userId: string): Promise<void> {
    await this.request(`/users/${userId}/follow`, { method: 'DELETE' });
  }

  async getFollowers(userId?: string): Promise<User[]> {
    const endpoint = userId ? `/users/${userId}/followers` : '/users/me/followers';
    return this.request<User[]>(endpoint);
  }

  async getFollowing(userId?: string): Promise<User[]> {
    const endpoint = userId ? `/users/${userId}/following` : '/users/me/following';
    return this.request<User[]>(endpoint);
  }

  // Notifications
  async getNotifications(page = 1, limit = 20): Promise<{
    notifications: Notification[];
    unreadCount: number;
    total: number;
  }> {
    return this.request(`/notifications?page=${page}&limit=${limit}`);
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    await this.request(`/notifications/${notificationId}/read`, { method: 'POST' });
  }

  async markAllNotificationsAsRead(): Promise<void> {
    await this.request('/notifications/read-all', { method: 'POST' });
  }

  // Search
  async search(query: string, filters?: {
    type?: 'products' | 'streams' | 'users';
    category?: string;
    priceRange?: [number, number];
  }): Promise<{
    products: Product[];
    streams: Stream[];
    users: User[];
  }> {
    const params = new URLSearchParams({ q: query });
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, Array.isArray(value) ? value.join(',') : String(value));
        }
      });
    }
    
    return this.request(`/search?${params.toString()}`);
  }
}

export const backendService = new BackendService();

// React hooks for backend integration
export const useAuth = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await backendService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (localStorage.getItem('auth_token')) {
      loadUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { user } = await backendService.login(email, password);
    setUser(user);
    return user;
  };

  const logout = async () => {
    await backendService.logout();
    setUser(null);
  };

  return { user, isLoading, login, logout };
};