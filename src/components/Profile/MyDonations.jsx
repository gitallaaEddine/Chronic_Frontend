import { memo, useMemo } from "react";

function MyDonations() {
  const donations = useMemo(
    () => [
      {
        id: 1,
        campaign: "Support Fatima's Treatment",
        amount: 5000,
        date: "15 May, 2024",
        status: "Completed",
        avatar: "/heroFallback.jpg",
      },
      {
        id: 2,
        campaign: "Urgent: Medical Aid for Oran",
        amount: 2000,
        date: "10 May, 2024",
        status: "Completed",
        avatar: "/heroFallback.jpg",
      },
    ],
    []
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-secondary mb-6">My Donations</h2>

      <div className="space-y-4">
        {donations.map((donation) => (
          <div
            key={donation.id}
            className="flex items-center justify-between p-4 border border-secondary/15 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <img
                src={donation.avatar}
                alt="Campaign"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-secondary">
                  {donation.campaign}
                </h3>
                <p className="text-sm text-secondary/60">
                  Donated on {donation.date}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">
                DA {donation.amount.toLocaleString()}
              </div>
              <div className="text-sm text-green-600">{donation.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(MyDonations);
