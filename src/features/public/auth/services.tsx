import api from "../../../services/api";

// Response type dari backend Django (JWT Token)
export interface LoginResponse {
  access: string;
  refresh: string;
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/token/", {
    username: email,
    password,
  });

  console.log(response.data);
  return response.data;
}

export interface RegisterResponse {
  id: number;
  email: string;
  username?: string;
  // bisa ditambah field lain sesuai backend kamu
}

export async function registerUser(
  username: string,
  email: string,
  password: string
): Promise<RegisterResponse> {
  try {
    const response = await api.post<RegisterResponse>("/register/", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.detail || "Register gagal");
    }
    throw new Error("Koneksi server gagal");
  }
}