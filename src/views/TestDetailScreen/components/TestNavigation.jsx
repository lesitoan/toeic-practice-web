import { BookOpen, FileText, MessageCircle, Volume2 } from 'lucide-react';

export default function TestNavigation({ activeTab, setActiveTab }) {
  return (
    <div className="bg-bgSecondary border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8">
          {[
            { key: 'overview', label: 'Tổng quan', icon: BookOpen },
            { key: 'parts', label: 'Chọn phần thi', icon: FileText },
            { key: 'answers', label: 'Đáp án & Giải thích', icon: Volume2 },
            { key: 'comments', label: 'Bình luận', icon: MessageCircle },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
