import { memo } from "react";
import { Link } from "react-router-dom";
import Container from "./container";
import OptimizedImage from "./ui/OptimizedImage";
import ScrollFadeIn from "./ScrollAnimate";

// Mock campaign data based on the screenshot
const campaigns = [
  {
    id: 1,
    title: "Support Fatima's Fight Against Diabetes",
    description:
      "Fatima, 45, needs your help to manage her diabetes and afford vital medication.",
    image: "/heroFallback.jpg",
    progress: 60,
    slug: "fatima-diabetes",
  },
  {
    id: 2,
    title: "Help Ahmed Overcome Heart Disease",
    description:
      "Ahmed, 60, requires urgent cardiac care to recover and return to his family.",
    image: "/heroFallback.jpg",
    progress: 40,

    slug: "ahmed-heart",
  },
  {
    id: 3,
    title: "Fund Aisha's Battle with Asthma",
    description:
      "Aisha, 28, seeks support for her asthma treatment to live a normal life.",
    image: "/heroFallback.jpg",
    progress: 80,

    slug: "aisha-asthma",
  },
];

// Memoized campaign card renderer
const CampaignCard = memo(({ title, description, image, progress, slug }) => (
  <div className="bg-trinary h-full rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <div className="relative">
      <OptimizedImage
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
        width={400}
        height={200}
      />
    </div>

    <div className="flex flex-col justify-between flex-1 p-6">
      <h3 className="text-xl font-semibold text-secondary mb-3">{title}</h3>
      <p className="text-secondary/70 mb-4 text-sm leading-relaxed">
        {description}
      </p>

      <div className="mb-4">
        <div className="w-full bg-secondary/15 rounded-full h-2 mb-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-secondary/70">{progress}% funded</p>
      </div>

      <Link
        to={`/campaign/${slug}`}
        className="w-full bg-primary/10 hover:bg-primary/20 text-primary font-medium py-3 px-4 rounded-lg transition-colors duration-200 block text-center"
      >
        Donate
      </Link>
    </div>
  </div>
));

function CampaignsPreview() {
  return (
    <section
      className="bg-trinary/50 py-16"
      aria-labelledby="campaigns-heading"
    >
      <Container>
        <div className="flex justify-between items-center mb-12">
          <h1
            id="campaigns-heading"
            className="text-lg md:text-xl lg:text-2xl font-bold text-secondary mb-4"
          >
            Featured Campaigns
          </h1>
          <Link
            to="#"
            className="text-xs md:text-sm lg:text-md text-primary hover:text-primary/70 mb-4"
          >
            View All Campaigns
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              title={campaign.title}
              description={campaign.description}
              image={campaign.image}
              progress={campaign.progress}
              verified={campaign.verified}
              slug={campaign.slug}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default memo(CampaignsPreview);
