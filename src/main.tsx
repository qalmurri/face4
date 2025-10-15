import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {TokenProvider} from "./Contexts/TokenContext.tsx";
import {StatusProvider} from "./Contexts/StatusContext.tsx";
import ErrorBoundary from "./Components/ErrorBoundary.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <TokenProvider>
        <StatusProvider>
          <App />
        </StatusProvider>
      </TokenProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
