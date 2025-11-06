import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Loader2, Plus, X, ChevronRight, FolderPlus, BookOpen, Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollections } from '@/stores/collectionSlice';
import { toast } from 'react-toastify';
import vocabularyService from '@/services/vocabulary.service';
import Link from 'next/link';

export const AddVocaToCollectionPopup = ({ isOpen, onClose, word }) => {
  const dispatch = useDispatch();
  const { collections, loading } = useSelector((state) => state.collection);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  const handleSelectCollection = async (collection) => {
    setSelectedCollection(collection);
    setIsAdding(true);
    setError(null);
    try {
      const payload = {
        english: word.en,
        vietnamese: word.vi,
        collectionId: collection.id,
      };
      await vocabularyService.saveVocabularyCollection(payload);
      toast.success('Thêm từ vựng thành công!');
      onClose();
    } catch (error) {
      setError('Thêm từ vựng thất bại !!!!!');
    } finally {
      setIsAdding(false);
    }
  };

  const handleClose = () => {
    if (isAdding) return;
    onClose();
  };

  if (!isOpen) return null;

  const popupContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full transform transition-all duration-300 ease-out max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-6">
          <button
            onClick={handleClose}
            disabled={isAdding}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Thêm vào Bộ Sưu Tập</h2>
              <p className="text-blue-100 text-sm mt-1">
                <span className="font-semibold">{word?.en}</span>
                {' → '}
                <span className="font-semibold">{word?.vi}</span>
              </p>
            </div>
          </div>

          {/* Decorative elements */}
          <Sparkles className="absolute top-6 right-16 w-5 h-5 text-yellow-300 opacity-80 animate-pulse" />
          <Sparkles
            className="absolute bottom-4 right-24 w-4 h-4 text-pink-300 opacity-60 animate-pulse"
            style={{ animationDelay: '0.5s' }}
          />
        </div>

        {/* error */}
        <div className="flex-1 overflow-y-auto p-6 !pb-0">
          {error && (
            <div className="text-center py-4 bg-red-100 rounded-xl">
              <p className="text-md text-red-600">{error}</p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <CollectionSkeleton />
          ) : collections && collections.length > 0 ? (
            <div className="space-y-3">
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => handleSelectCollection(collection)}
                  disabled={isAdding}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all border-2 group ${
                    isAdding && selectedCollection?.id === collection.id
                      ? 'bg-blue-50 border-blue-400 shadow-md'
                      : 'hover:bg-gray-50 border-gray-200 hover:border-blue-300 hover:shadow-md'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-gray-900 text-lg">{collection?.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {/* <span className="font-medium text-blue-600">{collection.wordCount || 0}</span>{' '}
                      từ vựng */}
                      {collection.description && (
                        <span className="text-gray-400"> • {collection.description}</span>
                      )}
                    </p>
                  </div>
                  {isAdding && selectedCollection?.id === collection.id ? (
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0 ml-3" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-3" />
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FolderPlus className="w-10 h-10 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Chưa có bộ sưu tập</h4>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                Tạo bộ sưu tập đầu tiên để lưu và quản lý từ vựng của bạn
              </p>
              <a
                href="/vocabulary"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg font-medium"
              >
                <Plus className="w-5 h-5" />
                Tạo bộ sưu tập mới
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        {!loading && collections && collections.length > 0 && (
          <div className="p-6 border-t bg-gray-50 rounded-b-2xl">
            <Link
              href="/vocabulary"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all font-semibold hover:shadow-md"
            >
              <Plus className="w-5 h-5" />
              Tạo bộ sưu tập mới
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  // Sử dụng Portal để render popup ở ngoài DOM hierarchy
  return typeof document !== 'undefined' ? createPortal(popupContent, document.body) : null;
};

const CollectionSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200">
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-48"></div>
            </div>
            <div className="w-5 h-5 bg-gray-200 rounded ml-3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
