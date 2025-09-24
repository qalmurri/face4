import React, { useEffect, useState } from "react";
import { Input, Label, GeneralButton } from "../../../../components/atoms";
import type { UserSettingRequest } from "../../../../types/Settings/SettingsType";
import { getSettingsUser, putSettingsUser } from "../../../../apis";

export default function SettingsForm() {
    const [user, setUser] = useState<UserSettingRequest | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getSettingsUser();
                setUser(res);
            } catch (err: any) {
                setError("Gagal memuat profil");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;

        try {
            const updated = await putSettingsUser({
                first_name: user.first_name,
                last_name: user.last_name,
            });
            setUser(updated);
            alert("Profil berhasil diperbarui!");
        } catch (err: any) {
            alert("Gagal memperbarui profil");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4">Pengaturan Akun</h2>
            {user && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" value={user.username} disabled />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" value={user.email} disabled />
                    </div>

                    <div>
                        <Label htmlFor="first_name">Nama Depan</Label>
                        <Input
                            type="text"
                            value={user.first_name || ""}
                            onChange={(e) =>
                                setUser((prev) =>
                                    prev ? { ...prev, first_name: e.target.value } : prev
                                )
                            }
                        />
                    </div>

                    <div>
                        <Label htmlFor="last_name">Nama Belakang</Label>
                        <Input
                            type="text"
                            value={user.last_name || ""}
                            onChange={(e) =>
                                setUser((prev) =>
                                    prev ? { ...prev, last_name: e.target.value } : prev
                                )
                            }
                        />
                    </div>

                    {user.date_joined && (
                        <div>
                            <Label htmlFor="date_joined">Tanggal Daftar</Label>
                            <Input
                                type="text"
                                value={new Date(user.date_joined).toLocaleDateString()}
                                disabled
                            />
                        </div>
                    )}

                    <GeneralButton type="submit">Simpan Perubahan</GeneralButton>
                </form>
            )}

            <div className="mt-8 border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Keamanan</h3>
                <ul className="list-disc list-inside text-gray-600">
                    <li>
                        <a href="/forgot" className="text-blue-600 hover:underline">
                            Ubah Password
                        </a>
                    </li>
                    <li>
                        <button className="text-red-600 hover:underline">Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}