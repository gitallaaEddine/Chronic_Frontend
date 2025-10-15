import { memo, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

// Move ItemRenderer outside to prevent recreation
const ItemRenderer = memo(({ index, style, data }) => {
  const { items, itemRenderer } = data;
  return <div style={style}>{itemRenderer(items[index], index)}</div>;
});

function LazyList({
  items,
  itemRenderer,
  itemHeight = 100,
  height = 400,
  className = "",
  overscan = 5,
}) {
  const { ref, hasIntersected } = useIntersectionObserver();

  // Use useMemo instead of useCallback for better performance
  const itemData = useMemo(
    () => ({
      items,
      itemRenderer,
    }),
    [items, itemRenderer]
  );

  return (
    <div ref={ref} className={className}>
      {hasIntersected ? (
        <List
          height={height}
          itemCount={items.length}
          itemSize={itemHeight}
          overscanCount={overscan}
          width="100%"
          itemData={itemData}
        >
          {ItemRenderer}
        </List>
      ) : (
        <div style={{ height }} className="flex items-center justify-center">
          <div className="animate-pulse bg-secondary/15 rounded w-full h-full" />
        </div>
      )}
    </div>
  );
}

export default memo(LazyList);
