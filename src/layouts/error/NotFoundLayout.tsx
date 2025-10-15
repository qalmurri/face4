import { Outlet } from "react-router-dom";
import Footer from "../../Components/Organisms/Footer";

export function NotFoundLayout() {
    return (
        <>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}