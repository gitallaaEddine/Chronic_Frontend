"use client";

import { Helmet } from "react-helmet-async";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Container from "../../components/container";
import CampaignsList from "./CampaignList";
import CampaignFilter from "./CampaignFilter";
import { PageSkeleton } from "../../components/ui/LoadingSkeleton";
import ErrorBoundary from "../../components/ErrorBoundary";
import { Suspense } from "react";
import { removeLoader } from "../../Loader/RemoveLoader";
import { useEffect, memo } from "react";

function Campaign_Client() {
  useEffect(() => {
    removeLoader();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Our Campaigns - Hope Algeria</title>
        <meta
          name="description"
          content="Support patients in Algeria with chronic diseases. Your donation can make a difference."
        />
        <meta
          name="keywords"
          content="Algeria campaigns, medical donations, chronic diseases, patient support, healthcare Algeria"
        />
        <link rel="canonical" href="https://hopealgeriaorg.com/campaigns" />
      </Helmet>

      <Navbar />
      <Container>
        <main role="main" aria-label="Campaigns content">
          <section className=" py-12">
            <div className="mx-auto max-w-screen-xl px-4">
              <header className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-secondary mb-2">
                  Our Campaigns
                </h1>
                <p className="text-sm sm:text-lg text-secondary/60 mb-6">
                  Support patients in Algeria with chronic diseases. Your
                  donation can make a difference.
                </p>

                <CampaignFilter />
              </header>
              <ErrorBoundary>
                <Suspense fallback={<PageSkeleton />}>
                  <CampaignsList />
                </Suspense>
              </ErrorBoundary>
            </div>
          </section>
        </main>
      </Container>
      <Footer />
    </>
  );
}

export default memo(Campaign_Client);
