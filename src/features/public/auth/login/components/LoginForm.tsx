import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../Services";
import { useAuth } from "../../../../../context/AuthContext";
import type { LoginResponse } from "../../../../../types/auth";

import Input from "../../../../../components/atoms/forms/Input";
import Label from "../../../../../components/atoms/forms/Label";
import GeneralButton from "../../../../../components/atoms/buttons/GeneralButton";

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data: LoginResponse = await loginUser(usernameOrEmail, password); // 🔑 typing aman
      console.log("Login success:", data);

      login(data.access, data.refresh); // ✅ nggak perlu `as any` lagi

      if (onSuccess) onSuccess();
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err.message || "Username/email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <Label htmlFor="usernameOrEmail">Username atau Email</Label>
        <Input
          variant="primary"
          type="text"
          placeholder="Username atau Email"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
        />

        <Label htmlFor="password">Password</Label>
        <Input
          variant="secondary"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <GeneralButton type="submit" disabled={loading}>
          {loading ? "Loading..." : "Masuk"}
        </GeneralButton>
      </form>

      <p>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </div>
  );
}
