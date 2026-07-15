import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import ProductCustomPage from "./ProductCustomPage";
import "./styles.css";

const Page = window.location.pathname === "/custom-product" ? ProductCustomPage : App;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page />
  </StrictMode>
);
