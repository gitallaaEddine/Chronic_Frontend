import { memo, useState } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

// Unified image component that replaces LazyImage, OptimizedImage, and AdvancedImage
function OptimizedImage({
  src,
  alt,
  className = "",
  width,
  height,
  loading = "lazy",
  decoding = "async",
  lazy = false,
  placeholder = null,
  style,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { ref, hasIntersected } = useIntersectionObserver();

  const handleLoad = () => setLoaded(true);
  const handleError = (err) => {
    const errorSrc = String(err?.target?.src || src || "unknown")
      .replace(/[\r\n\t]/g, " ")
      .slice(0, 200);
    console.error("Image loading failed:", errorSrc);
    setError(true);
  };

  // If lazy loading is enabled and not intersected yet
  if (lazy && !hasIntersected && !error) {
    return (
      <div ref={ref} className={className} style={style}>
        {placeholder || (
          <div className="bg-secondary/15 animate-pulse w-full h-full flex items-center justify-center">
            <span className="text-gray-400 text-sm">Loading...</span>
          </div>
        )}
      </div>
    );
  }

  // Show error fallback if image failed to load
  if (error) {
    return (
      <div
        className={`${className} bg-gray-100 flex items-center justify-center`}
        style={style}
      >
        <span className="text-gray-500 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      ref={lazy ? ref : undefined}
      src={src}
      alt={alt}
      className={`${className} ${
        lazy
          ? `transition-opacity duration-300 ${
              loaded ? "opacity-100" : "opacity-0"
            }`
          : ""
      }`}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      onLoad={lazy ? handleLoad : undefined}
      onError={lazy ? handleError : undefined}
      style={style}
      {...props}
    />
  );
}

export default memo(OptimizedImage);
