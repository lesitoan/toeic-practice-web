import { Skeleton } from '@nextui-org/react';

export default function TestListSkeleton({ count = 8 }) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <TestCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

function TestCardSkeleton() {
  return (
    <div className="bg-gray-200 rounded-lg p-5 shadow-md">
      <Skeleton className="h-6 w-3/4 mb-4 rounded-lg" />

      <div className="flex items-center gap-4 mb-3">
        <Skeleton className="h-4 w-16 rounded-lg" />
        <Skeleton className="h-4 w-20 rounded-lg" />
        <Skeleton className="h-4 w-16 rounded-lg" />
      </div>

      <Skeleton className="h-4 w-32 mb-4 rounded-lg" />

      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-16 rounded-md" />
        <Skeleton className="h-6 w-20 rounded-md" />
        <Skeleton className="h-6 w-20 rounded-md" />
      </div>

      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
}
