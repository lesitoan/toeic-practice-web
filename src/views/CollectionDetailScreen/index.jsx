'use client';
import { useState, useMemo } from 'react';
import { LEARNING_MODES, MOCK_INITIAL_COLLECTION } from './constants';
import { CollectionHeader } from './components/CollectionHeader';
import { LearningModes } from './components/LearningMode';
import { SearchAndFilter } from './components/Filter';
import { VocabularyList } from './components/VocabularyList';
import { VocabularyDetail } from './components/VocabularyDetail';

export default function CollectionDetailScreen() {
  const [collection, setCollection] = useState(MOCK_INITIAL_COLLECTION);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVocab, setSelectedVocab] = useState(null);

  const CATEGORIES = ['All', ...new Set(collection.vocabularies.map((v) => v.category))];

  const filteredVocabulary = useMemo(() => {
    return collection.vocabularies.filter((vocab) => {
      const matchesSearch = vocab.word.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || vocab.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, collection.vocabularies]);

  const handleSaveName = (newName) => {
    setCollection({ ...collection, name: newName });
  };

  return (
    <div className="min-h-[70vh] p-6">
      <div className="max-w-7xl mx-auto">
        <CollectionHeader
          name={collection.name}
          description={collection.description}
          onNameChange={handleSaveName}
        />

        <LearningModes modes={LEARNING_MODES} collectionId={collection.id} />

        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={CATEGORIES}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <VocabularyList
            vocabularies={filteredVocabulary}
            selectedVocab={selectedVocab}
            onSelectVocab={setSelectedVocab}
            totalCount={collection.vocabularies.length}
          />
          <VocabularyDetail vocab={selectedVocab} />
        </div>
      </div>
    </div>
  );
}
