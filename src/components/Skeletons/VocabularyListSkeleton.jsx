export function VocabularyListSkeleton({ count = 4 }) {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="divide-y max-h-[600px] overflow-y-auto">
          {[...Array(count)].map((_, index) => (
            <div key={index} className="p-4 animate-pulse">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded-full w-16 ml-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
      </div>
    </div>
  );
}
