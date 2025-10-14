import axios from "axios";
import toast from "react-hot-toast";
import { getAccessToken, clearTokens } from "../TokenService";
import { validateToken, verifyTokenOnServer, refreshAccessToken } from "../authHelper";

const authAPI = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: { "Content-Type": "application/json" },
});

// ========================================
// 🧭 GLOBAL FLAG (agar verify ke server hanya sekali)
// ========================================
let hasVerifiedServerToken = false;

// ========================================
// 🛰️ REQUEST INTERCEPTOR
// ========================================
authAPI.interceptors.request.use(
    async (config) => {
        const token = getAccessToken();
        if (!token) return config;

        // 🧠 1️⃣ Validasi lokal dulu
        let valid = validateToken(token);

        // 🛰️ 2️⃣ Jika baru pertama kali, cek juga ke server DRF
        if (!hasVerifiedServerToken && valid) {
            const serverValid = await verifyTokenOnServer(token);
            hasVerifiedServerToken = true;
            if (!serverValid) valid = false;
        }

        // 🔁 3️⃣ Jika token invalid, refresh token
        if (!valid) {
            try {
                const newAccess = await refreshAccessToken();
                config.headers.Authorization = `Bearer ${newAccess}`;
                return config;
            } catch (err) {
                console.warn("Auto refresh failed in request interceptor");
                clearTokens();
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        // ✅ 4️⃣ Kalau valid, pakai token lama
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// ========================================
// 🚨 RESPONSE INTERCEPTOR
// ========================================
authAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 1️⃣ Auto-refresh bila 401 dan belum diulang
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccess = await refreshAccessToken();
                originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                return authAPI(originalRequest);
            } catch (err) {
                clearTokens();
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        // 2️⃣ Global error handler
        const status = error.response?.status;
        const message =
            error.response?.data?.detail ||
            error.response?.data?.message ||
            "Terjadi kesalahan tak terduga.";

        if (import.meta.env.DEV) console.error("API Error:", error);

        switch (status) {
            case 400:
                toast.error("Permintaan tidak valid (400)");
                break;
            case 401:
                toast.error("Sesi kamu sudah berakhir. Silakan login ulang.");
                break;
            case 403:
                toast.error("Kamu tidak memiliki izin (403).");
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

        return Promise.reject(error);
    }
);

export default authAPI;
