import LoginForm from "./Components/LoginForm";
import usePageTitle from "../../../../../Hooks/UsePageTitleHook";

export default function LoginPage() {
  usePageTitle("Login")

  return (
    <div>
      <LoginForm />
    </div>
  );
}
