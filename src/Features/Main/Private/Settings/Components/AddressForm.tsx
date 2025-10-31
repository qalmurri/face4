import { useEffect, useState } from "react";
import { getUserAddress, saveUserAddress, deleteUserAddress } from "../../../../../Services/APIs/Auth/EndPoints/Address";
import type { UserAddressResponse } from "../../../../../Types/AuthType";


export default function AddressForm() {
    const [data, setData] = useState<UserAddressResponse | null>(null);
    const [postal_code, setPostalCode] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // 🔹 Ambil data Postal Code user
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getUserAddress();
                setData(res);
                setPostalCode(res.address?.postal_code || "");
            } catch (err: any) {
                const statusCode = err.response?.status;
                if (statusCode === 404) {
                    // kalau profil/address belum ada, buat dummy data kosong
                    setData({ username: "", address: null });
                } else {
                    setError(err.response?.data?.detail || "Gagal memuat data telepon.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 🔹 Validasi sederhana Postal Code
    const isValidAddress = (input: string) => {
        const addressRegex = /^\+?\d{8,15}$/; // hanya angka + opsional
        return addressRegex.test(input);
    };

    // 🔹 Simpan perubahan Postal Code
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        if (!isValidAddress(postal_code)) {
            setError("Postal Code tidak valid. Gunakan format seperti +628123456789.");
            return;
        }

        setSaving(true);
        try {
            const res = await saveUserAddress(postal_code);
            setData(res);
            setMessage("✅ Postal Code berhasil disimpan!");
        } catch (err: any) {
            setError(err.response?.data?.detail || "Gagal menyimpan Postal Code.");
        } finally {
            setSaving(false);
        }
    };


    const handleDelete = async () => {
        setMessage(null);
        setError(null);
        setSaving(true);

        try {
            await deleteUserAddress();
            setPostalCode("");
            setData(prev => ({ ...(prev ?? { username: "" }), address: null }));
            setMessage("🗑️ kode pos berhasil dihapus!");
        } catch (err: any) {
            setError(err.response?.data?.detail || "Gagal menghapus kode pos.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p>⏳ Memuat data...</p>;

    return (
        <div className="max-w-md p-5 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">📱 Pengaturan Postal Code</h2>

            <form onSubmit={handleSave}>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Postal Code
                </label>
                <input
                    type="text"
                    value={postal_code}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="+628123456789"
                    className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* 🔹 Tampilkan status nomor */}
                {data?.address ? (
                    <>
                        <p className="text-gray-600 text-sm mt-2">
                            Nomor saat ini: <span className="font-semibold">{data.address.postal_code}</span>
                        </p>
                        <button type="button" onClick={handleDelete}>hapus</button>
                    </>
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
                        : data?.address
                            ? "Perbarui Nomor"
                            : "Tambahkan Nomor"}
                </button>
            </form>

            {message && <p className="text-green-600 mt-3">{message}</p>}
            {error && <p className="text-red-600 mt-3">{error}</p>}
        </div>
    );
}
