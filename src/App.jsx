import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { PageSkeleton } from "./components/ui/LoadingSkeleton";
import ErrorBoundary from "./components/ErrorBoundary";

// 🧩 lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Campaigns = lazy(() => import("./pages/CampaignsPage.server"));
const CampaignDetail = lazy(() =>
  import("./components/Campaigns/CampaignDetail")
);
const DonatePage = lazy(() => import("./components/Campaigns/donatePage"));
const StartCampaign = lazy(() => import("./pages/StartCampaign"));
const Login = lazy(() => import("./components/Authentication/login"));
const Register = lazy(() => import("./components/Authentication/register"));
const ForgotPassword = lazy(() =>
  import("./components/Authentication/forgotPassword")
);
const NotFound = lazy(() => import("./pages/404"));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// 🛡️ RouteBoundary = isolated Suspense + ErrorBoundary for each route
function RouteBoundary({ children }) {
  const location = useLocation();
  return (
    <ErrorBoundary resetKeys={[location.pathname]}>
      <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    // Global fallback boundary for catastrophic errors
    <ErrorBoundary>
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <ScrollToTop />

        <Routes>
          <Route
            path="/"
            element={
              <RouteBoundary>
                <Home />
              </RouteBoundary>
            }
          />
          <Route
            path="/profile"
            element={
              <RouteBoundary>
                <Profile />
              </RouteBoundary>
            }
          />
          <Route
            path="/about"
            element={
              <RouteBoundary>
                <About />
              </RouteBoundary>
            }
          />
          <Route
            path="/contact"
            element={
              <RouteBoundary>
                <Contact />
              </RouteBoundary>
            }
          />
          <Route
            path="/startCampaign"
            element={
              <RouteBoundary>
                <StartCampaign />
              </RouteBoundary>
            }
          />
          <Route
            path="/login"
            element={
              <RouteBoundary>
                <Login />
              </RouteBoundary>
            }
          />
          <Route
            path="/register"
            element={
              <RouteBoundary>
                <Register />
              </RouteBoundary>
            }
          />
          <Route
            path="/forgotPassword"
            element={
              <RouteBoundary>
                <ForgotPassword />
              </RouteBoundary>
            }
          />
          <Route
            path="/campaigns"
            element={
              <RouteBoundary>
                <Campaigns />
              </RouteBoundary>
            }
          />
          <Route
            path="/campaign-detail/:slug"
            element={
              <RouteBoundary>
                <CampaignDetail />
              </RouteBoundary>
            }
          />
          <Route
            path="/donate/:slug"
            element={
              <RouteBoundary>
                <DonatePage />
              </RouteBoundary>
            }
          />
          <Route
            path="*"
            element={
              <RouteBoundary>
                <NotFound />
              </RouteBoundary>
            }
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
