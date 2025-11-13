import { Link } from "react-router-dom";
import { memo } from "react";

function CampaignCard({ campaign }) {
  return (
    <div
      key={campaign._id}
      className="bg-trinary rounded-lg shadow-md overflow-hidden"
    >
      <img
        src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        alt={campaign.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="font-bold text-lg mb-2">{campaign.title}</h3>
        <p className="text-secondary/60 text-sm mb-4">{campaign.description}</p>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-secondary/60 mb-1">
            <span> 5000 Raised</span>
            <span>{campaign.goalAmount} Goal</span>
          </div>
          <div className="w-full bg-secondary/20 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `20%` }}
            ></div>
          </div>
        </div>
        <Link
          to={`/campaign-detail/${campaign._id}`}
          state={campaign}
          className="w-full Links"
        >
          see more details
        </Link>
      </div>
    </div>
  );
}

export default memo(CampaignCard);
