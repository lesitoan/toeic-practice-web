export const vocabularyCategories = [
  {
    id: 'toeic600',
    title: '600 Từ vựng TOEIC',
    description: 'Nền tảng cơ bản cho người mới bắt đầu',
    wordCount: 600,
    level: 'Cơ bản',
    progress: 45,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-50',
    icon: '🎯',
    estimatedTime: '2-3 tuần',
    topics: ['Business', 'Finance', 'Marketing', 'Human Resources'],
  },
  {
    id: 'toeic1000',
    title: '1000 Từ vựng TOEIC',
    description: 'Bộ từ vựng nâng cao cho mục tiêu 800+',
    wordCount: 1000,
    level: 'Nâng cao',
    progress: 23,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'from-blue-50 to-indigo-50',
    icon: '🚀',
    estimatedTime: '4-6 tuần',
    topics: ['Advanced Business', 'Technology', 'International Trade', 'Management'],
  },
  {
    id: 'it-vocab',
    title: 'Từ vựng CNTT',
    description: 'Chuyên ngành công nghệ thông tin',
    wordCount: 800,
    level: 'Chuyên ngành',
    progress: 78,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'from-purple-50 to-violet-50',
    icon: '💻',
    estimatedTime: '3-4 tuần',
    topics: ['Programming', 'Software', 'Hardware', 'Networking'],
  },
  {
    id: 'ielts-vocab',
    title: 'Từ vựng IELTS',
    description: 'Chuẩn bị cho kỳ thi IELTS Academic',
    wordCount: 1200,
    level: 'Cao cấp',
    progress: 12,
    color: 'from-orange-500 to-red-600',
    bgColor: 'from-orange-50 to-red-50',
    icon: '🎓',
    estimatedTime: '6-8 tuần',
    topics: ['Academic Writing', 'Science', 'Environment', 'Society'],
  },
];

export const studyMethods = [
  {
    icon: '📚',
    title: 'Flashcards',
    description: 'Học từ vựng với thẻ ghi nhớ tương tác',
    action: 'Bắt đầu học',
  },
  {
    icon: '🎮',
    title: 'Game từ vựng',
    description: 'Trò chơi thú vị giúp ghi nhớ lâu hơn',
    action: 'Chơi ngay',
  },
  {
    icon: '✍️',
    title: 'Luyện tập',
    description: 'Bài tập đa dạng với nhiều dạng câu hỏi',
    action: 'Làm bài',
  },
  {
    icon: '📊',
    title: 'Kiểm tra',
    description: 'Đánh giá mức độ ghi nhớ từ vựng',
    action: 'Kiểm tra',
  },
];

export const recentWords = [
  {
    word: 'accommodate',
    phonetic: '/əˈkɒmədeɪt/',
    meaning: 'cung cấp chỗ ở, đáp ứng',
    level: 'B2',
  },
  { word: 'endeavor', phonetic: '/ɪnˈdevər/', meaning: 'nỗ lực, cố gắng', level: 'C1' },
  { word: 'meticulous', phonetic: '/məˈtɪkjələs/', meaning: 'tỉ mỉ, cẩn thận', level: 'C1' },
  { word: 'preliminary', phonetic: '/prɪˈlɪmɪneri/', meaning: 'sơ bộ, ban đầu', level: 'B2' },
];

export const achievements = [
  { title: 'Người mới', icon: '🌟', description: 'Hoàn thành 50 từ đầu tiên' },
  { title: 'Học giỏi', icon: '🏆', description: 'Đạt 90% chính xác trong tuần' },
  { title: 'Kiên trì', icon: '🔥', description: '7 ngày học liên tục' },
];
