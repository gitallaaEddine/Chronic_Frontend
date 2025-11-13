import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Container from "../container";
import { campaignService } from "../../services/campaignServices";
import { removeLoader } from "../../Loader/RemoveLoader";
import ShareContainer from "./ShareContainer";
import { useEffect, memo, useState } from "react";

function CampaignPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    removeLoader();
  }, []);

  const { id } = useParams();
  const {
    data: campaign,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["campaign", id],
    queryFn: () => campaignService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
  const campaignData = campaign?.data?.campaign;
  const campaignUrl = `${window.location.origin}/campaign-detail/${id}`;

  // Placeholder images
  const placeholderImages = [
    "https://images.unsplash.com/photo-1532618793091-ec5fe9635fbd?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? placeholderImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === placeholderImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Container>
          <main className="py-20 text-center" aria-label="Loading campaign">
            <div className="animate-pulse">
              <div className="h-8 bg-secondary/15 rounded w-2/3 mx-auto mb-4"></div>
              <div className="h-64 bg-secondary/15 rounded mb-4"></div>
            </div>
          </main>
        </Container>
        <Footer />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Navbar />
        <Container>
          <main className="py-20 text-center" aria-label="Error message">
            <h1 className="text-3xl font-bold mb-4">Campaign Not Found</h1>
            <p className="text-secondary/60 mb-8">
              {error?.response?.data?.message ||
                "The requested campaign information is not available."}
            </p>
            <Link
              to="/campaigns"
              className="text-primary hover:underline"
              aria-label="Return to campaigns page"
            >
              Back to Campaigns
            </Link>
          </main>
        </Container>
        <Footer />
      </>
    );
  }

  if (!campaignData) {
    return (
      <>
        <Navbar />
        <Container>
          <main className="py-20 text-center" aria-label="Campaign not found">
            <h1 className="text-3xl font-bold mb-4">Campaign Not Found</h1>
            <p className="text-secondary/60 mb-8">
              The requested campaign information is not available.
            </p>
            <Link
              to="/campaigns"
              className="text-primary hover:underline"
              aria-label="Return to campaigns page"
            >
              Back to Campaigns
            </Link>
          </main>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{campaignData.title} - Chronic Donation</title>
        <meta
          name="description"
          content={campaignData.description || "Campaign details"}
        />
      </Helmet>

      <Navbar />
      <Container>
        <main className="py-8 max-w-6xl mx-auto" aria-label="Campaign details">
          {/* Title */}
          <header>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-8">
              {campaignData.title}
            </h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Side */}
            <article
              className="lg:col-span-2"
              aria-label="Campaign information"
            >
              {/* Campaign Image Slider */}
              <section
                className="relative mb-6 rounded-2xl overflow-hidden bg-secondary/10 h-96"
                aria-label="Campaign images"
              >
                <img
                  src={placeholderImages[currentImageIndex]}
                  alt={`${campaignData.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Image Navigation Dots */}
                <nav
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2"
                  aria-label="Image navigation"
                >
                  {placeholderImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentImageIndex ? "bg-white" : "bg-white/40"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                      aria-current={idx === currentImageIndex}
                    ></button>
                  ))}
                </nav>

                {/* Navigation Arrows */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition"
                  aria-label="Previous image"
                >
                  <span className="text-secondary text-xl">←</span>
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition"
                  aria-label="Next image"
                >
                  <span className="text-secondary text-xl">→</span>
                </button>
              </section>

              <hr className="border-secondary/10 mb-6" aria-hidden="true" />

              {/* Campaign Story */}
              <section
                className="bg-white rounded-lg p-6 mb-6"
                aria-labelledby="campaign-story"
              >
                <h2 id="campaign-story" className="sr-only">
                  Campaign Story
                </h2>
                <p className="text-secondary/80 leading-relaxed whitespace-pre-line">
                  {campaignData.description}
                </p>
              </section>

              <hr className="border-secondary/10 mb-6" aria-hidden="true" />

              {/* Campaign Creator Section */}
              <section
                className="bg-white rounded-lg p-6 mb-6"
                aria-labelledby="campaign-creator"
              >
                <h2
                  id="campaign-creator"
                  className="text-xl font-semibold text-secondary mb-6"
                >
                  Campaign Creator
                </h2>
                <div className="flex items-center justify-between p-4 hover:bg-secondary/5 rounded-lg transition">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <span className="text-lg font-semibold text-secondary">
                        {campaignData.patientName?.[0]?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-secondary">
                        {campaignData.patientName}
                      </p>
                      <p className="text-sm text-secondary/60">Organizer</p>
                      <p className="text-sm text-secondary/60">
                        {campaignData.city}
                      </p>
                    </div>
                  </div>
                  <button
                    className="px-6 py-2 border border-secondary/30 rounded-full hover:bg-secondary/5 transition"
                    aria-label={`Contact ${campaignData.patientName}`}
                  >
                    Contact
                  </button>
                </div>
              </section>

              <hr className="border-secondary/10 mb-6" aria-hidden="true" />

              {/* Report Button */}
              <section
                className="flex justify-start"
                aria-label="Report campaign"
              >
                <button
                  className="flex items-center gap-2 text-secondary/60 hover:text-secondary transition text-sm"
                  aria-label="Report this campaign"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                    />
                  </svg>
                  Report campaign
                </button>
              </section>
            </article>

            {/* Sidebar - Right Side */}
            <aside
              className="lg:col-span-1"
              aria-label="Campaign summary and actions"
            >
              <div className="bg-white border border-secondary/15 rounded-2xl p-6 sticky top-8">
                {/* Goal Amount Only */}
                <section className="mb-6" aria-labelledby="goal-amount">
                  <p
                    id="goal-amount"
                    className="text-sm text-secondary/60 mb-2"
                  >
                    Goal Amount
                  </p>
                  <p className="text-3xl font-bold text-secondary">
                    DA {campaignData.goalAmount?.toLocaleString()}
                  </p>
                </section>

                {/* Share Button */}
                <button
                  onClick={() => setIsShareOpen(true)}
                  className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium mb-4 transition"
                  aria-label="Share this campaign"
                >
                  Share
                </button>

                <hr className="border-secondary/10 mb-4" aria-hidden="true" />

                {/* Category Badge */}
                <section className="mb-4" aria-labelledby="campaign-category">
                  <p
                    id="campaign-category"
                    className="text-sm text-secondary/60 mb-2"
                  >
                    Category
                  </p>
                  <span
                    className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    role="status"
                  >
                    {campaignData.category}
                  </span>
                </section>

                <hr className="border-secondary/10 mb-4" aria-hidden="true" />

                {/* Location */}
                <section aria-labelledby="campaign-location">
                  <p
                    id="campaign-location"
                    className="text-sm text-secondary/60 mb-2"
                  >
                    Location
                  </p>
                  <p className="text-sm font-medium text-secondary">
                    {campaignData.city}
                  </p>
                </section>
              </div>
            </aside>
          </div>
        </main>
      </Container>
      <Footer />
      {/* Share Container */}
      <ShareContainer
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        campaignUrl={campaignUrl}
        campaignTitle={campaignData?.title || ""}
      />
    </>
  );
}

export default memo(CampaignPage);
