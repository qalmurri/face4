import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/organisms/PublicNavbar";
import PrivateNavbar from "../components/organisms/PrivateNavbar";
import Footer from "../components/organisms/Footer";
import { useAuth } from "../context/AuthContext";

export default function MainLayout() {
    const { isAuthenticated } = useAuth();

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