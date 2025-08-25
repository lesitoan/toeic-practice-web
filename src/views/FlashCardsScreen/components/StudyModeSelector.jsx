import { BookOpen, RotateCcw, Shuffle } from 'lucide-react';

export default function StudyModeSelector({ collections, onStartStudy }) {
  return (
    <div className="bg-bgSecondary rounded-lg shadow-lg p-6">
      <h3 className="text-h3 mb-4">Chế độ học</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Random Study */}
        <button
          onClick={() => onStartStudy('random')}
          className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
        >
          <Shuffle className="w-8 h-8 text-blue-600 mb-2" />
          <span className="font-medium text-gray-900">Random Study</span>
          <span className="text-sm text-gray-500 text-center">
            Study words from all collections
          </span>
        </button>

        {/* Continue Last Session */}
        <button
          onClick={() => onStartStudy('continue')}
          className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200"
        >
          <RotateCcw className="w-8 h-8 text-green-600 mb-2" />
          <span className="font-medium text-gray-900">Continue Learning</span>
          <span className="text-sm text-gray-500 text-center">Resume your last study session</span>
        </button>

        {/* Quick Collection Study */}
        <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <BookOpen className="w-8 h-8 text-purple-600 mb-2" />
          <span className="font-medium text-gray-900 mb-2">Quick Select</span>
          <select
            onChange={(e) => e.target.value && onStartStudy('collection', e.target.value)}
            className="w-full text-sm border border-gray-300 rounded px-2 py-1"
            defaultValue=""
          >
            <option value="">Choose collection...</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
