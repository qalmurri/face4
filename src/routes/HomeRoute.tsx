import { useAuth } from "../context/AuthContext";
import LandingPage from "../features/public/landing/Landing";
import DashboardPage from "../features/private/dashboard/Dashboard";

export default function HomeRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <DashboardPage />;
  }

  return <LandingPage />;
}
