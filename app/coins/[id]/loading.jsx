export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      {/* Custom Animated Loader */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400"></div>
      </div>
      {/* Loading Text */}
      <p className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-300 animate-pulse">
        Kaizen
      </p>
    </div>
  );
}
