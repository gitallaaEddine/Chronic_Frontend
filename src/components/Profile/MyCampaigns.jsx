import { memo, useMemo } from "react";

function MyCampaigns() {
  const campaigns = useMemo(
    () => [
      {
        id: 1,
        title: "Help Little Sara Walk Again",
        raised: 250000,
        goal: 500000,
        status: "active",
      },
    ],
    []
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-secondary mb-6">My Campaigns</h2>

      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="border border-secondary/15 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-secondary">{campaign.title}</h3>
              <button className="text-primary hover:text-blue-700 text-sm font-medium">
                Manage
              </button>
            </div>

            <p className="text-sm text-secondary/60 mb-3">
              Raised DA {campaign.raised.toLocaleString()} of DA{" "}
              {campaign.goal.toLocaleString()}
            </p>

            <div className="w-full bg-secondary/15 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(MyCampaigns);
