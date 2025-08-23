// components/Profile/Activity.jsx
import React from 'react';
import { FileText, BookOpen, Brain } from 'lucide-react';

const Activity = () => {
  const recentActivity = [
    { type: 'test', title: 'Listening Practice Test 5', score: '28/30', time: '2 giờ trước' },
    { type: 'vocab', title: 'Business Vocabulary Set', progress: '45/50', time: '5 giờ trước' },
    { type: 'flashcard', title: 'Common Phrases Review', count: '120 cards', time: '1 ngày trước' },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Hoạt động gần đây</h3>
      <div className="space-y-4">
        {recentActivity.map((activity, index) => (
          <ActivityItem key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
};

const ActivityItem = ({ activity }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'test':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'vocab':
        return <BookOpen className="w-5 h-5 text-green-600" />;
      case 'flashcard':
        return <Brain className="w-5 h-5 text-purple-600" />;
      default:
        return <FileText className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="p-3 bg-white rounded-lg shadow-sm">{getIcon(activity.type)}</div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{activity.title}</h4>
        <p className="text-sm text-gray-600">
          {activity.score || activity.progress || activity.count}
        </p>
      </div>
      <span className="text-sm text-gray-500">{activity.time}</span>
    </div>
  );
};

export default Activity;
