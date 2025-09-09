import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/organisms/PublicNavbar";
import Footer from "../components/organisms/Footer";

export default function MainLayout() {
    return (
        <>
            <PublicNavbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}