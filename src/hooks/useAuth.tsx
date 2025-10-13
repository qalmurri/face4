// contoh

import { useAuthToken } from "../contexts/AuthTokenContext";
export function useAuthContext() {
  return useAuthToken();
}
