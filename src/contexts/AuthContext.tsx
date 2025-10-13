import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import { saveTokens, getAccessToken, getRefreshToken, clearTokens } from "../services/AuthTokenService";
import type { AuthContextType } from "../types/Apis/AuthTokenType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(getAccessToken());
  const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshToken());

  const isAuthenticated = !!accessToken;

  const login = (access: string, refresh: string) => {
    saveTokens(access, refresh);
    setAccessToken(access);
    setRefreshToken(refresh);
  };

  const logout = () => {
    clearTokens();
    setAccessToken(null);
    setRefreshToken(null);
  };

  useEffect(() => {
    setAccessToken(getAccessToken());
    setRefreshToken(getRefreshToken());
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
