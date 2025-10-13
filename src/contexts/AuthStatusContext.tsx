import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useAuthToken } from "./AuthTokenContext";
import { logoutRequest } from "../apis/authApi";
import type { AuthStatusContextType } from "../types/Apis/AuthTokenType";

const AuthStatusContext = createContext<AuthStatusContextType | undefined>(undefined);

export function AuthStatusProvider({ children }: { children: ReactNode }) {
    const { accessToken, refreshToken, setTokens, clearTokensState } = useAuthToken();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!accessToken);

    const login = (access: string, refresh: string) => {
        setTokens(access, refresh);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        try {
            if (refreshToken) await logoutRequest();
        } catch (err) {
            console.error("Logout request failed:", err);
        } finally {
            clearTokensState();
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        setIsAuthenticated(!!accessToken);
    }, [accessToken]);

    return (
        <AuthStatusContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthStatusContext.Provider>
    );
}

export function useAuthStatus() {
    const ctx = useContext(AuthStatusContext);
    if (!ctx) throw new Error("useAuthStatus must be used within AuthStatusProvider");
    return ctx;
}
