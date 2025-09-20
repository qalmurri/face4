// contoh

import api from "./authApi";

// Tipe data user (supaya rapi dengan TypeScript)
export interface User {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  avatar?: string;
}

// Ambil profil user yang sedang login
export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>("me/");
  return response.data;
}

// Update profil user
export async function updateUser(data: Partial<User>): Promise<User> {
  const response = await api.put<User>("me/", data);
  return response.data;
}

// Ambil daftar semua user (opsional, tergantung backend)
export async function getUsers(): Promise<User[]> {
  const response = await api.get<User[]>("users/");
  return response.data;
}

// Ambil user berdasarkan id
export async function getUserById(id: number): Promise<User> {
  const response = await api.get<User>(`users/${id}/`);
  return response.data;
}
