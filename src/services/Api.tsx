import axios from "axios";
import { getAccessToken } from "./Auth";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/auth/", // masih belum di buat
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor: otomatis pasang Authorization header
api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;