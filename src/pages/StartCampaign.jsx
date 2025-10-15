import { Helmet } from "react-helmet-async";
import { useState, useCallback, useEffect, memo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/container";
import { removeLoader } from "../Loader/RemoveLoader";

function CreateCampaign() {
  useEffect(() => {
    removeLoader();
  }, []);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = useCallback((data) => {
    const newErrors = {};

    if (!data.patientName?.trim())
      newErrors.patientName = "Patient name is required";
    if (!data.city?.trim()) newErrors.city = "City is required";
    if (!data.disease?.trim()) newErrors.disease = "Disease is required";
    if (!data.story?.trim()) newErrors.story = "Story is required";
    if (!data.targetAmount?.trim())
      newErrors.targetAmount = "Target amount is required";

    return newErrors;
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setErrors({});

      try {
        const data = new FormData(e.target);
        const formObject = {};

        for (const [key, value] of data.entries()) {
          formObject[key] = value;
        }

        const validationErrors = validateForm(formObject);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          setIsSubmitting(false);
          return;
        }

        // TODO: Submit to backend
        console.log("Campaign data:", formObject);
        setSubmitStatus("success");
        e.target.reset();
      } catch (error) {
        console.error("Form submission error:", error);
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateForm]
  );

  return (
    <>
      <Helmet>
        <title>Create a Campaign - Hope Algeria</title>
        <meta
          name="description"
          content="Help a patient in need by starting a new fundraising campaign."
        />
      </Helmet>
      <Navbar />
      <Container>
        <div className="max-w-2xl mx-auto py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create a Campaign</h1>
            <p className="text-secondary/60">
              Help a patient in need by starting a new fundraising campaign.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {submitStatus === "success" && (
              <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                Campaign submitted successfully! It will be reviewed by our
                team.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                Error submitting campaign. Please try again.
              </div>
            )}

            {/* Patient Name and City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="patientName"
                  className="block text-sm font-medium mb-2"
                >
                  Patient Name
                </label>
                <input
                  id="patientName"
                  name="patientName"
                  type="text"
                  placeholder="Enter patient's full name"
                  className={`w-full p-3 border rounded-lg ${
                    errors.patientName
                      ? "border-red-500"
                      : "border-secondary/30"
                  }`}
                />
                {errors.patientName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.patientName}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium mb-2"
                >
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Enter the city"
                  className={`w-full p-3 border rounded-lg ${
                    errors.city ? "border-red-500" : "border-secondary/30"
                  }`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
            </div>

            {/* Disease */}
            <div>
              <label
                htmlFor="disease"
                className="block text-sm font-medium mb-2"
              >
                Disease
              </label>
              <input
                id="disease"
                name="disease"
                type="text"
                placeholder="e.g. Chronic Kidney Disease"
                className={`w-full p-3 border rounded-lg ${
                  errors.disease ? "border-red-500" : "border-secondary/30"
                }`}
              />
              {errors.disease && (
                <p className="text-red-500 text-sm mt-1">{errors.disease}</p>
              )}
            </div>

            {/* Story */}
            <div>
              <label htmlFor="story" className="block text-sm font-medium mb-2">
                Story
              </label>
              <textarea
                id="story"
                name="story"
                rows="6"
                placeholder="Tell the patient's story in detail. Explain their situation, the treatment needed and why this support is crucial."
                className={`w-full p-3 border rounded-lg resize-vertical ${
                  errors.story ? "border-red-500" : "border-secondary/30"
                }`}
              />
              {errors.story && (
                <p className="text-red-500 text-sm mt-1">{errors.story}</p>
              )}
            </div>

            {/* Uploads */}
            <div>
              <h3 className="text-lg font-medium mb-4">Uploads</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Patient Photos */}
                <div className="border-2 border-dashed border-secondary/30 rounded-lg p-6 text-center">
                  <div className="mb-4">
                    <div className="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-2xl">📷</span>
                    </div>
                    <h4 className="font-medium">Patient Photos</h4>
                    <p className="text-sm text-gray-500">
                      Add up to 5 photos to tell their story
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-blue-500 hover:text-primary font-medium"
                  >
                    Upload Photos
                  </button>
                  <input
                    type="file"
                    name="patientPhotos"
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                {/* Medical Documents */}
                <div className="border-2 border-dashed border-green-200 bg-green-50 rounded-lg p-6 text-center">
                  <div className="mb-4">
                    <div className="w-12 h-12 mx-auto bg-green-100 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-2xl">📋</span>
                    </div>
                    <h4 className="font-medium">Medical Documents</h4>
                    <p className="text-sm text-green-600">
                      Tip: Upload documents for faster approval.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-blue-500 hover:text-primary font-medium"
                  >
                    Upload Documents
                  </button>
                  <input
                    type="file"
                    name="medicalDocuments"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Target Amount */}
            <div>
              <label
                htmlFor="targetAmount"
                className="block text-sm font-medium mb-2"
              >
                Target Amount (DA)
              </label>
              <div className="relative">
                <input
                  id="targetAmount"
                  name="targetAmount"
                  type="number"
                  placeholder="500,000"
                  className={`w-full p-3 pr-12 border rounded-lg ${
                    errors.targetAmount
                      ? "border-red-500"
                      : "border-secondary/30"
                  }`}
                />
                <span className="absolute right-3 top-3 text-gray-500">DA</span>
              </div>
              {errors.targetAmount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.targetAmount}
                </p>
              )}
            </div>

            {/* Info Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                Campaigns are reviewed by our team. Approval or rejection is
                based on the provided information and verification documents.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                isSubmitting
                  ? "bg-gray-400 text-secondary/60 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-primary"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Campaign"}
            </button>
          </form>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default memo(CreateCampaign);
