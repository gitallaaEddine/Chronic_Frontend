import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    'Failed to find root element with id "root". Please ensure the HTML contains a div with id="root".'
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
