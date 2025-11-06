import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import QR from 'query-string';
import FilterCourse from './FilterCourse';
import CourseCard from './CourseCard';
import { fetchCollections } from '@/stores/collectionSlice';
import { CourseCardSkeleton } from '@/components/Skeletons/courseCardskeleton';
import { COLLECTION_FILTERS } from '../../constants';
import { Button } from '@nextui-org/react';
import { Plus } from 'lucide-react';
import AddCollectionPopup from '../AddCollectionPopup';

export default function VocabularyCoursesSection() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const { collections, loading, error } = useSelector((state) => state.collection);
  const [filter, setFilter] = useState({});
  const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);

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
    // dispatch(fetchCollections({}));
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
        ) : collections?.length > 0 ? (
          collections.map((collection) => (
            <CourseCard key={collection.id} collection={collection} viewMode={viewMode} />
          ))
        ) : (
          <div className="col-span-2 text-center">
            <p className="text-gray-500 text-xl">Không tìm thấy bộ từ vựng nào.</p>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-end space-x-4 text-lg">
        <Button
          onClick={() => setIsPopupAddOpen(true)}
          className="px-4 py-2 transition-colors bg-gray-100 hover:bg-gray-200 rounded-xl"
        >
          Thêm bộ từ vựng
          <Plus className="ml-2 h-4 w-4" />
        </Button>
        <Button
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          className="px-4 py-2 transition-colors bg-gray-100 hover:bg-gray-200 rounded-xl"
        >
          {viewMode === 'grid' ? 'Xem danh sách' : 'Xem lưới'}
        </Button>
      </div>

      <AddCollectionPopup isOpen={isPopupAddOpen} onClose={() => setIsPopupAddOpen(false)} />
    </div>
  );
}
