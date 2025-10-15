import { Helmet } from "react-helmet-async";
import { useState, useCallback, useEffect, memo } from "react";
import Navbar from "../components/Navbar";
import Container from "../components/container";
import Footer from "../components/Footer";
import { removeLoader } from "../Loader/RemoveLoader";

function Contact() {
  useEffect(() => {
    removeLoader();
  }, []);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = useCallback((data) => {
    const newErrors = {};

    if (!data.name?.trim()) newErrors.name = "Name is required";
    if (!data.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }

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

        const response = await fetch("http://localhost:5000/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formObject.name,
            email: formObject.email,
            subject: formObject.subject || "",
            message: formObject.message || "",
            honeypot: formObject.honeypot || "",
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

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
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Contact Hopeful Hearts - Get in Touch for Support & Questions</title>
        <meta
          name="description"
          content="Contact Hopeful Hearts for questions about chronic disease donations, patient support, or partnership opportunities. We're here to help connect generosity with need."
        />
        <meta
          name="keywords"
          content="contact hopeful hearts, chronic disease support, donation questions, patient assistance, healthcare charity contact"
        />

        <link rel="canonical" href="https://hopefulhearts.org/contact" />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Contact Hopeful Hearts - Get in Touch for Support & Questions"
        />
        <meta
          property="og:description"
          content="Contact us for questions about chronic disease donations, patient support, or partnership opportunities in Algeria."
        />
        <meta
          property="og:image"
          content="https://hopefulhearts.org/images/contact-og.jpg"
        />
        <meta property="og:url" content="https://hopefulhearts.org/contact" />
        <meta property="og:site_name" content="Hopeful Hearts" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Contact Hopeful Hearts - Get in Touch for Support & Questions"
        />
        <meta
          name="twitter:description"
          content="Contact us for questions about chronic disease donations and patient support in Algeria."
        />
        <meta
          name="twitter:image"
          content="https://hopefulhearts.org/images/contact-twitter.jpg"
        />
      </Helmet>
      <Navbar />
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Form */}
            <div>
              <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
              <p className="text-gray-600 mb-8">
                We're here to help. Reach out to us with any questions or concerns.
              </p>

              <form
                className="space-y-6"
                role="form"
                aria-label="Contact form"
                onSubmit={handleSubmit}
                noValidate
              >
                {submitStatus === "success" && (
                  <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    Sorry, there was an error sending your message. Please try again.
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    className={`w-full p-3 border rounded-lg ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className={`w-full p-3 border rounded-lg ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Enter the subject"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    rows="6"
                    className="w-full p-3 border border-gray-300 rounded-lg resize-vertical"
                  ></textarea>
                </div>

                <input
                  type="text"
                  name="honeypot"
                  style={{ display: "none" }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg text-white font-medium ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Right Column - Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500">✉</span>
                  <span>support@hopefulhearts.org</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500">📞</span>
                  <span>+213-555-123-4567</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500">📍</span>
                  <span>123 Hopeful Lane, Algiers, Algeria</span>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-500 hover:text-blue-600">
                    <span className="sr-only">Facebook</span>
                    <span className="text-2xl">📘</span>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-400">
                    <span className="sr-only">Twitter</span>
                    <span className="text-2xl">🐦</span>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-pink-600">
                    <span className="sr-only">Instagram</span>
                    <span className="text-2xl">📷</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default memo(Contact);
