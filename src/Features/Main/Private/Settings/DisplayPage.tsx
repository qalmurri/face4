import usePageTitle from "../../../../Hooks/UsePageTitleHook";
import DisplayForm from "./Components/DisplayForm";
import AccountMenuNavbar from "../../../../Components/Molecules/Navbar/Menu/Account";

export default function DisplayPage() {
  usePageTitle("Display Edit")

  return (
    <div>
      <AccountMenuNavbar />
      <DisplayForm />
    </div>
  );
}
