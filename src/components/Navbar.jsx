import { Link, useNavigate } from "react-router-dom";
import { useState, memo, useCallback } from "react";
import Container from "../components/container";
import { useOptimizedCallback } from "../hooks/useOptimizedCallback";
import { useAuthStore } from "../store/authStore";
import { authService } from "../services/authServices";

// Static data moved outside component to prevent recreation
const links = [
  { name: "Home", link: "/" },
  { name: "campaigns", link: "/campaigns" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
];

// Sidebar navigation links with descriptions
const sidebarLinks = [
  {
    name: "campaigns",
    link: "/campaigns",
    description: "Support causes that matter to you",
  },
  {
    name: "About",
    link: "/about",
    description: "Learn about our mission and impact",
  },
  {
    name: "Contact",
    link: "/contact",
    description: "Get in touch with our team",
  },
];

function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      logout();

      navigate("/");
    }
  };
  const throttledToggle = useOptimizedCallback(
    useCallback((value) => {
      setShowSidebar(value);
    }, []),
    100,
    "debounce"
  );

  const toggleProfileDropdown = useCallback(() => {
    setShowProfileDropdown((prev) => !prev);
  }, []);

  return (
    <>
      {/* Navbar */}
      <Container>
        <header
          className="w-full bg-transparent z-50 "
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex justify-between items-center py-7">
            {/* LOGO HERE */}
            <Link to="/" className="text-secondary font-bold text-2xl">
              Cretti
            </Link>

            {/* Desktop Navigation Links - Hidden on small screens */}
            <nav className="hidden lg:flex items-center gap-8">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.link}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Navbar */}
            <div className="flex-center gap-1 sm:gap-4 ">
              {/* Contact btn */}
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="!hidden Links lg:!block "
                  aria-label="Login to your account"
                >
                  Login
                </Link>
              )}
              <Link
                to="/StartCampaign"
                className="!hidden Links lg:!block "
                aria-label="Login to your account"
              >
                Start a Campaign
              </Link>

              {/* Profile Dropdown */}
              {isAuthenticated && (
                <div className=" md:relative ">
                  <button
                    type="button"
                    onClick={toggleProfileDropdown}
                    className="overflow-hidden rounded-full border mt-1  shadow-inner"
                    aria-label="Toggle user menu"
                  >
                    <span className="sr-only">Toggle dashboard menu</span>
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="User profile"
                      className="size-10 object-cover"
                    />
                  </button>

                  {showProfileDropdown && (
                    <div
                      className="absolute end-0 z-10 mt-0.5 w-56 divide-y divide-secondary rounded-md border  bg-white shadow-lg"
                      role="menu"
                    >
                      <div className="p-2">
                        <Link
                          to="/profile"
                          className="block rounded-lg px-4 py-2 text-sm text-secondary hover:bg-secondary/5"
                          role="menuitem"
                        >
                          My profile
                        </Link>
                      </div>

                      <div className="p-2">
                        <form method="POST" action="#">
                          <button
                            onClick={handleLogout}
                            type="submit"
                            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                            role="menuitem"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                              />
                            </svg>
                            Logout
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Sidebar toggle - Only visible on small screens */}
              <button
                onClick={() => throttledToggle(true)}
                className="lg:!hidden flex-center hover:text-secondary/70 cursor-pointer"
                aria-label="Open navigation menu"
                aria-expanded={showSidebar}
                aria-controls="sidebar-menu"
              >
                <svg
                  className="w-6 h-6 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>
      </Container>

      {/* Sidebar */}
      <div
        id="sidebar-menu"
        className={`fixed top-0 right-0 max-w-7/10 min-w-9/10 h-full bg-white z-[60] 
            transition-all duration-500 ease-out ${
              showSidebar ? "translate-x-0" : "translate-x-full"
            }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidebar-title"
        aria-hidden={!showSidebar}
      >
        <div className="flex flex-col h-fit mt-6">
          <div className="flex justify-end pt-3 ">
            <button
              onClick={() => throttledToggle(false)}
              className="w-10 h-10 flex-center flex-shrink-0 text-secondary cursor-pointer hover:text-secondary py-4 mx-6 sm:mx-10 "
              aria-label="Close navigation menu"
            >
              ✕
            </button>
          </div>

          {/* Action Buttons */}

          {/* Navigation Links */}
          <nav
            className=" flex-1 px-6 sm:px-10 py-3 space-y-3"
            role="navigation"
            aria-label="Main menu"
          >
            {sidebarLinks.map((link, index) => (
              <Link
                key={index}
                to={link.link}
                onClick={() => throttledToggle(false)}
                className={`block hover:bg-gray-100 rounded-2xl group transform transition-all duration-500 ease-out ${
                  showSidebar
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                aria-label={`Navigate to ${link.name} - ${link.description}`}
              >
                <div className="py-4 transition-colors ">
                  <h3 className="text-2xl font-medium text-secondary ">
                    {link.name}
                  </h3>
                  <p className="text-sm text-secondary/70 mt-1">
                    {link.description}
                  </p>
                </div>
              </Link>
            ))}
          </nav>
          <div className="flex-center flex-shrink-0 gap-2 px-6 sm:px-10 py-3 ">
            <Link
              to="/StartCampaign"
              onClick={() => throttledToggle(false)}
              className="block w-1/2 lightLinks"
              aria-label="Start a new fundraising campaign"
            >
              Start Fundraise
            </Link>
            {!isAuthenticated && (
              <Link
                to="/login"
                onClick={() => throttledToggle(false)}
                className="block w-1/2 Links"
                aria-label="Login to your account"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[50] transition-opacity duration-500 ${
          showSidebar
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => throttledToggle(false)}
        aria-hidden="true"
      />

      {/* Profile Dropdown Overlay */}
      {showProfileDropdown && (
        <div
          className="fixed inset-0 z-[5]"
          onClick={() => setShowProfileDropdown(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default memo(Navbar);
