import API from "../../Auth";


export const getUserAddress = async () => {
    const res = await API.get("acc/address/");
    return res.data;
};


export const saveUserAddress = async (postal_code: string) => {
    const res = await API.patch("acc/address/update/", { postal_code });
    return res.data;
};


export const deleteUserAddress = async () => {
    const res = await API.delete("acc/address/delete/");
    return res.data;
}