import API from "../../Auth";

// GET nomor language preference user
export const getUserPreference = async () => {
  const res = await API.get("acc/preference/");
  return res.data;
};

// PATCH atau POST language preference user
export const saveUserPreference = async (language: string) => {
  const res = await API.patch("acc/preference/update/", { language });
  return res.data;
};
