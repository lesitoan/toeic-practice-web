import { useState } from 'react';
import { vocabularyCategories } from '../../constants';
import FilterCourse from './FilterCourse';
import CourseCard from './CourseCard';

export default function VocabularyCoursesSection() {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

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
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
        >
          {viewMode === 'grid' ? 'Xem danh sách' : 'Xem lưới'}
        </button>
      </div> */}
      <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-4'}>
        {filteredCategories.map((category) => (
          <CourseCard key={category.id} category={category} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
}
