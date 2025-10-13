import { useAuthStatus } from "../../contexts/AuthStatusContext";
import LandingPage from "../../features/public/landing/Landing";
import DashboardPage from "../../features/private/dashboard/Dashboard";

export function HomeRoute() {
  const { isAuthenticated } = useAuthStatus();

  if (isAuthenticated) {
    return <DashboardPage />;
  }

  return <LandingPage />;
}
