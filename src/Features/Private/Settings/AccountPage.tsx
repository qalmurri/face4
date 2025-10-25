import usePageTitle from "../../../Hooks/UsePageTitleHook";
import AccountForm from "./Components/AccountForm";

export default function AccountsPage() {
  usePageTitle("Accounts Edit")

  return (
    <div>
      <AccountForm />
    </div>
  );
}
