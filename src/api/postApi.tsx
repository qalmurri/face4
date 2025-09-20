// Contoh

import api from "./authApi";

// Definisi tipe Post (menyesuaikan backend kamu)
export interface Post {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    username: string;
  };
  created_at: string;
  updated_at: string;
}

// Ambil semua post
export async function getPosts(): Promise<Post[]> {
  const response = await api.get<Post[]>("posts/");
  return response.data;
}

// Ambil post berdasarkan ID
export async function getPostById(id: number): Promise<Post> {
  const response = await api.get<Post>(`posts/${id}/`);
  return response.data;
}

// Buat post baru
export async function createPost(data: {
  title: string;
  content: string;
}): Promise<Post> {
  const response = await api.post<Post>("posts/", data);
  return response.data;
}

// Update post
export async function updatePost(
  id: number,
  data: Partial<Post>
): Promise<Post> {
  const response = await api.put<Post>(`posts/${id}/`, data);
  return response.data;
}

// Hapus post
export async function deletePost(id: number): Promise<void> {
  await api.delete(`posts/${id}/`);
}
