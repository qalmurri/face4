import API from "../../Auth";

// GET nomor telepon user
export const getUserPhone = async () => {
    const res = await API.get("acc/phone/");
    return res.data;
};

// PATCH atau POST nomor telepon user
export const saveUserPhone = async (number: string) => {
    const res = await API.patch("acc/phone/update/", { number });
    return res.data;
};

// DELETE nomor telepon user
export const deleteUserPhone = async () => {
    const res = await API.delete("acc/phone/delete/");
    return res.data;
}