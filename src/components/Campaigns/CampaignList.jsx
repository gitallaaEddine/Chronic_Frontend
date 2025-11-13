import CampaignCard from "./CampaignCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { campaignService } from "../../services/campaignServices";
import { PageSkeleton } from "../ui/LoadingSkeleton";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function NoCampaign() {
  return (
    <div className="text-center py-12">
      <svg
        className="mx-auto h-12 w-12 text-secondary/40 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="text-lg font-medium text-secondary mb-2">
        No campaigns found
      </h3>
      <p className="text-secondary/60">
        Try adjusting your filters to see more results.
      </p>
    </div>
  );
}

export default function CampaignsList() {
  const [params] = useSearchParams();
  const category = params.get("category") || "";
  const city = params.get("city") || "";
  const LIMIT = 8;

  // Infinite query using skip + limit
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["campaigns", category, city],
    queryFn: async ({ pageParam = 0 }) => {
      const result = await campaignService.getAll({
        skip: pageParam,
        limit: LIMIT,
        category,
        city,
      });

      return result;
    },
    getNextPageParam: (lastPage, allPages) => {
      // stop when fewer than LIMIT items are returned
      return lastPage.length < LIMIT ? undefined : allPages.flat().length; // next skip = total fetched so far
    },
    keepPreviousData: true,
    initialPageParam: 0,
  });

  // Reset scroll when filters change
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [category, city]);

  if (status === "pending") return <PageSkeleton />;
  if (status === "error") {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-red-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-medium text-red-600 mb-2">
          Failed to load campaigns
        </h3>
        <p className="text-secondary/60 mb-4">
          {error?.message || "Something went wrong. Please try again."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  const campaigns = data?.pages.flat() || [];

  return (
    <div>
      {campaigns.length === 0 ? (
        <NoCampaign />
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          role="list"
          aria-label="Campaign list"
        >
          {campaigns.map((c) => (
            <CampaignCard key={c._id} campaign={c} />
          ))}
        </div>
      )}

      {isFetchingNextPage && (
        <div className="mt-6">
          <PageSkeleton />
        </div>
      )}

      {hasNextPage && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Load more campaigns"
          >
            {isFetchingNextPage ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
