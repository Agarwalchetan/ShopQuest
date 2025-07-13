import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Image, 
  Video, 
  Edit3, 
  Trash2, 
  Plus,
  Eye,
  Calendar,
  User,
  Tag,
  Search,
  Filter,
  Upload,
  Save,
  X
} from 'lucide-react';

interface ContentItem {
  id: string;
  type: 'article' | 'image' | 'video' | 'banner';
  title: string;
  description: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  tags: string[];
  thumbnail?: string;
  views?: number;
}

const ContentManagement: React.FC = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      type: 'article',
      title: 'Holiday Shopping Guide 2024',
      description: 'Complete guide to holiday shopping deals and trends',
      author: 'Content Team',
      status: 'published',
      createdAt: '2024-11-15',
      updatedAt: '2024-11-20',
      tags: ['shopping', 'holiday', 'guide'],
      views: 1247,
    },
    {
      id: '2',
      type: 'video',
      title: 'Product Demo: Smart Watch Features',
      description: 'Comprehensive demo of the latest smart watch features',
      author: 'Video Team',
      status: 'published',
      createdAt: '2024-11-18',
      updatedAt: '2024-11-18',
      tags: ['product', 'demo', 'smartwatch'],
      thumbnail: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300',
      views: 3456,
    },
    {
      id: '3',
      type: 'banner',
      title: 'Black Friday Sale Banner',
      description: 'Promotional banner for Black Friday deals',
      author: 'Design Team',
      status: 'draft',
      createdAt: '2024-11-20',
      updatedAt: '2024-11-20',
      tags: ['promotion', 'banner', 'sale'],
    },
  ]);

  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

  const filteredContent = contentItems.filter(item => {
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return FileText;
      case 'image':
        return Image;
      case 'video':
        return Video;
      case 'banner':
        return Image;
      default:
        return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-success-500/20 text-success-400 border-success-500/30';
      case 'draft':
        return 'bg-warning-500/20 text-warning-400 border-warning-500/30';
      case 'archived':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const deleteItem = (id: string) => {
    setContentItems(prev => prev.filter(item => item.id !== id));
  };

  const updateItemStatus = (id: string, status: ContentItem['status']) => {
    setContentItems(prev => prev.map(item => 
      item.id === id ? { ...item, status, updatedAt: new Date().toISOString().split('T')[0] } : item
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Content Management</h2>
          <p className="text-gray-400">Manage articles, images, videos, and promotional content</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all duration-300 shadow-glow"
        >
          <Plus className="w-4 h-4" />
          <span>Create Content</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all duration-300"
          />
        </div>
        
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-3 bg-dark-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
        >
          <option value="all">All Types</option>
          <option value="article">Articles</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
          <option value="banner">Banners</option>
        </select>
        
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-3 bg-dark-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((item, index) => {
          const TypeIcon = getTypeIcon(item.type);
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-brand-500/50 transition-all duration-300"
            >
              {/* Thumbnail */}
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-dark-700/50 flex items-center justify-center">
                  <TypeIcon className="w-12 h-12 text-gray-500" />
                </div>
              )}
              
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <TypeIcon className="w-4 h-4 text-brand-400" />
                    <span className="text-xs text-brand-400 font-semibold uppercase">
                      {item.type}
                    </span>
                  </div>
                  
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                    {item.status.toUpperCase()}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-dark-700/50 text-gray-300 text-xs rounded-lg"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{item.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.updatedAt}</span>
                  </div>
                </div>
                
                {item.views && (
                  <div className="flex items-center space-x-1 text-xs text-gray-500 mb-4">
                    <Eye className="w-3 h-3" />
                    <span>{item.views.toLocaleString()} views</span>
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditingItem(item)}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 bg-brand-500/20 text-brand-400 rounded-lg hover:bg-brand-500/30 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </motion.button>
                  
                  {item.status === 'draft' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateItemStatus(item.id, 'published')}
                      className="flex-1 flex items-center justify-center space-x-2 py-2 bg-success-500/20 text-success-400 rounded-lg hover:bg-success-500/30 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Publish</span>
                    </motion.button>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteItem(item.id)}
                    className="p-2 bg-error-500/20 text-error-400 rounded-lg hover:bg-error-500/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No content found</h3>
          <p className="text-gray-400 mb-6">
            {searchQuery || selectedType !== 'all' || selectedStatus !== 'all'
              ? 'Try adjusting your filters or search query'
              : 'Create your first piece of content to get started'
            }
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold rounded-xl hover:from-brand-600 hover:to-brand-700 transition-all duration-300 shadow-glow"
          >
            Create Content
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;