import Menu from "../Molecules/Navbar/Menu/Private";
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
