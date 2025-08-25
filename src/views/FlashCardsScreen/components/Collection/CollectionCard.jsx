import { BookOpen, Clock, Play, TrendingUp } from 'lucide-react';

export default function CollectionCard({ collection, onStudy }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'Never studied';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg  duration-200 overflow-hidden transition-all transform hover:scale-105">
      {/* Header with color accent */}
      <div className={`h-2 ${collection.color}`}></div>

      <div className="p-6">
        {/* Title and Description */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{collection.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{collection.description}</p>

        {/* Stats */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <BookOpen className="w-4 h-4 mr-2" />
            <span>{collection.wordCount} words</span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            <span>Last studied: {formatDate(collection.lastStudied)}</span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <TrendingUp className="w-4 h-4 mr-2" />
            <span>Progress: {collection.progress}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className={`h-2 rounded-full ${collection.color}`}
            style={{ width: `${collection.progress}%` }}
          ></div>
        </div>

        {/* Study Button */}
        <button
          onClick={onStudy}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
        >
          <Play className="w-4 h-4 mr-2" />
          Study Now
        </button>
      </div>
    </div>
  );
}
