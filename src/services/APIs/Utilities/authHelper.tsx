import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { getRefreshToken, saveTokens, clearTokens } from "./TokenService";

interface JWTPayload {
    exp: number; // waktu kadaluarsa (epoch timestamp)
    [key: string]: any;
}


export function validateToken(token: string): boolean {
    if (!token) return false;

    try {
        const decoded = jwtDecode<JWTPayload>(token);
        const now = Math.floor(Date.now() / 1000);
        return decoded.exp > now;
    } catch {
        return false;
    }
}


export async function verifyTokenOnServer(token: string): Promise<boolean> {
    if (!token) return false;

    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/auth/token/verify/",
            { token },
            { headers: { "Content-Type": "application/json" } }
        );

        // DRF akan mengembalikan status 200 kalau token valid
        return response.status === 200;
    } catch (error: any) {
        const status = error.response?.status;

        if (status === 401 || status === 400) {
            console.warn("🔒 Token tidak valid / kadaluarsa.");
        } else {
            console.error("⚠️ Gagal memverifikasi token:", error.message);
        }

        clearTokens();
        return false;
    }
}


export async function refreshAccessToken(): Promise<string> {
    const refresh = getRefreshToken();
    if (!refresh) throw new Error("No refresh token found");

    try {
        const res = await axios.post("http://127.0.0.1:8000/auth/token/refresh/", { refresh });
        const { access, refresh: newRefresh } = res.data;

        // 🔒 Gunakan refresh token lama jika server tidak mengirim yang baru
        saveTokens(access, newRefresh || refresh);

        return access;
    } catch (err) {
        console.error("Refresh token failed:", err);
        clearTokens();
        throw err;
    }
}