import API from "../Interceptors";

export async function resetPassword(
  uid: string,
  token: string,
  newPassword: string
): Promise<void> {
  try {
    await API.post("/req/res/", {
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
    const response = await API.get(`/req/res/check/${uid}/${token}/`);
    return response.data.valid;
  } catch {
    return false;
  }
}
