'use client';

import { useState } from 'react';
import { Volume2, Copy, Check } from 'lucide-react';

export function VocabularyDetail({ vocab }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleSpeak = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!vocab) {
    return (
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
          <div className="text-center text-gray-500 mb-6">
            <p>Chọn một từ vựng để xem chi tiết</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{vocab.word}</h2>

        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600 italic">{vocab.phonetic}</p>
          <button
            onClick={() => handleSpeak(vocab.word)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Phát âm"
          >
            <Volume2 size={20} className="text-indigo-600" />
          </button>
        </div>

        <hr className="mb-4" />

        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Loại từ</p>
          <p className="text-gray-800">{vocab.partOfSpeech}</p>
        </div>

        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Nghĩa</p>
          <p className="text-gray-800">{vocab.meaning}</p>
        </div>

        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Ví dụ</p>
          <p className="text-gray-800 italic bg-gray-50 p-3 rounded">{vocab.example}</p>
        </div>

        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Từ đồng nghĩa</p>
          <div className="flex flex-wrap gap-2">
            {vocab.synonyms.map((syn, idx) => (
              <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
                {syn}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => handleCopy(`${vocab.word}: ${vocab.meaning}`, vocab.id)}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors mb-3"
        >
          {copiedId === vocab.id ? (
            <>
              <Check size={18} />
              Đã sao chép
            </>
          ) : (
            <>
              <Copy size={18} />
              Sao chép
            </>
          )}
        </button>
      </div>
    </div>
  );
}
