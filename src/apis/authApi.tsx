import API from "../services/axiosInstance";
import { getRefreshToken } from "../services/AuthTokenService";

export const logoutRequest = async () => {
    const refresh = getRefreshToken();
    if (!refresh) throw new Error("No refresh roken");

    return API.post("/logout/", { refresh });
}


export const requestStaffActivation = async () => {
    return API.post("/request-staff/");
};


export const confirmStaffActivation = async (uid: string, token: string) => {
    return API.post(`/activate-staff/${uid}/${token}/`);
};