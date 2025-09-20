import Menu from "../molecules/navbar/menu/Private";
import Navbar from "../molecules/navbar/Navbar";

export default function PublicNavbar() {
  return (
    <>
      <Navbar brand="MyApp" variant="dark">
        <Menu />
      </Navbar>
    </>
  );
}
