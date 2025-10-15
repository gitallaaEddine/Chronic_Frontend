"use client";

import { Helmet } from "react-helmet-async";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Container from "../../components/container";
import { PageSkeleton } from "../../components/ui/LoadingSkeleton";
import ErrorBoundary from "../../components/ErrorBoundary";
import { Suspense } from "react";
import { removeLoader } from "../../Loader/RemoveLoader";
import { useEffect, memo } from "react";

function Campaign_Client({ children }) {
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

                <div className="max-w-md mx-auto mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by keyword, name, or condition..."
                      className="w-full px-4 py-2 pl-10 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <svg
                      className="absolute left-3 top-2.5 h-5 w-5 text-secondary/40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex sm:justify-center flex-wrap gap-4 mb-8">
                  <select className="px-4 py-2 border border-secondary/30 rounded-lg text-sm">
                    <option>Disease Type</option>
                    <option>Diabetes</option>
                    <option>Kidney Disease</option>
                    <option>Heart Disease</option>
                    <option>Cancer</option>
                  </select>
                  <select className="px-4 py-2 border border-secondary/30 rounded-lg text-sm">
                    <option>City</option>
                    <option>Algiers</option>
                    <option>Oran</option>
                    <option>Constantine</option>
                  </select>
                  <select className="px-4 py-2 border border-secondary/30 rounded-lg text-sm">
                    <option>Urgency</option>
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                  </select>
                </div>
              </header>
              <ErrorBoundary>
                <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
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
