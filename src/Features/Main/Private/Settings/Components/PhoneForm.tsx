import { useEffect, useState } from "react";
import { getUserPhone, saveUserPhone } from "../../../../../Services/APIs/EndPoints/Auth/Phone";


interface PhoneData {
    id?: number;
    number: string;
    created_at?: string;
}

interface UserPhoneResponse {
    username: string;
    phone: PhoneData | null;
}

export default function PhoneForm() {
    const [data, setData] = useState<UserPhoneResponse | null>(null);
    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // 🔹 Ambil data nomor telepon user
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getUserPhone();
                setData(res);
                setNumber(res.phone?.number || "");
            } catch (err: any) {
                const statusCode = err.response?.status;
                if (statusCode === 404) {
                    // kalau profil/phone belum ada, buat dummy data kosong
                    setData({ username: "", phone: null });
                } else {
                    setError(err.response?.data?.detail || "Gagal memuat data telepon.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 🔹 Validasi sederhana nomor telepon
    const isValidPhone = (input: string) => {
        const phoneRegex = /^\+?\d{8,15}$/; // hanya angka + opsional
        return phoneRegex.test(input);
    };

    // 🔹 Simpan perubahan nomor telepon
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        if (!isValidPhone(number)) {
            setError("Nomor telepon tidak valid. Gunakan format seperti +628123456789.");
            return;
        }

        setSaving(true);
        try {
            const res = await saveUserPhone(number);
            setData(res);
            setMessage("✅ Nomor telepon berhasil disimpan!");
        } catch (err: any) {
            setError(err.response?.data?.detail || "Gagal menyimpan nomor telepon.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p>⏳ Memuat data...</p>;

    return (
        <div className="max-w-md p-5 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">📱 Pengaturan Nomor Telepon</h2>

            <form onSubmit={handleSave}>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Nomor Telepon
                </label>
                <input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="+628123456789"
                    className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* 🔹 Tampilkan status nomor */}
                {data?.phone ? (
                    <p className="text-gray-600 text-sm mt-2">
                        Nomor saat ini: <span className="font-semibold">{data.phone.number}</span>
                    </p>
                ) : (
                    <p className="text-gray-500 text-sm mt-2 italic">Belum ada nomor</p>
                )}

                <button
                    type="submit"
                    disabled={saving}
                    className={`mt-4 w-full py-2 rounded-lg text-white font-semibold ${saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {saving
                        ? "Menyimpan..."
                        : data?.phone
                            ? "Perbarui Nomor"
                            : "Tambahkan Nomor"}
                </button>
            </form>

            {message && <p className="text-green-600 mt-3">{message}</p>}
            {error && <p className="text-red-600 mt-3">{error}</p>}
        </div>
    );
}
