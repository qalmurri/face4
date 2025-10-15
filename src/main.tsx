import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthTokenProvider } from "./Contexts/TokenContext.tsx";
import { AuthStatusProvider } from "./Contexts/StatusContext.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthTokenProvider>
        <AuthStatusProvider>
          <App />
        </AuthStatusProvider>
      </AuthTokenProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
