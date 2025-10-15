import { memo } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const LazySection = memo(({ children, fallback, className = "" }) => {
  const { ref, hasIntersected } = useIntersectionObserver();

  return (
    <div ref={ref} className={className}>
      {hasIntersected ? children : fallback}
    </div>
  );
});

LazySection.displayName = "LazySection";

export default LazySection;
