// contoh

import { useAuthToken } from "../Contexts/TokenContext";
export function useAuthContext() {
  return useAuthToken();
}
