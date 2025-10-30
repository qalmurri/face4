import usePageTitle from "../../../../Hooks/UsePageTitleHook";
import PreferenceForm from "./Components/PreferenceForm";
import AccountMenuNavbar from "../../../../Components/Molecules/Navbar/Menu/Account";

export default function PreferencePage() {
  usePageTitle("Preference Edit")

  return (
    <div>
      <AccountMenuNavbar />
      <PreferenceForm />
    </div>
  );
}
