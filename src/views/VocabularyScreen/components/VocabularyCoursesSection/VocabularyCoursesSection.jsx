import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import QR from 'query-string';
import FilterCourse from './FilterCourse';
import CourseCard from './CourseCard';
import { fetchCollections } from '@/stores/collectionSlice';
import { CourseCardSkeleton } from '@/components/Skeletons/courseCardskeleton';
import { COLLECTION_FILTERS } from '../../constants';

export default function VocabularyCoursesSection() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const { collections, loading, error } = useSelector((state) => state.collection);
  const [filter, setFilter] = useState({});

  const queryString = useMemo(() => {
    return {
      search: searchParams.get('search') || '',
      type: searchParams.get('type') || COLLECTION_FILTERS[0].value,
    };
  }, [searchParams]);

  useEffect(() => {
    setFilter(QR.parse(QR.stringify(queryString), { arrayFormat: 'comma' }));
  }, [queryString]);

  useEffect(() => {
    dispatch(fetchCollections(filter));
  }, [dispatch, filter]);

  return (
    <div>
      <FilterCourse filter={filter} setFilter={setFilter} />
      {/* <div className="flex justify-end mb-4">
        <button
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          className="px-4 py-2 transition-colors bg-gray-100 hover:bg-gray-200 rounded-xl"
        >
          {viewMode === 'grid' ? 'Xem danh sách' : 'Xem lưới'}
        </button>
      </div> */}
      <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-4'}>
        {loading ? (
          <CourseCardSkeleton count={4} />
        ) : (
          collections.map((collection) => (
            <CourseCard key={collection.id} collection={collection} viewMode={viewMode} />
          ))
        )}
      </div>
    </div>
  );
}
