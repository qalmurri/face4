import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../../Contexts/StatusContext";

export function ProtectedRoute() {
  const { isAuthenticated } = useAuthStatus();

  if (!isAuthenticated) {
    // Kalau belum login → redirect ke login
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
