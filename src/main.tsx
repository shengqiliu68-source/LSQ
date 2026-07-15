import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import CustomizationFlow from "./CustomizationFlow";
import "./styles.css";

if (window.location.pathname === "/custom-product") {
  window.history.replaceState(null, "", "/custom/packaging");
}

const Page = window.location.pathname.startsWith("/custom/") ? CustomizationFlow : App;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page />
  </StrictMode>
);
