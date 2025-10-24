'use client';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import QR from 'query-string';
import { CollectionHeader } from './components/CollectionHeader';
import { LearningModes } from './components/LearningMode';
import { Filter } from './components/Filter';
import { VocabularyList } from './components/VocabularyList';
import { VocabularyDetail } from './components/VocabularyDetail';

export default function CollectionDetailScreen() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState({});

  const queryString = useMemo(() => {
    return {
      search: searchParams.get('search') || '',
    };
  }, [searchParams]);

  useEffect(() => {
    setFilter(QR.parse(QR.stringify(queryString), { arrayFormat: 'comma' }));
  }, [queryString]);

  return (
    <div className="min-h-[70vh] p-6">
      <div className="max-w-7xl mx-auto">
        <CollectionHeader />

        <LearningModes />

        <Filter filter={filter} onFilterChange={setFilter} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <VocabularyList filter={filter} />
          <VocabularyDetail />
        </div>
      </div>
    </div>
  );
}
