import { memo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Container from "../components/container";

const ScrollFadeIn = lazy(() => import("./ScrollAnimate"));

const StepCard = ({ number, title, description }) => (
  <div className="text-center group">
    <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
      {number}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

function Body() {
  const stepsData = [
    {
      number: "1",
      title: "Patient Registration",
      description: "Patients affected by chronic diseases can register on our platform"
    },
    {
      number: "2", 
      title: "Verification",
      description: "Our team rigorously verifies each case to ensure legitimacy and trust"
    },
    {
      number: "3",
      title: "Donate Securely", 
      description: "Donors can make secure contributions to support patients directly"
    }
  ];

  return (
    <div className="bg-white">
      <header className="text-center py-16 bg-gray-50">
        <Container>
          <Suspense fallback={<div className="animate-pulse h-20 bg-gray-200 rounded mb-4"></div>}>
            <ScrollFadeIn>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Hopeful Hearts</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">Connecting generosity with need, one heart at a time</p>
            </ScrollFadeIn>
          </Suspense>
        </Container>
      </header>

      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to improve the lives of individuals in Algeria affected by chronic diseases by providing a transparent and trustworthy platform for donations. We aim to connect donors with patients in need, ensuring that contributions directly support medical treatments, care, and essential resources.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                We envision a future where every individual in Algeria has access to the necessary medical care and support to manage their chronic disease effectively. We strive to be the leading platform for charitable giving in the healthcare sector, fostering a community of compassion and support.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Values</h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>Transparency:</strong> We are committed to providing complete transparency in how donations are managed and distributed, ensuring donors can see the direct impact of their contributions.</p>
                <p><strong>Trust:</strong> We build trust through rigorous verification processes, detailed reporting, and open communication with our donors and beneficiaries.</p>
                <p><strong>Compassion:</strong> We approach our work with empathy and understanding, recognizing the challenges faced by those affected by chronic diseases.</p>
                <p><strong>Community:</strong> We foster a sense of community among donors, patients, and healthcare professionals, working together to achieve our shared goals.</p>
              </div>
            </section>
          </div>

          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stepsData.map((step, index) => (
                <StepCard key={index} {...step} />
              ))}
            </div>
          </section>

          <section className="text-center py-16 bg-gray-50 rounded-lg">
            <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Have questions or want to learn more about our mission? We'd love to hear from you.
            </p>
            <Link to="/contact" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Contact Us
            </Link>
          </section>
        </div>
      </Container>
    </div>
  );
}

export default memo(Body);
