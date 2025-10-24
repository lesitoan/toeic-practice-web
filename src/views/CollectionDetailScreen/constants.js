import {
  Search,
  Volume2,
  Copy,
  Check,
  Edit2,
  Save,
  X,
  BookOpen,
  Zap,
  BarChart3,
  Gamepad2,
} from 'lucide-react';

export const LEARNING_MODES = [
  {
    name: 'Flashcards',
    description: 'Thẻ ghi nhớ',
    icon: BookOpen,
    url: '/flashcards',
    isActive: true,
    customClassName: 'bg-gradient-to-br from-orange-400 to-orange-600',
  },
  {
    name: 'Bài quiz',
    description: 'Kiểm tra kiến thức',
    icon: Zap,
    url: '/quiz',
    isActive: false,
    customClassName: 'bg-gradient-to-br from-blue-400 to-blue-600',
  },
  {
    name: 'Luyện phát âm',
    description: 'Cải thiện kỹ năng nói',
    icon: Volume2,
    url: '/pronunciation',
    isActive: false,
    customClassName: 'bg-gradient-to-br from-purple-400 to-purple-600',
  },
  {
    name: 'trò chơi',
    description: 'Học qua trò chơi',
    icon: Gamepad2,
    url: '/games',
    isActive: false,
    customClassName: 'bg-gradient-to-br from-green-400 to-green-600',
  },
];
