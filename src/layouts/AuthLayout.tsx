import { Outlet } from "react-router-dom";
import Footer from "../components/organisms/Footer";

export default function AuthLayout() {
    return (
        <>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}