import Campaign_Client from "../components/Campaigns/Campaign.client";
import CampaignList from "../components/Campaigns/CampaignList";
import { memo } from "react";

function Campaign() {
  return (
    <>
      <Campaign_Client />
    </>
  );
}

export default memo(Campaign);
