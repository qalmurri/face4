import usePageTitle from "../../../../Hooks/UsePageTitleHook";
import AccountForm from "./Components/AccountForm";
import AccountMenuNavbar from "../../../../Components/Molecules/Navbar/Menu/Account";

export default function AccountsPage() {
  usePageTitle("Accounts Edit")

  return (
    <div>
      <AccountMenuNavbar />
      <AccountForm />
    </div>
  );
}
