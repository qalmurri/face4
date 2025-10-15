// contoh

import { useToken } from "../Contexts/TokenContext";
export function useAuthContext() {
  return useToken();
}
