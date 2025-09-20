import api from "../../../api/authApi";
import type { RegisterRequest, LoginResponse } from "../../../types/auth";

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