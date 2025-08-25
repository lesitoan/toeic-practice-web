import { useState } from 'react';
import { mockFlashcards } from '../../FlashCardsScreen/constants';
import { AlertCircle, Check, ChevronLeft, ChevronRight, RotateCcw, Volume2, X } from 'lucide-react';

export default function Flashcard({ mode, collectionSlug, onEnd }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knowStatus, setKnowStatus] = useState({});
  const [sessionStats, setSessionStats] = useState({
    studied: 0,
    known: 0,
    learning: 0,
  });

  const flashcards = mockFlashcards;
  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleKnowStatus = (known) => {
    const cardId = currentCard.id;
    const newKnowStatus = { ...knowStatus, [cardId]: known };
    setKnowStatus(newKnowStatus);

    const prevStatus = knowStatus[cardId];
    let newStats = { ...sessionStats };

    if (prevStatus === null) {
      newStats.studied += 1;
    } else {
      if (prevStatus) {
        newStats.known -= 1;
      } else {
        newStats.learning -= 1;
      }
    }

    if (known) {
      newStats.known += 1;
    } else {
      newStats.learning += 1;
    }

    setSessionStats(newStats);

    setTimeout(() => {
      if (currentIndex < flashcards.length - 1) {
        handleNext();
      }
    }, 500);
  };

  const speakWord = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'basic':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-w-[600px]">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={onEnd}
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="text-sm text-gray-600">
            {currentIndex + 1} / {flashcards.length}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="bg-white px-3 py-1 rounded-full shadow-sm">
            <span className="text-gray-600">Studied: </span>
            <span className="font-medium">{sessionStats.studied}</span>
          </div>
          <div className="bg-white px-3 py-1 rounded-full shadow-sm">
            <span className="text-green-600">Known: </span>
            <span className="font-medium text-green-600">{sessionStats.known}</span>
          </div>
          <div className="bg-white px-3 py-1 rounded-full shadow-sm">
            <span className="text-orange-600">Learning: </span>
            <span className="font-medium text-orange-600">{sessionStats.learning}</span>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-2xl mx-auto mt-20">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-white rounded-full h-2 shadow-sm">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="relative">
          <div
            className={`bg-white rounded-2xl shadow-xl p-8 min-h-[400px] cursor-pointer transition-transform duration-300 ${
              isFlipped ? 'transform rotate-y-180' : ''
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {!isFlipped ? (
              // Front side - Word
              <div className="text-center h-full flex flex-col justify-center">
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentCard.difficulty)}`}
                  >
                    {currentCard.difficulty}
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">{currentCard.word}</h1>

                <div className="flex items-center justify-center mb-6">
                  <span className="text-gray-500 mr-3">{currentCard.pronunciation}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWord(currentCard.word);
                    }}
                    className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    <Volume2 className="w-4 h-4 text-blue-600" />
                  </button>
                </div>

                <p className="text-gray-400 text-sm">Click to reveal meaning</p>
              </div>
            ) : (
              // Back side - Meaning & Example
              <div className="h-full flex flex-col justify-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{currentCard.word}</h2>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Meaning:</h3>
                  <p className="text-gray-600">{currentCard.meaning}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Example:</h3>
                  <p className="text-gray-600 italic">"{currentCard.example}"</p>
                  <p className="text-gray-500 text-sm mt-2">{currentCard.translation}</p>
                </div>

                {/* Know/Don't Know Buttons */}
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleKnowStatus(false);
                    }}
                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                      knowStatus[currentCard.id] === false
                        ? 'bg-orange-600 text-white'
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                    }`}
                  >
                    <AlertCircle className="w-5 h-5 inline mr-2" />
                    Still Learning
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleKnowStatus(true);
                    }}
                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                      knowStatus[currentCard.id] === true
                        ? 'bg-green-600 text-white'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    <Check className="w-5 h-5 inline mr-2" />I Know This
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <RotateCcw className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* End Session Button */}
        {currentIndex === flashcards.length - 1 && (
          <div className="text-center mt-6">
            <button
              onClick={onEnd}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Complete Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
