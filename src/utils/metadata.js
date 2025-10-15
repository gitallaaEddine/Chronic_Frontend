// Centralized metadata configuration for better maintainability

export const siteMetadata = {
  siteName: "Cretti",
  siteUrl: "https://cretti.com",
  defaultTitle:
    "Cretti - Affordable Web Design for Startups & Small Businesses",
  defaultDescription:
    "Launch your startup or grow your small business with Cretti's affordable web design campaign. Professional websites that convert visitors into customers.",
  defaultImage: "https://cretti.com/images/cretti-og.jpg",
  twitterHandle: "@cretti",
};

export const pageMetadata = {
  home: {
    title: "Cretti - Affordable Web Design for Startups & Small Businesses",
    description:
      "Launch your startup or grow your small business with Cretti's affordable web design campaign. Professional websites that convert visitors into customers.",
    image: "https://cretti.com/images/cretti-home-og.jpg",
    keywords:
      "startup web design, small business websites, affordable web design, business website design, startup digital presence",
  },
  about: {
    title: "About Cretti - Web Design Experts for Startups & Small Businesses",
    description:
      "Meet the Cretti team - passionate web designers helping startups and small businesses create powerful digital presences that drive growth and success.",
    image: "https://cretti.com/images/cretti-team-og.jpg",
    keywords:
      "about cretti, startup web design, small business web design, web design team, digital agency for startups, affordable web design",
  },
  contact: {
    title: "Contact Cretti - Start Your Startup Website Project Today",
    description:
      "Ready to launch your startup online? Contact Cretti for a free consultation. Get a custom quote for your small business website project within 24 hours.",
    image: "https://cretti.com/images/cretti-contact-og.jpg",
    keywords:
      "contact cretti, startup website quote, small business web design consultation, free website consultation, get started",
  },
};

export const generateMetaTags = (page) => {
  const meta = pageMetadata[page] || pageMetadata.home;
  return {
    title: meta.title,
    description: meta.description,
    canonical: `${siteMetadata.siteUrl}/${page === "home" ? "" : page}`,
    openGraph: {
      title: meta.title,
      description: meta.description,
      image: meta.image,
      url: `${siteMetadata.siteUrl}/${page === "home" ? "" : page}`,
      siteName: siteMetadata.siteName,
    },
    twitter: {
      title: meta.title,
      description: meta.description,
      image: meta.image.replace("-og.jpg", "-twitter.jpg"),
    },
    keywords: meta.keywords,
  };
};
