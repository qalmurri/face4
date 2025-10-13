export interface TokenContextType {
    accessToken: string | null;
    refreshToken: string | null;
    setTokens: (access: string, refresh: string) => void;
    clearTokensState: () => void;
}

export interface StatusContextType {
    isAuthenticated: boolean;
    login: (access: string, refresh: string) => void;
    logout: () => Promise<void>;
}