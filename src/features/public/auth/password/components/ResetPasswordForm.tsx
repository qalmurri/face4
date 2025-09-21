import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Input, Label, GeneralButton } from "../../../../../components/atoms";
import { resetPassword } from "../../Services";

interface ResetPasswordPageProps {
  onSuccess?: () => void;
}

export default function ResetPasswordForm({
  onSuccess,
}: ResetPasswordPageProps) {
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const navigate = useNavigate();

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
      if (onSuccess) onSuccess();
      setTimeout(() => navigate("/login", { replace: true }), 2000);
    } catch (err: any) {
      setError(err.message || "Gagal mereset password");
    } finally {
      setLoading(false);
    }
  };

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
