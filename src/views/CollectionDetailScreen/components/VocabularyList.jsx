'use client';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { VocabularyListSkeleton } from '@/components/Skeletons/VocabularyListSkeleton';
import { fetchVocabularies, setSelectedVocabulary } from '@/stores/vocabularySlice';

export function VocabularyList({ filter }) {
  const dispatch = useDispatch();
  const { loading, vocabularies, selectedVocabulary } = useSelector((state) => state.vocabulary);
  const { collectionId } = useParams();
  useEffect(() => {
    //random fake collectionId for testing
    const fakeCollectionId = Math.floor(Math.random() * 4) + 1;
    if (collectionId) {
      dispatch(fetchVocabularies({ ...filter, collectionId: fakeCollectionId.toString() }));
    }
  }, [collectionId, filter]);

  const onSelectVocab = useCallback(
    (vocab) => {
      dispatch(setSelectedVocabulary(vocab));
    },
    [dispatch]
  );

  if (loading) return <VocabularyListSkeleton count={5} />;
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {vocabularies.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>Không tìm thấy từ vựng nào</p>
          </div>
        ) : (
          <div className="divide-y max-h-[600px] overflow-y-auto">
            {vocabularies.map((vocab) => (
              <div
                key={vocab.id}
                onClick={() => onSelectVocab(vocab)}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedVocabulary?.id === vocab.id
                    ? 'bg-indigo-50 border-l-4 border-indigo-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{vocab.word}</h3>
                    <p className="text-sm text-gray-500">{vocab.phonetic}</p>
                    <p className="text-sm text-gray-600 mt-1">{vocab.definition}</p>
                  </div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full ml-4">
                    {vocab.part_of_speech}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="text-sm text-gray-600 mt-4">
        {/* Hiển thị {vocabularies.length} / {totalCount} từ */}
        Hiển thị {vocabularies.length} từ
      </p>
    </div>
  );
}
