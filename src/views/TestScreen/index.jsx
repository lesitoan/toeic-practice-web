'use client';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import TestCard from '@/components/TestCard/TestCard';
import FilterTest from './components/FilterTest';
import { Pagination } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListTest } from '@/stores/testSlice';
import TestListSkeleton from '@/components/Skeletons/TestListSkeleton';
import QR from 'query-string';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const DEFAULT_PAGE_SIZE = 8;

export default function TestsScreen() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const {
    listTest,
    loading,
    filter: { page, pageSize },
    total,
  } = useSelector((state) => state.test);
  const [filter, setFilter] = useState({});

  const queryString = useMemo(() => {
    return {
      test_name: searchParams.get('search') || '',
      page: searchParams.get('page') || 1,
      limit: searchParams.get('pageSize') || DEFAULT_PAGE_SIZE,
    };
  }, [searchParams]);

  useEffect(() => {
    setFilter(QR.parse(QR.stringify(queryString), { arrayFormat: 'comma' }));
  }, [queryString]);

  useEffect(() => {
    dispatch(fetchListTest(filter));
  }, [dispatch, filter]);

  const renderPagination = useCallback(() => {
    if (total > pageSize) {
      return (
        <div className="flex w-full justify-center">
          <Pagination
            color="primary"
            size="md"
            showControls
            total={Math.ceil(total / pageSize)}
            page={page}
            onChange={handlePageChange}
            dotsJump={total / pageSize - 1}
          />
        </div>
      );
    }
  }, [total, page, pageSize]);

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-h1">Đề thi thử TOEIC</h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <FilterTest filter={filter} setFilter={setFilter} />

        <div className="bg-bgSecondary shadow-lg pb-4">
          {loading ? (
            <TestListSkeleton count={8} />
          ) : listTest.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8  p-4 md:p-6">
              {listTest.map((test) => (
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
