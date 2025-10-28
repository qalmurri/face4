import API from "../../Auth";


export const getUserPreference = async () => {
  const res = await API.get("acc/preference/");
  return res.data;
};


export const saveUserPreference = async (language: string) => {
  const res = await API.patch("acc/preference/update/", { language });
  return res.data;
};


export const deleteUserPreference = async () => {
  const res = await API.delete("acc/preference/delete/");
  return res.data;
}