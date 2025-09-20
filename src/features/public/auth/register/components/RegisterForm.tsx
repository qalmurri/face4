import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../Services";
import { useAuth } from "../../../../../context/AuthContext";
import Input from "../../../../../components/atoms/forms/Input";
import Label from "../../../../../components/atoms/forms/Label";

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const { login } = useAuth(); // ⬅️ gunakan login dari context

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi tidak sama");
      return;
    }

    setLoading(true);

    try {
      const data = await registerUser(username, email, password);
      console.log("Register success:", data);

      if ((data as any).access && (data as any).refresh) {
        // langsung login via context
        login((data as any).access, (data as any).refresh);
      }

      if (onSuccess) onSuccess();

      // redirect ke private dashboard
      navigate("/", { replace: true });
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Label htmlFor="email">Email</Label>
        <Input
          variant="primary"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Label htmlFor="password">Password</Label>
        <Input
          variant="secondary"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
        <Input
          variant="secondary"
          type="password"
          placeholder="Konfirmasi Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Daftar"}
        </button>
      </form>

      <p>
        Sudah punya akun? <Link to="/login">Login di sini</Link>
      </p>
    </div>
  );
}
