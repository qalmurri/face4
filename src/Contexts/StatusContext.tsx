import { useEffect, useState, createContext, useContext } from "react";
import type { ReactNode } from "react";

import { useToken } from "./TokenContext";
import type { StatusContextType } from "../Types/ContextsType";
import { logout as logoutService } from "../Services/APIs/Auth/Service";

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export function StatusProvider({ children }: { children: ReactNode }) {
    const { accessToken, refreshToken, setTokens, clearTokensState } = useToken();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!accessToken);

    const login = (access: string, refresh: string) => {
        setTokens(access, refresh);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        if (refreshToken) logoutService();
        clearTokensState();
        setIsAuthenticated(false);
    };

    // auto update status when token changes
    useEffect(() => {
        setIsAuthenticated(!!accessToken);
    }, [accessToken]);

    return (
        <StatusContext.Provider value={{ isAuthenticated, login, logout: handleLogout }}>
            {children}
        </StatusContext.Provider>
    );
}

export function useStatus() {
    const ctx = useContext(StatusContext);
    if (!ctx) throw new Error("useStatus must be used within StatusProvider");
    return ctx;
}
