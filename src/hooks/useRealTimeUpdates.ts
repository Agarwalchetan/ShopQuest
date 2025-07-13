import { useState, useEffect, useCallback } from 'react';
import { wsService } from '../services/websocket';

export interface RealTimeUpdate {
  type: string;
  data: any;
  timestamp: number;
}

export const useRealTimeUpdates = (types: string[] = ['*']) => {
  const [updates, setUpdates] = useState<RealTimeUpdate[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(wsService.getConnectionStatus());

    const unsubscribers = types.map(type => 
      wsService.subscribe(type, (data) => {
        const update: RealTimeUpdate = {
          type,
          data,
          timestamp: Date.now(),
        };
        
        setUpdates(prev => [update, ...prev.slice(0, 99)]); // Keep last 100 updates
      })
    );

    // Connection status updates
    const connectionUnsubscriber = wsService.subscribe('connection', (data) => {
      setIsConnected(data.connected);
    });

    return () => {
      unsubscribers.forEach(unsub => unsub());
      connectionUnsubscriber();
    };
  }, [types]);

  const sendUpdate = useCallback((type: string, data: any) => {
    wsService.send({ type, data });
  }, []);

  const clearUpdates = useCallback(() => {
    setUpdates([]);
  }, []);

  return {
    updates,
    isConnected,
    sendUpdate,
    clearUpdates,
  };
};

export const useStreamUpdates = (streamId: string) => {
  const [viewerCount, setViewerCount] = useState(0);
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!streamId) return;

    wsService.joinStream(streamId);

    const unsubscribeViewers = wsService.subscribe('viewer_count', (data) => {
      if (data.streamId === streamId) {
        setViewerCount(data.count);
      }
    });

    const unsubscribeChat = wsService.subscribe('chat', (data) => {
      if (data.streamId === streamId) {
        setChatMessages(prev => [data, ...prev.slice(0, 49)]); // Keep last 50 messages
      }
    });

    return () => {
      wsService.leaveStream(streamId);
      unsubscribeViewers();
      unsubscribeChat();
    };
  }, [streamId]);

  const sendChatMessage = useCallback((message: string) => {
    wsService.sendChatMessage(streamId, message);
  }, [streamId]);

  const sendReaction = useCallback((reaction: string) => {
    wsService.sendReaction(streamId, reaction);
  }, [streamId]);

  return {
    viewerCount,
    chatMessages,
    sendChatMessage,
    sendReaction,
  };
};