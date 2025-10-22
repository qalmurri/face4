import { useEffect, useState } from "react";
import { getUserPhone } from "../../../../Services/APIs/EndPoints/Auth/Phone";

interface PhoneType {
    id: number;
    number: string;
    type: string;
}

interface UserPhoneResponse {
    id: number;
    username: string;
    phone: PhoneType | null;
}

export default function Phone() {
    const [data, setData] = useState<UserPhoneResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPhone = async () => {
            try {
                const res = await getUserPhone();
                setData(res);
            } catch (err: any) {
                setError(err.response?.data?.detail || "Gagal mengambil data telepon.");
            } finally {
                setLoading(false);
            }
        };

        fetchPhone();
    }, []);

    if (loading) return <p>⏳ Memuat data...</p>;
    if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">📱 Informasi Nomor Telepon</h2>
            {data ? (
                <>
                    <p><strong>Username:</strong> {data.username}</p>
                    {data.phone ? (
                        <div className="mt-2">
                            <p><strong>Nomor:</strong> {data.phone.number}</p>
                            <p><strong>Tipe:</strong> {data.phone.type}</p>
                        </div>
                    ) : (
                        <p className="text-gray-500">Belum ada data telepon.</p>
                    )}
                </>
            ) : (
                <p className="text-gray-500">Tidak ada data pengguna.</p>
            )}
        </div>
    );
}
