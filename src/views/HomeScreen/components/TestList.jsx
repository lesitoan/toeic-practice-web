import TestListSkeleton from '@/components/Skeletons/TestListSkeleton';
import TestCard from '@/components/TestCard/TestCard';
import { fetchListTestForHomePage } from '@/stores/testSlice';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function TestList() {
  const dispatch = useDispatch();
  const { listTestForHomePage, loading } = useSelector((state) => state.test);

  useEffect(() => {
    if (!listTestForHomePage || listTestForHomePage.length === 0) {
      dispatch(fetchListTestForHomePage());
    }
  }, [dispatch]);

  return (
    <div className="p-6 bg-bgSecondary shadow-lg rounded-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-h1">Đề thi mới nhất</h1>
        <div className="flex justify-center">
          <div className="bg-blue-500 w-40 h-1 rounded-full"></div>
        </div>
      </div>
      {loading ? (
        <TestListSkeleton count={8} />
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {listTestForHomePage.map((test) => (
              <TestCard key={test?.id} test={test} />
            ))}
          </div>
        </div>
      )}

      {/* Load More Button */}
      <div className="text-center mt-8">
        <Button color="primary" className="w-[400px]">
          <Link href="/tests">Xem tất cả đề thi</Link>
        </Button>
      </div>
    </div>
  );
}
