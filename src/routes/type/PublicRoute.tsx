import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function PublicRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // Kalau sudah login → redirect ke home
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // render halaman anak (Login / Register)
}
