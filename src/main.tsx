import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import CustomizationFlow from "./CustomizationFlow";
import CasesPage from "./CasesPage";
import OrderTrackingPage from "./OrderTrackingPage";
import ProcurementPage from "./ProcurementPage";
import InquiryPage from "./InquiryPage";
import "./styles.css";

if (window.location.pathname === "/custom-product") {
  window.history.replaceState(null, "", "/custom/packaging");
}

const Page = window.location.pathname.startsWith("/inquiry")
  ? InquiryPage
  : window.location.pathname.startsWith("/procurement")
    ? ProcurementPage
    : window.location.pathname.startsWith("/order-tracking")
      ? OrderTrackingPage
      : window.location.pathname.startsWith("/cases")
        ? CasesPage
        : window.location.pathname.startsWith("/custom/")
          ? CustomizationFlow
          : App;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page />
  </StrictMode>
);
