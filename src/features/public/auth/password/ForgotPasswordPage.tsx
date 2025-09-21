import { usePageTitle } from "../../../../hooks";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

export function ForgotPasswordPage() {
  usePageTitle("Forgot Password")

  return (
    <div>
      <ForgotPasswordForm />
    </div>
  );
}
