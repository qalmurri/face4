import { useEffect, useState, createContext, useContext } from "react";
import type { ReactNode } from "react";

import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from "../services/AuthTokenService";
import type { TokenContextType } from "../types/ContextsType";


//▀█▀ █▀█ █▄▀ █▀▀ █▄░█   █▀▀ █▀█ █▄░█ ▀█▀ █▀▀ ▀▄▀ ▀█▀
//░█░ █▄█ █░█ ██▄ █░▀█   █▄▄ █▄█ █░▀█ ░█░ ██▄ █░█ ░█░


const AuthTokenContext = createContext<TokenContextType | undefined>(undefined);

export function AuthTokenProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(getAccessToken());
  const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshToken());

  const setTokens = (access: string, refresh: string) => {
    saveTokens(access, refresh);
    setAccessToken(access);
    setRefreshToken(refresh);
  };

  const clearTokensState = () => {
    clearTokens();
    setAccessToken(null);
    setRefreshToken(null);
  };

  useEffect(() => {
    setAccessToken(getAccessToken());
    setRefreshToken(getRefreshToken());
  }, []);

  return (
    <AuthTokenContext.Provider value={{ accessToken, refreshToken, setTokens, clearTokensState }}>
      {children}
    </AuthTokenContext.Provider>
  );
}

export function useAuthToken() {
  const ctx = useContext(AuthTokenContext);
  if (!ctx) throw new Error("useAuthToken must be used within AuthTokenProvider");
  return ctx;
}
