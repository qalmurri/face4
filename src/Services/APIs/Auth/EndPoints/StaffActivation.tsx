import API from "../Interceptors";

export const requestStaffActivation = async () => {
  return API.post("/req/req-staff/");
};

export const confirmStaffActivation = async (uid: string, token: string) => {
  return API.post(`/req/act-staff/${uid}/${token}/`);
};
