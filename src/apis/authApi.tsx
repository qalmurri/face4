import API from "../services/axiosInstance";
import { getRefreshToken } from "../services/AuthTokenService";

export const logoutRequest = async () => {
    const refresh = getRefreshToken();
    if (!refresh) throw new Error("No refresh roken");

    return API.post("/auth/logout/", { refresh });
}


export const requestStaffActivation = async () => {
    return API.post("/req/request-staff/");
};


export const confirmStaffActivation = async (uid: string, token: string) => {
    return API.post(`/req/activate-staff/${uid}/${token}/`);
};