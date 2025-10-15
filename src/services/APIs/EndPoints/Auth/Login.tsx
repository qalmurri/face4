import API from "../../Auth";
import type { LoginResponse } from "../../../../Types/AuthType";


export async function loginUser(
    usernameOrEmail: string,
    password: string
): Promise<LoginResponse> {
    const response = await API.post<LoginResponse>("/auth/token/", {
      username: usernameOrEmail,
      password,
    });
    return response.data;
}





