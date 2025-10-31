import API from "../Interceptors";
import { getRefreshToken } from "../../Auth/TokenService";

export const logoutRequest = async () => {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error("No refresh roken");

  return API.post("/auth/logout/", { refresh });
};
