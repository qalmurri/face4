import API from "../../Auth";
import { getRefreshToken } from "../../Utilities/TokenService";


export const logoutRequest = async () => {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error("No refresh roken");

  return API.post("/auth/logout/", { refresh });
};
