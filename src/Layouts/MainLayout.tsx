import { Outlet } from "react-router-dom";
import PublicNavbar from "../Components/Organisms/PublicNavbar";
import PrivateNavbar from "../Components/Organisms/PrivateNavbar";
import Footer from "../Components/Organisms/Footer";
import { useStatus } from "../Contexts/StatusContext";

export default function MainLayout() {
  const { isAuthenticated } = useStatus();

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