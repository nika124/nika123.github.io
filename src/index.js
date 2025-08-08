import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider, Helmet } from "@dr.pogodin/react-helmet";
import App from "./App.js";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
