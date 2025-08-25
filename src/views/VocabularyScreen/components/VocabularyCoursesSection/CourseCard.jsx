import { Play, ChevronRight } from 'lucide-react';

export default function CourseCard({ category, viewMode }) {
  return (
    <div
      key={category.id}
      className={`bg-gradient-to-br ${category.bgColor} rounded-2xl shadow-sm hover:shadow-lg transition-all transform hover:scale-105 overflow-hidden ${
        viewMode === 'list' ? 'flex items-center' : ''
      }`}
    >
      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{category.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{category.title}</h3>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </div>
          </div>
          <span
            className={`px-3 py-1 bg-gradient-to-r ${category.color} text-white text-xs font-semibold rounded-full`}
          >
            {category.level}
          </span>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{category.wordCount} từ vựng</span>
            <span className="text-gray-600">{category.estimatedTime}</span>
          </div>

          <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
            <div
              className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all`}
              style={{ width: `${category.progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>{category.progress}% hoàn thành</span>
            <span>
              {Math.round((category.wordCount * category.progress) / 100)} / {category.wordCount}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {category.topics.map((topic, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-white bg-opacity-70 text-xs font-medium text-gray-700 rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            className={`flex-1 bg-gradient-to-r ${category.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2`}
          >
            <Play className="w-4 h-4" />
            Tiếp tục học
          </button>
          <button className="px-4 py-3 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-xl transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
