export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RefreshTokenResponse {
  access: string;
}

export interface ForgotPasswordRequest {
  identifier: string;
}

export interface AuthTokenContextType {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (access: string, refresh: string) => void;
  clearTokensState: () => void;
}

export interface AuthStatusContextType {
  isAuthenticated: boolean;
  login: (access: string, refresh: string) => void;
  logout: () => Promise<void>;
}