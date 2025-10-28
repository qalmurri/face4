import API from "../../Auth";


export const getUserDisplay = async () => {
  const res = await API.get("acc/display/");
  return res.data;
};


export const saveUserDisplay = async (photo: string) => {
  const res = await API.patch("acc/display/update/", { photo });
  return res.data;
};


export const deleteUserDisplay = async () => {
  const res = await API.delete("acc/display/delete/");
  return res.data;
}