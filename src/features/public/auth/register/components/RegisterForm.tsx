import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../../../../apis/authApi";
import { useAuthStatus } from "../../../../../contexts/AuthStatusContext";
import type { RegisterRequest, LoginResponse } from "../../../../../types/Apis/AuthTokenType";

import { Input, Label, GeneralButton } from "../../../../../components/atoms";

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [form, setForm] = useState<RegisterRequest>({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const { login } = useAuthStatus();

  const handleChange = (key: keyof RegisterRequest, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (form.password !== confirmPassword) {
      setError("Password dan konfirmasi tidak sama");
      return;
    }

    setLoading(true);

    try {
      const data: LoginResponse = await registerUser(form); // 🔑 typed request & response
      console.log("Register success:", data);

      login(data.access, data.refresh); // ✅ tanpa `as any`

      if (onSuccess) onSuccess();
      navigate("/", { replace: true }); // redirect ke dashboard
    } catch (err: any) {
      setError(err.message || "Gagal mendaftar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <Label htmlFor="username">Username</Label>
        <Input
          variant="primary"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />

        <Label htmlFor="email">Email</Label>
        <Input
          variant="primary"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <Label htmlFor="password">Password</Label>
        <Input
          variant="secondary"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
        <Input
          variant="secondary"
          type="password"
          placeholder="Konfirmasi Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <GeneralButton type="submit" disabled={loading}>
          {loading ? "Loading..." : "Daftar"}
        </GeneralButton>
      </form>

      <p>
        Sudah punya akun? <Link to="/login">Login di sini</Link>
      </p>
    </div>
  );
}
