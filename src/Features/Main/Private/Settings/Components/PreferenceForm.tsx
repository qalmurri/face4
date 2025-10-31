import { useEffect, useState } from "react";
import { getUserPreference, saveUserPreference, deleteUserPreference } from "../../../../../Services/APIs/Auth/EndPoints/Preference";
import type { UserPreferenceResponse } from "../../../../../Types/AuthType";


export default function PreferenceForm() {
    const [data, setData] = useState<UserPreferenceResponse | null>(null);
    const [language, setLanguage] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // 🔹 Ambil data Language user
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getUserPreference();
                setData(res);
                setLanguage(res.preference?.language || "");
            } catch (err: any) {
                const statusCode = err.response?.status;
                if (statusCode === 404) {
                    // kalau profil/preference belum ada, buat dummy data kosong
                    setData({ username: "", preference: null });
                } else {
                    setError(err.response?.data?.detail || "Gagal memuat data telepon.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 🔹 Validasi sederhana Language
    const isValidPreference = (input: string) => {
        const preferenceRegex = /^\+?\d{8,15}$/; // hanya angka + opsional
        return preferenceRegex.test(input);
    };

    // 🔹 Simpan perubahan Language
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        if (!isValidPreference(language)) {
            setError("Language tidak valid. Gunakan format seperti +628123456789.");
            return;
        }

        setSaving(true);
        try {
            const res = await saveUserPreference(language);
            setData(res);
            setMessage("✅ Language berhasil disimpan!");
        } catch (err: any) {
            setError(err.response?.data?.detail || "Gagal menyimpan Language.");
        } finally {
            setSaving(false);
        }
    };


    const handleDelete = async () => {
        setMessage(null);
        setError(null);
        setSaving(true);

        try {
            await deleteUserPreference();
            setLanguage("");
            setData(prev => ({ ...(prev ?? { username: "" }), preference: null }));
            setMessage("🗑️ language berhasil dihapus!");
        } catch (err: any) {
            setError(err.response?.data?.detail || "Gagal menghapus language.");
        } finally {
            setSaving(false);
        }
    };


    if (loading) return <p>⏳ Memuat data...</p>;

    return (
        <div className="max-w-md p-5 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">📱 Pengaturan Language</h2>

            <form onSubmit={handleSave}>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Language
                </label>
                <input
                    type="text"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    placeholder="+628123456789"
                    className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* 🔹 Tampilkan status nomor */}
                {data?.preference ? (
                    <>
                        <p className="text-gray-600 text-sm mt-2">
                            Nomor saat ini: <span className="font-semibold">{data.preference.language}</span>
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
                        : data?.preference
                            ? "Perbarui Nomor"
                            : "Tambahkan Nomor"}
                </button>
            </form>

            {message && <p className="text-green-600 mt-3">{message}</p>}
            {error && <p className="text-red-600 mt-3">{error}</p>}
        </div>
    );
}
