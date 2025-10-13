import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/organisms/PublicNavbar";
import PrivateNavbar from "../components/organisms/PrivateNavbar";
import Footer from "../components/organisms/Footer";
import { useAuthStatus } from "../contexts/StatusContext";

export function MainLayout() {
  const { isAuthenticated } = useAuthStatus();

  return (
    <>
      {isAuthenticated ? <PrivateNavbar /> : <PublicNavbar />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}