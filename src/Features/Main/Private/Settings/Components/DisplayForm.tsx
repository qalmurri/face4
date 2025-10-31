import { useEffect, useState } from "react";
import { getUserDisplay, saveUserDisplay, deleteUserDisplay } from "../../../../../Services/APIs/Auth/EndPoints/Display";
import type { UserDisplayResponse } from "../../../../../Types/AuthType";


export default function DisplayForm() {
    const [data, setData] = useState<UserDisplayResponse | null>(null);
    const [photo, setPhoto] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // 🔹 Ambil data Photo user
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getUserDisplay();
                setData(res);
                setPhoto(res.display?.photo || "");
            } catch (err: any) {
                const statusCode = err.response?.status;
                if (statusCode === 404) {
                    // kalau profil/display belum ada, buat dummy data kosong
                    setData({ username: "", display: null });
                } else {
                    setError(err.response?.data?.detail || "Gagal memuat data telepon.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 🔹 Validasi sederhana Photo
    const isValidDisplay = (input: string) => {
        const displayRegex = /^\+?\d{8,15}$/; // hanya angka + opsional
        return displayRegex.test(input);
    };

    // 🔹 Simpan perubahan Photo
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        if (!isValidDisplay(photo)) {
            setError("Photo tidak valid. Gunakan format seperti +628123456789.");
            return;
        }

        setSaving(true);
        try {
            const res = await saveUserDisplay(photo);
            setData(res);
            setMessage("✅ Photo berhasil disimpan!");
        } catch (err: any) {
            setError(err.response?.data?.detail || "Gagal menyimpan Photo.");
        } finally {
            setSaving(false);
        }
    };


    const handleDelete = async () => {
        setMessage(null);
        setError(null);
        setSaving(true);

        try {
            await deleteUserDisplay();
            setPhoto("");
            setData(prev => ({ ...(prev ?? { username: "" }), display: null }));
            setMessage("🗑️ photo berhasil dihapus!");
        } catch (err: any) {
            setError(err.response?.data?.detail || "Gagal menghapus photo.");
        } finally {
            setSaving(false);
        }
    };


    if (loading) return <p>⏳ Memuat data...</p>;

    return (
        <div className="max-w-md p-5 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">📱 Pengaturan Photo</h2>

            <form onSubmit={handleSave}>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Photo
                </label>
                <input
                    type="text"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    placeholder="+628123456789"
                    className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* 🔹 Tampilkan status nomor */}
                {data?.display ? (
                    <>
                        <p className="text-gray-600 text-sm mt-2">
                            Nomor saat ini: <span className="font-semibold">{data.display.photo}</span>
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
                        : data?.display
                            ? "Perbarui Nomor"
                            : "Tambahkan Nomor"}
                </button>
            </form>

            {message && <p className="text-green-600 mt-3">{message}</p>}
            {error && <p className="text-red-600 mt-3">{error}</p>}
        </div>
    );
}
