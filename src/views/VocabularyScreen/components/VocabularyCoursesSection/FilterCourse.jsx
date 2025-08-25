import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function FilterCourse({ searchQuery, setSearchQuery }) {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm bộ từ vựng..."
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
          <Filter className="w-5 h-5" />
          Lọc
        </button>
      </div>

      {/* Quick Filter Tabs */}
      <div className="flex flex-wrap gap-2 mt-4">
        {['all', 'learning', 'completed', 'favorite'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab === 'all'
              ? 'Tất cả'
              : tab === 'learning'
                ? 'Đang học'
                : tab === 'completed'
                  ? 'Hoàn thành'
                  : 'Yêu thích'}
          </button>
        ))}
      </div>
    </div>
  );
}
