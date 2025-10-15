import LoginForm from "./components/LoginForm";
import { usePageTitle } from "../../../../Hooks";

export function LoginPage() {
  usePageTitle("Login")

  return (
    <div>
      <LoginForm />
    </div>
  );
}
