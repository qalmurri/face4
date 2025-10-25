import usePageTitle from "../../../../../Hooks/UsePageTitleHook";
import ForgotPasswordForm from "./Components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  usePageTitle("Forgot Password")

  return (
    <div>
      <ForgotPasswordForm />
    </div>
  );
}
