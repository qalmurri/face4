import API from "../Interceptors";
import type { RegisterRequest, LoginResponse } from "../../../../Types/AuthType";

export async function registerUser(
  payload: RegisterRequest
): Promise<LoginResponse> {
  try {
    const response = await API.post<LoginResponse>("/auth/reg/", payload);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.detail || "Register gagal");
    }
    throw new Error("Koneksi server gagal");
  }
}
