import API from "../../Auth";


export const getUserPhone = async () => {
    const res = await API.get("acc/phone/");
    return res.data;
};


export const saveUserPhone = async (number: string) => {
    const res = await API.patch("acc/phone/update/", { number });
    return res.data;
};


export const deleteUserPhone = async () => {
    const res = await API.delete("acc/phone/delete/");
    return res.data;
}