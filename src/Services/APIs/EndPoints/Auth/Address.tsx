import API from "../../Auth";

// GET nomor kode pos address user
export const getUserAddress = async () => {
    const res = await API.get("acc/address/");
    return res.data;
};

// PATCH atau POST kode pos address user
export const saveUserAddress = async (postal_code: string) => {
    const res = await API.patch("acc/address/update/", { postal_code });
    return res.data;
};