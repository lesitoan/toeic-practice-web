'use client';
import { useRouter } from 'next/navigation';
import StudyHistory from './components/StudyHistory';
import StudyModeSelector from './components/StudyModeSelector';
import { mockHistory, mockCollections } from './constants';
import CollectionList from './components/Collection/CollectionList';

export default function FlashcardsScreen() {
  const router = useRouter();
  const handleStartStudy = (collectionSlug, mode) => {
    router.push(`/flashcards/${collectionSlug}${mode ? `?mode=${mode}` : ''}`);
  };

  return (
    <div className="min-h-screen my-6">
      <div className="mx-auto space-y-6">
        <div className="flex flex-col items-center">
          <h1 className="text-h1 mb-2">Flashcards</h1>
          <p className="text-gray-600">Học từ vựng với thẻ flashcard</p>
        </div>

        <StudyModeSelector collections={mockCollections} onStartStudy={handleStartStudy} />

        <CollectionList onSelect={handleStartStudy} />

        {/* Study History */}
        <div>
          <StudyHistory
            history={mockHistory}
            onContinue={(historyItem) => handleStartStudy(historyItem.collectionSlug, 'continue')}
          />
        </div>
      </div>
    </div>
  );
}
