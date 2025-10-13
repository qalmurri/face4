import axios from "axios";
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from "../services/AuthTokenService";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/auth/",
    headers: { "Content-Type": "application/json", },
});

// Request interceptor → selalu sisipkan access token
api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor → otomatif refresh token kalau expired
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // kalau access expired
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refresh = getRefreshToken();
                if (!refresh) throw new Error("No refresh token");

                const res = await axios.post("http://localhost:8000/auth/token/refresh/", {
                    refresh,
                });

                const { access, refresh: newRefresh } = res.data;
                saveTokens(access, newRefresh);
                originalRequest.headers.Authorization = `Bearer ${access}`;

                return api(originalRequest); // ulangi request
            } catch (err) {
                clearTokens();
                window.location.href = "/login"; // logout paksa
            }
        }

        return Promise.reject(error);
    }
);

export default api;