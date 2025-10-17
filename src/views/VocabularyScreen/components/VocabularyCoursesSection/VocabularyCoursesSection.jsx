import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { vocabularyCategories } from '../../constants';
import FilterCourse from './FilterCourse';
import CourseCard from './CourseCard';
import { fetchDefaultCollections } from '@/stores/collectionSlice';
import { CourseCardSkeleton } from '@/components/Skeletons/courseCardskeleton';

export default function VocabularyCoursesSection() {
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const defaultCollections = useSelector((state) => state.collection.defaultCollections);

  useEffect(() => {
    dispatch(fetchDefaultCollections());
  }, [dispatch]);

  const filteredCategories = vocabularyCategories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <FilterCourse searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/* <div className="flex justify-end mb-4">
        <button
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          className="px-4 py-2 transition-colors bg-gray-100 hover:bg-gray-200 rounded-xl"
        >
          {viewMode === 'grid' ? 'Xem danh sách' : 'Xem lưới'}
        </button>
      </div> */}
      <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-4'}>
        {defaultCollections && defaultCollections.length > 0 ? (
          defaultCollections.map((collection) => (
            <CourseCard key={collection.id} collection={collection} viewMode={viewMode} />
          ))
        ) : (
          <CourseCardSkeleton count={4} />
        )}
      </div>
    </div>
  );
}
