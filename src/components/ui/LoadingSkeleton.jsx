const LoadingSkeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-secondary/15 rounded ${className}`} />
);

export const PageSkeleton = () => (
  <div className="min-h-screen bg-primary">
    <div className="mx-10 md:mx-30 pt-10">
      <LoadingSkeleton className="h-12 w-3/4 mb-8" />
      <LoadingSkeleton className="h-6 w-1/2 mb-4" />
      <LoadingSkeleton className="h-64 w-full mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <LoadingSkeleton className="h-32" />
        <LoadingSkeleton className="h-32" />
      </div>
    </div>
  </div>
);

export default LoadingSkeleton;
