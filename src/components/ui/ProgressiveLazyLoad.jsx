import { memo, useState, useEffect } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { useOptimizedCallback } from "../../hooks/useOptimizedCallback";

function ProgressiveLazyLoad({
  items = [],
  itemRenderer,
  batchSize = 10,
  className = "",
}) {
  const [loadedCount, setLoadedCount] = useState(batchSize);
  const { ref, hasIntersected } = useIntersectionObserver();

  const loadMore = useOptimizedCallback(
    () => {
      if (loadedCount < items.length) {
        setLoadedCount((prev) => Math.min(prev + batchSize, items.length));
      }
    },
    100,
    "throttle"
  );

  useEffect(() => {
    if (hasIntersected) {
      loadMore();
    }
  }, [hasIntersected, loadMore]);

  return (
    <div className={className}>
      {items.slice(0, loadedCount).map((item, index) => {
        const uniqueKey = item.id || item.key || `item-${index}`;
        return (
          <div key={uniqueKey}>
            {typeof itemRenderer === "function"
              ? (() => {
                  try {
                    return itemRenderer(item, index);
                  } catch (error) {
                    console.error("Item rendering error:", {
                      error: error.message,
                      itemId: item.id || index,
                      stack: error.stack,
                    });
                    return <div>Error rendering item</div>;
                  }
                })()
              : null}
          </div>
        );
      })}

      {loadedCount < items.length && (
        <div ref={ref} className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-secondary"></div>
        </div>
      )}
    </div>
  );
}

export default memo(ProgressiveLazyLoad);
