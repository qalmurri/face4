import axios from "axios";
import { getAccessToken } from "./Utilities/TokenService";

const dataApi = axios.create({
  baseURL: "http://127.0.0.1:8001/", // server data
  headers: { "Content-Type": "application/json" },
});

dataApi.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default dataApi;
