import axios from "axios";
import { getRefreshToken, getAccessToken, saveTokens, clearTokens } from "./TokenService";

export async function verifyTokenServer(): Promise<boolean> {
    const token = getAccessToken();
    if (!token) return false;
    try {
        await axios.post("http://127.0.0.1:8000/auth/tok/ver/", { token });
        return true;
    } catch {
        return false;
    }
}

export async function refreshToken(): Promise<string> {
    const refresh = getRefreshToken();
    if (!refresh) throw new Error("No refresh token");
    const res = await axios.post("http://127.0.0.1:8000/auth/tok/ref/", { refresh });
    const { access, refresh: newRefresh } = res.data;
    saveTokens(access, newRefresh || refresh);
    return access;
}

export function logout() {
    clearTokens();
    window.location.href = "/login";
}
