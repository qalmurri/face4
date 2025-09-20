import LoginForm from "./components/LoginForm";
import { usePageTitle } from "../../../../hooks";

export function LoginPage() {
  usePageTitle("Login")

  return (
    <div>
      <LoginForm />
    </div>
  );
}
