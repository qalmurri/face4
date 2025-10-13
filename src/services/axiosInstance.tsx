import axios from "axios";
import toast from "react-hot-toast";
import { getAccessToken, getRefreshToken, saveTokens, clearTokens, } from "./AuthTokenService";


//▄▀█ █▀█ █
//█▀█ █▀▀ █


const API = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: { "Content-Type": "application/json", },
});

// ========================================
// 🛰️ REQUEST INTERCEPTOR
// Tambahkan access token di setiap request
// ========================================
API.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// ========================================
// 🚨 RESPONSE INTERCEPTOR
// Tangani refresh token & error global
// ========================================
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // === 1️⃣ Auto-refresh access token ===
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refresh = getRefreshToken();
                if (!refresh) throw new Error("No refresh token found");

                const res = await axios.post("http://localhost:8000/auth/token/refresh/", {
                    refresh,
                });

                const { access, refresh: newRefresh } = res.data;
                saveTokens(access, newRefresh);
                originalRequest.headers.Authorization = `Bearer ${access}`;
                return API(originalRequest); // ulangi request
            } catch (refreshErr) {
                console.warn("Token refresh failed:", refreshErr);
                clearTokens();
                window.location.href = "/login";
                return Promise.reject(refreshErr);
            }
        }

        // === 2️⃣ Global error handler ===
        const status = error.response?.status;
        const message =
            error.response?.data?.detail ||
            error.response?.data?.message ||
            "Terjadi kesalahan tak terduga.";

        if (import.meta.env.DEV) {
            console.error("API Error:", error);
        }

        switch (status) {
            case 400:
                toast.error("Permintaan tidak valid (400)");
                break;
            case 401:
                toast.error("Sesi kamu sudah berakhir. Silakan login ulang.");
                clearTokens();
                window.location.href = "/login";
                break;
            case 403:
                toast.error("Kamu tidak memiliki izin untuk melakukan ini (403).");
                break;
            case 404:
                toast.error("Resource tidak ditemukan (404).");
                break;
            case 500:
                toast.error("Kesalahan server (500). Coba lagi nanti.");
                break;
            default:
                toast.error(message);
        }

        // === 3️⃣ Kirim ke monitoring service (opsional) ===
        // Sentry.captureException(error);

        return Promise.reject(error);
    }
);

export default API;