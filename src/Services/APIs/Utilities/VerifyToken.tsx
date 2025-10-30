import axios from "axios";

export async function verifyToken(token: string): Promise<boolean> {
    try {
        const res = await axios.post("http://127.0.0.1:8000/auth/tok/ver/", { token, });
        return res.status === 200;
    } catch {
        return false;
    }
}