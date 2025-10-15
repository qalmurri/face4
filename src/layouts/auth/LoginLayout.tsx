import { Outlet } from "react-router-dom";
import Footer from "../../Components/Organisms/Footer";

export function LoginLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
