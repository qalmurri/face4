// Contoh

export interface User {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserRequest {
  fullName?: string;
  avatarUrl?: string;
}

export interface UserListResponse {
  results: User[];
  total: number;
}
