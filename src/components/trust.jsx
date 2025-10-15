import { memo } from "react";
import Container from "./container";
import ScrollFadeIn from "./ScrollAnimate";

function Trust() {
  const trustFeatures = [
    {
      icon: "🛡️",
      title: "Verified Campaigns",
      description:
        "All campaigns are thoroughly reviewed by doctors and our admin team to ensure authenticity and need.",
    },
    {
      icon: "👁️",
      title: "Transparent Donations",
      description:
        "We provide full transparency on how donations are used, with regular updates and reports available for every campaign.",
    },
  ];

  return (
    <section className="bg-secondary/5 py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Our Commitment to Trust
          </h2>
          <p className="text-lg text-secondary/60 max-w-2xl mx-auto">
            Your trust is our top priority. We ensure every donation is secure
            and transparent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {trustFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4 text-blue-500">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-secondary mb-3">
                {feature.title}
              </h3>
              <p className="text-secondary/60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default memo(Trust);
