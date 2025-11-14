'use client';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Flashcard from './components/FlashCard';
import { fetchVocabulariesByCollectionId } from '@/stores/vocabularySlice';
import PopupFinishLearnCard from '@/components/popup/PopupFinishLearnCard';
import CradleLoader from '@/components/common/Loading/CradleLoader';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';

const shuffleArray = (array) => {
  if (!Array.isArray(array)) return [];
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export default function FlashCardPlayScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { collectionSelectedId } = useParams();
  const { vocabularies, loading } = useSelector((state) => state.vocabulary);
  const [listVocabularies, setListVocabularies] = useState([]);
  const [currentVocabularyIndex, setCurrentVocabularyIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    if (collectionSelectedId) {
      dispatch(fetchVocabulariesByCollectionId({ collectionId: collectionSelectedId }));
    }
  }, [collectionSelectedId]);

  useEffect(() => {
    if (vocabularies && vocabularies.length > 0) {
      setListVocabularies(shuffleArray(vocabularies));
      setCurrentVocabularyIndex(0);
    } else {
      setListVocabularies([]);
      setCurrentVocabularyIndex(0);
    }
  }, [vocabularies]);

  const handleChangeVocabulary = (key) => {
    if (key === 'next') {
      if (currentVocabularyIndex < listVocabularies.length - 1) {
        setCurrentVocabularyIndex(currentVocabularyIndex + 1);
      }
    } else if (key === 'prev') {
      if (currentVocabularyIndex > 0) {
        setCurrentVocabularyIndex(currentVocabularyIndex - 1);
      }
    }
  };

  const handleFinish = () => {
    const audio = new Audio('/sounds/finish.mp3');
    audio.play().catch((err) => {});

    setIsPopupVisible(true);
  };

  const handleRestart = () => {
    setIsPopupVisible(false);
    setListVocabularies(shuffleArray(vocabularies));
    setCurrentVocabularyIndex(0);
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <CradleLoader size="xl" color="#4F46E5" />
      </div>
    );
  } else if (listVocabularies.length === 0) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          {/* Icon cảnh báo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-20 animate-pulse" />
            </div>
          </div>

          {/* Tiêu đề */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Không Tìm Thấy Bộ Sưu Tập</h2>

          {/* Mô tả */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            Bộ sưu tập flashcard này không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra lại hoặc chọn
            bộ sưu tập khác.
          </p>

          {/* Nút hành động */}
          <div className="space-y-3">
            <button
              onClick={() => router.push('/')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold
                       hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200
                       shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Về Trang chủ</span>
            </button>

            <button
              onClick={() => router.back()}
              className="w-full text-gray-700 bg-gray-100 py-4 px-6 rounded-xl font-medium 
                       hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Quay Lại</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <Flashcard
        currentVocabulary={listVocabularies[currentVocabularyIndex]}
        onChange={handleChangeVocabulary}
        process={(currentVocabularyIndex + 1) / listVocabularies.length}
        isFirst={currentVocabularyIndex === 0}
        isLast={currentVocabularyIndex === listVocabularies.length - 1}
        onFinish={handleFinish}
      />
      {isPopupVisible && (
        <PopupFinishLearnCard
          onRestart={() => {
            handleRestart();
          }}
          onGoBack={() => {
            setIsPopupVisible(false);
            router.back();
          }}
          totalCards={listVocabularies.length}
        />
      )}
    </div>
  );
}
