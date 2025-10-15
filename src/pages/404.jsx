import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/container";
import { removeLoader } from "../Loader/RemoveLoader";
import { useEffect, memo } from "react";

function NotFound() {
  useEffect(() => {
    removeLoader();
  }, []);
  return (
    <>
      <Navbar />
      <Container>
        <main
          className="grid min-h-140 place-items-center bg-primary px-6"
          role="main"
          aria-labelledby="error-heading"
        >
          <div className="text-center">
            <p
              className="text-base font-semibold text-text_three"
              aria-label="Error code 404"
            >
              404
            </p>
            <h1
              id="error-heading"
              className="mt-4 text-5xl font-semibold tracking-tight text-[#1c1c1a] sm:text-6xl"
            >
              Page not found
            </h1>
            <p className="mt-6 text-lg font-medium text-secondary/60 sm:text-xl">
              We couldn't find the page you're looking for, <br /> seems you are
              lost
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="Links Focus"
                aria-label="Return to homepage"
              >
                Go back home
              </Link>
              <Link
                to="/contact"
                className="text-sm font-semibold text-secondary hover:text-secondary/70 Focus"
                aria-label="Contact support team"
              >
                Contact support <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </main>
      </Container>
      <Footer />
    </>
  );
}

export default memo(NotFound);
