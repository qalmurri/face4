import StaffActivationConfirm from "./Components/StaffActivationForm";
import { usePageTitle } from "../../../Hooks";

export function StaffActivationPage() {
  usePageTitle("Staff Request");

  return (
    <div>
      <StaffActivationConfirm />
    </div>
  );
}
