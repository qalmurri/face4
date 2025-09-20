import { Outlet } from "react-router-dom";
import Footer from "../../components/organisms/Footer";

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
