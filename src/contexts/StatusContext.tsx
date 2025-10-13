import { useEffect, useState, createContext, useContext } from "react";
import type { ReactNode } from "react";

import { logoutRequest } from "../apis/authApi";
import { useAuthToken } from "./TokenContext";
import type { StatusContextType } from "../types/ContextsType";


//█▀ ▀█▀ ▄▀█ ▀█▀ █░█ █▀   █▀▀ █▀█ █▄░█ ▀█▀ █▀▀ ▀▄▀ ▀█▀
//▄█ ░█░ █▀█ ░█░ █▄█ ▄█   █▄▄ █▄█ █░▀█ ░█░ ██▄ █░█ ░█░


const AuthStatusContext = createContext<StatusContextType | undefined>(undefined);

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
