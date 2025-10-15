import { useAuthStatus } from "../../Contexts/StatusContext";
import LandingPage from "../../Features/Public/landing/Landing";
import DashboardPage from "../../Features/Private/dashboard/Dashboard";

export function HomeRoute() {
  const { isAuthenticated } = useAuthStatus();

  if (isAuthenticated) {
    return <DashboardPage />;
  }

  return <LandingPage />;
}
