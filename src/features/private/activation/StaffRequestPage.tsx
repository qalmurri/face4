import RequestStaffActivation from "./Components/StaffRequestForm";
import { usePageTitle } from "../../../hooks";

export function StaffRequestPage() {
  usePageTitle("Staff Activation")

  return (
    <div>
      <RequestStaffActivation />
    </div>
  );
}
