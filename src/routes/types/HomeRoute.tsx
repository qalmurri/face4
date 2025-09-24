import { useAuth } from "../../contexts/AuthContext";
import LandingPage from "../../features/public/landing/Landing";
import DashboardPage from "../../features/private/dashboard/Dashboard";

export function HomeRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <DashboardPage />;
  }

  return <LandingPage />;
}
