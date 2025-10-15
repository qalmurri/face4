import API from "../../Auth";

export const requestStaffActivation = async () => {
  return API.post("/req/request-staff/");
};

export const confirmStaffActivation = async (uid: string, token: string) => {
  return API.post(`/req/activate-staff/${uid}/${token}/`);
};
