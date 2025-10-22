import API from "../../Auth";
import type { ForgotPasswordRequest } from "../../../../Types/AuthType";


export async function forgotPasswordCheck(
  payload: ForgotPasswordRequest
): Promise<{ username: string; email: string; last_reset: string | null }> {
  try {
    const response = await API.post("/req/for/check/", payload);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("Koneksi server gagal");
  }
}


export async function forgotPasswordConfirm(
  payload: ForgotPasswordRequest
): Promise<{ detail: string; email: string }> {
  try {
    const response = await API.post("/req/for/confirm/", payload);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("Koneksi server gagal");
  }
}
