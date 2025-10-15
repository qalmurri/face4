import Menu from "../Molecules/Navbar/menu/Private";
import Navbar from "../Molecules/Navbar/Navbar";

export default function PublicNavbar() {
  return (
    <>
      <Navbar brand="MyApp" variant="dark">
        <Menu />
      </Navbar>
    </>
  );
}
