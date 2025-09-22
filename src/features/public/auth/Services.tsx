import api from "../../../api/authApi";
import type { RegisterRequest, LoginResponse, ForgotPasswordRequest } from "../../../types/auth";

export async function registerUser(
  payload: RegisterRequest
): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>("/register/", payload);
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
  const response = await api.post<LoginResponse>("/token/", {
    username: usernameOrEmail,
    password,
  });
  return response.data;
}

export async function forgotPassword(
  payload: ForgotPasswordRequest
): Promise<{ detail: string; email: string }> {
  try {
    const response = await api.post("/forgot/", payload);
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
    await api.post("/reset/", {
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
    const response = await api.get(`/reset/check/${uid}/${token}/`);
    return response.data.valid;
  } catch {
    return false;
  }
}