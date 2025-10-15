import { Outlet } from "react-router-dom";
import PublicNavbar from "../Components/Organisms/PublicNavbar";
import PrivateNavbar from "../Components/Organisms/PrivateNavbar";
import Footer from "../Components/Organisms/Footer";
import { useAuthStatus } from "../Contexts/StatusContext";

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