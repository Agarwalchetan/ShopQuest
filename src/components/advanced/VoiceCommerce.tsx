import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  MessageSquare,
  ShoppingBag,
  Search,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Brain
} from 'lucide-react';

interface VoiceCommand {
  id: string;
  command: string;
  response: string;
  action?: string;
  confidence: number;
  timestamp: Date;
}

interface VoiceCommerceProps {
  onCommand?: (command: string, action?: string) => void;
}

const VoiceCommerce: React.FC<VoiceCommerceProps> = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [commands, setCommands] = useState<VoiceCommand[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
          setTranscript(finalTranscript);
          processVoiceCommand(finalTranscript, event.results[event.results.length - 1][0].confidence);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const processVoiceCommand = (command: string, confidence: number) => {
    const lowerCommand = command.toLowerCase();
    let response = '';
    let action = '';

    // Shopping commands
    if (lowerCommand.includes('search for') || lowerCommand.includes('find')) {
      const searchTerm = lowerCommand.replace(/search for|find/g, '').trim();
      response = `Searching for ${searchTerm}`;
      action = `search:${searchTerm}`;
    } else if (lowerCommand.includes('add to cart')) {
      response = 'Adding item to your cart';
      action = 'add_to_cart';
    } else if (lowerCommand.includes('show cart') || lowerCommand.includes('view cart')) {
      response = 'Opening your shopping cart';
      action = 'show_cart';
    } else if (lowerCommand.includes('checkout')) {
      response = 'Proceeding to checkout';
      action = 'checkout';
    } 
    // Navigation commands
    else if (lowerCommand.includes('go to') || lowerCommand.includes('open')) {
      if (lowerCommand.includes('shop')) {
        response = 'Opening the shop';
        action = 'navigate:shop';
      } else if (lowerCommand.includes('dashboard')) {
        response = 'Opening your dashboard';
        action = 'navigate:dashboard';
      } else if (lowerCommand.includes('profile')) {
        response = 'Opening your profile';
        action = 'navigate:profile';
      }
    }
    // Live stream commands
    else if (lowerCommand.includes('watch') || lowerCommand.includes('stream')) {
      response = 'Finding live streams for you';
      action = 'navigate:streams';
    }
    // Quest commands
    else if (lowerCommand.includes('quest') || lowerCommand.includes('challenge')) {
      response = 'Showing your quests';
      action = 'navigate:quests';
    }
    // Help commands
    else if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      response = 'I can help you search products, add items to cart, navigate the site, and more. Try saying "search for headphones" or "show my cart"';
    } else {
      response = `I heard "${command}" but I'm not sure how to help with that. Try asking me to search for products or navigate the site.`;
    }

    const newCommand: VoiceCommand = {
      id: Date.now().toString(),
      command,
      response,
      action,
      confidence,
      timestamp: new Date(),
    };

    setCommands(prev => [newCommand, ...prev.slice(0, 9)]);
    
    if (voiceEnabled) {
      speak(response);
    }

    if (action && onCommand) {
      onCommand(command, action);
    }
  };

  const speak = (text: string) => {
    if (synthRef.current && voiceEnabled) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = volume;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      synthRef.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  if (!recognitionRef.current) {
    return (
      <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="text-center">
          <MicOff className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Voice Commerce Unavailable</h3>
          <p className="text-gray-400">Your browser doesn't support speech recognition</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-premium">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-brand-500/20 to-accent-500/20 rounded-xl">
            <Brain className="w-5 h-5 text-brand-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Voice Commerce</h3>
            <p className="text-sm text-gray-400">Shop with your voice</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-2 rounded-lg transition-colors ${
              voiceEnabled ? 'bg-success-500/20 text-success-400' : 'bg-gray-500/20 text-gray-400'
            }`}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>

      {/* Voice Controls */}
      <div className="text-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleListening}
          className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
            isListening 
              ? 'bg-error-500 shadow-glow animate-pulse' 
              : 'bg-brand-500 hover:bg-brand-600 shadow-lg'
          }`}
        >
          {isListening ? (
            <MicOff className="w-8 h-8 text-white" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
          
          {isListening && (
            <div className="absolute inset-0 rounded-full border-4 border-error-400 animate-ping" />
          )}
        </motion.button>
        
        <p className="text-sm text-gray-400 mt-3">
          {isListening ? 'Listening...' : 'Click to start voice commands'}
        </p>
        
        {isSpeaking && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={stopSpeaking}
            className="mt-2 px-4 py-2 bg-warning-500/20 border border-warning-500/30 text-warning-400 rounded-lg hover:bg-warning-500/30 transition-colors"
          >
            Stop Speaking
          </motion.button>
        )}
      </div>

      {/* Current Transcript */}
      {transcript && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-dark-700/30 rounded-xl border border-brand-500/30"
        >
          <div className="flex items-center space-x-2 mb-2">
            <MessageSquare className="w-4 h-4 text-brand-400" />
            <span className="text-sm font-medium text-brand-400">You said:</span>
          </div>
          <p className="text-white">{transcript}</p>
        </motion.div>
      )}

      {/* Voice Commands History */}
      {commands.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white">Recent Commands</h4>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {commands.map((cmd, index) => (
              <motion.div
                key={cmd.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-3 bg-dark-700/30 rounded-xl"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm text-white font-medium">"{cmd.command}"</p>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${
                      cmd.confidence > 0.8 ? 'bg-success-400' :
                      cmd.confidence > 0.6 ? 'bg-warning-400' : 'bg-error-400'
                    }`} />
                    <span className="text-xs text-gray-500">
                      {Math.round(cmd.confidence * 100)}%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{cmd.response}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {cmd.timestamp.toLocaleTimeString()}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Voice Commands Help */}
      <div className="mt-6 p-4 bg-brand-500/10 border border-brand-500/30 rounded-xl">
        <h4 className="text-sm font-semibold text-brand-400 mb-2">Try saying:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-300">
          <div>"Search for headphones"</div>
          <div>"Add to cart"</div>
          <div>"Show my cart"</div>
          <div>"Go to shop"</div>
          <div>"Watch live streams"</div>
          <div>"Show my quests"</div>
        </div>
      </div>

      {/* Volume Control */}
      {voiceEnabled && (
        <div className="mt-4 flex items-center space-x-3">
          <Volume2 className="w-4 h-4 text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-400 w-8">{Math.round(volume * 100)}%</span>
        </div>
      )}
    </div>
  );
};

export default VoiceCommerce;