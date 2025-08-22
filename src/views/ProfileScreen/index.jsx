'use client';
import React, { useState } from 'react';
import {
  User,
  Mail,
  Calendar,
  Trophy,
  BookOpen,
  Target,
  Zap,
  Star,
  Crown,
  Award,
  TrendingUp,
  Clock,
  Users,
  Edit2,
  Settings,
  Gift,
  CheckCircle,
  BarChart3,
  Brain,
  FileText,
  Headphones,
  Lock,
  Eye,
  EyeOff,
  Phone,
  MapPin,
  Save,
  AlertCircle,
} from 'lucide-react';
import Overview from './components/Overview';
import Progress from './components/Progress';
import Achievements from './components/Achievements';
import Activity from './components/Activity';
import SettingComponent from './components/SettingComponent';

const achievements = [
  { title: 'First Steps', desc: 'Hoàn thành bài test đầu tiên', icon: Trophy, unlocked: true },
  { title: 'Vocabulary Master', desc: 'Học 1000+ từ vựng', icon: Brain, unlocked: true },
  {
    title: 'Consistent Learner',
    desc: 'Streak 7 ngày liên tiếp',
    icon: Calendar,
    unlocked: true,
  },
  { title: 'TOEIC Pro', desc: 'Đạt 800+ điểm', icon: Crown, unlocked: false },
];

const recentActivity = [
  { type: 'test', title: 'Listening Practice Test 5', score: '28/30', time: '2 giờ trước' },
  { type: 'vocab', title: 'Business Vocabulary Set', progress: '45/50', time: '5 giờ trước' },
  { type: 'flashcard', title: 'Common Phrases Review', count: '120 cards', time: '1 ngày trước' },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isPro, setIsPro] = useState(false);

  // Form states
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@email.com',
    phone: '0123456789',
    address: 'Hà Nội, Việt Nam',
    birthDate: '1995-05-15',
    targetScore: '850',
  });

  const userData = {
    name: personalInfo.name,
    email: personalInfo.email,
    joinDate: '15/03/2024',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    currentScore: 750,
    targetScore: parseInt(personalInfo.targetScore),
    studyStreak: 15,
    totalStudyTime: 127,
    wordsLearned: 2340,
    testsCompleted: 23,
    flashcardsReviewed: 890,
    rank: 'Gold',
    subscription: isPro ? 'Pro' : 'Free',
  };

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' });

  // Handle form submissions
  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    setSaveStatus({ type: 'success', message: 'Thông tin cá nhân đã được cập nhật thành công!' });
    setTimeout(() => setSaveStatus({ type: '', message: '' }), 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setSaveStatus({ type: 'error', message: 'Mật khẩu xác nhận không khớp!' });
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setSaveStatus({ type: 'error', message: 'Mật khẩu mới phải có ít nhất 6 ký tự!' });
      return;
    }
    setSaveStatus({ type: 'success', message: 'Mật khẩu đã được thay đổi thành công!' });
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setSaveStatus({ type: '', message: '' }), 3000);
  };

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 font-medium rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
          : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={userData.avatar}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                />
                {isPro && (
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {userData.email}
                </p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Tham gia: {userData.joinDate}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isPro
                        ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {userData.subscription}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Edit2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upgrade Banner (if not pro) */}
        {!isPro && (
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Crown className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    Nâng cấp lên Pro để mở khóa toàn bộ tính năng!
                  </h3>
                  <p className="text-purple-100">
                    Unlimited tests, advanced analytics, và nhiều hơn nữa
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPro(true)}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Nâng cấp ngay
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <TabButton
            id="overview"
            label="Tổng quan"
            isActive={activeTab === 'overview'}
            onClick={setActiveTab}
          />
          <TabButton
            id="progress"
            label="Tiến độ"
            isActive={activeTab === 'progress'}
            onClick={setActiveTab}
          />
          <TabButton
            id="achievements"
            label="Thành tích"
            isActive={activeTab === 'achievements'}
            onClick={setActiveTab}
          />
          <TabButton
            id="activity"
            label="Hoạt động"
            isActive={activeTab === 'activity'}
            onClick={setActiveTab}
          />
          <TabButton
            id="settings"
            label="Cài đặt"
            isActive={activeTab === 'settings'}
            onClick={setActiveTab}
          />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && <Overview userData={userData} />}

        {/* Progress Tab */}
        {activeTab === 'progress' && <Progress userData={userData} />}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && <Achievements userData={userData} />}

        {/* Activity Tab */}
        {activeTab === 'activity' && <Activity />}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <SettingComponent
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            passwordForm={passwordForm}
            setPasswordForm={setPasswordForm}
            saveStatus={saveStatus}
            setSaveStatus={setSaveStatus}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
