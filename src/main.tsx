import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthTokenProvider } from "./contexts/AuthTokenContext.tsx";
import { AuthStatusProvider } from "./contexts/AuthStatusContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthTokenProvider>
      <AuthStatusProvider>
        <App />
      </AuthStatusProvider>
    </AuthTokenProvider>
  </React.StrictMode>
);
