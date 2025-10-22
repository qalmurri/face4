import API from "../../Auth";

// GET nomor telepon user
export const getUserPhone = async () => {
    const res = await API.get("acc/user/phone/");
    return res.data;
};

// PATCH atau POST nomor telepon user
export const saveUserPhone = async (number: string) => {
    const res = await API.patch("acc/user/phone/update/", { number });
    return res.data;
};