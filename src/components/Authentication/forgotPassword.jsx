import { useState, useCallback, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { removeLoader } from "../../Loader/RemoveLoader";
import Navbar from "../Navbar";
import Footer from "../Footer";

function ForgotPasswordPage() {
  useEffect(() => {
    removeLoader();
  }, []);

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        console.log("Password reset request:", email);
      } catch (error) {
        console.error("Password reset error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [email]
  );

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-secondary">
                Reset your password
              </h2>
              <p className="text-secondary/60 mt-2">
                Enter your email to receive reset instructions
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-secondary/70 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-secondary/30 rounded-lg bg-gray-50 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-secondary/60">
              Remember your password?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-500 hover:text-primary"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default memo(ForgotPasswordPage);
