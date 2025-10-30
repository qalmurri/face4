import usePageTitle from "../../../../Hooks/UsePageTitleHook";
import AddressForm from "./Components/AddressForm";
import AccountMenuNavbar from "../../../../Components/Molecules/Navbar/Menu/Account";

export default function AddressPage() {
  usePageTitle("Address Edit");

  return (
    <div>
      <AccountMenuNavbar />
      <AddressForm />
    </div>
  );
}
