'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import Flashcard from './components/FlashCard';

export default function FlashCardPlayScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const collectionSlug = searchParams.get('collectionSlug');

  const handleEndStudy = () => {
    router.push('/flashcards');
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <Flashcard mode={mode} collectionSlug={collectionSlug} onEnd={handleEndStudy} />
    </div>
  );
}
