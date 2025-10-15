# Lazy Loading & Performance Optimization Guide

## Overview

This implementation provides comprehensive lazy loading and performance optimization for your React application, ensuring only visible content is loaded and rendered.

## Components Created

### 1. **LazySection** (`src/components/ui/LazySection.jsx`)

- Lazy loads entire sections when they become visible
- Configurable threshold and root margin
- Optional fallback content while loading

```jsx
<LazySection fallback={<SectionSkeleton />}>
  <YourComponent />
</LazySection>
```

### 2. **LazyImage** (`src/components/ui/LazyImage.jsx`)

- Lazy loads images with intersection observer
- Smooth fade-in transition when loaded
- Custom placeholder support
- Error handling

```jsx
<LazyImage
  src="/path/to/image.jpg"
  alt="Description"
  placeholder={<CustomPlaceholder />}
/>
```

### 3. **LazyList** (`src/components/ui/LazyList.jsx`)

- Virtualized list for large datasets
- Only renders visible items
- Configurable item height and overscan

```jsx
<LazyList
  items={largeDataset}
  itemRenderer={(item, index) => <ItemComponent item={item} />}
  itemHeight={100}
  height={400}
/>
```

### 4. **ProgressiveLazyLoad** (`src/components/ui/ProgressiveLazyLoad.jsx`)

- Loads content in batches progressively
- Throttled loading to prevent overwhelming
- Configurable batch size and delay

```jsx
<ProgressiveLazyLoad
  items={items}
  itemRenderer={(item) => <Item data={item} />}
  batchSize={5}
  loadDelay={100}
/>
```

## Hooks Created

### 1. **useIntersectionObserver** (`src/hooks/useIntersectionObserver.js`)

- Reusable intersection observer logic
- Tracks visibility and intersection history
- Configurable options

### 2. **useViewportOptimization** (`src/hooks/useViewportOptimization.js`)

- Tracks viewport size and scroll position
- Throttled updates for performance
- Utility functions for viewport calculations

## Performance Features

### 1. **PerformanceMonitor** (`src/components/ui/PerformanceMonitor.jsx`)

- Monitors Core Web Vitals (LCP, FID, CLS)
- Tracks slow resource loading
- Development-only by default

### 2. **ContentPreloader** (`src/components/ui/ContentPreloader.jsx`)

- Preloads critical resources
- Configurable priority levels
- Automatic cleanup

## Implementation Benefits

### ✅ **Performance Improvements**

- **Reduced Initial Bundle Size**: Code splitting with lazy loading
- **Faster Page Load**: Only critical content loads initially
- **Better Core Web Vitals**: Optimized LCP, FID, and CLS scores
- **Memory Efficiency**: Virtualization for large lists
- **Network Optimization**: Progressive loading reduces bandwidth usage

### ✅ **User Experience**

- **Smooth Loading**: Skeleton screens and fade transitions
- **Responsive Design**: Viewport-aware optimizations
- **Error Handling**: Graceful fallbacks for failed loads
- **Accessibility**: Proper ARIA labels and screen reader support

## Usage Examples

### Basic Page Structure

```jsx
import LazySection from "../components/ui/LazySection";

function HomePage() {
  return (
    <>
      {/* Above the fold - loads immediately */}
      <Navbar />
      <Hero />

      {/* Below the fold - lazy loaded */}
      <LazySection fallback={<SectionSkeleton />}>
        <CampaignSection />
      </LazySection>

      <LazySection fallback={<SectionSkeleton />}>
        <WorkSection />
      </LazySection>
    </>
  );
}
```

### Image Gallery with Lazy Loading

```jsx
import LazyImage from "../components/ui/LazyImage";

function Gallery({ images }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image, index) => (
        <LazyImage
          key={index}
          src={image.src}
          alt={image.alt}
          className="w-full h-48 object-cover rounded"
          placeholder={
            <div className="w-full h-48 bg-secondary/15 animate-pulse rounded" />
          }
        />
      ))}
    </div>
  );
}
```

### Large Dataset with Virtualization

```jsx
import LazyList from "../components/ui/LazyList";

function ProductList({ products }) {
  const renderProduct = (product, index) => (
    <div className="p-4 border-b">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </div>
  );

  return (
    <LazyList
      items={products}
      itemRenderer={renderProduct}
      itemHeight={120}
      height={600}
      className="border rounded"
    />
  );
}
```

## Configuration Options

### Intersection Observer Settings

```jsx
// Default settings
{
  threshold: 0.1,        // Trigger when 10% visible
  rootMargin: '50px',    // Load 50px before entering viewport
  once: true             // Load once and keep loaded
}
```

### Performance Monitoring

```jsx
// Enable in development only
<PerformanceMonitor enabled={process.env.NODE_ENV === "development"} />
```

### Resource Preloading

```jsx
const criticalResources = [
  { href: "/hero-image.jpg", as: "image" },
  { href: "/api/critical-data", as: "fetch" },
];

<ContentPreloader resources={criticalResources} priority="high" />;
```

## Best Practices

1. **Prioritize Above-the-Fold Content**: Load critical content immediately
2. **Use Appropriate Thresholds**: Balance between performance and UX
3. **Implement Proper Fallbacks**: Always provide loading states
4. **Monitor Performance**: Use the performance monitor in development
5. **Test on Slow Networks**: Verify lazy loading works on 3G/slow connections
6. **Optimize Images**: Use appropriate formats and sizes
7. **Batch API Calls**: Group related data requests together

## Browser Support

- Modern browsers with Intersection Observer API support
- Fallback gracefully in older browsers
- Uses passive event listeners for better performance

This implementation ensures your application loads only what users can see, resulting in faster initial page loads and better overall performance.
