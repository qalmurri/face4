import Menu from "../molecules/navbar/menu/Public";
import Navbar from "../molecules/navbar/Navbar";
import TopBanner from "../molecules/TopBanner";

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