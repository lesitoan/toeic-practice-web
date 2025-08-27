export const TITLE_DESCRIPTION =
  'Expert tips, strategies, and insights to help you master the TOEIC test and achieve your target score.';

export const MOCK_POSTS = [
  {
    id: '1',
    title: 'TOEIC Reading Tips: How to Improve Your Score in Part 7',
    excerpt:
      'Master the longest section of TOEIC Reading with these proven strategies and techniques that will help you save time and increase accuracy.',
    content: 'Full content here...',
    author: {
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg',
      bio: 'TOEIC Expert with 10+ years experience',
    },
    publishedAt: '2024-01-25T10:00:00Z',
    readTime: 8,
    category: 'Reading',
    tags: ['TOEIC', 'Reading', 'Tips', 'Part 7'],
    image: '/blog/toeic-reading-tips.jpg',
    featured: true,
    views: 2543,
    likes: 89,
  },
  {
    id: '2',
    title: 'Common Grammar Mistakes in TOEIC and How to Avoid Them',
    excerpt:
      'Learn about the most frequent grammar errors that test-takers make and practical ways to avoid them in your TOEIC exam.',
    content: 'Full content here...',
    author: {
      name: 'Michael Chen',
      avatar: '/avatars/michael.jpg',
      bio: 'English Grammar Specialist',
    },
    publishedAt: '2024-01-23T14:30:00Z',
    readTime: 6,
    category: 'Grammar',
    tags: ['Grammar', 'Common Mistakes', 'TOEIC'],
    image: '/blog/grammar-mistakes.jpg',
    featured: false,
    views: 1876,
    likes: 67,
  },
  {
    id: '3',
    title: 'Listening Strategies for TOEIC Success',
    excerpt:
      'Develop your listening skills with effective strategies for each part of the TOEIC Listening section.',
    content: 'Full content here...',
    author: {
      name: 'Emma Wilson',
      avatar: '/avatars/emma.jpg',
      bio: 'TOEIC Listening Coach',
    },
    publishedAt: '2024-01-22T09:15:00Z',
    readTime: 7,
    category: 'Listening',
    tags: ['Listening', 'Strategies', 'TOEIC'],
    image: '/blog/listening-strategies.jpg',
    featured: false,
    views: 2108,
    likes: 94,
  },
  {
    id: '4',
    title: 'Vocabulary Building: 1000 Essential TOEIC Words',
    excerpt:
      'Master the most important vocabulary for TOEIC success with our comprehensive word list and study techniques.',
    content: 'Full content here...',
    author: {
      name: 'David Park',
      avatar: '/avatars/david.jpg',
      bio: 'Vocabulary Expert',
    },
    publishedAt: '2024-01-20T16:45:00Z',
    readTime: 12,
    category: 'Vocabulary',
    tags: ['Vocabulary', 'Word List', 'Study Tips'],
    image: '/blog/vocabulary-building.jpg',
    featured: false,
    views: 3421,
    likes: 156,
  },
  {
    id: '5',
    title: 'Time Management Techniques for TOEIC Test Day',
    excerpt:
      'Learn how to effectively manage your time during the TOEIC test to maximize your score potential.',
    content: 'Full content here...',
    author: {
      name: 'Lisa Rodriguez',
      avatar: '/avatars/lisa.jpg',
      bio: 'Test Preparation Specialist',
    },
    publishedAt: '2024-01-18T11:20:00Z',
    readTime: 5,
    category: 'Test Tips',
    tags: ['Time Management', 'Test Day', 'Strategy'],
    image: '/blog/time-management.jpg',
    featured: false,
    views: 1654,
    likes: 73,
  },
  {
    id: '6',
    title: 'Business English Phrases for TOEIC Success',
    excerpt:
      'Essential business English expressions and phrases that frequently appear in TOEIC tests.',
    content: 'Full content here...',
    author: {
      name: 'Robert Kim',
      avatar: '/avatars/robert.jpg',
      bio: 'Business English Instructor',
    },
    publishedAt: '2024-01-15T13:10:00Z',
    readTime: 9,
    category: 'Business English',
    tags: ['Business English', 'Phrases', 'TOEIC'],
    image: '/blog/business-english.jpg',
    featured: false,
    views: 2287,
    likes: 108,
  },
];

export const CATEGORIES = [
  { name: 'All', count: MOCK_POSTS.length, active: true },
  { name: 'Reading', count: 1 },
  { name: 'Listening', count: 1 },
  { name: 'Grammar', count: 1 },
  { name: 'Vocabulary', count: 1 },
  { name: 'Test Tips', count: 1 },
  { name: 'Business English', count: 1 },
];

export const POSTS_PER_PAGE = 6;
