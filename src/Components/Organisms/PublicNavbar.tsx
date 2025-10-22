import Menu from "../Molecules/Navbar/Menu/Public";
import Navbar from "../Molecules/Navbar/Navbar";
import TopBanner from "../Molecules/TopBanner";

export default function PublicNavbar() {
  return (
    <>
      <TopBanner variant="info" storageKey="BannerTopNavbar" time={5000}>🚀 Promo spesial! Dapatkan diskon 50% minggu ini.</TopBanner>
      <Navbar brand="MyApp" variant="dark">
        <Menu />
      </Navbar>
    </>
  );
}