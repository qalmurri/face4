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