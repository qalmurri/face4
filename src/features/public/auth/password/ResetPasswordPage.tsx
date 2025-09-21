import { usePageTitle } from "../../../../hooks";
import ResetPasswordForm from "./components/ResetPasswordForm";

export function ResetPasswordPage() {
  usePageTitle("Reset Password");
    
  return (
    <div>
      <ResetPasswordForm />;
    </div>
  );
}