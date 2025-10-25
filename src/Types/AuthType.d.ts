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

export interface PhoneData {
  id?: number;
  number: string;
  created_at?: string;
}

export interface UserPhoneResponse {
  username: string;
  phone: PhoneData | null;
}

interface PreferenceData {
    id?: number;
    language: string;
    created_at?: string;
}

interface UserPreferenceResponse {
    username: string;
    preference: PreferenceData | null;
}

interface DisplayData {
    id?: number;
    photo: string;
    created_at?: string;
}

interface UserDisplayResponse {
    username: string;
    display: DisplayData | null;
}

interface AddressData {
    id?: number;
    postal_code: string;
    created_at?: string;
}

interface UserAddressResponse {
    username: string;
    address: AddressData | null;
}
