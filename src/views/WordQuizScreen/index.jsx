'use client';
import { useState, useEffect, useMemo } from 'react';
import { Check, X, ChevronRight, Award, RotateCw } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { fetchVocabulariesByCollectionId } from '@/stores/vocabularySlice';
import ShowResult from './components/ShowResult';
import Link from 'next/link';
import CradleLoader from '@/components/common/Loading/CradleLoader';

export default function WordQuizScreen() {
  const dispatch = useDispatch();
  const { collectionSelectedId } = useParams();
  const { vocabularies, loading } = useSelector((state) => state.vocabulary);

  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [shuffledVocabularies, setShuffledVocabularies] = useState([]);
  const [quizState, setQuizState] = useState({
    currentIndex: 0,
    score: 0,
    selectedAnswer: null,
    isAnswered: false,
  });

  useEffect(() => {
    if (collectionSelectedId) {
      dispatch(fetchVocabulariesByCollectionId({ collectionId: collectionSelectedId }));
    }
  }, [collectionSelectedId]);

  useEffect(() => {
    if (vocabularies?.length >= 4) {
      const shuffled = [...vocabularies].sort(() => Math.random() - 0.5);

      const withOptions = shuffled.map((vocab) => ({
        ...vocab,
        options: generateOptions(vocab, vocabularies),
      }));

      setShuffledVocabularies(withOptions);
    }
  }, [vocabularies]);

  const generateOptions = (correctVocab, allVocabs) => {
    const options = [correctVocab.definition];
    const wrongChoices = allVocabs
      .filter((v) => v.id !== correctVocab.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((v) => v.definition);

    return [...options, ...wrongChoices].sort(() => Math.random() - 0.5);
  };

  const currentVocab = useMemo(
    () => shuffledVocabularies[quizState.currentIndex],
    [shuffledVocabularies, quizState.currentIndex]
  );
  const options = currentVocab?.options || [];

  const progress = useMemo(
    () =>
      shuffledVocabularies.length > 0
        ? ((quizState.currentIndex + 1) / shuffledVocabularies.length) * 100
        : 0,
    [quizState.currentIndex, shuffledVocabularies.length]
  );

  const handleSelectAnswer = (answer) => {
    if (quizState.isAnswered) return;

    setQuizState((prev) => ({
      ...prev,
      selectedAnswer: answer,
      isAnswered: true,
    }));

    const isCorrect = answer === currentVocab.definition;

    const audio = new Audio(isCorrect ? '/sounds/soundCorrect.mp3' : '/sounds/soundIncorrect.mp3');
    audio.play().catch((err) => {});

    if (isCorrect) {
      setQuizState((prev) => ({
        ...prev,
        score: prev.score + 1,
      }));
    }

    setAnswers((prev) => [
      ...prev,
      {
        question: currentVocab.word,
        selected: answer,
        correct: currentVocab.definition,
        isCorrect,
      },
    ]);
  };

  const handleNext = () => {
    if (quizState.currentIndex < shuffledVocabularies.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        selectedAnswer: null,
        isAnswered: false,
      }));
    } else {
      setShowResult(true);
      if (quizState.score / shuffledVocabularies.length > 0.8) {
        const audio = new Audio('/sounds/finish.mp3');
        audio.play().catch((err) => console.log('Audio play error:', err));
      }
    }
  };

  const handleRestart = () => {
    const reshuffled = [...vocabularies].sort(() => Math.random() - 0.5);
    const withOptions = reshuffled.map((vocab) => ({
      ...vocab,
      options: generateOptions(vocab, vocabularies),
    }));
    setShuffledVocabularies(withOptions);

    setQuizState({
      currentIndex: 0,
      score: 0,
      selectedAnswer: null,
      isAnswered: false,
    });
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <ShowResult
        score={quizState.score}
        total={shuffledVocabularies.length}
        onRestart={handleRestart}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <CradleLoader size="xl" color="#4F46E5" />
      </div>
    );
  } else if (vocabularies.length < 4) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Không đủ từ vựng để bắt đầu bài quiz
          </h2>
          <p className="text-gray-600 mb-6">
            Vui lòng thêm ít nhất 4 từ vựng vào bộ sưu tập để có thể chơi.
          </p>
          <Link
            href={`/collection/${collectionSelectedId}`}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold
                       hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200
                       shadow-lg hover:shadow-xl"
          >
            Quay lại
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Câu {quizState.currentIndex + 1}/{shuffledVocabularies.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              Điểm: {quizState.score}/{shuffledVocabularies.length}
            </span>
          </div>
          <div className="w-full bg-white rounded-full h-3 shadow-sm">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="text-center mb-8">
            <h3 className="text-xl text-gray-600 mb-4">Nghĩa của từ sau là gì?</h3>
            <h2 className="text-5xl font-bold text-gray-900">{currentVocab?.word}</h2>
            {currentVocab?.part_of_speech && (
              <p className="text-gray-500 mt-2 text-sm">({currentVocab.part_of_speech})</p>
            )}
          </div>

          <div className="space-y-3">
            {options.map((option, index) => {
              const isSelected = quizState.selectedAnswer === option;
              const isCorrect = option === currentVocab.definition;
              const showCorrect = quizState.isAnswered && isCorrect;
              const showWrong = quizState.isAnswered && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(option)}
                  disabled={quizState.isAnswered}
                  className={`w-full p-5 rounded-xl text-left font-medium transition-all duration-200 transform hover:scale-[1.02]
                    ${!quizState.isAnswered && 'hover:bg-blue-50 hover:border-blue-300 hover:shadow-md'}
                    ${!quizState.isAnswered && 'bg-white border-2 border-gray-200'}
                    ${showCorrect && 'bg-green-50 border-2 border-green-500'}
                    ${showWrong && 'bg-red-50 border-2 border-red-500'}
                    ${quizState.isAnswered && !isSelected && !isCorrect && 'opacity-50'}
                    disabled:cursor-not-allowed
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold
                        ${!quizState.isAnswered && 'bg-gray-100 text-gray-600'}
                        ${showCorrect && 'bg-green-500 text-white'}
                        ${showWrong && 'bg-red-500 text-white'}
                      `}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-gray-800">{option}</span>
                    </div>
                    {showCorrect && <Check className="w-6 h-6 text-green-600 flex-shrink-0" />}
                    {showWrong && <X className="w-6 h-6 text-red-600 flex-shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>

          {quizState.isAnswered && currentVocab?.example && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Ví dụ:</p>
              <p className="text-gray-800 italic">"{currentVocab.example}"</p>
            </div>
          )}
        </div>

        {quizState.isAnswered && (
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold
                     hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200
                     shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <span>
              {quizState.currentIndex < shuffledVocabularies.length - 1
                ? 'Câu tiếp theo'
                : 'Xem kết quả'}
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
