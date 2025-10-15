import { usePageTitle } from "../../../../hooks";
import ForgotPasswordForm from "./Components/ForgotPasswordForm";

export function ForgotPasswordPage() {
  usePageTitle("Forgot Password")

  return (
    <div>
      <ForgotPasswordForm />
    </div>
  );
}
