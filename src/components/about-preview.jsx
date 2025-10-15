import { memo } from "react";
import { Link } from "react-router-dom";
import Container from "../components/container";

function AboutPreview() {
  return (
    <Container>
      <section className="overflow-hidden  sm:grid sm:grid-cols-2 sm:items-center">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold text-secondary md:text-3xl">
              Together for Health
            </h2>

            <p className="hidden text-gray-500 md:mt-4 md:block">
              We believe in the power of community to bring hope, dignity, and
              financial support to families battling chronic illness in Algeria
            </p>

            <div className="mt-4 md:mt-8">
              <Link
                to="/about"
                className="Links"
                aria-label="Learn more about me and my work"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>

        <img
          alt=""
          src="https://images.unsplash.com/photo-1484959014842-cd1d967a39cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-full w-full object-cover "
        />
      </section>
    </Container>
  );
}

export default memo(AboutPreview);
