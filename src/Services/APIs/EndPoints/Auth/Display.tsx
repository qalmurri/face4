import API from "../../Auth";

// GET nomor photo display user
export const getUserDisplay = async () => {
  const res = await API.get("acc/display/");
  return res.data;
};

// PATCH atau POST photo display user
export const saveUserDisplay = async (photo: string) => {
  const res = await API.patch("acc/display/update/", { photo });
  return res.data;
};
