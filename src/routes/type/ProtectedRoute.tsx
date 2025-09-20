import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Kalau belum login → redirect ke login
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
