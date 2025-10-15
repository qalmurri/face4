import { usePageTitle } from "../../../../hooks";
import ResetPasswordForm from "./Components/ResetPasswordForm";

export function ResetPasswordPage() {
  usePageTitle("Reset Password");
    
  return (
    <div>
      <ResetPasswordForm />;
    </div>
  );
}