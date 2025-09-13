import React, { useState } from "react";
import { loginUser } from "../../services";
import { Link } from "react-router-dom";
import Input from "../../../../../components/atoms/forms/Input";
import Label from "../../../../../components/atoms/forms/Label";

// Props type
interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data: { access?: string; refresh?: string } = await loginUser(
        email,
        password
      );
      console.log("Login success:", data);

      if (data.access) localStorage.setItem("access", data.access);
      if (data.refresh) localStorage.setItem("refresh", data.refresh);

      if (onSuccess) onSuccess(); // kasih tahu parent kalau login berhasil
    } catch (err) {
      setError("Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <Label variant="error" htmlFor="email">Email</Label>
        <Input
          variant="primary"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Label variant="error" htmlFor="password">Password</Label>
        <Input
          variant="secondary"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Masuk"}
        </button>
      </form>

      <p>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </div>
  );
}