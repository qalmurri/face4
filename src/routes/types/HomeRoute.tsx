import { useStatus } from "../../Contexts/StatusContext";
import LandingPage from "../../Features/Public/Landing/Landing";
import DashboardPage from "../../Features/Private/Dashboard/Dashboard";

export default function HomeRoute() {
  const { isAuthenticated } = useStatus();

  if (isAuthenticated) {
    return <DashboardPage />;
  }

  return <LandingPage />;
}
