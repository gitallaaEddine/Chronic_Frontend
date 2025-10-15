import { memo, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../container";
import { Campaigns } from "../../pages/C/getCampaign.server";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Helmet } from "react-helmet-async";

const DonatePage = memo(() => {
  const { slug } = useParams();
  const campaign = Campaigns.find((c) => c.slug === slug);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("baridimob");

  if (!campaign) {
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

  const amounts = [1000, 2000, 5000];

  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{campaign.title} - Hope Algeria</title>
        <meta
          name="description"
          content={campaign.description || "Campaign details"}
        />
      </Helmet>

      <Navbar />
      <Container>
        <div className="max-w-4xl mx-auto py-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-secondary/50 mb-8">
            Campaigns / {campaign.title}
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Campaign Info */}
            <div>
              <h1 className="text-3xl font-bold mb-6">{campaign.title}</h1>
              <p className="text-secondary/60 leading-relaxed">
                Help {campaign.patientName}, a 45-year-old mother of three,
                fight chronic kidney disease. Your donation will cover her
                dialysis and medication costs, ensuring she can continue to care
                for her family.
              </p>
            </div>

            {/* Right Column - Donation Form */}
            <div className="bg-secondary/5 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-6">
                Choose Your Donation
              </h2>

              {/* Amount Selection */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {amounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`p-3 rounded border text-center ${
                      selectedAmount === amount
                        ? "bg-primary text-trinary "
                        : "bg-trinary border-secondary/30 hover:border-primary"
                    }`}
                  >
                    {amount} DA
                  </button>
                ))}
                <button
                  onClick={() => setSelectedAmount("other")}
                  className={`p-3 rounded border text-center ${
                    selectedAmount === "other"
                      ? "bg-primary text-trinary border-primary"
                      : "bg-trinary border-secondary/30 hover:border-primary"
                  }`}
                >
                  Other
                </button>
              </div>

              {/* Custom Amount Input */}
              <input
                type="text"
                placeholder="DA Enter custom amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full p-3 border border-secondary/30 rounded mb-4"
              />

              {/* Monthly Donation Toggle */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="font-medium">Monthly Donation</div>
                  <div className="text-sm text-primary">
                    Make a recurring donation
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isMonthly}
                    onChange={(e) => setIsMonthly(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-secondary/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-trinary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-trinary after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Payment Method Selection */}
              <h3 className="font-semibold mb-4">Select Payment Method</h3>

              <div className="space-y-3 mb-6">
                <label className="flex items-center p-3 border rounded cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="baridimob"
                    checked={paymentMethod === "baridimob"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">BaridiMob (Quick)</div>
                    <div className="text-sm text-secondary/50">
                      Fast and secure payments via BaridiMob
                    </div>
                  </div>
                </label>

                <label className="flex items-center p-3 border rounded cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="ccp"
                    checked={paymentMethod === "ccp"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">CCP Manual Transfer</div>
                    <div className="text-sm text-secondary/50">
                      Manual transfer to our CCP account
                    </div>
                  </div>
                </label>

                <label className="flex items-center p-3 border rounded cursor-pointer opacity-50">
                  <input
                    type="radio"
                    name="payment"
                    value="cib"
                    disabled
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">CIB/PayPal (Coming Soon)</div>
                    <div className="text-sm text-secondary/50">
                      Pay with CIB cards or PayPal
                    </div>
                  </div>
                </label>
              </div>

              {/* Confirm Button */}
              <button className="w-full Links">Confirm Donation</button>
            </div>
          </div>

          {/* CCP Transfer Instructions */}
          <div className="mt-12 bg-secondary/5 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              CCP Manual Transfer Instructions
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">1.</span> Transfer the donation
                amount to our CCP account:
                <span className="font-mono ml-2">1234567890123456789</span>
              </div>
              <div>
                <span className="font-medium">2.</span> Take a clear photo of
                the transfer receipt.
              </div>
              <div>
                <span className="font-medium">3.</span> Send the receipt photo
                to us via WhatsApp at
                <span className="text-primary ml-1">+213 555 123 456</span> or
                email it to
                <span className="text-primary ml-1">
                  donations@hopealgeria.org
                </span>
                .
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
});

DonatePage.displayName = "DonatePage";

export default DonatePage;
