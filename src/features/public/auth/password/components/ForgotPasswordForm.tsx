import React, { useState } from "react";
import { Link } from "react-router-dom";

import type { ForgotPasswordRequest } from "../../../../../Types/AuthType";
import { forgotPasswordCheck, forgotPasswordConfirm } from "../../../../../Services/APIs/EndPoints/Auth";
import { Input, Label, GeneralButton } from "../../../../../Components/Atoms";

export default function ForgotPasswordForm() {
  const [identifier, setIdentifier] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // step
  const [step, setStep] = useState<"input" | "confirm" | "done">("input");
  const [accountInfo, setAccountInfo] = useState<{
    username: string;
    email: string;
    last_reset: string | null;
  } | null>(null);

  const handleCheck = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload: ForgotPasswordRequest = { identifier };
      const res = await forgotPasswordCheck(payload);
      setAccountInfo(res);
      setStep("confirm");
    } catch (err: any) {
      setError(err.message || "User tidak ditemukan");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!identifier) return;
    setError("");
    setLoading(true);

    try {
      const payload: ForgotPasswordRequest = { identifier };
      const res = await forgotPasswordConfirm(payload);
      setSuccessMessage(
        `Email reset password telah dikirim ke ${res.email}. Silakan cek inbox Anda.`
      );
      setStep("done");
    } catch (err: any) {
      setError(err.message || "Gagal mengirim email reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {step === "input" && (
        <form onSubmit={handleCheck}>
          <Label htmlFor="identifier">Username atau Email</Label>
          <Input
            variant="primary"
            type="text"
            placeholder="Masukkan username atau email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <GeneralButton type="submit" disabled={loading}>
            {loading ? "Loading..." : "Cari Akun"}
          </GeneralButton>
        </form>
      )}

      {step === "confirm" && accountInfo && (
        <div>
          <p>
            Apakah benar akun ini? <br />
            <b>{accountInfo.username}</b> ({accountInfo.email}) <br />
            Terakhir reset:{" "}
            {accountInfo.last_reset
              ? new Date(accountInfo.last_reset).toLocaleString()
              : "Belum pernah reset"}
          </p>
          <div className="mt-4 space-x-2">
            <GeneralButton onClick={handleConfirm} disabled={loading}>
              {loading ? "Loading..." : "Ya, kirim email reset"}
            </GeneralButton>
            <GeneralButton variant="secondary" onClick={() => setStep("input")}>
              Batal
            </GeneralButton>
          </div>
        </div>
      )}

      {step === "done" && (
        <p className="text-green-500 mb-2">{successMessage}</p>
      )}

      <p className="mt-4">
        Ingat password? <Link to="/login">Login di sini</Link>
      </p>
    </div>
  );
}