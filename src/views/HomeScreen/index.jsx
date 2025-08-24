'use client';
import CommunityFeedback from './components/CommunityFeedback';
import SlideShowBanner from './components/SlideShowBanner';
import TestList from './components/TestList';
import VocabularyTranslator from './components/VocabularyTranslator';

export default function HomeScreen() {
  return (
    <div className="relative left-1/2 -translate-x-1/2 space-y-10 mb-10">
      <div className="">
        <SlideShowBanner />
      </div>
      <div className="">
        <VocabularyTranslator />
      </div>
      <div className="">
        <TestList />
      </div>
      <div className="">
        <CommunityFeedback />
      </div>
    </div>
  );
}
