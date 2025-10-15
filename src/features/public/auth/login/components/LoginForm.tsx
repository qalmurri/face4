import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../../../Services/APIs/EndPoints/Auth";
import { useAuthStatus } from "../../../../../Contexts/StatusContext";
import type { LoginResponse } from "../../../../../Types/AuthType";
import { Input, Label, GeneralButton } from "../../../../../components/atoms";

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { login } = useAuthStatus();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data: LoginResponse = await loginUser(usernameOrEmail, password);
      console.log("Login success:", data);

      login(data.access, data.refresh);

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
        <Input variant="primary" type="text" placeholder="Username atau Email" value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} />
        <Label htmlFor="password">Password</Label>
        <Input variant="secondary" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <GeneralButton type="submit" disabled={loading}>{loading ? "Loading..." : "Masuk"}</GeneralButton>
      </form>
    </div>
  );
}
