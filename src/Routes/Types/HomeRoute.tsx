import { useStatus } from "../../Contexts/StatusContext";
import LandingPage from "../../Features/Main/Public/Landing/Landing";
import DashboardPage from "../../Features/Main/Private/Dashboard/Dashboard";

export default function HomeRoute() {
  const { isAuthenticated } = useStatus();

  if (isAuthenticated) {
    return <DashboardPage />;
  }

  return <LandingPage />;
}
