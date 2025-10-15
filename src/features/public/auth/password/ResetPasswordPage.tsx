import { usePageTitle } from "../../../../Hooks";
import ResetPasswordForm from "./Components/ResetPasswordForm";

export function ResetPasswordPage() {
  usePageTitle("Reset Password");
    
  return (
    <div>
      <ResetPasswordForm />;
    </div>
  );
}