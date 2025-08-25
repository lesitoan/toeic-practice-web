import { useState } from 'react';
import { Star, Volume2 } from 'lucide-react';
import { recentWords } from '../../constants';

export default function RecentWords() {
  const [showTranslation, setShowTranslation] = useState(true);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-500" />
        Từ vừa học
      </h3>
      <div className="space-y-4">
        {recentWords.map((word, index) => (
          <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-800">{word.word}</span>
              <button className="text-blue-500 hover:text-blue-600">
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-gray-500 mb-1">{word.phonetic}</div>
            {showTranslation && <div className="text-sm text-gray-600">{word.meaning}</div>}
            <span
              className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${
                word.level === 'B2' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
              }`}
            >
              {word.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
