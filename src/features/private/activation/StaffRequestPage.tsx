import RequestStaffActivation from "./Components/StaffRequestForm";
import { usePageTitle } from "../../../Hooks";

export default function StaffRequestPage() {
  usePageTitle("Staff Activation")

  return (
    <div>
      <RequestStaffActivation />
    </div>
  );
}
