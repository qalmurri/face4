// contoh

import { useAuthToken } from "../contexts/TokenContext";
export function useAuthContext() {
  return useAuthToken();
}
