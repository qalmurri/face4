import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../../contexts/StatusContext";

export function PublicRoute() {
  const { isAuthenticated } = useAuthStatus();

  if (isAuthenticated) {
    // Kalau sudah login → redirect ke home
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // render halaman anak (Login / Register)
}
