import usePageTitle from "../../../../Hooks/UsePageTitleHook";
import PhoneForm from "./Components/PhoneForm";
import AccountMenuNavbar from "../../../../Components/Molecules/Navbar/Menu/Account";

export default function PhonePage() {
  usePageTitle("Phone Edit")

  return (
    <div>
      <AccountMenuNavbar />
      <PhoneForm />
    </div>
  );
}
