import axios from "axios";
import { getAccessToken } from "./Utilities/TokenService";

const api = axios.create({
  baseURL: "http://127.0.0.1:8001/data/", // pastikan sesuai route Django kamu
  headers: {
    "Content-Type": "application/json",
  },
});

// middleware untuk token
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;