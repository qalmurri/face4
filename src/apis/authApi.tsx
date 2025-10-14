import authAPI from "../services/APIs/authAPI";
import type { RegisterRequest, LoginResponse, ForgotPasswordRequest } from "../types/AuthType";
import { getRefreshToken } from "../services/TokenService";


export const logoutRequest = async () => {
    const refresh = getRefreshToken();
    if (!refresh) throw new Error("No refresh roken");

    return authAPI.post("/auth/logout/", { refresh });
}


export const requestStaffActivation = async () => {
    return authAPI.post("/req/request-staff/");
};


export const confirmStaffActivation = async (uid: string, token: string) => {
    return authAPI.post(`/req/activate-staff/${uid}/${token}/`);
};


export async function registerUser(
    payload: RegisterRequest
): Promise<LoginResponse> {
    try {
        const response = await authAPI.post<LoginResponse>("/auth/register/", payload);
        return response.data;
    } catch (error: any) {
        if (error.response?.data) {
            throw new Error(error.response.data.detail || "Register gagal");
        }
        throw new Error("Koneksi server gagal");
    }
}


export async function loginUser(
    usernameOrEmail: string,
    password: string
): Promise<LoginResponse> {
    const response = await authAPI.post<LoginResponse>("/auth/token/", {
        username: usernameOrEmail,
        password,
    });
    return response.data;
}


export async function forgotPasswordCheck(
    payload: ForgotPasswordRequest
): Promise<{ username: string; email: string; last_reset: string | null }> {
    try {
        const response = await authAPI.post("/req/forgot/check/", payload);
        return response.data;
    } catch (error: any) {
        if (error.response?.data?.detail) {
            throw new Error(error.response.data.detail);
        }
        throw new Error("Koneksi server gagal");
    }
}


// konfirmasi + kirim email
export async function forgotPasswordConfirm(
    payload: ForgotPasswordRequest
): Promise<{ detail: string; email: string }> {
    try {
        const response = await authAPI.post("/req/forgot/confirm/", payload);
        return response.data;
    } catch (error: any) {
        if (error.response?.data?.detail) {
            throw new Error(error.response.data.detail);
        }
        throw new Error("Koneksi server gagal");
    }
}


export async function resetPassword(
    uid: string,
    token: string,
    newPassword: string
): Promise<void> {
    try {
        await authAPI.post("/req/reset/", {
            uid,
            token,
            new_password: newPassword,
        });
    } catch (error: any) {
        if (error.response?.data) {
            throw new Error(error.response.data.detail || "Reset password gagal");
        }
        throw new Error("Koneksi server gagal");
    }
}


export async function checkResetPassword(
    uid: string,
    token: string
): Promise<boolean> {
    try {
        const response = await authAPI.get(`/req/reset/check/${uid}/${token}/`);
        return response.data.valid;
    } catch {
        return false;
    }
}