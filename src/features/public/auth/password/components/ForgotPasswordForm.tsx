import React, { useState } from "react";
import { Link } from "react-router-dom";

import type { ForgotPasswordRequest } from "../../../../../types/auth";
import { forgotPassword } from "../../Services";
import { Input, Label, GeneralButton } from "../../../../../components/atoms";

export default function ForgotPasswordForm() {
  const [identifier, setIdentifier] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const payload: ForgotPasswordRequest = { identifier };
      await forgotPassword(payload);
      setSuccessMessage(
        "Email reset password telah dikirim. Silakan cek inbox Anda."
      );
    } catch (err: any) {
      setError(err.message || "Gagal mengirim email reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mb-2">{successMessage}</p>
      )}

      <form onSubmit={handleSubmit}>
        <Label htmlFor="identifier">Username atau Email</Label>
        <Input
          variant="primary"
          type="text"
          placeholder="Masukkan username atau email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <GeneralButton type="submit" disabled={loading}>
          {loading ? "Loading..." : "Kirim Email Reset"}
        </GeneralButton>
      </form>

      <p className="mt-4">
        Ingat password? <Link to="/login">Login di sini</Link>
      </p>
    </div>
  );
}
