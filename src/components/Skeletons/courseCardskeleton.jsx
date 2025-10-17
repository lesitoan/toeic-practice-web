export function CourseCardSkeleton({ viewMode = 'grid', count = 4 }) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <>
      {skeletons.map((item) => (
        <div
          key={item}
          className={`bg-gray-300 rounded-2xl shadow-sm overflow-hidden animate-pulse ${
            viewMode === 'list' ? 'flex items-center' : ''
          }`}
        >
          <div className={`p-6 w-full ${viewMode === 'list' ? 'flex-1' : ''}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center flex-1 gap-3">
                <div className="w-8 h-8 bg-gray-400 rounded" />

                <div className="flex-1">
                  <div className="w-2/3 h-5 mb-2 bg-gray-400 rounded" />
                  <div className="w-1/2 h-3 bg-gray-400 rounded" />
                </div>
              </div>

              <div className="flex-shrink-0 w-16 h-5 bg-gray-400 rounded-full" />
            </div>

            <div className="mb-6 space-y-3">
              <div className="w-1/4 h-3 bg-gray-400 rounded" />

              <div className="w-full h-2 bg-gray-400 rounded-full" />
            </div>

            <div className="flex gap-3">
              <div className="flex-1 h-12 bg-gray-400 rounded-lg" />

              <div className="w-12 h-12 bg-gray-400 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
