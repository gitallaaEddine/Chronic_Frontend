import CampaignCard from "./CampaignCard";
import { use, memo } from "react";

const fetchCampaigns = async (page = 1, limit = 8, title, category, city) => {
  console.log("rendered");

  const url = `${
    import.meta.env.VITE_BACK_API
  }/campaign/get-campaign?page=${page}&limit=${limit}`;
  // ?page=${page}&limit=${limit}&title=${title}&category=${category}&city=${city}

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to load campaigns: ${res.status} ${text}`);
  }
  const json = await res.json();
  console.log(json.data.campaigns);

  return json.data.campaigns; // { campaignHints, campaigns }
};
console.log(typeof window);

const campaignPromise = fetchCampaigns();
console.log("rendered");

function CampaignList() {
  const campaigns = use(campaignPromise);
  console.log(campaigns);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {campaigns.map((c) => (
        <CampaignCard key={c._id} campaign={c} />
      ))}
    </div>
  );
}
export default memo(CampaignList);

// const campaignPromise = fetchCampaigns();

// console.log(campaignPromise);

// export default function Campaigns() {
//   const campaign = use(campaignPromise);
//   return campaign;
// };

// console.log(Campaigns());

// const mainCampaign = {
//   id: 1,
//   patientName: "Fatima",
//   title: "Support Fatima's Fight Against Diabetes",
//   disease: "Diabetes",
//   city: "Algiers",
//   urgency: "High",
//   description:
//     "Fatima is struggling 40 years in battling diabetes and needs your help to afford essential medication and supplies.",
//   fullStory:
//     "Fatima, a devoted mother of two, was diagnosed with chronic kidney disease last year. The diagnosis has been devastating, impacting her health and ability to work. Dialysis is her only hope, but the cost is prohibitive. She needs $10,000 to cover the initial treatments and medication. Your support can make a life-changing difference for Fatima and her family.",
//   image:
//     "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   raised: 50000,
//   goal: 250000,
//   progress: 20,
//   daysLeft: 5,
//   slug: "fatima-diabetes-fight",
//   updates: [
//     {
//       id: 1,
//       type: "Treatment Update",
//       date: "2 days ago",
//       message: "Started new medication regimen",
//     },
//     {
//       id: 2,
//       type: "Thank You Message",
//       date: "1 week ago",
//       message: "Thank you for your generous support",
//     },
//   ],
//   donors: [
//     {
//       id: 1,
//       name: "Omar",
//       date: "2 days ago",
//       message: "Praying for your speedy recovery, Fatima! Stay strong.",
//     },
//     {
//       id: 2,
//       name: "Aisha",
//       date: "1 day ago",
//       message: "Donated what I could. Every bit helps! Wishing you the best.",
//     },
//   ],
// };

// const campaigns = [
//   {
//     id: 1,
//     patientName: "Fatima",
//     title: "Support Fatima's Fight Against Diabetes",
//     disease: "Diabetes",
//     city: "Algiers",
//     urgency: "High",
//     description:
//       "Fatima is struggling 40 years in battling diabetes and needs your help to afford essential medication and supplies.",
//     fullStory:
//       "Fatima, a devoted mother of two, was diagnosed with chronic kidney disease last year. The diagnosis has been devastating, impacting her health and ability to work. Dialysis is her only hope, but the cost is prohibitive. She needs $10,000 to cover the initial treatments and medication. Your support can make a life-changing difference for Fatima and her family.",
//     image:
//       "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     raised: 50000,
//     goal: 250000,
//     progress: 20,
//     daysLeft: 5,
//     slug: "fatima-diabetes-fight",
//     updates: [
//       {
//         id: 1,
//         type: "Treatment Update",
//         date: "2 days ago",
//         message: "Started new medication regimen",
//       },
//       {
//         id: 2,
//         type: "Thank You Message",
//         date: "1 week ago",
//         message: "Thank you for your generous support",
//       },
//     ],
//     donors: [
//       {
//         id: 1,
//         name: "Omar",
//         date: "2 days ago",
//         message: "Praying for your speedy recovery, Fatima! Stay strong.",
//       },
//       {
//         id: 2,
//         name: "Aisha",
//         date: "1 day ago",
//         message: "Donated what I could. Every bit helps! Wishing you the best.",
//       },
//     ],
//   },
//   {
//     id: 2,
//     patientName: "Ahmed",
//     title: "Help Ahmed Overcome Kidney Disease",
//     disease: "Kidney Disease",
//     city: "Oran",
//     urgency: "Critical",
//     description:
//       "Ahmed, a young resident, with dreams of becoming an engineer, is facing his life with chronic kidney disease.",
//     fullStory:
//       "Ahmed is a 25-year-old engineering student who was diagnosed with chronic kidney disease. He needs regular dialysis and eventually a kidney transplant. The medical costs are overwhelming for his family.",
//     image:
//       "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     raised: 300000,
//     goal: 500000,
//     progress: 60,
//     daysLeft: 10,
//     slug: "ahmed-kidney-disease",
//     updates: [],
//     donors: [],
//   },
//   {
//     id: 3,
//     patientName: "Aisha",
//     title: "Give Hope to Aisha Battling Heart Disease",
//     disease: "Heart Disease",
//     city: "Constantine",
//     urgency: "High",
//     description:
//       "Aisha is a hardworking mother who has been diagnosed with a serious heart condition that requires immediate surgery.",
//     fullStory:
//       "Aisha, a 45-year-old mother of three, needs urgent heart surgery. She has been the sole provider for her family and cannot afford the medical expenses.",
//     image:
//       "https://images.unsplash.com/photo-1594824804732-ca8db4dda4b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     raised: 120000,
//     goal: 180000,
//     progress: 67,
//     daysLeft: 3,
//     slug: "aisha-heart-disease",
//     updates: [],
//     donors: [],
//   },
//   {
//     id: 4,
//     patientName: "Omar",
//     title: "Support Omar's Fight Against Cancer",
//     disease: "Cancer",
//     city: "Algiers",
//     urgency: "Critical",
//     description:
//       "Omar is fighting cancer and needs support for his treatment including chemotherapy, radiation, and surgery.",
//     fullStory:
//       "Omar, a 38-year-old father, was diagnosed with cancer and needs comprehensive treatment. The family has exhausted their savings and needs community support.",
//     image:
//       "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     raised: 200000,
//     goal: 800000,
//     progress: 25,
//     daysLeft: 15,
//     slug: "omar-cancer-fight",
//     updates: [],
//     donors: [],
//   },
// ];
