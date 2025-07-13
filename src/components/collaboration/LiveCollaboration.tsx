import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Video,
  Share2,
  Heart,
  ShoppingCart,
  Eye,
  Mic,
  MicOff,
  VideoOff,
  Phone,
  UserPlus,
  Crown,
  Star,
  Gift,
  Zap
} from 'lucide-react';

interface CollaborationUser {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'busy';
  role: 'host' | 'moderator' | 'viewer';
  level: number;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
}

interface CollaborationSession {
  id: string;
  title: string;
  type: 'shopping_party' | 'product_review' | 'live_stream' | 'group_chat';
  participants: CollaborationUser[];
  maxParticipants: number;
  isPublic: boolean;
  createdAt: Date;
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'product_share' | 'reaction' | 'system';
  metadata?: any;
}

const LiveCollaboration: React.FC = () => {
  const [activeSession, setActiveSession] = useState<CollaborationSession | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [showParticipants, setShowParticipants] = useState(true);

  useEffect(() => {
    // Initialize with a mock session
    const mockSession: CollaborationSession = {
      id: 'session-1',
      title: 'Tech Gadgets Shopping Party',
      type: 'shopping_party',
      maxParticipants: 8,
      isPublic: true,
      createdAt: new Date(),
      participants: [
        {
          id: '1',
          name: 'You',
          avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100',
          status: 'online',
          role: 'host',
          level: 18,
          isVideoEnabled: true,
          isAudioEnabled: true,
        },
        {
          id: '2',
          name: 'Sarah M.',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
          status: 'online',
          role: 'viewer',
          level: 12,
          isVideoEnabled: true,
          isAudioEnabled: false,
        },
        {
          id: '3',
          name: 'Mike T.',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
          status: 'online',
          role: 'moderator',
          level: 25,
          isVideoEnabled: false,
          isAudioEnabled: true,
        },
        {
          id: '4',
          name: 'Emma K.',
          avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100',
          status: 'away',
          role: 'viewer',
          level: 8,
          isVideoEnabled: false,
          isAudioEnabled: false,
        },
      ],
    };

    setActiveSession(mockSession);

    // Mock chat messages
    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        userId: '2',
        userName: 'Sarah M.',
        message: 'Hey everyone! Excited for this shopping session! 🛍️',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        type: 'text',
      },
      {
        id: '2',
        userId: '3',
        userName: 'Mike T.',
        message: 'I found some great headphones, let me share them!',
        timestamp: new Date(Date.now() - 3 * 60 * 1000),
        type: 'text',
      },
      {
        id: '3',
        userId: '3',
        userName: 'Mike T.',
        message: 'Wireless Noise-Canceling Headphones - $299',
        timestamp: new Date(Date.now() - 3 * 60 * 1000),
        type: 'product_share',
        metadata: {
          productId: '1',
          productName: 'Wireless Noise-Canceling Headphones',
          price: 299,
          image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=200',
        },
      },
      {
        id: '4',
        userId: '4',
        userName: 'Emma K.',
        message: '❤️',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        type: 'reaction',
      },
    ];

    setChatMessages(mockMessages);
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim() || !activeSession) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: '1',
      userName: 'You',
      message: newMessage,
      timestamp: new Date(),
      type: 'text',
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const sendReaction = (reaction: string) => {
    if (!activeSession) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: '1',
      userName: 'You',
      message: reaction,
      timestamp: new Date(),
      type: 'reaction',
    };

    setChatMessages(prev => [...prev, message]);
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-success-500';
      case 'away':
        return 'bg-warning-500';
      case 'busy':
        return 'bg-error-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'host':
        return Crown;
      case 'moderator':
        return Star;
      default:
        return Users;
    }
  };

  if (!activeSession) {
    return (
      <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
        <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No Active Session</h3>
        <p className="text-gray-400 mb-6">Join or create a collaboration session to get started</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300"
        >
          Create Session
        </motion.button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      {/* Video Grid */}
      <div className="lg:col-span-3 bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
        {/* Session Header */}
        <div className="p-4 border-b border-white/10 bg-dark-900/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">{activeSession.title}</h3>
              <p className="text-sm text-gray-400">
                {activeSession.participants.length}/{activeSession.maxParticipants} participants
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowParticipants(!showParticipants)}
                className="p-2 bg-dark-700/50 text-gray-400 hover:text-white rounded-lg transition-colors"
              >
                <Users className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-dark-700/50 text-gray-400 hover:text-white rounded-lg transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-2 gap-4 h-full">
            {activeSession.participants.slice(0, 4).map((participant, index) => {
              const RoleIcon = getRoleIcon(participant.role);
              
              return (
                <motion.div
                  key={participant.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative bg-dark-700/50 rounded-xl overflow-hidden group"
                >
                  {participant.isVideoEnabled ? (
                    <div className="w-full h-full bg-gradient-to-br from-brand-500/20 to-accent-500/20 flex items-center justify-center">
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-24 h-24 rounded-full border-4 border-white/20"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-dark-600 flex items-center justify-center">
                      <div className="text-center">
                        <img
                          src={participant.avatar}
                          alt={participant.name}
                          className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-white/20"
                        />
                        <VideoOff className="w-8 h-8 text-gray-500 mx-auto" />
                      </div>
                    </div>
                  )}

                  {/* Participant Info */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
                          <RoleIcon className="w-3 h-3 text-brand-400" />
                          <span className="text-white text-sm font-medium">{participant.name}</span>
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(participant.status)}`} />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {!participant.isAudioEnabled && (
                          <div className="p-1 bg-error-500 rounded-full">
                            <MicOff className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Level Badge */}
                  <div className="absolute top-3 right-3 bg-brand-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Lv.{participant.level}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 border-t border-white/10 bg-dark-900/50">
          <div className="flex items-center justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleAudio}
              className={`p-3 rounded-full transition-colors ${
                isAudioEnabled 
                  ? 'bg-dark-700/50 text-white hover:bg-dark-600/50' 
                  : 'bg-error-500 text-white'
              }`}
            >
              {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleVideo}
              className={`p-3 rounded-full transition-colors ${
                isVideoEnabled 
                  ? 'bg-dark-700/50 text-white hover:bg-dark-600/50' 
                  : 'bg-error-500 text-white'
              }`}
            >
              {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-error-500 text-white rounded-full hover:bg-error-600 transition-colors"
            >
              <Phone className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Chat & Participants */}
      <div className="space-y-6">
        {/* Participants Panel */}
        <AnimatePresence>
          {showParticipants && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Participants</h4>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-brand-500/20 text-brand-400 rounded-lg hover:bg-brand-500/30 transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                </motion.button>
              </div>
              
              <div className="space-y-3">
                {activeSession.participants.map((participant) => {
                  const RoleIcon = getRoleIcon(participant.role);
                  
                  return (
                    <div key={participant.id} className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={participant.avatar}
                          alt={participant.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-dark-800 ${getStatusColor(participant.status)}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1">
                          <p className="text-white text-sm font-medium truncate">{participant.name}</p>
                          <RoleIcon className="w-3 h-3 text-brand-400" />
                        </div>
                        <p className="text-gray-400 text-xs">Level {participant.level}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Panel */}
        <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden flex-1">
          <div className="p-4 border-b border-white/10">
            <h4 className="text-lg font-semibold text-white">Chat</h4>
          </div>
          
          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${message.type === 'reaction' ? 'text-center' : ''}`}
              >
                {message.type === 'product_share' ? (
                  <div className="bg-brand-500/10 border border-brand-500/30 rounded-xl p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <img
                        src={activeSession.participants.find(p => p.id === message.userId)?.avatar}
                        alt=""
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-brand-400 font-medium text-sm">{message.userName}</span>
                      <span className="text-gray-500 text-xs">shared a product</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <img
                        src={message.metadata.image}
                        alt={message.metadata.productName}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-white font-medium text-sm">{message.metadata.productName}</p>
                        <p className="text-accent-400 font-bold">${message.metadata.price}</p>
                      </div>
                    </div>
                  </div>
                ) : message.type === 'reaction' ? (
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl">{message.message}</span>
                    <span className="text-gray-400 text-xs">{message.userName}</span>
                  </div>
                ) : (
                  <div className="flex items-start space-x-2">
                    <img
                      src={activeSession.participants.find(p => p.id === message.userId)?.avatar}
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium text-sm">{message.userName}</span>
                        <span className="text-gray-500 text-xs">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{message.message}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Quick Reactions */}
          <div className="px-4 py-2 border-t border-white/10">
            <div className="flex items-center space-x-2 mb-3">
              {['❤️', '👍', '😍', '🔥', '🎉'].map((emoji) => (
                <motion.button
                  key={emoji}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => sendReaction(emoji)}
                  className="p-2 bg-dark-700/50 hover:bg-dark-600/50 rounded-lg transition-colors"
                >
                  <span className="text-lg">{emoji}</span>
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Message Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 bg-dark-700/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendMessage}
                className="p-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCollaboration;