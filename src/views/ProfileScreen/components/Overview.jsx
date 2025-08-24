import {
  BookOpen,
  Target,
  Zap,
  TrendingUp,
  Clock,
  BarChart3,
  FileText,
  Headphones,
} from 'lucide-react';
import { USER_DATA } from '../constants';

const StatCard = ({ stat }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg ${stat.bg}`}>
        <stat.icon className={`w-6 h-6 ${stat.color}`} />
      </div>
      <TrendingUp className="w-5 h-5 text-green-500" />
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value.toLocaleString()}</h3>
    <p className="text-gray-600 text-sm">{stat.label}</p>
  </div>
);

const Overview = () => {
  const userData = USER_DATA;
  const stats = [
    {
      label: 'Điểm hiện tại',
      value: userData.currentScore,
      icon: Target,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Từ vựng đã học',
      value: userData.wordsLearned,
      icon: BookOpen,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Bài test hoàn thành',
      value: userData.testsCompleted,
      icon: FileText,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      label: 'Ngày streak',
      value: userData.studyStreak,
      icon: Zap,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Score Progress */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Mục tiêu TOEIC</h3>
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Điểm hiện tại</span>
              <span className="text-2xl font-bold text-blue-600">{userData.currentScore}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Mục tiêu</span>
              <span className="text-lg font-semibold text-gray-900">{userData.targetScore}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(userData.currentScore / userData.targetScore) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 text-center">
              Còn {userData.targetScore - userData.currentScore} điểm để đạt mục tiêu
            </p>
          </div>
        </div>

        {/* Study Stats */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Thống kê học tập</h3>
            <BarChart3 className="w-5 h-5 text-green-600" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">Tổng thời gian học</span>
              </div>
              <span className="font-semibold">{userData.totalStudyTime}h</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium">Streak hiện tại</span>
              </div>
              <span className="font-semibold">{userData.studyStreak} ngày</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Headphones className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium">Flashcard đã xem</span>
              </div>
              <span className="font-semibold">{userData.flashcardsReviewed}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
