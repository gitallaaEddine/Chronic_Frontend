import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LazySection from "../components/ui/LazySection";
import { removeLoader } from "../Loader/RemoveLoader";
import { lazy, Suspense, useEffect, memo } from "react";

// Lazy load sections for better performance
const CampaignsPreview = lazy(() => import("../components/campaings-preview"));
const Trust = lazy(() => import("../components/trust"));
const AboutPreview = lazy(() => import("../components/about-preview"));
const Footer = lazy(() => import("../components/Footer"));

// Loading skeleton for sections
const SectionSkeleton = () => (
  <div className="animate-pulse py-20">
    <div className="max-w-7xl mx-auto px-4">
      <div className="h-8 bg-secondary/15 rounded w-1/3 mx-auto mb-8"></div>
      <div className="space-y-4">
        <div className="h-4 bg-secondary/15 rounded w-3/4"></div>
        <div className="h-4 bg-secondary/15 rounded w-1/2"></div>
        <div className="h-4 bg-secondary/15 rounded w-2/3"></div>
      </div>
    </div>
  </div>
);

function Home() {
  useEffect(() => {
    removeLoader();
  }, []);
  return (
    <>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>
          Cretti - Affordable Web Design for Startups & Small Businesses
        </title>
        <meta
          name="description"
          content="Launch your startup or grow your small business with Cretti's affordable web design campaign. Professional websites that convert visitors into customers."
        />
        <meta
          name="keywords"
          content="startup web design, small business websites, affordable web design, business website design, startup digital presence"
        />

        <link rel="canonical" href="https://cretti.com/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Cretti - Affordable Web Design for Startups & Small Businesses"
        />
        <meta
          property="og:description"
          content="Launch your startup or grow your small business with professional web design that converts visitors into customers."
        />
        <meta
          property="og:image"
          content="https://cretti.com/images/cretti-home-og.jpg"
        />
        <meta property="og:url" content="https://cretti.com/" />
        <meta property="og:site_name" content="Cretti" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Cretti - Affordable Web Design for Startups & Small Businesses"
        />
        <meta
          name="twitter:description"
          content="Professional web design that helps startups and small businesses convert visitors into customers."
        />
        <meta
          name="twitter:image"
          content="https://cretti.com/images/cretti-home-twitter.jpg"
        />
      </Helmet>
      <Navbar />
      <Hero />

      {[CampaignsPreview, Trust, AboutPreview, Footer].map(
        (Component, index) => (
          <LazySection key={index} fallback={<SectionSkeleton />}>
            <Suspense fallback={<SectionSkeleton />}>
              <Component />
            </Suspense>
          </LazySection>
        )
      )}
    </>
  );
}

export default memo(Home);
