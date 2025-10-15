import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Body from "../components/About-Page-Body";
import { generateMetaTags } from "../utils/metadata";
import { removeLoader } from "../Loader/RemoveLoader";
import { useEffect, memo } from "react";

function About() {
  const meta = generateMetaTags("about");
  useEffect(() => {
    removeLoader();
  }, []);

  return (
    <>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href={meta.canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.openGraph.title} />
        <meta property="og:description" content={meta.openGraph.description} />
        <meta property="og:image" content={meta.openGraph.image} />
        <meta property="og:url" content={meta.openGraph.url} />
        <meta property="og:site_name" content={meta.openGraph.siteName} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.twitter.title} />
        <meta name="twitter:description" content={meta.twitter.description} />
        <meta name="twitter:image" content={meta.twitter.image} />
      </Helmet>
      <Navbar />
      <Body />

      <Footer />
    </>
  );
}

export default memo(About);
