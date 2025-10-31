import { useEffect, useState, createContext, useContext } from "react";
import type { ReactNode } from "react";
import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  clearTokens
} from "../Services/APIs/Auth/TokenService";
import type { TokenContextType } from "../Types/ContextsType";

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export function TokenProvider({ children }: { children: ReactNode }) {
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

  // Sync state when browser refresh
  useEffect(() => {
    setAccessToken(getAccessToken());
    setRefreshToken(getRefreshToken());
  }, []);

  return (
    <TokenContext.Provider
      value={{
        accessToken,
        refreshToken,
        setTokens,
        clearTokensState
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  const ctx = useContext(TokenContext);
  if (!ctx) throw new Error("useToken must be used within TokenProvider");
  return ctx;
}
