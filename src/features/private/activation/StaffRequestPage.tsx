import RequestStaffActivation from "./components/StaffRequestForm";
import { usePageTitle } from "../../../hooks";

export function StaffRequestPage() {
  usePageTitle("Staff Activation")

  return (
    <div>
      <RequestStaffActivation />
    </div>
  );
}
