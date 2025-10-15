import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import LazySection from "../components/ui/LazySection";
import { removeLoader } from "../Loader/RemoveLoader";
import { lazy, Suspense, useEffect, memo } from "react";

const ProfileInfo = lazy(() => import("../components/Profile/ProfileInfo"));
const MyCampaigns = lazy(() => import("../components/Profile/MyCampaigns"));
const MyDonations = lazy(() => import("../components/Profile/MyDonations"));
const Footer = lazy(() => import("../components/Footer"));

const SectionSkeleton = () => (
  <div className="animate-pulse py-8">
    <div className="h-32 bg-secondary/15 rounded"></div>
  </div>
);

function Profile() {
  useEffect(() => {
    removeLoader();
  }, []);

  return (
    <>
      <Helmet>
        <title>My Profile - Chronic Donation</title>
        <meta
          name="description"
          content="Manage your profile, campaigns, and donations"
        />
      </Helmet>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <LazySection fallback={<SectionSkeleton />}>
                <Suspense fallback={<SectionSkeleton />}>
                  <ProfileInfo />
                </Suspense>
              </LazySection>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <LazySection fallback={<SectionSkeleton />}>
                <Suspense fallback={<SectionSkeleton />}>
                  <MyCampaigns />
                </Suspense>
              </LazySection>

              <LazySection fallback={<SectionSkeleton />}>
                <Suspense fallback={<SectionSkeleton />}>
                  <MyDonations />
                </Suspense>
              </LazySection>
            </div>
          </div>
        </div>
      </div>

      <LazySection fallback={<SectionSkeleton />}>
        <Suspense fallback={<SectionSkeleton />}>
          <Footer />
        </Suspense>
      </LazySection>
    </>
  );
}

export default memo(Profile);
