import api from "../AuthTokenApi";

// Request kirim email staff activation
export const requestStaffActivation = async () => {
    return api.post("/request-staff/");
};

// Konfirmasi staff activation
export const confirmStaffActivation = async (uid: string, token: string) => {
    return api.post(`/activate-staff/${uid}/${token}/`);
};