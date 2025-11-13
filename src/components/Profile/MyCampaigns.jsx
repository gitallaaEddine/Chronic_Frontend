import { memo, useState, useEffect } from "react";
import { campaignService } from "../../services/campaignServices";

// Skeleton component for loading state
const SectionSkeleton = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="h-6 bg-secondary/15 rounded w-1/3 mb-6 animate-pulse"></div>
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-secondary/15 rounded-lg p-4">
          <div className="h-5 bg-secondary/15 rounded w-3/4 mb-3 animate-pulse"></div>
          <div className="h-4 bg-secondary/15 rounded w-full mb-2 animate-pulse"></div>
          <div className="h-4 bg-secondary/15 rounded w-5/6 mb-3 animate-pulse"></div>
          <div className="h-4 bg-secondary/15 rounded w-1/4 animate-pulse"></div>
        </div>
      ))}
    </div>
  </div>
);

// Error component
const ErrorDisplay = ({ message }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-bold text-secondary mb-6">My Campaigns</h2>
    <div className="text-center py-8">
      <div className="text-red-500 mb-2">
        <svg
          className="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p className="text-secondary/70">Error loading campaigns: {message}</p>
    </div>
  </div>
);

function MyCampaigns({ userCampaigns }) {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        const campaignPromises = userCampaigns.map((id) =>
          campaignService.getById(id)
        );
        const fetchedCampaigns = await Promise.all(campaignPromises);
        setCampaigns(fetchedCampaigns);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, [userCampaigns]);

  if (isLoading) {
    return <SectionSkeleton />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-secondary mb-6">My Campaigns</h2>

      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div
            key={campaign.data.campaign.id}
            className="border border-secondary/15 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-secondary">
                {campaign.data.campaign.title}
              </h3>
              <button className="text-primary hover:text-blue-700 text-sm font-medium">
                Manage
              </button>
            </div>

            <p className="text-sm text-secondary/70 mb-2 line-clamp-2">
              {(() => {
                const words =
                  campaign.data.campaign.description?.split(" ") || [];
                return words.length > 15
                  ? words.slice(0, 15).join(" ") + "..."
                  : campaign.data.campaign.description;
              })()}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-secondary">Goal:</span>
              <span className="text-sm text-primary font-semibold">
                DA {campaign.data.campaign.goalAmount?.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(MyCampaigns);