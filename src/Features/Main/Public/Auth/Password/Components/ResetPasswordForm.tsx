import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Input, Label, GeneralButton } from "../../../../../../Components/Atoms";
import { resetPassword, checkResetPassword } from "../../../../../../Services/APIs/Auth/EndPoints/ResetPassword";

export default function ResetPasswordForm() {
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validLink, setValidLink] = useState<boolean | null>(null);

  const navigate = useNavigate();

  // Cek link saat halaman dibuka
  useEffect(() => {
    const validate = async () => {
      if (!uid || !token) {
        navigate("/register", { replace: true });
        return;
      }
      const isValid = await checkResetPassword(uid, token);
      if (!isValid) {
        navigate("/register", { replace: true });
      } else {
        setValidLink(true);
      }
    };
    validate();
  }, [uid, token, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Password dan konfirmasi tidak sama");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(uid!, token!, newPassword);
      setSuccess("Password berhasil direset. Silakan login kembali.");
      setTimeout(() => navigate("/login", { replace: true }), 2000);
    } catch (err: any) {
      setError(err.message || "Gagal mereset password");
    } finally {
      setLoading(false);
    }
  };

  // Jika validasi link masih loading → tampilkan "Loading..."
  if (validLink === null) {
    return <p>Memeriksa link reset password...</p>;
  }

  return (
    <div>
      <h2>Reset Password</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <Label htmlFor="newPassword">Password Baru</Label>
        <Input
          variant="secondary"
          type="password"
          placeholder="Password baru"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
        <Input
          variant="secondary"
          type="password"
          placeholder="Konfirmasi password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <GeneralButton type="submit" disabled={loading}>
          {loading ? "Loading..." : "Ganti Password"}
        </GeneralButton>
      </form>
    </div>
  );
}
