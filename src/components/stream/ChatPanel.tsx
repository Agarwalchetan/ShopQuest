import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Heart, Gift, Smile } from 'lucide-react';

const ChatPanel: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'ShopperPro',
      message: 'This wireless charger looks amazing! 🔥',
      timestamp: '2:34 PM',
      type: 'message',
      level: 12,
    },
    {
      id: 2,
      user: 'TechLover99',
      message: 'Just bought the phone case, thanks for the demo!',
      timestamp: '2:35 PM',
      type: 'purchase',
      level: 8,
    },
    {
      id: 3,
      user: 'GadgetGuru',
      message: 'Can you show the charging speed comparison?',
      timestamp: '2:36 PM',
      type: 'message',
      level: 15,
    },
    {
      id: 4,
      user: 'StreamFan',
      message: '❤️ Love this stream!',
      timestamp: '2:37 PM',
      type: 'reaction',
      level: 5,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'You',
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'message' as const,
        level: 10,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const sendReaction = (reaction: string) => {
    const newMessage = {
      id: messages.length + 1,
      user: 'You',
      message: reaction,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'reaction' as const,
      level: 10,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
    >
      {/* Chat Header */}
      <div className="p-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white">Live Chat</h3>
        <p className="text-sm text-gray-400">2,847 viewers</p>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-start space-x-2 ${
              msg.type === 'purchase' ? 'bg-success-500/10 p-2 rounded-lg border border-success-500/20' :
              msg.type === 'reaction' ? 'bg-error-500/10 p-2 rounded-lg border border-error-500/20' : ''
            }`}
          >
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                {msg.level}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-primary-400">{msg.user}</span>
                <span className="text-xs text-gray-500">{msg.timestamp}</span>
                {msg.type === 'purchase' && (
                  <span className="text-xs bg-success-500/20 text-success-400 px-1 py-0.5 rounded">
                    Purchase
                  </span>
                )}
              </div>
              <p className="text-sm text-white mt-1 break-words">{msg.message}</p>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reactions */}
      <div className="px-4 py-2 border-t border-white/10">
        <div className="flex items-center space-x-2 mb-3">
          {['❤️', '🔥', '👏', '😍', '🎉'].map((emoji) => (
            <motion.button
              key={emoji}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => sendReaction(emoji)}
              className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors"
            >
              <span className="text-lg">{emoji}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-white/10">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-3 py-2 bg-gray-700/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              maxLength={200}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
            >
              <Smile className="w-4 h-4" />
            </button>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!message.trim()}
            className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ChatPanel;