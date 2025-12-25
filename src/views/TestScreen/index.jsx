'use client';
import React, { useMemo, useEffect, useCallback } from 'react';
import TestCard from '@/components/TestCard/TestCard';
import FilterTest from './components/FilterTest';
import { Pagination } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListTest } from '@/stores/testSlice';
import TestListSkeleton from '@/components/Skeletons/TestListSkeleton';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const DEFAULT_PAGE_SIZE = 8;

export default function TestsScreen() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { listTest, loading } = useSelector((state) => state.test);
  
  // Get search and page from URL
  const searchTerm = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1',  10);

  // Fetch all tests once on mount
  useEffect(() => {
    // Fetch without any filter to get all tests
    dispatch(fetchListTest({}));
  }, [dispatch]);

  // Filter and paginate tests in frontend
  const { filteredTests, paginatedTests, totalPages } = useMemo(() => {
    // Filter by search term
    let filtered = listTest;
    
    if (searchTerm) {
      filtered = listTest.filter((test) => {
        const name = (test.name || test.title || '').toLowerCase();
        return name.includes(searchTerm.toLowerCase());
      });
    }

    // Calculate pagination
    const total = Math.ceil(filtered.length / DEFAULT_PAGE_SIZE);
    const startIndex = (currentPage - 1) * DEFAULT_PAGE_SIZE;
    const endIndex = startIndex + DEFAULT_PAGE_SIZE;
    const paginated = filtered.slice(startIndex, endIndex);

    return {
      filteredTests: filtered,
      paginatedTests: paginated,
      totalPages: total,
    };
  }, [listTest, searchTerm, currentPage]);

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    router.push(`${pathname}?${params.toString()}`);
  };

  const renderPagination = useCallback(() => {
    if (totalPages > 1) {
      return (
        <div className="flex w-full justify-center">
          <Pagination
            color="primary"
            size="md"
            showControls
            total={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      );
    }
  }, [totalPages, currentPage]);

  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-h1">Đề thi thử TOEIC</h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <FilterTest />

        <div className="bg-bgSecondary shadow-lg pb-4">
          {loading ? (
            <TestListSkeleton count={8} />
          ) : paginatedTests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8  p-4 md:p-6">
              {paginatedTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">Không tìm thấy kết quả phù hợp</div>
              <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
            </div>
          )}
          {renderPagination()}
        </div>
      </div>
    </div>
  );
}
