import { usePageTitle } from "../../../../Hooks";
import ForgotPasswordForm from "./Components/ForgotPasswordForm";

export function ForgotPasswordPage() {
  usePageTitle("Forgot Password")

  return (
    <div>
      <ForgotPasswordForm />
    </div>
  );
}
