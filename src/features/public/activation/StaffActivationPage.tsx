import StaffActivationConfirm from "./Components/StaffActivationForm";
import { usePageTitle } from "../../../hooks";

export function StaffActivationPage() {
  usePageTitle("Staff Request");

  return (
    <div>
      <StaffActivationConfirm />
    </div>
  );
}
