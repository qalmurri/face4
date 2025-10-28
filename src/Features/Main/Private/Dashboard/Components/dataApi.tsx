import axios from "axios";

const getAccessToken = (): string | null => localStorage.getItem("access");

const dataApi = axios.create({
  baseURL: "http://127.0.0.1:8001/api/",
  headers: { "Content-Type": "application/json" },
});

dataApi.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default dataApi;
