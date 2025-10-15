import React, { memo } from "react";
import { FixedSizeGrid as Grid } from "react-window";

// Move Cell component outside to prevent recreation
const Cell = memo(({ columnIndex, rowIndex, style, data }) => {
  const { items, itemRenderer, columnCount } = data;
  const index = rowIndex * columnCount + columnIndex;
  const item = items[index];

  if (!item) return null;

  return (
    <div style={style} className="p-2">
      {itemRenderer(item, index)}
    </div>
  );
});

function VirtualizedGrid({
  items,
  itemRenderer,
  columnCount = 2,
  rowHeight = 300,
  columnWidth = 300,
  height = 600,
  className = "",
}) {
  // Improved prop validation with better error handling
  if (!Array.isArray(items)) {
    if (process.env.NODE_ENV === "development") {
      console.warn("VirtualizedGrid: items prop must be an array");
    }
    return <div className={className}>No items to display</div>;
  }

  if (typeof itemRenderer !== "function") {
    if (process.env.NODE_ENV === "development") {
      console.warn("VirtualizedGrid: itemRenderer prop must be a function");
    }
    return <div className={className}>Invalid item renderer</div>;
  }

  const rowCount = Math.ceil(items.length / columnCount);

  const itemData = React.useMemo(
    () => ({
      items,
      itemRenderer,
      columnCount,
    }),
    [items, itemRenderer, columnCount]
  );

  return (
    <div className={className}>
      <Grid
        columnCount={columnCount}
        columnWidth={columnWidth}
        height={height}
        rowCount={rowCount}
        rowHeight={rowHeight}
        width="100%"
        itemData={itemData}>
        {Cell}
      </Grid>
    </div>
  );
}

export default memo(VirtualizedGrid);
