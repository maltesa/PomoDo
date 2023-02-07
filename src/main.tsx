import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SettingsContextProvider } from "./SettingsContextProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SettingsContextProvider>
      <App />
    </SettingsContextProvider>
  </React.StrictMode>
);
