import { Navigate, Outlet } from "react-router-dom";
import { useStatus } from "../../Contexts/StatusContext";

export default function PublicRoute() {
  const { isAuthenticated } = useStatus();

  if (isAuthenticated) {
    // Kalau sudah login → redirect ke home
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // render halaman anak (Login / Register)
}
