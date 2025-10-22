import { Outlet } from "react-router-dom";
import Footer from "../../Components/Organisms/Footer";

export default function LoginLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
