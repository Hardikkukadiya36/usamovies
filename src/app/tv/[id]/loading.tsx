export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0d1117] animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="h-[70vh] max-h-[800px] w-full bg-gray-800/50 relative">
        <div className="container-custom h-full flex flex-col justify-end pb-16 relative z-10">
          <div className="max-w-4xl">
            <div className="h-12 bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="h-6 bg-gray-700 rounded w-24"></div>
              <div className="h-6 bg-gray-700 rounded w-24"></div>
              <div className="h-6 bg-gray-700 rounded w-24"></div>
            </div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3 mb-6"></div>
            <div className="flex gap-4">
              <div className="h-12 bg-gray-700 rounded-lg w-40"></div>
              <div className="h-12 bg-gray-700 rounded-lg w-32"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container-custom py-12">
        <div className="mb-12">
          <div className="h-8 bg-gray-800 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="aspect-[2/3] bg-gray-800 rounded-lg"></div>
                <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                <div className="h-3 bg-gray-800 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <div className="h-6 bg-gray-800 rounded w-1/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-800 rounded"></div>
                <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                <div className="h-4 bg-gray-800 rounded w-2/3"></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="h-6 bg-gray-800 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                <div className="h-4 bg-gray-800 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
