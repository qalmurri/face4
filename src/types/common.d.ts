// Contoh

export interface ApiError {
  message: string;
  statusCode: number;
  details?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  results: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type Nullable<T> = T | null;

export type ID = string | number;
