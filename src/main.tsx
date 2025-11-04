import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TokenProvider } from "./Contexts/TokenContext.tsx";
import { StatusProvider } from "./Contexts/StatusContext.tsx";
import ErrorBoundary from "./Components/ErrorBoundary.tsx";
import { Guard } from './Services/APIs/Auth/Guard';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TokenProvider>
      <Guard>
        <StatusProvider>
          <App />
        </StatusProvider>
      </Guard>
    </TokenProvider>
  </React.StrictMode>
);

// TokenProvider -	Simpan token -	Token harus global paling awal
// StatusProvider -	Mengatur auth state (login/logout) -	Bergantung pada token provider
// Guard	- Cek token ke server sebelum load app -	Butuh akses token & status
// ErrorBoundary -	Tangani error UI -	Boleh dalam guard, karena guard harus menjalankan logic dulu
// App	- App utama -	Layer terakhir