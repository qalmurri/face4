import { usePageTitle } from "../../../../Hooks";
import ResetPasswordForm from "./Components/ResetPasswordForm";

export default function ResetPasswordPage() {
  usePageTitle("Reset Password");
    
  return (
    <div>
      <ResetPasswordForm />;
    </div>
  );
}