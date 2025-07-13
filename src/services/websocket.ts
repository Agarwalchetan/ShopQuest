// WebSocket Service for Real-time Features
export interface WebSocketMessage {
  type: 'chat' | 'viewer_count' | 'product_update' | 'quest_progress' | 'achievement' | 'notification';
  data: any;
  timestamp: number;
  userId?: string;
  streamId?: string;
}

export interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  type: 'message' | 'purchase' | 'reaction' | 'system';
  level: number;
  avatar?: string;
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private isConnected = false;

  constructor() {
    this.connect();
  }

  private connect() {
    try {
      const wsUrl = import.meta.env.VITE_WS_URL || 'wss://api.shopquest.com/ws';
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.authenticate();
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.isConnected = false;
        this.reconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      this.reconnect();
    }
  }

  private authenticate() {
    const token = localStorage.getItem('auth_token');
    if (token && this.ws) {
      this.send({
        type: 'auth',
        data: { token },
        timestamp: Date.now(),
      });
    }
  }

  private reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      
      console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);
      
      setTimeout(() => {
        this.connect();
      }, delay);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  private handleMessage(message: WebSocketMessage) {
    const listeners = this.listeners.get(message.type);
    if (listeners) {
      listeners.forEach(callback => callback(message.data));
    }

    // Handle global listeners
    const globalListeners = this.listeners.get('*');
    if (globalListeners) {
      globalListeners.forEach(callback => callback(message));
    }
  }

  public send(message: Partial<WebSocketMessage>) {
    if (this.ws && this.isConnected) {
      const fullMessage: WebSocketMessage = {
        type: message.type || 'message',
        data: message.data || {},
        timestamp: message.timestamp || Date.now(),
        userId: message.userId,
        streamId: message.streamId,
      };

      this.ws.send(JSON.stringify(fullMessage));
    } else {
      console.warn('WebSocket not connected, message not sent:', message);
    }
  }

  public subscribe(type: string, callback: (data: any) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(callback);

    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(type);
      if (listeners) {
        listeners.delete(callback);
        if (listeners.size === 0) {
          this.listeners.delete(type);
        }
      }
    };
  }

  public unsubscribe(type: string, callback?: (data: any) => void) {
    if (callback) {
      const listeners = this.listeners.get(type);
      if (listeners) {
        listeners.delete(callback);
        if (listeners.size === 0) {
          this.listeners.delete(type);
        }
      }
    } else {
      this.listeners.delete(type);
    }
  }

  // Stream-specific methods
  public joinStream(streamId: string) {
    this.send({
      type: 'join_stream',
      data: { streamId },
      streamId,
    });
  }

  public leaveStream(streamId: string) {
    this.send({
      type: 'leave_stream',
      data: { streamId },
      streamId,
    });
  }

  public sendChatMessage(streamId: string, message: string) {
    this.send({
      type: 'chat',
      data: {
        streamId,
        message,
        timestamp: new Date().toISOString(),
      },
      streamId,
    });
  }

  public sendReaction(streamId: string, reaction: string) {
    this.send({
      type: 'reaction',
      data: {
        streamId,
        reaction,
        timestamp: new Date().toISOString(),
      },
      streamId,
    });
  }

  // Quest and achievement methods
  public updateQuestProgress(questId: string, progress: number) {
    this.send({
      type: 'quest_progress',
      data: {
        questId,
        progress,
      },
    });
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.listeners.clear();
    this.isConnected = false;
  }

  public getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

export const wsService = new WebSocketService();

// React hook for WebSocket
export const useWebSocket = (type: string, callback: (data: any) => void) => {
  React.useEffect(() => {
    const unsubscribe = wsService.subscribe(type, callback);
    return unsubscribe;
  }, [type, callback]);
};