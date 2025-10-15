import { memo, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Hero() {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    // Preload video only after initial render
    const timer = setTimeout(() => {
      setShouldLoadVideo(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.warn("Hero video failed to load");
  };

  return (
    <section className="relative w-full h-[85vh] overflow-hidden">
      {/* Fallback background */}
      <div
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: "url('/heroFallback.jpg')" }}
      />

      {/* Optimized video with multiple formats */}
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/assets/Agha.jpg"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          style={{
            objectPosition: "center center",
            minWidth: "100%",
            minHeight: "100%",
          }}
        >
          <source src="/Hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero content */}
      <div className="relative h-full flex flex-col justify-end z-10 text-center max-w-5xl  mx-auto">
        <h1 className="heading-xl text-trinary mb-3 ">
          GIVE HOPE. FUND CURES. TRANSFORM LIVES.
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-trinary/70 max-w-3xl mx-auto mb-3 leading-relaxed">
          Every contribution fuels vital research, patient support, and advoacy
          for those battling long-term health challenges
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
          <Link to="/contact" className="Links">
            Donate
          </Link>
          <Link to="/work" className="lightLinks">
            start a Donation
          </Link>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
