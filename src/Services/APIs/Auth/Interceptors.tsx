import axios from "axios";
import { getAccessToken } from "./TokenService";
import { refreshToken, logout } from "./Service";

export const API = axios.create({
    baseURL: "http://127.0.0.1:8000/",
});

API.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

API.interceptors.response.use(
    res => res,
    async (error) => {
        const original = error.config;
        if (error.response?.status === 401 && !original._retry) {
            original._retry = true;
            try {
                const newAccess = await refreshToken();
                original.headers.Authorization = `Bearer ${newAccess}`;
                return API(original);
            } catch {
                logout();
            }
        }
        return Promise.reject(error);
    }
);

export default API;