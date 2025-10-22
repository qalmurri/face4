import { useEffect, useState, createContext, useContext } from "react";
import type { ReactNode } from "react";

import { logoutRequest } from "../Services/APIs/EndPoints/Auth/Logout";
import { useToken } from "./TokenContext";
import type { StatusContextType } from "../Types/ContextsType";


//█▀ ▀█▀ ▄▀█ ▀█▀ █░█ █▀   █▀▀ █▀█ █▄░█ ▀█▀ █▀▀ ▀▄▀ ▀█▀
//▄█ ░█░ █▀█ ░█░ █▄█ ▄█   █▄▄ █▄█ █░▀█ ░█░ ██▄ █░█ ░█░


const StatusContext = createContext<StatusContextType | undefined>(undefined);

export function StatusProvider({ children }: { children: ReactNode }) {
    const { accessToken, refreshToken, setTokens, clearTokensState } = useToken();
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
        <StatusContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </StatusContext.Provider>
    );
}

export function useStatus() {
    const ctx = useContext(StatusContext);
    if (!ctx) throw new Error("useStatus must be used within StatusProvider");
    return ctx;
}
