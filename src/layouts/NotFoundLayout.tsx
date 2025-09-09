import { Outlet } from "react-router-dom";
import Footer from "../components/organisms/Footer";

export default function NotFoundLayout() {
    return (
        <>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}