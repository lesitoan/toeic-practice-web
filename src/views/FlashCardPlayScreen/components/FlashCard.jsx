import { useState } from 'react';
import {
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  RotateCcw,
  Volume2,
  X,
} from 'lucide-react';

export default function Flashcard({
  currentVocabulary,
  onChange,
  process,
  isFirst,
  isLast,
  onFinish,
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const speakWord = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const handleChangeVocabulary = (key) => {
    setIsFlipped(false);
    onChange(key);
  };

  return (
    <div className="min-w-[600px]">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {}}
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="text-sm text-gray-600">{process}</div>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-2xl mx-auto mt-20">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-white rounded-full h-2 shadow-sm">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${process * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Flashcard with 3D Flip Animation */}
        <div
          className="relative cursor-pointer"
          style={{ perspective: '1000px' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className="relative w-full min-h-[400px] transition-transform duration-600 ease-in-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front Side */}
            <div
              className="absolute inset-0 bg-white rounded-2xl shadow-xl p-8 min-h-[400px]"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <div className="text-center h-full flex flex-col justify-center items-center">
                <div className="flex items-center justify-center mb-6 mt-20 gap-4">
                  <h1 className="text-6xl font-bold text-gray-900 mb-4">
                    {currentVocabulary?.word}
                  </h1>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWord(currentVocabulary?.word);
                    }}
                    className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    <Volume2 className="w-4 h-4 text-blue-600" />
                  </button>
                </div>
                <p className="text-gray-400 text-sm">Click để xem nghĩa</p>
              </div>
            </div>

            {/* Back Side */}
            <div
              className="absolute inset-0 bg-white rounded-2xl shadow-xl p-8 min-h-[400px]"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="h-full flex flex-col justify-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {currentVocabulary?.word}
                </h2>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Meaning:</h3>
                  <p className="text-gray-600">{currentVocabulary?.definition}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Example:</h3>
                  <p className="text-gray-600 italic">"{currentVocabulary?.example}"</p>
                  <p className="text-gray-500 text-sm mt-2">{currentVocabulary?.part_of_speech}</p>
                </div>

                {/* Know/Don't Know Buttons */}
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="flex-1 py-3 px-6 rounded-lg font-medium transition-colors bg-orange-100 text-orange-700 hover:bg-orange-200 cursor-not-allowed"
                    disabled={true}
                  >
                    <AlertCircle className="w-5 h-5 inline mr-2" />
                    Still Learning
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="flex-1 py-3 px-6 rounded-lg font-medium transition-colors bg-green-100 text-green-700 hover:bg-green-200 cursor-not-allowed"
                    disabled={true}
                  >
                    <Check className="w-5 h-5 inline mr-2" />I Know This
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handleChangeVocabulary('prev')}
            disabled={isFirst}
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
          >
            {isFlipped ? (
              <RotateCcw className="w-6 h-6 text-gray-600" />
            ) : (
              <RotateCw className="w-6 h-6 text-gray-600" />
            )}
          </button>

          <button
            onClick={() => handleChangeVocabulary('next')}
            disabled={isLast}
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* End Session Button */}
        {isLast && (
          <div className="text-center mt-6">
            <button
              onClick={onFinish}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Hoàn thành
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
