import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Container from "../container";
import { Campaigns } from "./CampaignList.server";
import { removeLoader } from "../../Loader/RemoveLoader";
import { useEffect, memo } from "react";

function CampaignPage() {
  useEffect(() => {
    removeLoader();
  }, []);

  const { id } = useParams();
  const campaignData = Campaigns.find((c) => c._id === id);

  if (!campaignData) {
    return (
      <>
        <Navbar />
        <div className="py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Campaign Not Found</h1>
          <p className="text-secondary/60 mb-8">
            The requested campaign information is not available.
          </p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{campaignData.title} - Hope Algeria</title>
        <meta
          name="description"
          content={campaignData.description || "Campaign details"}
        />
      </Helmet>

      <Navbar />
      <Container>
        <div className="py-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-secondary/50">
              <Link to="/campaigns" className="hover:text-primary">
                Campaigns
              </Link>
              <span>/</span>
              <span>{campaignData.patientName}'s Fight</span>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-secondary mb-4">
                  {campaignData.patientName}'s Fight Against Chronic{" "}
                  {campaignData.category}
                </h1>
                <p className="text-secondary/60 mb-4">
                  {campaignData.patientName}, a 42-year-old mother from{" "}
                  {campaignData.city}, needs your support to afford life-saving
                  dialysis treatments. Her kidneys are failing, and without
                  immediate intervention, her condition will worsen.
                </p>
              </div>

              {/* Patient's Story */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  {campaignData.patientName}'s Story
                </h2>
                <p className="text-secondary/70 leading-relaxed">
                  {campaignData.description}
                </p>
              </div>

              {/* Uploaded Documents */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  Uploaded Documents
                </h2>
                <div className="bg-secondary/5 p-4 rounded-lg">
                  <p className="text-secondary/50 text-sm">
                    Medical documents and reports will be displayed here.
                  </p>
                </div>
              </div>

              {/* Updates */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Updates</h2>
                <div className="space-y-4">
                  {campaignData.updates.map((update) => (
                    <div key={update.id} className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-secondary">
                            {update.type}
                          </span>
                          <span className="text-sm text-secondary/50">
                            {update.date}
                          </span>
                        </div>
                        <p className="text-secondary/60 text-sm">
                          {update.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Donor Support */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Donor Support</h2>
                <div className="space-y-4">
                  {campaignData.donors.map((donor) => (
                    <div key={donor.id} className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-secondary/30 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {donor.name[0]}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-secondary">
                            {donor.name}
                          </span>
                          <span className="text-sm text-secondary/50">
                            {donor.date}
                          </span>
                        </div>
                        <p className="text-secondary/60 text-sm">
                          {donor.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border rounded-lg p-6 sticky top-8">
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-secondary/60">
                      Raised of {campaignData.goal.toLocaleString()}
                    </span>
                    <span className="text-lg font-bold text-primary">
                      {campaignData.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary/15 rounded-full h-3 mb-2">
                    <div
                      className="bg-primary h-3 rounded-full"
                      style={{ width: `${campaignData.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-red-600 font-medium">
                    Needs treatment in {campaignData.daysLeft} days
                  </p>
                </div>

                {/* Share */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Share this Campaign</h3>
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-primary rounded-lg text-sm">
                      <span>📘</span>
                      <span>Facebook</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-600 rounded-lg text-sm">
                      <span>📱</span>
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>

                {/* Donate Link */}
                <Link
                  to={`/donate/${campaignData.slug}`}
                  className="w-full Links"
                >
                  💝 Donate Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default memo(CampaignPage);
