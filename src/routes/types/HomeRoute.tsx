import { useAuthStatus } from "../../Contexts/StatusContext";
import LandingPage from "../../Features/Public/Landing/Landing";
import DashboardPage from "../../Features/Private/Dashboard/Dashboard";

export default function HomeRoute() {
  const { isAuthenticated } = useAuthStatus();

  if (isAuthenticated) {
    return <DashboardPage />;
  }

  return <LandingPage />;
}
