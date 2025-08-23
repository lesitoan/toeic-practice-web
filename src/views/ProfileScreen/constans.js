export const PERSONAL_INFO = {
  name: 'Nguyễn Văn An',
  email: 'nguyenvanan@email.com',
  phone: '0123456789',
  address: 'Hà Nội, Việt Nam',
  birthDate: '1995-05-15',
  targetScore: '850',
};

export const USER_DATA = {
  name: PERSONAL_INFO.name,
  email: PERSONAL_INFO.email,
  joinDate: '15/03/2024',
  avatar:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=fac',
  currentScore: 750,
  targetScore: parseInt(PERSONAL_INFO.targetScore),
  studyStreak: 15,
  totalStudyTime: 127,
  wordsLearned: 2340,
  testsCompleted: 23,
  flashcardsReviewed: 890,
  rank: 'Gold',
  subscription: 'Free',
};

export const ACHIEVEMENTS = [
  { title: 'First Steps', desc: 'Hoàn thành bài test đầu tiên', icon: 'Trophy', unlocked: true },
  { title: 'Vocabulary Master', desc: 'Học 1000+ từ vựng', icon: 'Brain', unlocked: true },
  {
    title: 'Consistent Learner',
    desc: 'Streak 7 ngày liên tiếp',
    icon: 'Calendar',
    unlocked: true,
  },
  { title: 'TOEIC Pro', desc: 'Đạt 800+ điểm', icon: 'Crown', unlocked: false },
];

export const TABS = [
  { id: 'overview', label: 'Tổng quan' },
  { id: 'progress', label: 'Tiến độ' },
  { id: 'achievements', label: 'Thành tích' },
  { id: 'activity', label: 'Hoạt động' },
  { id: 'settings', label: 'Cài đặt' },
];
