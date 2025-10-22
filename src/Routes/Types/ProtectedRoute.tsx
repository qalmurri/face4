import { Navigate, Outlet } from "react-router-dom";
import { useStatus } from "../../Contexts/StatusContext";

export default function ProtectedRoute() {
  const { isAuthenticated } = useStatus();

  if (!isAuthenticated) {
    // Kalau belum login → redirect ke login
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
