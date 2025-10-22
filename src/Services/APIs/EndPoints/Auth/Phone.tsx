import API from "../../Auth";

// 🔹 Ambil data phone user yang sedang login
export const getUserPhone = async () => {
    try {
        const res = await API.get("acc/user/phone/");
        return res.data;
    } catch (error: any) {
        console.error("Failed to fetch user phone:", error);
        throw error;
    }
};
